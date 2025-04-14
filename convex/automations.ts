import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { getUserByTokenIdentifier } from "./users";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { EXECUTION_STATUS } from "./schema";

// Get all automations for the current user
export const getAutomations = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await getUserByTokenIdentifier(ctx, identity.subject);
    if (!user) {
      throw new Error("User not found");
    }

    // Get all automations for the user
    const automations = await ctx.db
      .query("automations")
      .withIndex("by_user", (q) => q.eq("userId", user.tokenIdentifier))
      .collect();

    return automations;
  },
});

// Get details for a specific automation
export const getAutomationDetails = query({
  args: { id: v.id("automations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await getUserByTokenIdentifier(ctx, identity.subject);
    if (!user) {
      throw new Error("User not found");
    }

    // Get the automation
    const automation = await ctx.db.get(args.id);
    if (!automation) {
      throw new Error("Automation not found");
    }

    // Verify the user owns this automation
    if (automation.userId !== user.tokenIdentifier) {
      throw new Error("Unauthorized");
    }

    return automation;
  },
});

// Toggle an automation on or off
export const toggleAutomation = mutation({
  args: { 
    id: v.id("automations"),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await getUserByTokenIdentifier(ctx, identity.subject);
    if (!user) {
      throw new Error("User not found");
    }

    // Get the automation
    const automation = await ctx.db.get(args.id);
    if (!automation) {
      throw new Error("Automation not found");
    }

    // Verify the user owns this automation
    if (automation.userId !== user.tokenIdentifier) {
      throw new Error("Unauthorized");
    }

    // For keyholders (admins), bypass credit check since they manage the platform
    // Only check credits for regular users who aren't the owner of the automation
    if (args.isActive && automation.userId !== user.tokenIdentifier) {
      const hasEnoughCredits = await ctx.db
        .query("credits")
        .withIndex("by_user", (q) => q.eq("userId", user.tokenIdentifier))
        .collect()
        .then(transactions => 
          transactions.reduce((sum, transaction) => sum + transaction.amount, 0) >= automation.creditsPerExecution
        );

      if (!hasEnoughCredits) {
        throw new Error("Insufficient credits");
      }
    }

    // Update the automation in the database
    await ctx.db.patch(args.id, { 
      isActive: args.isActive,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Get execution history for an automation
export const getAutomationExecutions = query({
  args: { automationId: v.id("automations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await getUserByTokenIdentifier(ctx, identity.subject);
    if (!user) {
      throw new Error("User not found");
    }

    // Verify the user owns this automation
    const automation = await ctx.db.get(args.automationId);
    if (!automation) {
      throw new Error("Automation not found");
    }

    if (automation.userId !== user.tokenIdentifier) {
      throw new Error("Unauthorized");
    }

    // Get all executions for this automation
    const executions = await ctx.db
      .query("executions")
      .withIndex("by_automation", (q) => q.eq("automationId", args.automationId))
      .order("desc")
      .collect();

    return executions;
  },
});

// Create a new automation with webhook
export const createAutomation = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    webhookUrl: v.string(),
    n8nWorkflowId: v.optional(v.string()), // Legacy support - optional
    authType: v.optional(v.union(
      v.literal("none"),
      v.literal("basic"),
      v.literal("jwt"),
      v.literal("header")
    )),
    authCredentials: v.optional(v.object({
      username: v.optional(v.string()),
      password: v.optional(v.string()),
      token: v.optional(v.string()),
    })),
    creditsPerExecution: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const user = await getUserByTokenIdentifier(ctx, identity.subject);
    if (!user) {
      throw new Error("User not found");
    }
    
    // Create the automation - handle both legacy and new fields
    const automationData = {
      name: args.name,
      description: args.description,
      creditsPerExecution: args.creditsPerExecution,
      isActive: false,
      userId: user.tokenIdentifier,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    // Add webhook fields if available
    if (args.webhookUrl) {
      Object.assign(automationData, {
        webhookUrl: args.webhookUrl,
        authType: args.authType || "none",
        ...(args.authCredentials ? { authCredentials: args.authCredentials } : {}),
      });
    }
    
    // Add legacy field if available
    if (args.n8nWorkflowId) {
      Object.assign(automationData, {
        n8nWorkflowId: args.n8nWorkflowId
      });
    }
    
    const id = await ctx.db.insert("automations", automationData);
    
    return { id };
  },
});

// Change the executeWebhook action to use a different pattern
export const executeWebhook = action({
  args: {
    automationId: v.id("automations"),
    clientId: v.optional(v.id("clients")),
    payload: v.optional(v.any()),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    executionId: string;
    result: any;
  }> => {
    // Get auth identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // First get the client user and automation via separate query calls
    const userResult = await ctx.runQuery(api.users.getUserByToken, { 
      tokenIdentifier: identity.subject 
    });
    
    if (!userResult) {
      throw new Error("User not found");
    }

    // Get the automation
    const automation = await ctx.runQuery(api.automations.getAutomationDetails, { 
      id: args.automationId 
    });
    
    if (!automation) {
      throw new Error("Automation not found");
    }
    
    if (!automation.isActive) {
      throw new Error("Automation is not active");
    }

    // Verify ownership
    if (automation.userId !== userResult.tokenIdentifier) {
      throw new Error("Unauthorized to execute this automation");
    }

    const startedAt = Date.now();
    let executionId = `webhook-exec-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    try {
      // Execute the webhook by making an HTTP request
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      
      // Add authentication headers based on the auth type
      if (automation.authType === "basic" && automation.authCredentials?.username && automation.authCredentials?.password) {
        const auth = Buffer.from(
          `${automation.authCredentials.username}:${automation.authCredentials.password}`
        ).toString("base64");
        headers["Authorization"] = `Basic ${auth}`;
      } else if (automation.authType === "jwt" && automation.authCredentials?.token) {
        headers["Authorization"] = `Bearer ${automation.authCredentials.token}`;
      } else if (automation.authType === "header" && automation.authCredentials?.token) {
        headers["X-Auth-Token"] = automation.authCredentials.token;
      }

      // Ensure webhookUrl is defined before making the fetch call
      if (!automation.webhookUrl) {
        throw new Error("Webhook URL is not defined");
      }

      // Make the webhook request
      const response = await fetch(automation.webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(args.payload || {}),
      });
      
      if (!response.ok) {
        throw new Error(`Webhook execution failed: ${response.statusText}`);
      }
      
      // Get the response body
      const result = await response.json();
      
      // Record the successful execution using a separate mutation
      const recordResult = await ctx.runMutation(api.automations.recordSuccessfulExecution, {
        automationId: args.automationId,
        userId: userResult.tokenIdentifier,
        executionId: executionId,
        result: result,
        startedAt: startedAt,
        finishedAt: Date.now(),
        clientId: args.clientId,
        creditsUsed: automation.creditsPerExecution
      });
      
      // Return the successful result
      return {
        success: true,
        executionId,
        result,
      };
    } catch (error) {
      // Record the failed execution
      await ctx.runMutation(api.automations.recordFailedExecution, {
        automationId: args.automationId,
        userId: userResult.tokenIdentifier,
        executionId: executionId,
        error: error instanceof Error ? error.message : "Unknown error",
        startedAt: startedAt,
        finishedAt: Date.now()
      });
      
      // Rethrow the error
      throw error;
    }
  },
});

// Add these helper mutations to handle the execution records

// Record a successful execution
export const recordSuccessfulExecution = mutation({
  args: {
    automationId: v.id("automations"),
    userId: v.string(),
    executionId: v.string(),
    result: v.any(),
    startedAt: v.number(),
    finishedAt: v.number(),
    clientId: v.optional(v.id("clients")),
    creditsUsed: v.number()
  },
  handler: async (ctx, args) => {
    // Create the execution record
    const executionRecordId = await ctx.db.insert("executions", {
      automationId: args.automationId,
      userId: args.userId,
      n8nExecutionId: args.executionId,
      status: EXECUTION_STATUS.SUCCESS,
      startedAt: args.startedAt,
      finishedAt: args.finishedAt,
      result: args.result,
      creditsUsed: args.creditsUsed,
      createdAt: Date.now(),
    });
    
    // If client ID provided, record the client execution and deduct credits
    if (args.clientId) {
      // Create client execution record
      await ctx.db.insert("clientExecutions", {
        clientId: args.clientId,
        automationId: args.automationId,
        n8nExecutionId: args.executionId,
        status: EXECUTION_STATUS.SUCCESS,
        creditsUsed: args.creditsUsed,
        startedAt: args.startedAt,
        finishedAt: args.finishedAt,
        result: args.result,
        createdAt: Date.now(),
      });
      
      // Deduct credits from the client
      await ctx.db.insert("clientCredits", {
        clientId: args.clientId,
        amount: -args.creditsUsed,
        transactionType: "usage",
        automationId: args.automationId,
        executionId: executionRecordId,
        notes: `Webhook execution`,
        createdAt: Date.now(),
        createdBy: args.userId,
      });
      
      // Update client's credit balance
      const client = await ctx.db.get(args.clientId);
      if (client) {
        const newBalance = (client.creditBalance || 0) - args.creditsUsed;
        await ctx.db.patch(args.clientId, {
          creditBalance: newBalance,
          updatedAt: Date.now(),
        });
      }
    }
    
    return executionRecordId;
  }
});

// Record a failed execution
export const recordFailedExecution = mutation({
  args: {
    automationId: v.id("automations"),
    userId: v.string(),
    executionId: v.string(),
    error: v.string(),
    startedAt: v.number(),
    finishedAt: v.number()
  },
  handler: async (ctx, args) => {
    // Create the execution record
    return await ctx.db.insert("executions", {
      automationId: args.automationId,
      userId: args.userId,
      n8nExecutionId: args.executionId,
      status: EXECUTION_STATUS.FAILED,
      startedAt: args.startedAt,
      finishedAt: args.finishedAt,
      result: { error: args.error },
      creditsUsed: 0, // Don't charge for failed executions
      createdAt: Date.now(),
    });
  }
});

// Record an execution result
export const recordExecution = mutation({
  args: {
    automationId: v.id("automations"),
    executionId: v.string(),
    status: v.union(
      v.literal("running"),
      v.literal("success"),
      v.literal("failed")
    ),
    result: v.optional(v.any()),
    startedAt: v.number(),
    finishedAt: v.optional(v.number()),
    clientId: v.optional(v.id("clients")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const user = await getUserByTokenIdentifier(ctx, identity.subject);
    if (!user) {
      throw new Error("User not found");
    }
    
    // Get the automation to verify ownership
    const automation = await ctx.db.get(args.automationId);
    if (!automation) {
      throw new Error("Automation not found");
    }
    
    if (automation.userId !== user.tokenIdentifier) {
      throw new Error("Unauthorized");
    }
    
    // Create the execution record
    const executionId = await ctx.db.insert("executions", {
      automationId: args.automationId,
      userId: user.tokenIdentifier,
      n8nExecutionId: args.executionId, // Reuse this field for webhook executions
      status: args.status,
      startedAt: args.startedAt,
      finishedAt: args.finishedAt,
      result: args.result,
      creditsUsed: args.status === "success" ? automation.creditsPerExecution : 0,
      createdAt: Date.now(),
    });
    
    return executionId;
  },
});

// Helper function to get authentication headers for a webhook
function getAuthHeaders(automation: {
  authType: string;
  authCredentials?: {
    username?: string;
    password?: string;
    token?: string;
  }
}): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  switch (automation.authType) {
    case "basic":
      if (automation.authCredentials?.username && automation.authCredentials?.password) {
        const auth = Buffer.from(
          `${automation.authCredentials.username}:${automation.authCredentials.password}`
        ).toString("base64");
        headers["Authorization"] = `Basic ${auth}`;
      }
      break;
    case "jwt":
      if (automation.authCredentials?.token) {
        headers["Authorization"] = `Bearer ${automation.authCredentials.token}`;
      }
      break;
    case "header":
      if (automation.authCredentials?.token) {
        headers["X-Auth-Token"] = automation.authCredentials.token;
      }
      break;
  }
  
  return headers;
}

// Delete an automation and all associated data
export const deleteAutomation = mutation({
  args: { 
    id: v.id("automations")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await getUserByTokenIdentifier(ctx, identity.subject);
    if (!user) {
      throw new Error("User not found");
    }

    // Get the automation
    const automation = await ctx.db.get(args.id);
    if (!automation) {
      throw new Error("Automation not found");
    }

    // Verify the user owns this automation
    if (automation.userId !== user.tokenIdentifier) {
      throw new Error("Unauthorized");
    }

    // Delete all executions for this automation
    const executions = await ctx.db
      .query("executions")
      .withIndex("by_automation", (q) => q.eq("automationId", args.id))
      .collect();

    for (const execution of executions) {
      await ctx.db.delete(execution._id);
    }

    // Check for client automations and delete them
    const clientAutomations = await ctx.db
      .query("clientAutomations")
      .withIndex("by_automation", (q) => q.eq("automationId", args.id))
      .collect();

    for (const clientAutomation of clientAutomations) {
      await ctx.db.delete(clientAutomation._id);
    }

    // Delete all client executions for this automation
    const clientExecutions = await ctx.db
      .query("clientExecutions")
      .withIndex("by_automation", (q) => q.eq("automationId", args.id))
      .collect();

    for (const clientExecution of clientExecutions) {
      await ctx.db.delete(clientExecution._id);
    }

    // Finally delete the automation itself
    await ctx.db.delete(args.id);

    return { success: true };
  },
}); 
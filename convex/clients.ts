import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { TRANSACTION_TYPES } from "./schema";

/**
 * Get all clients
 */
export const getClients = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const clients = await ctx.db.query("clients").collect();

    // For each client, get their automation count and credit balance
    const clientsWithStats = await Promise.all(
      clients.map(async (client) => {
        // Get assigned automations count
        const automations = await ctx.db
          .query("clientAutomations")
          .withIndex("by_client", (q) => q.eq("clientId", client._id))
          .collect();

        // Get total credit balance
        const creditTransactions = await ctx.db
          .query("clientCredits")
          .withIndex("by_client", (q) => q.eq("clientId", client._id))
          .collect();

        const creditBalance = creditTransactions.reduce(
          (total, tx) => total + tx.amount,
          0
        );

        return {
          ...client,
          automationCount: automations.length,
          creditBalance,
        };
      })
    );

    return clientsWithStats;
  },
});

/**
 * Get a single client by ID
 */
export const getClient = query({
  args: { id: v.id("clients") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const client = await ctx.db.get(args.id);
    if (!client) {
      throw new Error("Client not found");
    }

    // Get credit balance
    const creditTransactions = await ctx.db
      .query("clientCredits")
      .withIndex("by_client", (q) => q.eq("clientId", client._id))
      .collect();

    const creditBalance = creditTransactions.reduce(
      (total, tx) => total + tx.amount,
      0
    );

    // Return all client data including creator info
    return {
      ...client,
      creditBalance,
    };
  },
});

/**
 * Create a new client
 */
export const createClient = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Check if client with this email already exists
    const existingClient = await ctx.db
      .query("clients")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingClient) {
      throw new Error("A client with this email already exists");
    }

    // Create the client
    const clientId = await ctx.db.insert("clients", {
      name: args.name,
      email: args.email,
      createdAt: Date.now(),
      createdBy: identity.tokenIdentifier,
      creditBalance: 0,
    });

    return clientId;
  },
});

/**
 * Delete a client
 */
export const deleteClient = mutation({
  args: {
    id: v.id("clients"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const client = await ctx.db.get(args.id);
    if (!client) {
      throw new Error("Client not found");
    }

    // Delete all client-related records
    // 1. Get all client automations
    const clientAutomations = await ctx.db
      .query("clientAutomations")
      .withIndex("by_client", (q) => q.eq("clientId", args.id))
      .collect();

    // 2. Delete client automations
    for (const ca of clientAutomations) {
      await ctx.db.delete(ca._id);
    }

    // 3. Delete client credit transactions
    const clientCredits = await ctx.db
      .query("clientCredits")
      .withIndex("by_client", (q) => q.eq("clientId", args.id))
      .collect();

    for (const cc of clientCredits) {
      await ctx.db.delete(cc._id);
    }

    // 4. Delete client executions
    const clientExecutions = await ctx.db
      .query("clientExecutions")
      .withIndex("by_client", (q) => q.eq("clientId", args.id))
      .collect();

    for (const ce of clientExecutions) {
      await ctx.db.delete(ce._id);
    }

    // 5. Finally delete the client
    await ctx.db.delete(args.id);

    return true;
  },
});

/**
 * Get automations assigned to a client
 */
export const getClientAutomations = query({
  args: {
    clientId: v.id("clients"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get client automation assignments
    const assignments = await ctx.db
      .query("clientAutomations")
      .withIndex("by_client", (q) => q.eq("clientId", args.clientId))
      .collect();

    // Get full automation details
    return await Promise.all(
      assignments.map(async (assignment) => {
        const automation = await ctx.db.get(assignment.automationId);
        
        if (!automation) {
          throw new Error(`Automation not found: ${assignment.automationId}`);
        }
        
        return {
          ...automation,
          isActive: assignment.isActive,
          creditsPerExecution: assignment.creditsPerExecution,
          assignedAt: assignment.assignedAt,
        };
      })
    );
  },
});

/**
 * Assign an automation to a client
 */
export const assignAutomation = mutation({
  args: {
    clientId: v.id("clients"),
    automationId: v.id("automations"),
    initialCredits: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Check if client exists
    const client = await ctx.db.get(args.clientId);
    if (!client) {
      throw new Error("Client not found");
    }

    // Check if automation exists
    const automation = await ctx.db.get(args.automationId);
    if (!automation) {
      throw new Error("Automation not found");
    }

    // Check if assignment already exists
    const existingAssignment = await ctx.db
      .query("clientAutomations")
      .withIndex("by_client_automation", (q) => 
        q.eq("clientId", args.clientId).eq("automationId", args.automationId)
      )
      .first();

    if (existingAssignment) {
      throw new Error("Automation already assigned to this client");
    }

    // Create assignment
    const assignmentId = await ctx.db.insert("clientAutomations", {
      clientId: args.clientId,
      automationId: args.automationId,
      isActive: false, // Default to inactive
      creditsPerExecution: automation.creditsPerExecution,
      assignedAt: Date.now(),
      assignedBy: identity.tokenIdentifier,
    });

    // Add initial credits
    if (args.initialCredits > 0) {
      await ctx.db.insert("clientCredits", {
        clientId: args.clientId,
        amount: args.initialCredits,
        transactionType: TRANSACTION_TYPES.PURCHASE,
        notes: "Initial credits allocation",
        createdAt: Date.now(),
        createdBy: identity.tokenIdentifier,
      });
    }

    return assignmentId;
  },
});

/**
 * Toggle a client's automation on/off
 */
export const toggleClientAutomation = mutation({
  args: {
    clientId: v.id("clients"),
    automationId: v.id("automations"),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Find the assignment
    const assignment = await ctx.db
      .query("clientAutomations")
      .withIndex("by_client_automation", (q) => 
        q.eq("clientId", args.clientId).eq("automationId", args.automationId)
      )
      .first();

    if (!assignment) {
      throw new Error("Automation not assigned to this client");
    }

    // Get the automation to check ownership
    const automation = await ctx.db.get(args.automationId);
    if (!automation) {
      throw new Error("Automation not found");
    }

    // For keyholders (admins) who own the automation, bypass credit check
    // Credit check is only needed for clients or users who aren't owners
    const isKeyholderOwner = automation.userId === identity.tokenIdentifier;
    
    // If activating and not a keyholder owner, check if client has enough credits
    if (args.isActive && !assignment.isActive && !isKeyholderOwner) {
      // Calculate available credits
      const creditTransactions = await ctx.db
        .query("clientCredits")
        .withIndex("by_client", (q) => q.eq("clientId", args.clientId))
        .collect();

      const creditBalance = creditTransactions.reduce(
        (total, tx) => total + tx.amount,
        0
      );

      if (creditBalance < assignment.creditsPerExecution) {
        throw new Error("Insufficient credits to activate this automation");
      }
    }

    // Update the assignment
    await ctx.db.patch(assignment._id, {
      isActive: args.isActive,
    });

    return true;
  },
});

/**
 * Record a client automation execution
 */
export const recordClientExecution = mutation({
  args: {
    clientId: v.id("clients"),
    automationId: v.id("automations"),
    n8nExecutionId: v.string(),
    status: v.string(),
    startedAt: v.number(),
    finishedAt: v.optional(v.number()),
    result: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    // Find the client automation assignment
    const assignment = await ctx.db
      .query("clientAutomations")
      .withIndex("by_client_automation", (q) => 
        q.eq("clientId", args.clientId).eq("automationId", args.automationId)
      )
      .first();

    if (!assignment) {
      throw new Error("Automation not assigned to this client");
    }

    // Create the execution record
    const executionId = await ctx.db.insert("clientExecutions", {
      clientId: args.clientId,
      automationId: args.automationId,
      n8nExecutionId: args.n8nExecutionId,
      status: args.status as any, // Type cast to match schema validator
      creditsUsed: args.status === "success" ? assignment.creditsPerExecution : 0,
      startedAt: args.startedAt,
      finishedAt: args.finishedAt,
      result: args.result,
      createdAt: Date.now(),
    });

    // Deduct credits if execution was successful
    if (args.status === "success") {
      await ctx.db.insert("clientCredits", {
        clientId: args.clientId,
        amount: -assignment.creditsPerExecution,
        transactionType: TRANSACTION_TYPES.USAGE,
        automationId: args.automationId,
        notes: `Execution of automation: ${args.n8nExecutionId}`,
        createdAt: Date.now(),
        createdBy: "system",
      });
    }

    return executionId;
  },
});

/**
 * Get client execution history
 */
export const getClientExecutions = query({
  args: {
    clientId: v.id("clients"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // First construct the query
    const query = ctx.db
      .query("clientExecutions")
      .withIndex("by_client", (q) => q.eq("clientId", args.clientId))
      .order("desc");
    
    // Apply limit and execute the query
    const executions = await (args.limit 
      ? query.take(args.limit) 
      : query.take(100));
    
    // Return the results directly
    return executions;
  },
});

/**
 * Get a specific client automation assignment
 */
export const getClientAutomationAssignment = query({
  args: {
    clientId: v.string(),
    automationId: v.string(),
  },
  handler: async (ctx, args) => {
    // Find the assignment
    const assignment = await ctx.db
      .query("clientAutomations")
      .withIndex("by_client_automation", (q) => 
        q.eq("clientId", args.clientId as any).eq("automationId", args.automationId as any)
      )
      .first();

    if (!assignment) {
      return null;
    }

    // Get the automation
    const automation = await ctx.db.get(assignment.automationId);
    if (!automation) {
      return null;
    }

    return {
      ...assignment,
      automationName: automation.name,
    };
  },
}); 
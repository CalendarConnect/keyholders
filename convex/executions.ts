import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { EXECUTION_STATUS } from "./schema";
import { getUserByTokenIdentifier } from "./users";
import { useCredits } from "./credits";

// Record the start of an execution
export const recordExecutionStart = mutation({
  args: {
    automationId: v.id("automations"),
    n8nExecutionId: v.string(),
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

    // Create a new execution record
    const executionId = await ctx.db.insert("executions", {
      automationId: args.automationId,
      userId: user.tokenIdentifier,
      n8nExecutionId: args.n8nExecutionId,
      status: EXECUTION_STATUS.RUNNING,
      startedAt: Date.now(),
      createdAt: Date.now(),
    });

    return executionId;
  },
});

// Update the status of an execution (complete or failed)
export const updateExecutionStatus = mutation({
  args: {
    executionId: v.id("executions"),
    status: v.union(v.literal(EXECUTION_STATUS.SUCCESS), v.literal(EXECUTION_STATUS.FAILED)),
    result: v.optional(v.any()),
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

    // Get the execution
    const execution = await ctx.db.get(args.executionId);
    if (!execution) {
      throw new Error("Execution not found");
    }

    // Verify the user owns this execution
    if (execution.userId !== user.tokenIdentifier) {
      throw new Error("Unauthorized");
    }

    // Update the execution status
    await ctx.db.patch(args.executionId, {
      status: args.status,
      finishedAt: Date.now(),
      result: args.result,
    });

    // If execution is successful, deduct credits
    if (args.status === EXECUTION_STATUS.SUCCESS) {
      // Get the automation to determine credit cost
      const automation = await ctx.db.get(execution.automationId);
      if (!automation) {
        throw new Error("Automation not found");
      }

      // Only deduct credits if execution succeeded
      const creditAmount = automation.creditsPerExecution;
      const updatedExecution = await ctx.db.patch(args.executionId, {
        creditsUsed: creditAmount,
      });

      // Deduct credits from user's balance (will be a separate Convex function call in production)
      // In a real implementation, this would be the correct code:
      // await ctx.runMutation(api.credits.useCredits, {
      //   amount: creditAmount,
      //   automationId: execution.automationId,
      //   executionId: args.executionId,
      //   notes: `Execution of ${automation.name}`,
      // });
      
      // Since we can't reference the api object here directly, we're providing a simplified version
      await ctx.db.insert("credits", {
        userId: user.tokenIdentifier,
        amount: -Math.abs(creditAmount), // Negative amount for using credits
        transactionType: "usage",
        notes: `Execution of automation: ${execution.automationId}`,
        createdAt: Date.now(),
      });
    }

    return { success: true };
  },
});

// Get recent executions for the current user
export const getRecentExecutions = query({
  args: {
    limit: v.optional(v.number()),
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

    // Get recent executions for the user, ordered by start time (descending)
    const executions = await ctx.db
      .query("executions")
      .withIndex("by_user", (q) => q.eq("userId", user.tokenIdentifier))
      .order("desc")
      .take(args.limit || 10);

    return executions;
  },
}); 
import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { TRANSACTION_TYPES } from "./schema";
import { getUserByTokenIdentifier } from "./users";

// Get the current credit balance for a user
export const getCreditBalance = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await getUserByTokenIdentifier(ctx, identity.subject);
    if (!user) {
      throw new Error("User not found");
    }

    // Calculate balance by summing all credit transactions
    const creditTransactions = await ctx.db
      .query("credits")
      .withIndex("by_user", (q) => q.eq("userId", user.tokenIdentifier))
      .collect();

    // Sum up all transactions (positive for purchases, negative for usage)
    const balance = creditTransactions.reduce((sum, transaction) => {
      return sum + transaction.amount;
    }, 0);

    return balance;
  },
});

// Add credits to a user's account (typically after purchase)
export const addCredits = mutation({
  args: {
    amount: v.number(),
    transactionId: v.optional(v.string()),
    notes: v.optional(v.string()),
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

    // Add a credit transaction record
    const transactionId = await ctx.db.insert("credits", {
      userId: user.tokenIdentifier,
      amount: args.amount, // Positive amount for adding credits
      transactionType: TRANSACTION_TYPES.PURCHASE,
      transactionId: args.transactionId,
      notes: args.notes || "Credit purchase",
      createdAt: Date.now(),
    });

    return transactionId;
  },
});

// Use credits (deduct from user's balance)
export const useCredits = mutation({
  args: {
    amount: v.number(),
    automationId: v.id("automations"),
    executionId: v.id("executions"),
    notes: v.optional(v.string()),
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

    // Check if user has enough credits
    const balance = await ctx.db
      .query("credits")
      .withIndex("by_user", (q) => q.eq("userId", user.tokenIdentifier))
      .collect()
      .then(transactions => 
        transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
      );

    if (balance < args.amount) {
      throw new Error("Insufficient credits");
    }

    // Add a negative credit transaction record
    const transactionId = await ctx.db.insert("credits", {
      userId: user.tokenIdentifier,
      amount: -Math.abs(args.amount), // Negative amount for using credits
      transactionType: TRANSACTION_TYPES.USAGE,
      notes: args.notes || `Used for execution ${args.executionId}`,
      createdAt: Date.now(),
    });

    return transactionId;
  },
});

// Get credit transaction history
export const getCreditHistory = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await getUserByTokenIdentifier(ctx, identity.subject);
    if (!user) {
      throw new Error("User not found");
    }

    // Get all credit transactions for the user, ordered by creation time (descending)
    const transactions = await ctx.db
      .query("credits")
      .withIndex("by_user", (q) => q.eq("userId", user.tokenIdentifier))
      .order("desc")
      .collect();

    return transactions;
  },
});

// Check if a user has enough credits for an operation
export const hasEnoughCredits = query({
  args: {
    requiredAmount: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return false;
    }

    const user = await getUserByTokenIdentifier(ctx, identity.subject);
    if (!user) {
      return false;
    }

    // Calculate balance
    const balance = await ctx.db
      .query("credits")
      .withIndex("by_user", (q) => q.eq("userId", user.tokenIdentifier))
      .collect()
      .then(transactions => 
        transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
      );

    return balance >= args.requiredAmount;
  },
});

// Add 500 free credits (Enterprise Package) for development purposes
export const addFreeEnterpriseCredits = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await getUserByTokenIdentifier(ctx, identity.subject);
    if (!user) {
      throw new Error("User not found");
    }

    // Add a credit transaction record for 500 free credits
    const transactionId = await ctx.db.insert("credits", {
      userId: user.tokenIdentifier,
      amount: 500, // Enterprise package credits
      transactionType: TRANSACTION_TYPES.PURCHASE,
      transactionId: `free-dev-${Date.now()}`,
      notes: "Free Enterprise credits for development",
      createdAt: Date.now(),
    });

    return { 
      success: true,
      transactionId,
      message: "Added 500 free Enterprise-level credits to your account"
    };
  },
}); 
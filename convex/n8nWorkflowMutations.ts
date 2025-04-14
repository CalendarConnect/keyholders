import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Save a generated workflow (client-facing mutation version)
export const saveWorkflow = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    clientId: v.id("clients"),
    workflowJson: v.string(),
  },
  handler: async (ctx, args) => {
    // Get user identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    // Save the workflow directly
    const workflowId = await ctx.db.insert("n8nWorkflows", {
      title: args.title,
      description: args.description,
      clientId: args.clientId,
      createdBy: identity.tokenIdentifier,
      workflowJson: args.workflowJson,
      createdAt: Date.now(),
    });

    return { workflowId };
  },
}); 
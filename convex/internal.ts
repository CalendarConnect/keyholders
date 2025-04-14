import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Internal helper function to get all n8nWorkflows
export const getAllN8nWorkflows = query({
  handler: async (ctx) => {
    // Get all workflows
    const workflows = await ctx.db
      .query("n8nWorkflows")
      .order("desc")
      .collect();
    
    return workflows;
  },
});

// Internal helper function to get a specific n8nWorkflow by ID
export const getN8nWorkflowById = query({
  args: { id: v.id("n8nWorkflows") },
  handler: async (ctx, args) => {
    // Get the workflow
    const workflow = await ctx.db.get(args.id);
    return workflow;
  },
});

// Internal helper function to insert a n8nWorkflow
export const insertN8nWorkflow = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    clientId: v.id("clients"),
    createdBy: v.string(),
    workflowJson: v.string(),
  },
  handler: async (ctx, args) => {
    // Save the workflow
    const workflowId = await ctx.db.insert("n8nWorkflows", {
      title: args.title,
      description: args.description,
      clientId: args.clientId,
      createdBy: args.createdBy,
      workflowJson: args.workflowJson,
      createdAt: Date.now(),
    });

    return { workflowId };
  },
}); 
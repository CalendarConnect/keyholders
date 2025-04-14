import { query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Define types for better type safety
interface N8nWorkflow {
  _id: Id<"n8nWorkflows">;
  _creationTime: number;
  title: string;
  description: string;
  clientId: Id<"clients">;
  createdBy: string; // User's tokenIdentifier
  workflowJson: string;
  createdAt: number;
}

interface Client {
  _id: Id<"clients">;
  name: string;
  [key: string]: any;
}

interface User {
  _id: Id<"users">;
  name: string;
  [key: string]: any;
}

// Get all saved workflows - Query version for client components
export const getSavedWorkflows = query({
  handler: async (ctx): Promise<any[]> => {
    // Get user identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    // Get all workflows
    const workflows = await ctx.db
      .query("n8nWorkflows")
      .order("desc")
      .collect();

    // For each workflow, get client details
    const workflowsWithDetails = await Promise.all(
      workflows.map(async (workflow) => {
        const client = await ctx.db
          .get(workflow.clientId as Id<"clients">);
        
        return {
          ...workflow,
          clientName: client?.name || "Unknown Client",
        };
      })
    );

    return workflowsWithDetails;
  },
});

// Get a specific workflow by ID - Query version
export const getWorkflowById = query({
  args: { id: v.string() },
  handler: async (ctx, args): Promise<any> => {
    // Get user identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    try {
      // Parse the string ID into a proper Convex ID
      const workflowId = args.id as Id<"n8nWorkflows">;
      
      // Get the workflow
      const workflow = await ctx.db.get(workflowId) as N8nWorkflow | null;
      if (!workflow) {
        throw new Error("Workflow not found");
      }

      // Get client details
      const client = await ctx.db.get(workflow.clientId) as Client | null;

      // Get creator details
      const creator = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", workflow.createdBy))
        .first() as User | null;

      return {
        ...workflow,
        clientName: client?.name || "Unknown Client",
        creatorName: creator?.name || "Unknown User",
      };
    } catch (error) {
      console.error("Error getting workflow:", error);
      throw new Error("Failed to retrieve workflow");
    }
  },
}); 
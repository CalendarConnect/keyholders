import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Submit a job application
 */
export const submitApplication = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.string(),
    message: v.string(),
    cvName: v.string(),
    applicationDate: v.string()
  },
  handler: async (ctx, args) => {
    const applicationId = await ctx.db.insert("applications", {
      name: args.name,
      email: args.email,
      role: args.role,
      message: args.message,
      cvName: args.cvName,
      applicationDate: args.applicationDate,
      status: "new",
      createdAt: Date.now()
    });
    
    return applicationId;
  }
});

/**
 * Get all applications (admin only)
 */
export const getApplications = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    // In a real app, we would check if the user is an admin
    
    const applications = await ctx.db
      .query("applications")
      .order("desc")
      .collect();
    
    return applications;
  }
});

/**
 * Update application status (admin only)
 */
export const updateApplicationStatus = mutation({
  args: {
    id: v.id("applications"),
    status: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    // In a real app, we would check if the user is an admin
    
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now()
    });
    
    return { success: true };
  }
}); 
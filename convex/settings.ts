import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByTokenIdentifier } from "./users";
import { Id } from "./_generated/dataModel";

// Save Claude API key
export const saveClaudeApiKey = mutation({
  args: { apiKey: v.string() },
  handler: async (ctx, args) => {
    // Get user identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    // Check if settings already exist
    const settings = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "claude_api_key"))
      .unique();

    if (settings) {
      // Update existing settings
      await ctx.db.patch(settings._id, {
        value: args.apiKey,
        updatedAt: Date.now(),
        updatedBy: identity.tokenIdentifier,
      });
    } else {
      // Create new settings
      await ctx.db.insert("settings", {
        key: "claude_api_key",
        value: args.apiKey,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: identity.tokenIdentifier,
        updatedBy: identity.tokenIdentifier,
      });
    }

    return { success: true };
  },
});

// Get Claude API key
export const getClaudeApiKey = query({
  handler: async (ctx) => {
    const settings = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "claude_api_key"))
      .unique();

    if (!settings) {
      return { apiKey: null };
    }

    return { apiKey: settings.value };
  },
});

// Save OpenAI API key
export const saveOpenAIApiKey = mutation({
  args: { apiKey: v.string() },
  handler: async (ctx, args) => {
    // Get user identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    // Check if settings already exist
    const settings = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "openai_api_key"))
      .unique();

    if (settings) {
      // Update existing settings
      await ctx.db.patch(settings._id, {
        value: args.apiKey,
        updatedAt: Date.now(),
        updatedBy: identity.tokenIdentifier,
      });
    } else {
      // Create new settings
      await ctx.db.insert("settings", {
        key: "openai_api_key",
        value: args.apiKey,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: identity.tokenIdentifier,
        updatedBy: identity.tokenIdentifier,
      });
    }

    return { success: true };
  },
});

// Get OpenAI API key
export const getOpenAIApiKey = query({
  handler: async (ctx) => {
    const settings = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "openai_api_key"))
      .unique();

    if (!settings) {
      return { apiKey: null };
    }

    return { apiKey: settings.value };
  },
}); 
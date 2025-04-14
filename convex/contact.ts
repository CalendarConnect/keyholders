import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { contactSourceValidator } from "./schema";

export const submitContactForm = mutation({
  args: {
    name: v.string(),
    surname: v.string(),
    email: v.string(),
    country: v.string(),
    topic: v.string(),
    subject: v.string(),
    description: v.string(),
    source: contactSourceValidator,
  },
  handler: async (ctx, args) => {
    const contactId = await ctx.db.insert("contactSubmissions", {
      ...args,
      createdAt: Date.now(),
      status: "new",
    });

    return contactId;
  },
}); 
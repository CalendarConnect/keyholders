import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

/**
 * Get all messages for the current user's inbox
 */
export const getInboxMessages = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.tokenIdentifier;
    
    // Get all messages from different conversations, grouped by chatId
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // Group messages by chatId to get the latest message from each conversation
    const threadMap = new Map<string, typeof messages[0]>();
    
    for (const message of messages) {
      const chatId = message.chatId || message._id;
      
      // If we haven't seen this chat before, or this message is newer than the one we have
      if (!threadMap.has(chatId) || 
          new Date(message.timestamp) > new Date(threadMap.get(chatId)!.timestamp)) {
        threadMap.set(chatId, message);
      }
    }
    
    // Convert to array of latest messages
    const inboxMessages = Array.from(threadMap.values());
    
    // Get person details for each message
    const messagesWithPersonDetails = await Promise.all(
      inboxMessages.map(async (message) => {
        let personDetails = null;
        
        if (message.personId) {
          personDetails = await ctx.db.get(message.personId);
        }
        
        return {
          id: message._id,
          chatId: message.chatId || message._id,
          content: message.content,
          isFromMe: message.isFromMe,
          lastUpdated: message.timestamp,
          author: personDetails ? 
            `${personDetails.firstName || ''} ${personDetails.lastName || ''}`.trim() : 
            "Unknown",
          avatar: personDetails?.avatar || null,
          category: message.category || null,
        };
      })
    );
    
    // Sort by date, newest first
    return messagesWithPersonDetails.sort(
      (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
  },
});

/**
 * Get a thread by its ID
 */
export const getThreadById = query({
  args: { threadId: v.string() },
  handler: async (ctx, { threadId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.tokenIdentifier;
    
    // First try looking up messages by chatId
    let messages = await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", threadId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
    
    // If no messages found, this could be a message ID, so try to fetch that message
    if (messages.length === 0) {
      const message = await ctx.db
        .query("messages")
        .filter((q) => 
          q.and(
            q.eq(q.field("userId"), userId),
            q.or(
              q.eq(q.field("messageId"), threadId),
              q.eq(q.field("_id"), threadId)
            )
          )
        )
        .first();
      
      if (message) {
        messages = [message];
      }
    }
    
    // Format the messages
    const formattedMessages = await Promise.all(
      messages.map(async (message) => {
        let personDetails = null;
        
        if (message.personId) {
          personDetails = await ctx.db.get(message.personId);
        }
        
        return {
          id: message._id,
          content: message.content,
          isFromMe: message.isFromMe.toString(),
          lastUpdated: message.timestamp,
          linkedinProfileURL: personDetails?.linkedinUrl || "",
          recipientLinkedInFollowerCount: personDetails?.followers?.toString() || "0",
          recipientName: personDetails ? 
            `${personDetails.firstName || ''} ${personDetails.lastName || ''}`.trim() : 
            "Unknown",
          avatar: personDetails?.avatar || undefined,
          chatId: message.chatId || undefined,
        };
      })
    );
    
    // Sort by timestamp, oldest first
    return formattedMessages.sort(
      (a, b) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
    );
  },
});

/**
 * Get all text snippets for the current user
 */
export const getTextSnippets = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.tokenIdentifier;
    
    const snippets = await ctx.db
      .query("textSnippets")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    
    return snippets.map((snippet) => ({
      id: snippet._id,
      name: snippet.name,
      value: snippet.value,
    }));
  },
});

/**
 * Add a new message
 */
export const addMessage = mutation({
  args: {
    content: v.string(),
    threadId: v.optional(v.string()),
    chatId: v.optional(v.string()),
    recipientName: v.optional(v.string()),
    linkedinProfileURL: v.optional(v.string()),
    isFromMe: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.tokenIdentifier;
    const now = new Date().toISOString();
    
    // If we have a linkedinProfileURL, see if we already have this person
    let personId: Id<"people"> | undefined = undefined;
    
    if (args.linkedinProfileURL) {
      const existingPerson = await ctx.db
        .query("people")
        .withIndex("by_linkedin_url", (q) => q.eq("linkedinUrl", args.linkedinProfileURL))
        .filter((q) => q.eq(q.field("userId"), userId))
        .first();
      
      if (existingPerson) {
        personId = existingPerson._id;
      } else if (args.recipientName) {
        // Create a new person record
        const names = args.recipientName.split(' ');
        const firstName = names[0] || '';
        const lastName = names.slice(1).join(' ') || '';
        
        personId = await ctx.db.insert("people", {
          firstName,
          lastName,
          linkedinUrl: args.linkedinProfileURL,
          avatar: undefined,
          followers: 0,
          userId,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }
    }
    
    // Create the message
    const messageId = await ctx.db.insert("messages", {
      content: args.content,
      chatId: args.chatId,
      messageId: args.threadId,
      timestamp: now,
      isFromMe: args.isFromMe,
      category: undefined,
      personId,
      userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    return { id: messageId };
  },
});

/**
 * Add a new text snippet
 */
export const addTextSnippet = mutation({
  args: {
    name: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.tokenIdentifier;
    
    const snippetId = await ctx.db.insert("textSnippets", {
      name: args.name,
      value: args.value,
      userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    return { id: snippetId };
  },
});

/**
 * Delete a text snippet
 */
export const deleteTextSnippet = mutation({
  args: {
    id: v.id("textSnippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.tokenIdentifier;
    
    const snippet = await ctx.db.get(args.id);
    if (!snippet || snippet.userId !== userId) {
      throw new Error("Snippet not found or you don't have permission to delete it");
    }
    
    await ctx.db.delete(args.id);
    
    return { success: true };
  },
});

/**
 * Webhook handler for n8n to save messages
 */
export const saveWebhookMessage = mutation({
  args: {
    content: v.string(),
    chatId: v.optional(v.string()),
    messageId: v.optional(v.string()),
    recipientName: v.optional(v.string()),
    linkedinProfileURL: v.optional(v.string()),
    recipientLinkedInFollowerCount: v.optional(v.string()),
    timestamp: v.optional(v.string()),
    isFromMe: v.optional(v.boolean()),
    userId: v.string(), // ID of the user to assign this message to
  },
  handler: async (ctx, args) => {
    // Check if user exists
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", args.userId))
      .first();
    
    if (!user) {
      throw new Error("User not found");
    }
    
    const now = args.timestamp || new Date().toISOString();
    
    // If we have a linkedinProfileURL, see if we already have this person
    let personId: Id<"people"> | undefined = undefined;
    
    if (args.linkedinProfileURL) {
      const existingPerson = await ctx.db
        .query("people")
        .withIndex("by_linkedin_url", (q) => q.eq("linkedinUrl", args.linkedinProfileURL))
        .filter((q) => q.eq(q.field("userId"), args.userId))
        .first();
      
      if (existingPerson) {
        personId = existingPerson._id;
        
        // Update follower count if provided
        if (args.recipientLinkedInFollowerCount) {
          await ctx.db.patch(existingPerson._id, {
            followers: parseInt(args.recipientLinkedInFollowerCount, 10) || existingPerson.followers,
            updatedAt: Date.now(),
          });
        }
      } else if (args.recipientName) {
        // Create a new person record
        const names = args.recipientName.split(' ');
        const firstName = names[0] || '';
        const lastName = names.slice(1).join(' ') || '';
        
        personId = await ctx.db.insert("people", {
          firstName,
          lastName,
          linkedinUrl: args.linkedinProfileURL,
          avatar: undefined,
          followers: args.recipientLinkedInFollowerCount ? 
            parseInt(args.recipientLinkedInFollowerCount, 10) : 0,
          userId: args.userId,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }
    }
    
    // Create the message
    const messageId = await ctx.db.insert("messages", {
      content: args.content,
      chatId: args.chatId,
      messageId: args.messageId,
      timestamp: now,
      isFromMe: args.isFromMe !== undefined ? args.isFromMe : false,
      category: undefined,
      personId,
      userId: args.userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    return { id: messageId };
  },
}); 
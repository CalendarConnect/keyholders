import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { TEMPLATE_CATEGORIES, TEMPLATE_PLAN_TIERS, TemplateCategory, TemplatePlanTier } from "./schema";

/**
 * Get all templates with optional category filter
 */
export const list = query({
  args: {
    category: v.optional(v.union(
      v.literal(TEMPLATE_CATEGORIES.EMAIL_MARKETING),
      v.literal(TEMPLATE_CATEGORIES.LEAD_GENERATION),
      v.literal(TEMPLATE_CATEGORIES.SOCIAL_MEDIA),
      v.literal(TEMPLATE_CATEGORIES.DATA_AUTOMATION),
      v.literal(TEMPLATE_CATEGORIES.CRM_INTEGRATION),
      v.literal(TEMPLATE_CATEGORIES.CUSTOMER_SUPPORT),
      v.literal(TEMPLATE_CATEGORIES.E_COMMERCE),
      v.literal(TEMPLATE_CATEGORIES.PROJECT_MANAGEMENT),
      v.literal(TEMPLATE_CATEGORIES.RECRUITMENT),
      v.literal(TEMPLATE_CATEGORIES.ANALYTICS),
      v.literal(TEMPLATE_CATEGORIES.CONTENT_MARKETING),
      v.literal(TEMPLATE_CATEGORIES.FINANCE),
      v.literal(TEMPLATE_CATEGORIES.SALES),
      v.literal(TEMPLATE_CATEGORIES.OPERATIONS),
    )),
  },
  handler: async (ctx, args) => {
    if (args.category) {
      return ctx.db
        .query("templates")
        .withIndex("by_category", (q) => q.eq("category", args.category as TemplateCategory))
        .order("desc")
        .collect();
    }

    return ctx.db
      .query("templates")
      .order("desc")
      .collect();
  },
});

/**
 * Get a single template by slug
 */
export const getBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const templates = await ctx.db
      .query("templates")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .collect();

    if (templates.length === 0) {
      return null;
    }

    return templates[0];
  },
});

/**
 * Get categories with template counts
 */
export const getCategories = query({
  handler: async (ctx) => {
    const templates = await ctx.db.query("templates").collect();
    
    // Create a map of categories with counts
    const categoryCounts: Record<TemplateCategory, number> = Object.keys(TEMPLATE_CATEGORIES).reduce((acc, key) => {
      const category = TEMPLATE_CATEGORIES[key as keyof typeof TEMPLATE_CATEGORIES];
      acc[category] = 0;
      return acc;
    }, {} as Record<TemplateCategory, number>);

    // Count templates in each category
    templates.forEach(template => {
      categoryCounts[template.category]++;
    });

    return Object.entries(categoryCounts).map(([category, count]) => ({
      id: category,
      label: formatCategoryName(category),
      count,
    }));
  },
});

/**
 * Create a new template (admin only)
 */
export const create = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    category: v.union(
      v.literal(TEMPLATE_CATEGORIES.EMAIL_MARKETING),
      v.literal(TEMPLATE_CATEGORIES.LEAD_GENERATION),
      v.literal(TEMPLATE_CATEGORIES.SOCIAL_MEDIA),
      v.literal(TEMPLATE_CATEGORIES.DATA_AUTOMATION),
      v.literal(TEMPLATE_CATEGORIES.CRM_INTEGRATION),
      v.literal(TEMPLATE_CATEGORIES.CUSTOMER_SUPPORT),
      v.literal(TEMPLATE_CATEGORIES.E_COMMERCE),
      v.literal(TEMPLATE_CATEGORIES.PROJECT_MANAGEMENT),
      v.literal(TEMPLATE_CATEGORIES.RECRUITMENT),
      v.literal(TEMPLATE_CATEGORIES.ANALYTICS),
      v.literal(TEMPLATE_CATEGORIES.CONTENT_MARKETING),
      v.literal(TEMPLATE_CATEGORIES.FINANCE),
      v.literal(TEMPLATE_CATEGORIES.SALES),
      v.literal(TEMPLATE_CATEGORIES.OPERATIONS),
    ),
    author: v.union(v.literal("christian"), v.literal("renier")),
    heroUrl: v.string(),
    icons: v.array(v.string()),
    sticker: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    descriptionBlocks: v.object({
      whoFor: v.string(),
      problem: v.string(),
      whatItDoes: v.string(),
      setup: v.string(),
      customise: v.string(),
    }),
    pricing: v.array(v.object({
      tier: v.union(
        v.literal(TEMPLATE_PLAN_TIERS.DIY),
        v.literal(TEMPLATE_PLAN_TIERS.INTEGRATION),
        v.literal(TEMPLATE_PLAN_TIERS.CUSTOM),
        v.literal(TEMPLATE_PLAN_TIERS.GIVEAWAY),
      ),
      label: v.string(),
      tagline: v.optional(v.string()),
      priceMode: v.union(v.literal("fixed"), v.literal("text")),
      priceCents: v.optional(v.number()),
      priceText: v.optional(v.string()),
      ctaLabel: v.string(),
      ctaType: v.literal("link"),
      ctaValue: v.string(),
      bullets: v.array(v.string()),
      footer: v.optional(v.string()),
      highlight: v.boolean(),
    })),
  },
  handler: async (ctx, args) => {
    // Check if admin - would be implemented with Clerk auth

    // Check for duplicate slug
    const existing = await ctx.db
      .query("templates")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      throw new Error(`Template with slug "${args.slug}" already exists`);
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const now = Date.now();
    return ctx.db.insert("templates", {
      ...args,
      lastUpdated: now,
      createdBy: identity.tokenIdentifier,
      createdAt: now,
      updatedAt: now,
    });
  },
});

/**
 * Update an existing template (admin only)
 */
export const update = mutation({
  args: {
    id: v.id("templates"),
    slug: v.string(),
    name: v.string(),
    category: v.union(
      v.literal(TEMPLATE_CATEGORIES.EMAIL_MARKETING),
      v.literal(TEMPLATE_CATEGORIES.LEAD_GENERATION),
      v.literal(TEMPLATE_CATEGORIES.SOCIAL_MEDIA),
      v.literal(TEMPLATE_CATEGORIES.DATA_AUTOMATION),
      v.literal(TEMPLATE_CATEGORIES.CRM_INTEGRATION),
      v.literal(TEMPLATE_CATEGORIES.CUSTOMER_SUPPORT),
      v.literal(TEMPLATE_CATEGORIES.E_COMMERCE),
      v.literal(TEMPLATE_CATEGORIES.PROJECT_MANAGEMENT),
      v.literal(TEMPLATE_CATEGORIES.RECRUITMENT),
      v.literal(TEMPLATE_CATEGORIES.ANALYTICS),
      v.literal(TEMPLATE_CATEGORIES.CONTENT_MARKETING),
      v.literal(TEMPLATE_CATEGORIES.FINANCE),
      v.literal(TEMPLATE_CATEGORIES.SALES),
      v.literal(TEMPLATE_CATEGORIES.OPERATIONS),
    ),
    author: v.union(v.literal("christian"), v.literal("renier")),
    heroUrl: v.string(),
    icons: v.array(v.string()),
    sticker: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    descriptionBlocks: v.object({
      whoFor: v.string(),
      problem: v.string(),
      whatItDoes: v.string(),
      setup: v.string(),
      customise: v.string(),
    }),
    pricing: v.array(v.object({
      tier: v.union(
        v.literal(TEMPLATE_PLAN_TIERS.DIY),
        v.literal(TEMPLATE_PLAN_TIERS.INTEGRATION),
        v.literal(TEMPLATE_PLAN_TIERS.CUSTOM),
        v.literal(TEMPLATE_PLAN_TIERS.GIVEAWAY),
      ),
      label: v.string(),
      tagline: v.optional(v.string()),
      priceMode: v.union(v.literal("fixed"), v.literal("text")),
      priceCents: v.optional(v.number()),
      priceText: v.optional(v.string()),
      ctaLabel: v.string(),
      ctaType: v.literal("link"),
      ctaValue: v.string(),
      bullets: v.array(v.string()),
      footer: v.optional(v.string()),
      highlight: v.boolean(),
    })),
  },
  handler: async (ctx, args) => {
    // Check if admin - would be implemented with Clerk auth
    
    const { id, ...data } = args;
    
    // Check template exists
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error("Template not found");
    }

    // Check for duplicate slug (if changed)
    if (existing.slug !== data.slug) {
      const duplicateSlug = await ctx.db
        .query("templates")
        .withIndex("by_slug", (q) => q.eq("slug", data.slug))
        .first();

      if (duplicateSlug) {
        throw new Error(`Template with slug "${data.slug}" already exists`);
      }
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    return ctx.db.patch(id, {
      ...data,
      lastUpdated: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

/**
 * Delete a template (admin only)
 */
export const remove = mutation({
  args: {
    id: v.id("templates"),
  },
  handler: async (ctx, args) => {
    // Check if admin - would be implemented with Clerk auth
    
    // Check template exists
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("Template not found");
    }

    return ctx.db.delete(args.id);
  },
});

// Order functions removed - using Polar.sh for payments now

/**
 * Get a single template by ID
 */
export const getById = query({
  args: {
    id: v.id("templates"),
  },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});

/**
 * Add a file to a template (admin only)
 */
export const addTemplateFile = mutation({
  args: {
    templateId: v.id("templates"),
    fileName: v.string(),
    fileUrl: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if admin - would be implemented with Clerk auth
    
    // Check template exists
    const existing = await ctx.db.get(args.templateId);
    if (!existing) {
      throw new Error("Template not found");
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    // Generate a unique file ID
    const fileId = `file_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    return ctx.db.insert("templateFiles", {
      templateId: args.templateId,
      fileId,
      fileName: args.fileName,
      fileUrl: args.fileUrl,
      fileType: args.fileType,
      fileSize: args.fileSize,
      createdAt: Date.now(),
    });
  },
});

/**
 * Remove a file from a template (admin only)
 */
export const removeTemplateFile = mutation({
  args: {
    fileId: v.id("templateFiles"),
  },
  handler: async (ctx, args) => {
    // Check if admin - would be implemented with Clerk auth
    
    // Check file exists
    const existing = await ctx.db.get(args.fileId);
    if (!existing) {
      throw new Error("File not found");
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    return ctx.db.delete(args.fileId);
  },
});

/**
 * Get files for a template
 */
export const getTemplateFiles = query({
  args: {
    templateId: v.id("templates"),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("templateFiles")
      .withIndex("by_template", q => q.eq("templateId", args.templateId))
      .collect();
  },
});

/**
 * Get files for a template by slug
 */
export const getTemplateFilesBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    // First get the template by slug
    const template = await ctx.db
      .query("templates")
      .withIndex("by_slug", q => q.eq("slug", args.slug))
      .first();
    
    if (!template) {
      return [];
    }
    
    // Then get all files for that template
    return ctx.db
      .query("templateFiles")
      .withIndex("by_template", q => q.eq("templateId", template._id))
      .collect();
  },
});

/**
 * Register a giveaway lead
 */
export const registerGiveawayLead = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    website: v.string(),
    email: v.string(),
    source: v.union(
      v.literal("linkedin-christian"),
      v.literal("linkedin-renier"),
      v.literal("linkedin-erik"),
      v.literal("linkedin-els"),
      v.literal("linkedin-general"),
      v.literal("friend-colleague"),
      v.literal("other"),
    ),
    templateSlug: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if template exists
    const template = await ctx.db
      .query("templates")
      .withIndex("by_slug", q => q.eq("slug", args.templateSlug))
      .first();
    
    if (!template) {
      throw new Error(`Template with slug "${args.templateSlug}" not found`);
    }
    
    // Get all files for this template to initialize download tracking
    const files = await ctx.db
      .query("templateFiles")
      .withIndex("by_template", q => q.eq("templateId", template._id))
      .collect();
    
    const filesDownloaded = files.map(file => ({
      fileId: file.fileId,
      fileName: file.fileName,
      isDownloaded: false,
    }));
    
    // Check if this email has already registered for this template
    const existingLead = await ctx.db
      .query("giveawayLeads")
      .withIndex("by_email", q => q.eq("email", args.email))
      .filter(q => q.eq(q.field("templateSlug"), args.templateSlug))
      .first();
    
    if (existingLead) {
      // Update the existing lead instead of creating a new one
      await ctx.db.patch(existingLead._id, {
        firstName: args.firstName,
        lastName: args.lastName,
        website: args.website,
        source: args.source,
        updatedAt: Date.now(),
      });
      
      // Return the existing lead ID to ensure consistent behavior
      return existingLead._id;
    }
    
    // Create new lead
    const now = Date.now();
    return ctx.db.insert("giveawayLeads", {
      ...args,
      filesDownloaded,
      createdAt: now,
      updatedAt: now,
    });
  },
});

/**
 * Mark a file as downloaded
 */
export const markFileDownloaded = mutation({
  args: {
    leadId: v.id("giveawayLeads"),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const lead = await ctx.db.get(args.leadId);
    
    if (!lead) {
      throw new Error("Lead not found");
    }
    
    // Update the specific file's download status
    const updatedFiles = lead.filesDownloaded.map((file: any) => {
      if (file.fileId === args.fileId) {
        return {
          ...file,
          isDownloaded: true,
          downloadedAt: Date.now(),
        };
      }
      return file;
    });
    
    return ctx.db.patch(args.leadId, {
      filesDownloaded: updatedFiles,
      updatedAt: Date.now(),
    });
  },
});

/**
 * Get lead information by email and template
 */
export const getLeadByEmailAndTemplate = query({
  args: {
    email: v.string(),
    templateSlug: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("giveawayLeads")
      .withIndex("by_email", q => q.eq("email", args.email))
      .filter(q => q.eq(q.field("templateSlug"), args.templateSlug))
      .first();
  },
});

/**
 * Get lead information by ID
 */
export const getLeadById = query({
  args: {
    id: v.id("giveawayLeads"),
  },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});

/**
 * Utility function to format category slug into readable name
 */
function formatCategoryName(category: string): string {
  return category
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
} 
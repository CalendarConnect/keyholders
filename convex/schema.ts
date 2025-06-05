import { defineSchema, defineTable } from "convex/server"
import { Infer, v } from "convex/values"

export const INTERVALS = {
    MONTH: "month",
    YEAR: "year",
} as const;

export const intervalValidator = v.union(
    v.literal(INTERVALS.MONTH),
    v.literal(INTERVALS.YEAR),
);

export type Interval = Infer<typeof intervalValidator>;

// Define a price object structure that matches your data
const priceValidator = v.object({
    amount: v.number(),
    polarId: v.string(),
});

// Define a prices object structure for a specific interval
const intervalPricesValidator = v.object({
    usd: priceValidator,
});

// Define transaction types for credits
export const TRANSACTION_TYPES = {
    PURCHASE: "purchase",
    USAGE: "usage",
    REFUND: "refund",
    ADJUSTMENT: "adjustment",
} as const;

export const transactionTypeValidator = v.union(
    v.literal(TRANSACTION_TYPES.PURCHASE),
    v.literal(TRANSACTION_TYPES.USAGE),
    v.literal(TRANSACTION_TYPES.REFUND),
    v.literal(TRANSACTION_TYPES.ADJUSTMENT),
);

export type TransactionType = Infer<typeof transactionTypeValidator>;

// Define execution status types
export const EXECUTION_STATUS = {
    RUNNING: "running",
    SUCCESS: "success",
    FAILED: "failed",
} as const;

export const executionStatusValidator = v.union(
    v.literal(EXECUTION_STATUS.RUNNING),
    v.literal(EXECUTION_STATUS.SUCCESS),
    v.literal(EXECUTION_STATUS.FAILED),
);

export type ExecutionStatus = Infer<typeof executionStatusValidator>;

export const CONTACT_SOURCES = {
    GOOGLE: "Google/Search Engine",
    SOCIAL_MEDIA: "Social Media (Facebook, Twitter, LinkedIn, etc.)",
    RECOMMENDATION: "Friend or Colleague Recommendation",
    ADVERTISEMENT: "Online Advertisement", 
    BLOG: "Blog or Article",
    NEWSLETTER: "Email Newsletter",
    CONFERENCE: "Conference or Event",
    DIRECTORY: "Industry Directory",
    OTHER: "Other",
} as const;

export const contactSourceValidator = v.union(
    v.literal(CONTACT_SOURCES.GOOGLE),
    v.literal(CONTACT_SOURCES.SOCIAL_MEDIA),
    v.literal(CONTACT_SOURCES.RECOMMENDATION),
    v.literal(CONTACT_SOURCES.ADVERTISEMENT),
    v.literal(CONTACT_SOURCES.BLOG),
    v.literal(CONTACT_SOURCES.NEWSLETTER),
    v.literal(CONTACT_SOURCES.CONFERENCE),
    v.literal(CONTACT_SOURCES.DIRECTORY),
    v.literal(CONTACT_SOURCES.OTHER),
);

export type ContactSource = Infer<typeof contactSourceValidator>;

// Define message categories for LinkedOut
export const MESSAGE_CATEGORIES = {
    LOVE_YOUR_CONTENT: "love-your-content",
    COLLAB_PROPOSAL: "collab-proposal",
} as const;

export const messageCategoryValidator = v.union(
    v.literal(MESSAGE_CATEGORIES.LOVE_YOUR_CONTENT),
    v.literal(MESSAGE_CATEGORIES.COLLAB_PROPOSAL),
);

export type MessageCategory = Infer<typeof messageCategoryValidator>;

export const TEMPLATE_CATEGORIES = {
    EMAIL_MARKETING: "email-marketing",
    LEAD_GENERATION: "lead-generation",
    SOCIAL_MEDIA: "social-media",
    DATA_AUTOMATION: "data-automation",
    CRM_INTEGRATION: "crm-integration",
    CUSTOMER_SUPPORT: "customer-support",
    E_COMMERCE: "e-commerce",
    PROJECT_MANAGEMENT: "project-management",
    RECRUITMENT: "recruitment",
    ANALYTICS: "analytics",
    CONTENT_MARKETING: "content-marketing",
    FINANCE: "finance",
    SALES: "sales",
    OPERATIONS: "operations",
} as const;

export const templateCategoryValidator = v.union(
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
);

export type TemplateCategory = Infer<typeof templateCategoryValidator>;

export const TEMPLATE_PLAN_TIERS = {
    DIY: "diy",
    INTEGRATION: "integration",
    CUSTOM: "custom",
    GIVEAWAY: "giveaway",
} as const;

export const templatePlanTierValidator = v.union(
    v.literal(TEMPLATE_PLAN_TIERS.DIY),
    v.literal(TEMPLATE_PLAN_TIERS.INTEGRATION),
    v.literal(TEMPLATE_PLAN_TIERS.CUSTOM),
    v.literal(TEMPLATE_PLAN_TIERS.GIVEAWAY),
);

export type TemplatePlanTier = Infer<typeof templatePlanTierValidator>;

// Define where the lead found out about Keyholders
export const LEAD_SOURCES = {
    LINKEDIN_CHRISTIAN: "linkedin-christian",
    LINKEDIN_RENIER: "linkedin-renier",
    LINKEDIN_ERIK: "linkedin-erik",
    LINKEDIN_ELS: "linkedin-els",
    LINKEDIN_GENERAL: "linkedin-general",
    FRIEND_COLLEAGUE: "friend-colleague",
    OTHER: "other",
} as const;

export const leadSourceValidator = v.union(
    v.literal(LEAD_SOURCES.LINKEDIN_CHRISTIAN),
    v.literal(LEAD_SOURCES.LINKEDIN_RENIER),
    v.literal(LEAD_SOURCES.LINKEDIN_ERIK),
    v.literal(LEAD_SOURCES.LINKEDIN_ELS), 
    v.literal(LEAD_SOURCES.LINKEDIN_GENERAL),
    v.literal(LEAD_SOURCES.FRIEND_COLLEAGUE),
    v.literal(LEAD_SOURCES.OTHER),
);

export type LeadSource = Infer<typeof leadSourceValidator>;

export default defineSchema({
    users: defineTable({
        createdAt: v.string(),
        email: v.string(),
        name: v.optional(v.string()),
        image: v.optional(v.string()),
        userId: v.string(),
        subscription: v.optional(v.string()),
        credits: v.optional(v.string()),
        tokenIdentifier: v.string(),
    }).index("by_token", ["tokenIdentifier"]),
    subscriptions: defineTable({
        userId: v.optional(v.string()),
        polarId: v.optional(v.string()),
        polarPriceId: v.optional(v.string()),
        currency: v.optional(v.string()),
        interval: v.optional(v.string()),
        status: v.optional(v.string()),
        currentPeriodStart: v.optional(v.number()),
        currentPeriodEnd: v.optional(v.number()),
        cancelAtPeriodEnd: v.optional(v.boolean()),
        amount: v.optional(v.number()),
        startedAt: v.optional(v.number()),
        endsAt: v.optional(v.number()),
        endedAt: v.optional(v.number()),
        canceledAt: v.optional(v.number()),
        customerCancellationReason: v.optional(v.string()),
        customerCancellationComment: v.optional(v.string()),
        metadata: v.optional(v.any()),
        customFieldData: v.optional(v.any()),
        customerId: v.optional(v.string()),
    })
        .index("userId", ["userId"])
        .index("polarId", ["polarId"]),
    webhookEvents: defineTable({
        type: v.string(),
        polarEventId: v.string(),
        createdAt: v.string(),
        modifiedAt: v.string(),
        data: v.any(),
    })
        .index("type", ["type"])
        .index("polarEventId", ["polarEventId"]),
    // New table for automations (webhook-based with legacy support)
    automations: defineTable({
        name: v.string(),
        description: v.string(),
        webhookUrl: v.optional(v.string()),  // Optional for legacy records
        n8nWorkflowId: v.optional(v.string()), // Legacy field
        authType: v.optional(v.union(
            v.literal("none"),
            v.literal("basic"),
            v.literal("jwt"),
            v.literal("header")
        )),
        authCredentials: v.optional(v.object({
            username: v.optional(v.string()),
            password: v.optional(v.string()),
            token: v.optional(v.string()),
        })),
        creditsPerExecution: v.number(),
        isActive: v.boolean(),
        userId: v.string(),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_user", ["userId"]),
    // New table for credit transactions
    credits: defineTable({
        userId: v.string(),
        amount: v.number(),
        transactionType: transactionTypeValidator,
        transactionId: v.optional(v.string()),
        notes: v.optional(v.string()),
        createdAt: v.number(),
    })
        .index("by_user", ["userId"])
        .index("by_transaction", ["transactionId"]),
    // New table for workflow executions
    executions: defineTable({
        automationId: v.id("automations"),
        userId: v.string(),
        n8nExecutionId: v.string(),
        status: executionStatusValidator,
        creditsUsed: v.optional(v.number()),
        startedAt: v.number(),
        finishedAt: v.optional(v.number()),
        result: v.optional(v.any()),
        createdAt: v.number(),
    })
        .index("by_user", ["userId"])
        .index("by_automation", ["automationId"])
        .index("by_n8n", ["n8nExecutionId"]),
    // New table for contact form submissions
    contactSubmissions: defineTable({
        name: v.string(),
        surname: v.string(),
        email: v.string(),
        country: v.string(),
        topic: v.string(),
        subject: v.string(),
        description: v.string(),
        source: contactSourceValidator,
        createdAt: v.number(),
        status: v.optional(v.string()),
    })
        .index("by_email", ["email"])
        .index("by_creation", ["createdAt"]),
    // Clients table
    clients: defineTable({
        name: v.string(),
        email: v.string(),
        createdAt: v.number(),
        updatedAt: v.optional(v.number()),
        creditBalance: v.optional(v.number()),
        createdBy: v.string(), // userId of the admin who created this client
    })
        .index("by_email", ["email"])
        .index("by_created", ["createdBy"]),
    
    // Client-Automation assignments
    clientAutomations: defineTable({
        clientId: v.id("clients"),
        automationId: v.id("automations"),
        isActive: v.boolean(),
        creditsPerExecution: v.number(), // May differ from original automation
        assignedAt: v.number(),
        assignedBy: v.string(), // userId of the admin who assigned it
    })
        .index("by_client", ["clientId"])
        .index("by_automation", ["automationId"])
        .index("by_client_automation", ["clientId", "automationId"]),
    
    // Client credits transactions
    clientCredits: defineTable({
        clientId: v.id("clients"),
        amount: v.number(),
        transactionType: transactionTypeValidator,
        automationId: v.optional(v.id("automations")),
        executionId: v.optional(v.id("executions")),
        notes: v.optional(v.string()),
        createdAt: v.number(),
        createdBy: v.string(), // userId who created this transaction
    })
        .index("by_client", ["clientId"])
        .index("by_automation", ["automationId"])
        .index("by_execution", ["executionId"]),
    
    // Client execution records
    clientExecutions: defineTable({
        clientId: v.id("clients"),
        automationId: v.id("automations"),
        n8nExecutionId: v.string(),
        status: executionStatusValidator,
        creditsUsed: v.number(),
        startedAt: v.number(),
        finishedAt: v.optional(v.number()),
        result: v.optional(v.any()),
        createdAt: v.number(),
    })
        .index("by_client", ["clientId"])
        .index("by_automation", ["automationId"])
        .index("by_client_automation", ["clientId", "automationId"])
        .index("by_n8n", ["n8nExecutionId"]),
    // Add this to the schema export
    settings: defineTable({
        key: v.string(),
        value: v.string(),
        createdAt: v.number(),
        updatedAt: v.number(),
        createdBy: v.string(),
        updatedBy: v.string(),
    })
        .index("by_key", ["key"]),
    // Add this to the schema export
    n8nWorkflows: defineTable({
        title: v.string(),
        description: v.string(),
        clientId: v.id("clients"),
        createdBy: v.string(), // User's tokenIdentifier
        workflowJson: v.string(),
        createdAt: v.number(),
    })
        .index("by_client", ["clientId"])
        .index("by_creator", ["createdBy"])
        .index("by_created_at", ["createdAt"]),
    // Add this to the schema
    applications: defineTable({
        name: v.string(),
        email: v.string(),
        role: v.string(),
        message: v.string(),
        cvName: v.string(),
        applicationDate: v.string(),
        status: v.string(),
        createdAt: v.number(),
        updatedAt: v.optional(v.number())
    }),

    // LinkedOut - People table
    people: defineTable({
        firstName: v.optional(v.string()),
        lastName: v.optional(v.string()),
        linkedinUrl: v.optional(v.string()),
        avatar: v.optional(v.string()),
        followers: v.optional(v.number()),
        userId: v.string(), // The Clerk user who owns this record
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_user", ["userId"])
        .index("by_linkedin_url", ["linkedinUrl"]),

    // LinkedOut - Messages table
    messages: defineTable({
        content: v.string(),
        chatId: v.optional(v.string()),
        messageId: v.optional(v.string()),
        timestamp: v.string(),
        isFromMe: v.boolean(),
        category: v.optional(messageCategoryValidator),
        personId: v.optional(v.id("people")),
        userId: v.string(), // The Clerk user who owns this record
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_user", ["userId"])
        .index("by_chat", ["chatId"])
        .index("by_person", ["personId"]),

    // LinkedOut - Text Snippets table
    textSnippets: defineTable({
        name: v.string(),
        value: v.string(),
        userId: v.string(), // The Clerk user who owns this record
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_user", ["userId"]),

    // Templates Marketplace
    templates: defineTable({
        slug: v.string(),
        name: v.string(),
        category: templateCategoryValidator,
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
            tier: templatePlanTierValidator,
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
        lastUpdated: v.number(),
        createdBy: v.string(),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_slug", ["slug"])
        .index("by_category", ["category"])
        .index("by_created", ["createdAt"]),
    
    // orders table removed - using Polar.sh for payments now

    // Giveaway leads
    giveawayLeads: defineTable({
        firstName: v.string(),
        lastName: v.string(),
        website: v.string(),
        email: v.string(),
        source: leadSourceValidator,
        templateSlug: v.string(),
        filesDownloaded: v.array(v.object({
            fileId: v.string(),
            fileName: v.string(),
            isDownloaded: v.boolean(),
            downloadedAt: v.optional(v.number()),
        })),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_email", ["email"])
        .index("by_template", ["templateSlug"]),
    
    // Template giveaway files
    templateFiles: defineTable({
        templateId: v.id("templates"),
        fileId: v.string(), // Unique identifier for the file
        fileName: v.string(),
        fileUrl: v.string(),
        fileType: v.string(), // mime type
        fileSize: v.number(),
        createdAt: v.number(),
    })
        .index("by_template", ["templateId"]),
})
# n8n Implementation Guide for Keyholders Agency

This document provides technical implementation details for integrating n8n into our Keyholders Agency platform.

## Table of Contents

1. [Implementation Overview](#implementation-overview)
2. [File Structure](#file-structure)
3. [Environment Setup](#environment-setup)
4. [Client Library Implementation](#client-library-implementation)
5. [Webhook Handler Implementation](#webhook-handler-implementation)
6. [Convex Schema Implementation](#convex-schema-implementation)
7. [Frontend Components](#frontend-components)
8. [Integration Testing](#integration-testing)

## Implementation Overview

Our n8n integration consists of several core components:

1. **n8n Client Library**: Communicates with n8n REST API to manage workflows
2. **Webhook Handlers**: Process event notifications from n8n
3. **Convex Schema & Functions**: Store and manage automation data
4. **UI Components**: Allow users to view and manage automations

The implementation follows these principles:
- Typed interfaces for all API responses
- Error handling with meaningful error messages
- Clean separation of concerns
- Efficient database queries

## File Structure

```
/
├── app/
│   └── api/
│       └── n8n/
│           └── webhooks/
│               └── route.ts         # Webhook endpoint
├── components/
│   └── automations/
│       ├── automation-card.tsx      # Automation display card
│       ├── automation-detail.tsx    # Detailed view
│       ├── automation-list.tsx      # List of automations
│       └── execution-history.tsx    # Execution timeline
├── convex/
│   ├── automations.ts              # Automation functions
│   ├── credits.ts                  # Credit management
│   ├── executions.ts               # Execution tracking
│   └── schema.ts                   # Database schema
├── lib/
│   └── n8n/
│       ├── client.ts               # n8n API client
│       ├── types.ts                # TypeScript interfaces
│       └── webhooks.ts             # Webhook utilities
└── .env.local                       # Environment variables
```

## Environment Setup

### Required Environment Variables

Add these to your `.env.local` file:

```bash
# n8n Configuration
N8N_API_URL=http://localhost:5678/api/v1
N8N_API_KEY=your_n8n_api_key
N8N_WEBHOOK_SECRET=your_webhook_secret

# Existing variables from starter kit
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

## Client Library Implementation

Create the following files:

### 1. lib/n8n/types.ts

```typescript
// Types for n8n API responses

export interface N8nWorkflow {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  nodes: N8nNode[];
  connections: Record<string, any>;
}

export interface N8nNode {
  id: string;
  name: string;
  type: string;
  parameters: Record<string, any>;
  position: [number, number];
}

export interface N8nExecution {
  id: string;
  finished: boolean;
  mode: 'manual' | 'trigger';
  startedAt: string;
  stoppedAt?: string;
  status: 'success' | 'error' | 'running';
  workflowId: string;
  workflowName: string;
  data?: any;
}

export interface N8nWebhook {
  path: string;
  webhookId: string;
  method: string;
  workflowId: string;
  workflowName: string;
}

// Error types
export class N8nApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'N8nApiError';
    this.status = status;
  }
}
```

### 2. lib/n8n/client.ts

```typescript
import axios, { AxiosInstance } from 'axios';
import { 
  N8nWorkflow, 
  N8nExecution, 
  N8nWebhook,
  N8nApiError
} from './types';

export class N8nClient {
  private api: AxiosInstance;
  
  constructor(apiUrl: string, apiKey: string) {
    this.api = axios.create({
      baseURL: apiUrl,
      headers: {
        'X-N8N-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    });
    
    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          throw new N8nApiError(
            error.response.data?.message || 'n8n API error',
            error.response.status
          );
        }
        throw new N8nApiError('Network error connecting to n8n', 500);
      }
    );
  }
  
  // Get all workflows
  async getWorkflows(): Promise<N8nWorkflow[]> {
    try {
      const response = await this.api.get('/workflows');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching workflows:', error);
      throw error;
    }
  }
  
  // Get a single workflow
  async getWorkflow(id: string): Promise<N8nWorkflow> {
    try {
      const response = await this.api.get(`/workflows/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching workflow ${id}:`, error);
      throw error;
    }
  }
  
  // Activate a workflow
  async activateWorkflow(id: string): Promise<void> {
    try {
      await this.api.post(`/workflows/${id}/activate`);
    } catch (error) {
      console.error(`Error activating workflow ${id}:`, error);
      throw error;
    }
  }
  
  // Deactivate a workflow
  async deactivateWorkflow(id: string): Promise<void> {
    try {
      await this.api.post(`/workflows/${id}/deactivate`);
    } catch (error) {
      console.error(`Error deactivating workflow ${id}:`, error);
      throw error;
    }
  }
  
  // Get executions for a workflow
  async getWorkflowExecutions(
    workflowId: string,
    limit = 20,
    offset = 0,
    status?: 'all' | 'error' | 'success' | 'running'
  ): Promise<N8nExecution[]> {
    try {
      const params: Record<string, any> = { limit, offset };
      if (status && status !== 'all') {
        params.status = status;
      }
      
      const response = await this.api.get(`/workflows/${workflowId}/executions`, { params });
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching executions for workflow ${workflowId}:`, error);
      throw error;
    }
  }
  
  // Get a single execution
  async getExecution(id: string): Promise<N8nExecution> {
    try {
      const response = await this.api.get(`/executions/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching execution ${id}:`, error);
      throw error;
    }
  }
  
  // Execute a workflow
  async executeWorkflow(id: string, data?: any): Promise<{ executionId: string }> {
    try {
      const payload = {
        workflowData: {},
        runData: data || {},
        mode: 'manual',
      };
      
      const response = await this.api.post(`/workflows/${id}/execute`, payload);
      return {
        executionId: response.data.data.executionId,
      };
    } catch (error) {
      console.error(`Error executing workflow ${id}:`, error);
      throw error;
    }
  }
  
  // Get all webhooks
  async getWebhooks(): Promise<N8nWebhook[]> {
    try {
      const response = await this.api.get('/workflows/webhooks');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching webhooks:', error);
      throw error;
    }
  }
}

// Singleton instance
let clientInstance: N8nClient | null = null;

export function getN8nClient(): N8nClient {
  if (!clientInstance) {
    const apiUrl = process.env.N8N_API_URL;
    const apiKey = process.env.N8N_API_KEY;
    
    if (!apiUrl || !apiKey) {
      throw new Error('N8N_API_URL and N8N_API_KEY environment variables must be set');
    }
    
    clientInstance = new N8nClient(apiUrl, apiKey);
  }
  
  return clientInstance;
}
```

### 3. lib/n8n/webhooks.ts

```typescript
import crypto from 'crypto';

// Verify webhook signature from n8n
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  if (!signature || !secret) {
    return false;
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const calculatedSignature = hmac.digest('hex');
  
  try {
    return crypto.timingSafeEqual(
      Buffer.from(calculatedSignature),
      Buffer.from(signature)
    );
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

// Parse webhook events
export function parseWebhookEvent(data: any) {
  // Validate the event structure
  if (!data.type || !data.payload) {
    throw new Error('Invalid webhook event format');
  }
  
  // Validate the event type
  const validTypes = ['workflow.started', 'workflow.success', 'workflow.failed'];
  if (!validTypes.includes(data.type)) {
    throw new Error(`Unsupported event type: ${data.type}`);
  }
  
  // Validate payload fields
  const requiredFields = ['executionId', 'workflowId', 'timestamp'];
  for (const field of requiredFields) {
    if (!data.payload[field]) {
      throw new Error(`Missing required field in payload: ${field}`);
    }
  }
  
  return {
    type: data.type,
    executionId: data.payload.executionId,
    workflowId: data.payload.workflowId,
    workflowName: data.payload.workflowName,
    timestamp: data.payload.timestamp,
    data: data.payload.data,
  };
}
```

## Webhook Handler Implementation

Create the webhook endpoint at `app/api/n8n/webhooks/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature, parseWebhookEvent } from '@/lib/n8n/webhooks';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

export async function POST(req: NextRequest) {
  try {
    // Get the raw request body for signature verification
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);
    
    // Get the signature from headers
    const signature = req.headers.get('x-n8n-signature') || '';
    
    // Log webhook received (but not the full payload for security)
    console.log(`Received n8n webhook: ${body.type} for execution ${body.payload?.executionId}`);
    
    // Verify the webhook signature
    const isValid = verifyWebhookSignature(
      rawBody,
      signature,
      process.env.N8N_WEBHOOK_SECRET || ''
    );
    
    if (!isValid) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }
    
    // Parse and validate the webhook event
    const event = parseWebhookEvent(body);
    
    // Initialize Convex client
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || '');
    
    // Process different webhook events
    switch (event.type) {
      case 'workflow.started':
        await handleWorkflowStarted(convex, event);
        break;
      case 'workflow.success':
        await handleWorkflowSuccess(convex, event);
        break;
      case 'workflow.failed':
        await handleWorkflowFailed(convex, event);
        break;
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Handler for workflow.started events
async function handleWorkflowStarted(convex: ConvexHttpClient, event: any) {
  try {
    await convex.mutation(api.executions.recordExecutionStart, {
      automationId: event.workflowId,
      n8nExecutionId: event.executionId,
      startedAt: new Date(event.timestamp).getTime(),
    });
    console.log(`Recorded execution start: ${event.executionId}`);
  } catch (error) {
    console.error(`Error recording execution start: ${error}`);
    throw error;
  }
}

// Handler for workflow.success events
async function handleWorkflowSuccess(convex: ConvexHttpClient, event: any) {
  try {
    // Update execution status
    await convex.mutation(api.executions.updateExecutionStatus, {
      n8nExecutionId: event.executionId,
      status: 'success',
      finishedAt: new Date(event.timestamp).getTime(),
      result: event.data,
    });
    console.log(`Updated execution status to success: ${event.executionId}`);
    
    // Deduct credits
    await convex.mutation(api.credits.useCredits, {
      automationId: event.workflowId,
      executionId: event.executionId,
    });
    console.log(`Deducted credits for execution: ${event.executionId}`);
  } catch (error) {
    console.error(`Error processing successful execution: ${error}`);
    throw error;
  }
}

// Handler for workflow.failed events
async function handleWorkflowFailed(convex: ConvexHttpClient, event: any) {
  try {
    await convex.mutation(api.executions.updateExecutionStatus, {
      n8nExecutionId: event.executionId,
      status: 'failed',
      finishedAt: new Date(event.timestamp).getTime(),
      result: event.data,
    });
    console.log(`Updated execution status to failed: ${event.executionId}`);
  } catch (error) {
    console.error(`Error processing failed execution: ${error}`);
    throw error;
  }
}
```

## Convex Schema Implementation

### 1. convex/schema.ts

Add these tables to your existing schema:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define execution status validator
const executionStatusValidator = v.union(
  v.literal("running"),
  v.literal("success"),
  v.literal("failed")
);

// Define transaction type validator
const transactionTypeValidator = v.union(
  v.literal("purchase"),
  v.literal("usage"),
  v.literal("refund"),
  v.literal("adjustment")
);

export default defineSchema({
  // Existing tables from starter kit...
  
  // New tables for n8n integration
  automations: defineTable({
    name: v.string(),
    description: v.string(),
    n8nWorkflowId: v.string(),
    creditsPerExecution: v.number(),
    isActive: v.boolean(),
    userId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_n8n_workflow", ["n8nWorkflowId"]),
  
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
});
```

### 2. convex/automations.ts

```typescript
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all automations for the current user
export const getAutomations = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const user = identity.tokenIdentifier;
    
    return await ctx.db
      .query("automations")
      .withIndex("by_user", (q) => q.eq("userId", user))
      .collect();
  },
});

// Get details for a specific automation
export const getAutomationDetails = query({
  args: { id: v.id("automations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const automation = await ctx.db.get(args.id);
    if (!automation) {
      throw new Error("Automation not found");
    }
    
    // Check if user has access to this automation
    if (automation.userId !== identity.tokenIdentifier) {
      throw new Error("Not authorized to access this automation");
    }
    
    return automation;
  },
});

// Toggle an automation (activate/deactivate)
export const toggleAutomation = mutation({
  args: { 
    id: v.id("automations"),
    active: v.boolean()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const user = identity.tokenIdentifier;
    
    // Get the automation
    const automation = await ctx.db.get(args.id);
    if (!automation) {
      throw new Error("Automation not found");
    }
    
    // Check if user has access to this automation
    if (automation.userId !== user) {
      throw new Error("Not authorized to modify this automation");
    }
    
    // If activating, check if user has sufficient credits
    if (args.active && !automation.isActive) {
      const hasEnoughCredits = await ctx.runQuery("credits:hasEnoughCredits", {
        requiredAmount: automation.creditsPerExecution
      });
      
      if (!hasEnoughCredits) {
        throw new Error("Insufficient credits to activate this automation");
      }
      
      // Call n8n API to activate the workflow
      // This would be handled by a separate action or function outside Convex
      // For now, we just update our database
    }
    
    // Update the automation
    await ctx.db.patch(args.id, {
      isActive: args.active,
      updatedAt: Date.now(),
    });
    
    return { success: true };
  },
});

// Create a new automation
export const createAutomation = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    n8nWorkflowId: v.string(),
    creditsPerExecution: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const user = identity.tokenIdentifier;
    
    // Create the automation
    const id = await ctx.db.insert("automations", {
      name: args.name,
      description: args.description,
      n8nWorkflowId: args.n8nWorkflowId,
      creditsPerExecution: args.creditsPerExecution,
      isActive: false,
      userId: user,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    return { id };
  },
});
```

### 3. convex/executions.ts

```typescript
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Record the start of an execution
export const recordExecutionStart = mutation({
  args: {
    automationId: v.string(),
    n8nExecutionId: v.string(),
    startedAt: v.number(),
  },
  handler: async (ctx, args) => {
    // Find the automation by n8n workflow ID
    const automation = await ctx.db
      .query("automations")
      .withIndex("by_n8n_workflow", (q) => q.eq("n8nWorkflowId", args.automationId))
      .first();
      
    if (!automation) {
      throw new Error("Automation not found");
    }
    
    // Create the execution record
    return await ctx.db.insert("executions", {
      automationId: automation._id,
      userId: automation.userId,
      n8nExecutionId: args.n8nExecutionId,
      status: "running",
      startedAt: args.startedAt,
      createdAt: Date.now(),
    });
  },
});

// Update the status of an execution
export const updateExecutionStatus = mutation({
  args: {
    n8nExecutionId: v.string(),
    status: v.union(v.literal("success"), v.literal("failed")),
    finishedAt: v.number(),
    result: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    // Find the execution by n8n execution ID
    const execution = await ctx.db
      .query("executions")
      .withIndex("by_n8n", (q) => q.eq("n8nExecutionId", args.n8nExecutionId))
      .first();
      
    if (!execution) {
      throw new Error("Execution not found");
    }
    
    // Update the execution record
    return await ctx.db.patch(execution._id, {
      status: args.status,
      finishedAt: args.finishedAt,
      result: args.result,
    });
  },
});

// Get executions for an automation
export const getExecutionsForAutomation = query({
  args: { 
    automationId: v.id("automations"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const user = identity.tokenIdentifier;
    
    // Get the automation
    const automation = await ctx.db.get(args.automationId);
    if (!automation) {
      throw new Error("Automation not found");
    }
    
    // Check if user has access to this automation
    if (automation.userId !== user) {
      throw new Error("Not authorized to access this automation");
    }
    
    // Query executions for this automation
    let executionsQuery = ctx.db
      .query("executions")
      .withIndex("by_automation", (q) => q.eq("automationId", args.automationId))
      .order("desc");
      
    if (args.limit) {
      executionsQuery = executionsQuery.take(args.limit);
    }
    
    return await executionsQuery.collect();
  },
});

// Get recent executions for all automations
export const getRecentExecutions = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const user = identity.tokenIdentifier;
    const limit = args.limit || 10;
    
    // Get recent executions for this user
    return await ctx.db
      .query("executions")
      .withIndex("by_user", (q) => q.eq("userId", user))
      .order("desc")
      .take(limit)
      .collect();
  },
});
```

### 4. convex/credits.ts

```typescript
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get the current credit balance for a user
export const getCreditBalance = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const user = identity.tokenIdentifier;
    
    // Get all credit transactions for the user
    const creditTransactions = await ctx.db
      .query("credits")
      .withIndex("by_user", (q) => q.eq("userId", user))
      .collect();
    
    // Sum up all transactions (positive for purchases, negative for usage)
    const balance = creditTransactions.reduce((sum, transaction) => {
      return sum + transaction.amount;
    }, 0);
    
    return balance;
  },
});

// Add credits after a purchase
export const addCredits = mutation({
  args: {
    amount: v.number(),
    transactionId: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const user = identity.tokenIdentifier;
    
    // Validate the amount is positive
    if (args.amount <= 0) {
      throw new Error("Credit amount must be positive");
    }
    
    // Add the credits transaction
    return await ctx.db.insert("credits", {
      userId: user,
      amount: args.amount,
      transactionType: "purchase",
      transactionId: args.transactionId,
      notes: args.notes,
      createdAt: Date.now(),
    });
  },
});

// Deduct credits for an automation execution
export const useCredits = mutation({
  args: {
    automationId: v.string(),
    executionId: v.string(),
  },
  handler: async (ctx, args) => {
    // Find the execution
    const execution = await ctx.db
      .query("executions")
      .withIndex("by_n8n", (q) => q.eq("n8nExecutionId", args.executionId))
      .first();
      
    if (!execution) {
      throw new Error("Execution not found");
    }
    
    // Find the automation
    const automation = await ctx.db
      .query("automations")
      .withIndex("by_n8n_workflow", (q) => q.eq("n8nWorkflowId", args.automationId))
      .first();
      
    if (!automation) {
      throw new Error("Automation not found");
    }
    
    // Calculate the credit amount to deduct (negative value)
    const creditAmount = -Math.abs(automation.creditsPerExecution);
    
    // Record the credit transaction
    const creditId = await ctx.db.insert("credits", {
      userId: execution.userId,
      amount: creditAmount,
      transactionType: "usage",
      notes: `Execution of ${automation.name}`,
      createdAt: Date.now(),
    });
    
    // Update the execution with the credits used
    await ctx.db.patch(execution._id, {
      creditsUsed: Math.abs(creditAmount),
    });
    
    return { creditId };
  },
});

// Check if a user has enough credits
export const hasEnoughCredits = query({
  args: { requiredAmount: v.number() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const balance = await ctx.runQuery("credits:getCreditBalance");
    return balance >= args.requiredAmount;
  },
});

// Get credit transaction history
export const getCreditHistory = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const user = identity.tokenIdentifier;
    const limit = args.limit || 20;
    
    return await ctx.db
      .query("credits")
      .withIndex("by_user", (q) => q.eq("userId", user))
      .order("desc")
      .take(limit)
      .collect();
  },
});
```

## Frontend Components

### 1. components/automations/automation-card.tsx

```tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { ArrowRight, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface AutomationCardProps {
  automation: {
    _id: string;
    name: string;
    description: string;
    isActive: boolean;
    creditsPerExecution: number;
  };
}

export function AutomationCard({ automation }: AutomationCardProps) {
  const router = useRouter();
  const [isToggling, setIsToggling] = useState(false);
  const toggleAutomation = useMutation(api.automations.toggleAutomation);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await toggleAutomation({
        id: automation._id,
        active: !automation.isActive,
      });
      
      toast.success(
        automation.isActive 
          ? `${automation.name} deactivated`
          : `${automation.name} activated`
      );
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An error occurred";
        
      toast.error(errorMessage);
      
      // Show buy credits toast if insufficient credits
      if (errorMessage.includes("Insufficient credits")) {
        toast("You need more credits to activate this automation", {
          action: {
            label: "Buy Credits",
            onClick: () => router.push("/dashboard/credits"),
          },
        });
      }
    } finally {
      setIsToggling(false);
    }
  };

  const viewDetails = () => {
    router.push(`/dashboard/automations/${automation._id}`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{automation.name}</CardTitle>
          <Switch
            checked={automation.isActive}
            onCheckedChange={handleToggle}
            disabled={isToggling}
            aria-label={`Toggle ${automation.name}`}
          />
        </div>
        <CardDescription>{automation.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 text-sm">
          <Badge variant={automation.isActive ? "success" : "secondary"}>
            {automation.isActive ? "Active" : "Inactive"}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {automation.creditsPerExecution} credits per run
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" size="sm" className="ml-auto" onClick={viewDetails}>
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
```

## Integration Testing

### Testing n8n API Client

Create a test script at `scripts/test-n8n-client.ts`:

```typescript
import { getN8nClient } from "../lib/n8n/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

async function testN8nClient() {
  try {
    const client = getN8nClient();
    
    console.log("Testing n8n API client...");
    
    // Test getting workflows
    console.log("Fetching workflows...");
    const workflows = await client.getWorkflows();
    console.log(`Found ${workflows.length} workflows`);
    
    if (workflows.length > 0) {
      const testWorkflow = workflows[0];
      console.log(`Testing with workflow: ${testWorkflow.name} (${testWorkflow.id})`);
      
      // Test getting a single workflow
      console.log("Fetching single workflow...");
      const workflow = await client.getWorkflow(testWorkflow.id);
      console.log(`Fetched workflow: ${workflow.name}`);
      
      // Test getting executions
      console.log("Fetching executions...");
      const executions = await client.getWorkflowExecutions(testWorkflow.id);
      console.log(`Found ${executions.length} executions`);
      
      // We don't test activation/deactivation here to avoid
      // messing with production workflows
      console.log("Skipping activation/deactivation tests");
    }
    
    console.log("All tests completed successfully!");
  } catch (error) {
    console.error("Error testing n8n client:", error);
  }
}

testN8nClient();
```

Run the test with:

```bash
npx tsx scripts/test-n8n-client.ts
```

## References

- [n8n Official Documentation](https://docs.n8n.io/)
- [n8n REST API Documentation](https://docs.n8n.io/api/api-reference/)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Convex Documentation](https://docs.convex.dev/) 
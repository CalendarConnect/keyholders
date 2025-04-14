# Keyholders Agency - Technical Architecture

## 1. System Architecture Overview

The Keyholders Agency Dashboard leverages the Next.js 15 Starter Kit's architecture while adapting it for our n8n integration and credit-based system. This document outlines the technical architecture with a focus on preserving the starter kit's framework while implementing our specific requirements.

### 1.1 Technology Stack

- **Frontend Framework**: Next.js 15 with App Router (from starter kit)
- **UI Components**: TailwindCSS with Shadcn/ui (from starter kit)
- **Database**: Convex DB (from starter kit)
- **Authentication**: Clerk (from starter kit)
- **Payment Processing**: Polar.sh (adapted from starter kit)
- **State Management**: React Context API and Convex's real-time subscriptions
- **Type Safety**: TypeScript with strict mode
- **External Integration**: n8n API for automation management

### 1.2 Key Framework Adaptations

#### 1.2.1 Middleware Modification
The most significant adaptation is modifying the middleware.ts file to remove the subscription check that prevents dashboard access. This allows users to access the dashboard immediately after authentication, while still maintaining route protection.

#### 1.2.2 Polar.sh Integration
The starter kit uses Polar.sh for subscription management. We've adapted this integration to sell credit packages instead. The purchase flow remains similar, but the products and post-purchase handling change to manage credits rather than subscription status.

#### 1.2.3 Convex Schema Extension
We've extended the Convex database schema to include our automation-specific models while maintaining compatibility with the starter kit's existing user and authentication models.

### 1.3 High-Level Architecture Diagram

```
┌─────────────────────────┐      ┌─────────────────────────┐
│                         │      │                         │
│  User Interface         │◄────►│  Next.js 15 Frontend    │
│  (Browser)              │      │  (App Router)           │
│                         │      │                         │
└─────────────────────────┘      └──────────┬──────────────┘
                                            │
                                            ▼
                          ┌─────────────────────────────────┐
                          │                                 │
                          │  Convex Functions               │
                          │  (Backend Services)             │
                          │                                 │
                          └───────────┬─────────────────────┘
                                      │
                  ┌──────────────────┬┴───────────────────┐
                  │                  │                    │
                  ▼                  ▼                    ▼
      ┌─────────────────┐ ┌──────────────────┐ ┌────────────────┐
      │                 │ │                  │ │                │
      │  Convex DB      │ │  n8n API         │ │  Polar.sh      │
      │  (Database)     │ │  Integration     │ │  (Credits)     │
      │                 │ │                  │ │                │
      └─────────────────┘ └──────────────────┘ └────────────────┘
```

## 2. Application Structure

We maintain the Next.js 15 Starter Kit's folder structure while adding our specific components and functionality:

```
/
├── app/                           # Next.js App Router (from starter kit)
│   ├── (marketing)/               # Public marketing pages (from starter kit)
│   ├── (auth)/                    # Authentication pages (from starter kit)
│   ├── (pages)/                   # Pages directory
│   │   ├── dashboard/             # Dashboard area (adapted)
│   │   │   ├── automations/       # Automation management
│   │   │   ├── credits/           # Credit management
│   │   │   └── settings/          # User settings (from starter kit)
│   │   ├── contact/               # Contact form page
│   │   └── integrations/          # Integration showcase pages
│   ├── api/                       # API routes (adapted)
│   │   └── n8n/webhooks/          # n8n webhook endpoints
│   └── layout.tsx                 # Root layout (from starter kit)
├── components/                    # Shared React components
│   ├── ui/                        # shadcn UI components (from starter kit)
│   ├── automations/               # Automation components
│   │   ├── automation-card.tsx    # Card display for automations
│   │   └── execution-history.tsx  # History timeline component
│   ├── credits/                   # Credit management components
│   └── homepage/                  # Marketing page components
├── convex/                        # Convex DB schema and functions (adapted)
│   ├── schema.ts                  # Database schema definition
│   ├── automations.ts             # Automation management functions
│   ├── credits.ts                 # Credit management functions
│   ├── executions.ts              # Execution tracking functions
│   └── users.ts                   # User management functions
├── lib/                           # Shared utilities
│   ├── n8n/                       # n8n API client
│   │   └── client.ts              # Client for n8n API interaction
│   └── utils/                     # Utility functions (from starter kit)
├── middleware.ts                  # Modified to remove subscription check
└── (...other files)               # Other files from starter kit
```

## 3. Core Technical Components

### 3.1 Modified Middleware

The middleware.ts file is a critical component that has been modified. The original version checks for an active subscription and redirects users to the pricing page if they don't have one. Our modified version:

- Removes the subscription check logic
- Maintains authentication protection for dashboard routes
- Keeps the same route matching patterns
- Preserves the Clerk integration

This allows users to access the dashboard immediately after authentication without requiring a subscription.

### 3.2 Convex Database Schema

We've extended the Convex schema with the following models:

#### Automations Model
This model represents n8n workflows available in the system:
```typescript
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
  .index("by_workflow", ["n8nWorkflowId"])
```

#### Credits Model
This model tracks credit transactions:
```typescript
credits: defineTable({
  userId: v.string(),
  amount: v.number(),
  transactionType: transactionTypeValidator, // "purchase", "usage", "refund", "adjustment"
  transactionId: v.optional(v.string()),
  notes: v.optional(v.string()),
  createdAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_transaction", ["transactionId"])
```

#### Executions Model
This model records workflow executions:
```typescript
executions: defineTable({
  automationId: v.id("automations"),
  userId: v.string(),
  n8nExecutionId: v.string(),
  status: executionStatusValidator, // "running", "success", "failed"
  creditsUsed: v.optional(v.number()),
  startedAt: v.number(),
  finishedAt: v.optional(v.number()),
  result: v.optional(v.any()),
  createdAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_automation", ["automationId"])
  .index("by_n8n", ["n8nExecutionId"])
```

### 3.3 Convex Functions

We've implemented several Convex functions to handle our business logic:

#### Automation Management Functions
- `getAutomations`: Retrieves all automations for the current user
- `toggleAutomation`: Activates or deactivates an automation, with credit check
- `getAutomationDetails`: Gets detailed information about an automation
- `getAutomationExecutions`: Retrieves execution history for an automation

#### Credit Management Functions
- `getCreditBalance`: Calculates the current credit balance for a user
- `addCredits`: Adds credits to a user's account after purchase
- `useCredits`: Deducts credits when an automation is executed
- `getCreditHistory`: Retrieves credit transaction history
- `hasEnoughCredits`: Checks if a user has sufficient credits for an action

#### Execution Tracking Functions
- `recordExecutionStart`: Creates a record when an execution begins
- `updateExecutionStatus`: Updates the status when an execution completes
- `getRecentExecutions`: Retrieves recent executions for display

### 3.4 n8n Integration

Our n8n integration consists of two main components:

#### 3.4.1 API Client
A utility library in `lib/n8n/client.ts` for communicating with the n8n REST API:
```typescript
class N8nClient {
  private apiUrl: string;
  private apiKey: string;

  // Methods for authentication and API interactions
  async getWorkflows(): Promise<N8nWorkflow[]> {...}
  async activateWorkflow(workflowId: string): Promise<any> {...}
  async deactivateWorkflow(workflowId: string): Promise<any> {...}
  async getWorkflowExecutions(workflowId: string): Promise<N8nExecution[]> {...}
  async getExecution(executionId: string): Promise<N8nExecution> {...}
}
```

#### 3.4.2 Webhook Handler
API routes in `app/api/n8n/webhooks/route.ts` to receive execution status notifications from n8n:
```typescript
// Handler for n8n webhook events
export async function POST(req: NextRequest) {
  // Verify webhook signature
  // Handle different event types:
  // - workflow.started
  // - workflow.success
  // - workflow.failed
}
```

The webhook handler processes n8n events and updates execution records in the Convex database, including credit deduction upon successful execution.

### 3.5 Polar.sh Integration Adaptation

We've adapted the existing Polar.sh integration from subscription-based to credit-based:

- Credit packages are configured as products in Polar.sh
- The purchase flow uses the same UI components
- Post-purchase handling adds credits to the user's account
- Credit transaction records are created after successful purchases

## 4. User Interface Implementation

### 4.1 Dashboard Overview

The dashboard provides an at-a-glance view of the user's automation status and credit balance:

- Credit balance display in the header
- Navigation to automations, credits, and settings
- Recent activity feed (executions)
- Quick access to manage automations

### 4.2 Automation Management Interface

The automations section consists of two main pages:

#### 4.2.1 Automations List Page (`app/(pages)/dashboard/automations/page.tsx`)
```typescript
export default function AutomationsPage() {
  // Fetch automations and credit balance
  // Render automation cards with status and toggles
  // Handle empty state for no automations
}
```

This page displays all available automations as cards with toggle switches for activation/deactivation.

#### 4.2.2 Automation Details Page (`app/(pages)/dashboard/automations/[id]/page.tsx`)
```typescript
export default function AutomationDetailsPage() {
  // Fetch automation details and execution history
  // Display detailed information and status
  // Provide toggle control for activation
  // Show execution history timeline
}
```

This page shows detailed information about a specific automation, including execution history.

### 4.3 Key Components

#### 4.3.1 Automation Card (`components/automations/automation-card.tsx`)
```typescript
export function AutomationCard({ automation, onClick }: AutomationCardProps) {
  // Display automation name, description, status
  // Provide toggle switch for activation
  // Handle insufficient credits with error message
}
```

The automation card component displays key information about an automation and provides a toggle switch for activation.

#### 4.3.2 Execution History (`components/automations/execution-history.tsx`)
```typescript
export function ExecutionHistory({ executions, isLoading }: ExecutionHistoryProps) {
  // Display timeline of executions
  // Show status, timestamp, duration
  // Provide expandable details for each execution
}
```

This component shows a chronological list of automation executions with status indicators and details.

## 5. Authentication Flow

We maintain the starter kit's Clerk authentication with some adjustments:

1. User creates an account or logs in using existing Clerk components
2. Upon successful authentication, the user is directed to the dashboard
3. The dashboard shows the initial state with potentially 0 credits
4. The user can purchase credits to use automations
5. No subscription check prevents dashboard access

## 6. Credit System Implementation

### 6.1 Credit Package Configuration

Credit packages are configured in Polar.sh:
- Starter Package: Small amount of credits at low cost
- Business Package: Medium amount of credits at medium cost
- Enterprise Package: Large amount of credits at discounted cost

### 6.2 Credit Balance Tracking

The credit balance is calculated by summing all credit transactions for a user:
```typescript
export const getCreditBalance = query({
  handler: async (ctx) => {
    // Get all credit transactions for the user
    const creditTransactions = await ctx.db
      .query("credits")
      .withIndex("by_user", (q) => q.eq("userId", user.tokenIdentifier))
      .collect();

    // Sum up all transactions (positive for purchases, negative for usage)
    const balance = creditTransactions.reduce((sum, transaction) => {
      return sum + transaction.amount;
    }, 0);

    return balance;
  },
});
```

### 6.3 Credit Usage Logic

Credit deduction happens when an automation execution completes successfully:
1. Before executing an automation, `toggleAutomation` checks if the user has sufficient credits
2. When an execution starts, a record is created in the `executions` table
3. When an execution completes successfully, credits are deducted from the user's balance
4. A transaction record is created in the `credits` table with a negative amount

## 7. Webhook Handling

The n8n webhook endpoint processes events related to automation executions:

1. `workflow.started`: Creates an execution record in the `running` state
2. `workflow.success`: Updates the execution record to `success` and deducts credits
3. `workflow.failed`: Updates the execution record to `failed` without deducting credits

Each webhook event is authenticated using a signature verification process and mapped to the corresponding Convex mutation.

## 8. Error Handling and Edge Cases

The application implements comprehensive error handling:

- Insufficient credits: Display error notification with option to purchase more
- Failed execution: Record in history without deducting credits
- API connectivity issues: Display appropriate errors and retry options
- Authentication failures: Redirect to login

## 9. Future Enhancements

Planned technical enhancements include:

1. **Advanced n8n Integration**: Complete the actual n8n workflow activation/deactivation
2. **Advanced Analytics**: Implement more detailed usage statistics and predictions
3. **Bulk Operations**: Allow managing multiple automations at once
4. **Webhook Testing Tools**: Add tools to test and validate webhook functionality
5. **Custom Execution Parameters**: Allow users to provide parameters for automation executions
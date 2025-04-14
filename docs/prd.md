# Keyholders Agency - Product Requirements Document

## 1. Introduction

### 1.1 Purpose
The Keyholders Agency Dashboard serves as a management layer between users and n8n automation workflows. It provides an intuitive interface for activating, deactivating, and purchasing credits to run automation services built in n8n.

### 1.2 Product Overview
The Keyholders Dashboard will be built using the Next.js 15 Starter Kit, adapting its existing architecture while preserving its core framework. The platform will transform the starter kit's subscription-based model into a credit-based system where users can purchase credits to run automations.

### 1.3 Goals
- Create an intuitive interface for users to manage their n8n automations
- Implement a credit-based system for running automation workflows
- Provide clear execution tracking and status monitoring
- Maintain a clean, minimalist design with responsive layouts
- Leverage the Next.js 15 Starter Kit without altering its core framework

### 1.4 Target Audience
- Business professionals seeking to automate repetitive tasks
- Digital agencies managing automations for multiple projects
- Small to medium businesses with limited technical resources

## 2. Product Features

### 2.1 Dashboard
- **Immediate Access**: Users can access the dashboard immediately after authentication without requiring a subscription
- **Overview Statistics**: Display key metrics (credits balance, active automations, recent executions)
- **Recent Activity**: Show recent automation executions with status indicators
- **Credit Balance**: Prominently display current credit balance with low balance warnings

### 2.2 Automation Management
- **Automation List**: View all available automation workflows
- **Toggle Controls**: Activate/deactivate workflows with simple toggle switches
- **Status Monitoring**: View current status of each automation
- **Execution History**: Track past executions with details
- **Credit Check**: Validate sufficient credits before allowing automation execution

### 2.3 Credit System
- **Credit Packages**: Purchase predefined credit packages through the Polar.sh integration
- **On-Demand Purchases**: Buy credits at any time from within the dashboard
- **Usage History**: Track credit consumption over time
- **Credit Deduction**: Automatically deduct credits when automations are executed
- **Low Balance Alerts**: Notify when credits are running low

### 2.4 n8n Integration
- **Activation Control**: Enable/disable workflows in n8n via API
- **Execution Tracking**: Monitor workflow executions for billing purposes
- **Webhook Capture**: Receive execution status updates from n8n
- **Credit Validation**: Check credit balance before executing workflows

## 3. User Flows

### 3.1 Authentication Flow
1. User creates an account using the existing Clerk authentication
2. User is immediately directed to dashboard after successful authentication
3. Dashboard shows 0 credits initially
4. User is prompted to purchase credits to use automations

### 3.2 Automation Management Flow
1. User views list of available automations
2. User attempts to toggle an automation on
3. System checks if user has sufficient credits
4. If yes, system communicates with n8n to activate the workflow
5. If no, user is prompted to purchase credits
6. System confirms the status change
7. User can view execution history and performance

### 3.3 Credit Purchase Flow
1. User navigates to credits page from dashboard
2. User views available credit packages
3. User selects desired package
4. System processes payment via Polar.sh
5. Credits are added to user's account
6. User receives confirmation

### 3.4 Execution Flow
1. When an active automation runs
2. n8n sends webhook notification about execution start
3. System validates sufficient credits
4. System records execution details
5. Upon completion, n8n sends webhook notification about execution end
6. System deducts credits based on execution
7. System updates user's credit balance
8. User can view execution results in dashboard

## 4. Technical Requirements

### 4.1 Architecture
- **Frontend**: Next.js 15 with App Router architecture (using the starter kit)
- **UI Components**: TailwindCSS with Shadcn/ui (using existing components)
- **Database**: Convex DB for real-time functionality
- **Authentication**: Clerk for user management (keeping existing implementation)
- **Payments**: Polar.sh for credit package sales (adapting existing integration)

### 4.2 Integration Points
- **Middleware Modification**: Remove subscription check to allow immediate dashboard access
- **n8n API**: REST API connection to n8n instance
- **Webhook Endpoints**: Capture execution events from n8n
- **Clerk Auth**: Use existing user authentication and profile management
- **Polar.sh**: Adapt existing integration for credit packages instead of subscriptions

### 4.3 Data Model
- **Users**: Leverage existing Clerk user profiles
- **Automations**: Representation of n8n workflows
- **Executions**: Record of workflow runs with status and credit cost
- **Credits**: Credit transactions and balance tracking

## 5. Key Technical Adaptations

### 5.1 Middleware Modification
- Remove subscription check in middleware.ts to allow immediate dashboard access
- Maintain authentication protection for dashboard routes
- Eliminate redirection to pricing page for non-subscribers

### 5.2 Polar.sh Integration Adaptation
- Repurpose existing Polar.sh integration to sell credit packages instead of subscriptions
- Maintain the same purchase flow but with different products
- Implement credit balance tracking in Convex

### 5.3 Credit System Implementation
- Create new Convex functions for credit management
- Implement pre-execution credit checks
- Build credit transaction history
- Develop balance calculation logic

### 5.4 n8n Integration Development
- Implement n8n API client for workflow management
- Create webhook handlers for execution events
- Build credit deduction logic tied to executions
- Develop execution history tracking

## 6. Design Requirements

### 6.1 User Interface
- Leverage existing UI components from the starter kit
- Maintain clean, minimalist design following Apple-like aesthetics
- Ensure responsive layout optimized for desktop and tablet
- Create intuitive automation management interfaces

### 6.2 User Experience
- Provide clear credit balance information
- Create seamless automation management
- Implement intuitive credit purchase flow
- Deliver meaningful execution feedback

### 6.3 Branding
- **Brand Name**: Keyholders Agency
- **Color Scheme**: Use the starter kit's theme system
- **Typography**: Maintain the existing typography system
- **Visual Style**: Clean, minimalist interface with strategic use of color

## 7. Implementation Phases

### 7.1 Phase 1: Framework Adaptation
- Modify middleware to remove subscription requirement
- Create credit system schema in Convex
- Develop n8n API client
- Build basic dashboard structure

### 7.2 Phase 2: Core Functionality
- Implement automation management
- Develop credit tracking system
- Create webhook handlers for n8n
- Adapt Polar.sh integration for credit packages

### 7.3 Phase 3: Polish & Launch
- Refine user interface for optimal experience
- Implement comprehensive error handling
- Add helpful onboarding elements
- Optimize performance and responsiveness

## 8. Success Metrics

- **User Engagement**: Frequency of automation usage
- **Credit Purchases**: Revenue from credit package sales
- **Automation Activation Rate**: Percentage of automations being actively used
- **Execution Success Rate**: Percentage of successful automation runs

## 9. Assumptions & Constraints

### 9.1 Assumptions
- Users have basic familiarity with automation concepts
- n8n instance is accessible via REST API
- Webhooks can be received from n8n for execution tracking
- Polar.sh integration can be adapted for credit packages

### 9.2 Constraints
- Must maintain the integrity of the starter kit's framework
- Cannot alter core authentication mechanisms
- Must adapt existing payment flow rather than creating new one
- Limited customization of the UI component library

## 10. Appendices

### 10.1 Glossary
- **n8n**: Open source workflow automation tool
- **Workflow**: An automation sequence created in n8n
- **Credits**: The currency used to run automation executions
- **Webhook**: HTTP callbacks for real-time notifications

### 10.2 References
- n8n API Documentation
- Next.js 15 Starter Kit Documentation
- Convex DB Documentation
- Clerk Authentication Documentation
- Polar.sh Payment Documentation
# Keyholders Agency Webhook Integration Guide

This guide explains how to use our webhook-based approach to connect your n8n workflows to the Keyholders dashboard.

## Overview

Instead of embedding n8n directly within our platform, we now use a simpler and more flexible webhook-based approach. This allows:

- Each team member to use their own n8n account (cloud or self-hosted)
- Complete separation between n8n workflows and our dashboard
- Better security and isolation between clients
- A cleaner credit-based system for client usage

## How It Works

1. **You build workflows in your own n8n account** - either n8n.cloud or self-hosted
2. **You set up webhook nodes as triggers** in those workflows
3. **You register these webhooks** in the Keyholders dashboard
4. **You assign registered webhooks to clients** through the dashboard
5. **Clients use credits** to execute these webhooks

## Step 1: Create a Webhook-Triggered Workflow in n8n

1. Log in to your n8n account
2. Create a new workflow
3. Add a **Webhook** node as the first node in your workflow
4. Configure the webhook:
   - Choose the appropriate HTTP method (POST is recommended)
   - Set authentication if needed (recommended)
   - Copy the webhook URL
5. Add additional nodes to process the incoming data
6. Activate your workflow in n8n

## Step 2: Register the Webhook in Keyholders Dashboard

1. Go to **Automations** in the Keyholders dashboard
2. Click **Register Webhook**
3. Fill in the details:
   - **Name**: A descriptive name for the automation
   - **Description**: What this automation does
   - **Webhook URL**: Paste the URL from your n8n webhook node
   - **Authentication Type**: Match the authentication type from your webhook node
   - **Authentication Details**: Enter credentials if required
   - **Credits Per Execution**: How many credits each run costs

## Step 3: Assign to Clients

1. Go to **Clients** in the dashboard
2. Select a client or create a new one
3. Go to the **Automations** tab for that client
4. Assign your registered webhook automations to the client
5. Set credit limits and permissions

## Step 4: Monitor Usage and Executions

1. The dashboard tracks each webhook execution
2. You can view execution history in the automation details
3. Credits are automatically deducted from clients' accounts
4. Executions fail when clients run out of credits

## Authentication Options

For security, we recommend using authentication on your webhook nodes:

1. **Basic Auth**: Username and password authentication
2. **JWT/Bearer**: Token-based authentication
3. **Header Auth**: Custom header with authentication token
4. **None**: No authentication (not recommended for production)

## Troubleshooting

**Webhook not executing:**
- Verify the webhook is active in n8n
- Check that the URL is correct
- Confirm authentication details match
- Ensure the client has sufficient credits

**Failed executions:**
- Check the execution logs in both the dashboard and n8n
- Verify that n8n can access any services it needs to call
- Test the webhook directly with a tool like Postman

## Benefits of This Approach

- **Independence**: Use any n8n hosting option you prefer
- **Flexibility**: Each team member manages their own workflows
- **Security**: Better isolation between clients
- **Simplicity**: Cleaner integration without iframe complexities
- **Scalability**: Easily add more team members and clients

Need help? Contact our support team at support@keyholders.agency 
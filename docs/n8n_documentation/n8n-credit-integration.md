# Keyholders Agency n8n Credit System Integration Guide

This guide explains how to set up your n8n workflows to work with the Keyholders Agency credit system, ensuring that workflows only run when clients have sufficient credits.

## Overview

The Keyholders Agency platform uses a credit-based system for client automations:

1. Each client has a credit balance
2. Each automation execution costs a specific number of credits
3. Workflows only run if the client has sufficient credits
4. Credits are automatically deducted after successful executions

## Setting Up Your n8n Workflow

### Step 1: Create Your Base Workflow

First, build your workflow with the business logic needed for your automation. Make sure everything works correctly end-to-end before proceeding to credit integration.

### Step 2: Add Credit Checking

To ensure your workflow only executes when clients have sufficient credits, add these nodes at the beginning:

#### 1. Webhook Trigger Node

This node will receive requests from the Keyholders platform. Configure it as follows:

- **Authentication**: None (our platform handles this)
- **HTTP Method**: POST
- **Path**: Can be anything, but use a descriptive name (e.g., `/meeting-checker`)
- After saving, note the generated Webhook URL (e.g., `https://keyholders.app.n8n.cloud/webhook/abc123`)

#### 2. HTTP Request Node for Credit Check

This node will check if the client has enough credits before proceeding:

- **Authentication**: None
- **Request Method**: GET
- **URL**: `https://[your-app-url]/api/n8n/check-credits`
- **Query Parameters**:
  - `clientId`: `{{$json.clientId}}`
  - `automationId`: `{{$json.automationId}}`

#### 3. IF Node for Credit Decision

This node decides whether to proceed based on credit availability:

- **Condition**: `{{$json.hasCredits}} === true`
- **True path**: Connect to your main workflow logic
- **False path**: Connect to a "Respond to Webhook" node with error message

#### 4. HTTP Request Node for Credit Deduction (End of Workflow)

After your workflow execution completes successfully, add this node to deduct credits:

- **Authentication**: None
- **Request Method**: POST
- **URL**: `https://[your-app-url]/api/n8n/deduct-credit`
- **Request Body**:
```json
{
  "clientId": "{{$json.clientId}}",
  "automationId": "{{$json.automationId}}",
  "n8nExecutionId": "{{$execution.id}}"
}
```

### Step 3: Add Error Handling

For proper credit handling, add error handling to ensure credits are only deducted on successful executions:

1. Use "Error Trigger" nodes to catch errors in your workflow
2. Connect error paths to "Respond to Webhook" nodes with appropriate error messages
3. Do not deduct credits if the workflow fails

## Registering Your Workflow in Keyholders

After building your workflow in n8n:

1. Go to the Keyholders Dashboard
2. Navigate to Automations > Create New
3. Enter the workflow details:
   - Name and description
   - Webhook URL from your n8n workflow
   - Credits per execution
4. Save the automation
5. Assign it to clients as needed

## Testing Your Integration

To test your credit-based workflow:

1. Assign the automation to a test client with a known credit balance
2. Trigger the workflow manually from the Keyholders Dashboard
3. Check the n8n execution to verify credit checking is working
4. Verify that credits were deducted after successful execution
5. Test with insufficient credits to ensure the workflow does not run

## Troubleshooting

### Webhook Not Triggering

- Ensure the Webhook URL is correctly registered in the Keyholders Dashboard
- Check that the client has the automation assigned and activated
- Verify the client has sufficient credits

### Credit Check Failing

- Check the client's credit balance in the dashboard
- Verify API endpoints are accessible from n8n
- Review n8n execution logs for specific error messages

### Credits Not Deducting

- Verify the deduction API call is correctly configured
- Check that the workflow executed successfully
- Ensure the client and automation IDs are being passed correctly

## Advanced Configuration

### Custom Credit Costs

You can configure different credit costs for specific parts of your workflow by:

1. Setting up multiple automations in the Keyholders Dashboard
2. Breaking complex workflows into smaller, chainable workflows
3. Assigning different credit costs to each component

### Webhook Security

For production use, consider implementing additional security:

1. Use webhook headers for authentication
2. Implement signature verification
3. Add IP restrictions to your n8n instance

## Need Help?

If you encounter issues or need assistance with your n8n credit integration:

- Check the Keyholders documentation
- Contact your account manager
- Submit a support ticket 
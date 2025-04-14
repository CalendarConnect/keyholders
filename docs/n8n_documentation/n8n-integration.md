# n8n Integration Documentation

## Overview

The Keyholders Agency platform integrates with n8n exclusively through webhooks, enabling a powerful credit-based system for client automations. This documentation covers everything you need to know to build, integrate, and monetize n8n workflows with the Keyholders platform.

## Core Concepts

### Webhook-Based Architecture

All n8n workflows in the Keyholders ecosystem operate through webhooks:

1. **Trigger Webhook**: Each workflow starts with a Webhook node that receives data from Keyholders
2. **Credit Verification**: Before execution, the system verifies available client credits
3. **Workflow Execution**: The business logic runs only if credits are available
4. **Credit Deduction**: After successful execution, credits are automatically deducted

### Credit System Integration

Every workflow execution costs a predetermined number of credits:

- Credits are defined per automation at registration time
- Credits are verified before execution starts
- Credits are only deducted after successful execution
- Failed workflows do not consume credits

## Webhook Endpoints

### 1. Credit Checking Endpoint

**Endpoint**: `GET /api/n8n/check-credits`  
**Parameters**:
- `clientId`: The ID of the client
- `automationId`: The ID of the automation

**Response Example (Success)**:
```json
{
  "hasCredits": true,
  "required": 1,
  "remaining": 10,
  "clientId": "01234567890",
  "automationId": "0987654321"
}
```

**Response Example (Failure)**:
```json
{
  "hasCredits": false,
  "error": "Insufficient credits",
  "required": 1,
  "remaining": 0
}
```

### 2. Credit Deduction Endpoint

**Endpoint**: `POST /api/n8n/deduct-credit`  
**Request Body**:
```json
{
  "clientId": "01234567890",
  "automationId": "0987654321",
  "n8nExecutionId": "execution_12345"
}
```

**Response Example (Success)**:
```json
{
  "success": true,
  "message": "Credits deducted successfully",
  "clientId": "01234567890",
  "automationId": "0987654321",
  "n8nExecutionId": "execution_12345"
}
```

### 3. Workflow Dispatch Endpoint

**Endpoint**: `POST /api/n8n/dispatch`  
**Request Body**:
```json
{
  "clientId": "01234567890",
  "automationId": "0987654321",
  "payload": {
    "customData1": "value1",
    "customData2": "value2"
  }
}
```

**Response Example (Success)**:
```json
{
  "success": true,
  "message": "Workflow triggered successfully"
}
```

### 4. n8n Webhook Response Endpoint

**Endpoint**: `POST /api/n8n/webhooks`  
**Request Body** (sent by n8n workflow):
```json
{
  "clientId": "01234567890",
  "automationId": "0987654321",
  "executionId": "execution_12345",
  "status": "success",
  "result": {
    "processedData": "value"
  }
}
```

## Building Webhook-Based Workflows

### Standard Workflow Template

Every Keyholders n8n workflow should follow this pattern:

1. **Webhook Trigger Node**
   - Receives request with `clientId` and `automationId`
   - Initial entry point for workflow

2. **HTTP Request Node (Credit Check)**
   - Calls `/api/n8n/check-credits` to verify sufficient credits
   - Passes client and automation IDs

3. **IF Node (Credit Decision)**
   - Condition: `{{$json.hasCredits}} === true`
   - Determines whether to proceed with execution

4. **Main Workflow Logic**
   - Your custom business logic goes here
   - Only executes if credits are available

5. **HTTP Request Node (Credit Deduction)**
   - Calls `/api/n8n/deduct-credit` upon successful execution
   - Records execution and deducts appropriate credits

6. **Error Handling Nodes**
   - Catch and handle errors throughout the workflow
   - Ensure credits aren't deducted for failed executions

### Workflow Node JSON Structure

When creating workflow templates, use this structure for the webhook node:

```json
{
  "parameters": {
    "httpMethod": "POST",
    "path": "your-workflow-name",
    "responseMode": "responseNode"
  },
  "name": "Webhook",
  "type": "n8n-nodes-base.webhook",
  "typeVersion": 1,
  "position": [
    250,
    300
  ]
}
```

And for the credit check HTTP request:

```json
{
  "parameters": {
    "url": "=https://{{$env.KEYHOLDERS_APP_URL}}/api/n8n/check-credits",
    "sendQuery": true,
    "queryParameters": {
      "parameters": [
        {
          "name": "clientId",
          "value": "={{$json.clientId}}"
        },
        {
          "name": "automationId",
          "value": "={{$json.automationId}}"
        }
      ]
    },
    "options": {}
  },
  "name": "Check Credits",
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 3,
  "position": [
    450,
    300
  ]
}
```

## Monetizing Your Workflows

### Publishing Process

1. Develop your workflow in n8n
2. Structure using the webhook template pattern above
3. Export the workflow as JSON
4. Register in the Keyholders Dashboard:
   - Set name, description, and pricing (credit cost)
   - Provide the webhook URL from your workflow
   - Set appropriate credit cost per execution

### Best Practices for Marketable Workflows

1. **Standardized Input/Output**: Use consistent data structures
2. **Robust Error Handling**: Gracefully manage all potential errors
3. **Comprehensive Testing**: Test with various credit scenarios
4. **Clear Documentation**: Document expected inputs and outputs
5. **Optimized Performance**: Minimize execution time and resource usage

## Example: Meeting Checker Workflow

Here's a complete example of a "Meeting Checker" workflow that checks if a client has meetings scheduled:

```json
{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "meeting-checker",
        "responseMode": "responseNode"
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "url": "=https://{{$env.KEYHOLDERS_APP_URL}}/api/n8n/check-credits",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "clientId",
              "value": "={{$json.clientId}}"
            },
            {
              "name": "automationId",
              "value": "={{$json.automationId}}"
            }
          ]
        }
      },
      "name": "Check Credits",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [450, 300]
    },
    {
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{$json.hasCredits}}",
              "operation": "equal",
              "value2": "true"
            }
          ]
        }
      },
      "name": "Has Credits?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "authentication": "oauth2",
        "endpoint": "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "timeMin",
              "value": "={{$json.checkDate || $now.toISOString()}}"
            },
            {
              "name": "timeMax",
              "value": "={{$json.checkDateEnd || $today.endOf('day').toISOString()}}"
            },
            {
              "name": "maxResults",
              "value": "10"
            }
          ]
        }
      },
      "name": "Get Calendar Events",
      "type": "n8n-nodes-base.googleCalendar",
      "typeVersion": 1,
      "position": [850, 200],
      "credentials": {
        "googleCalendarOAuth2Api": {
          "id": "googleCalendarCredential",
          "name": "Google Calendar account"
        }
      }
    },
    {
      "parameters": {
        "url": "=https://{{$env.KEYHOLDERS_APP_URL}}/api/n8n/deduct-credit",
        "method": "POST",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "clientId",
              "value": "={{$json.clientId}}"
            },
            {
              "name": "automationId",
              "value": "={{$json.automationId}}"
            },
            {
              "name": "n8nExecutionId",
              "value": "={{$execution.id}}"
            }
          ]
        }
      },
      "name": "Deduct Credit",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [1050, 200]
    },
    {
      "parameters": {
        "responseCode": "=403",
        "responseData": "json",
        "responseDataJson": "={ \"error\": \"Insufficient credits\", \"required\": {{$json.required}}, \"available\": {{$json.remaining}} }"
      },
      "name": "Insufficient Credits Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [850, 400]
    },
    {
      "parameters": {
        "responseCode": "=200",
        "responseData": "json",
        "responseDataJson": "={ \"hasMeetings\": {{$json.items.length > 0}}, \"meetings\": {{$json.items}} }"
      },
      "name": "Success Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [1250, 200]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Check Credits",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Check Credits": {
      "main": [
        [
          {
            "node": "Has Credits?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Has Credits?": {
      "main": [
        [
          {
            "node": "Get Calendar Events",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Insufficient Credits Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Calendar Events": {
      "main": [
        [
          {
            "node": "Deduct Credit",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Deduct Credit": {
      "main": [
        [
          {
            "node": "Success Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

## Need Help?

For assistance with n8n webhook integration:
- Review the complete [n8n webhook usage guide](./n8n-webhooks.md)
- Check the [credit integration guide](./n8n-credit-integration.md)
- Contact your Keyholders representative for additional support 
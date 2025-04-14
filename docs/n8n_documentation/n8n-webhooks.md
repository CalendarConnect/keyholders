# n8n Webhooks Integration Guide

This comprehensive guide explains how to build n8n workflows using webhooks for the Keyholders Agency platform. All n8n integrations with the Keyholders platform operate exclusively through webhooks, providing flexibility, security, and proper credit management.

## Webhook Fundamentals

### What is a Webhook in n8n?

A webhook is an HTTP endpoint that allows external systems to trigger your workflow. In the Keyholders ecosystem:

1. Your n8n workflow exposes a webhook URL (e.g., `https://keyholders.app.n8n.cloud/webhook/abc123`)
2. The Keyholders platform sends requests to this URL to trigger workflow execution
3. The webhook includes client and automation IDs for credit management
4. Your workflow processes the request and returns a response

### Webhook Structure

#### The Webhook Trigger Node

Every Keyholders n8n workflow must start with a Webhook node configured as follows:

- **Authentication**: None (Keyholders platform handles authentication)
- **HTTP Method**: POST
- **Path**: Descriptive name for your workflow (e.g., `meeting-checker`, `competitor-monitor`)
- **Response Mode**: Either "Last Node" or "Respond To Webhook" (recommended)

#### Webhook Request Payload

The Keyholders platform will send a webhook request with this structure:

```json
{
  "clientId": "conv:12345abcde",
  "automationId": "conv:67890fghij",
  "executionTime": 1650123456789,
  "payload": {
    // Custom data specific to the workflow
    "parameter1": "value1",
    "parameter2": "value2"
  }
}
```

The `clientId` and `automationId` are required for credit management, while the `payload` object contains custom parameters for your specific workflow.

## Credit System Integration

### Credit Checking Workflow

1. **Receive Webhook**: The Webhook node receives the request with client and automation IDs
2. **Check Credits**: Call the credit check API endpoint
3. **Evaluate Credits**: Use an IF node to determine if execution should proceed
4. **Execute Logic**: Only run your business logic if sufficient credits are available
5. **Deduct Credits**: Call the credit deduction API after successful execution

### Credit Check API

To verify available credits, make an HTTP request to:

```
GET /api/n8n/check-credits?clientId={{$json.clientId}}&automationId={{$json.automationId}}
```

This endpoint returns:

```json
{
  "hasCredits": true,
  "required": 1,
  "remaining": 10,
  "clientId": "conv:12345abcde",
  "automationId": "conv:67890fghij"
}
```

### Credit Deduction API

To deduct credits after successful execution, make an HTTP request to:

```
POST /api/n8n/deduct-credit
```

With the request body:

```json
{
  "clientId": "{{$json.clientId}}",
  "automationId": "{{$json.automationId}}",
  "n8nExecutionId": "{{$execution.id}}"
}
```

## Building Webhook-Based Workflows

### Step 1: Create the Webhook Trigger

Create a new n8n workflow and add a Webhook node:

1. Set HTTP method to `POST`
2. Set a descriptive path (e.g., `competitor-monitor`)
3. Set Response Mode to "Response Node" for more control
4. Save the node and note the generated webhook URL

### Step 2: Add Credit Checking

Add an HTTP Request node:

1. Connect it to the Webhook node
2. Set method to `GET`
3. Set URL to `{{$env.KEYHOLDERS_API_URL}}/api/n8n/check-credits`
4. Add query parameters:
   - `clientId`: `{{$json.clientId}}`
   - `automationId`: `{{$json.automationId}}`
5. Save the node

### Step 3: Add Credit Decision Logic

Add an IF node:

1. Connect it to the Credit Check node
2. Add condition: `{{$json.hasCredits}} === true`
3. For the "true" path: connect to your main business logic
4. For the "false" path: connect to a Respond To Webhook node with an error message
5. Save the node

### Step 4: Implement Business Logic

Add your custom workflow nodes:

1. Connect to the "true" output of the IF node
2. Implement your business logic (e.g., API calls, data processing)
3. Ensure all error scenarios are handled
4. Save your nodes

### Step 5: Add Credit Deduction

Add another HTTP Request node:

1. Connect it after your business logic is complete
2. Set method to `POST`
3. Set URL to `{{$env.KEYHOLDERS_API_URL}}/api/n8n/deduct-credit`
4. Set request body:
   ```json
   {
     "clientId": "{{$json.clientId}}",
     "automationId": "{{$json.automationId}}",
     "n8nExecutionId": "{{$execution.id}}"
   }
   ```
5. Save the node

### Step 6: Add Response Handler

Add a Respond To Webhook node:

1. Connect it to the final node in your workflow
2. Set appropriate status code (usually 200)
3. Format your response data as needed
4. Save the node

## Webhook Security

### Authentication Options

1. **Basic Validation**: The Keyholders platform automatically verifies client and automation IDs
2. **Webhook Signatures**: For additional security, verify the X-Keyholders-Signature header
3. **IP Restrictions**: Configure n8n to only accept requests from Keyholders IPs

### Implementing Signature Verification

Add a Function node after your Webhook:

```javascript
// Verify webhook signature
const crypto = require('crypto');
const signature = $input.first().headers['x-keyholders-signature'];
const payload = JSON.stringify($input.first().json);
const calculatedSignature = crypto
  .createHmac('sha256', process.env.WEBHOOK_SECRET)
  .update(payload)
  .digest('hex');

if (signature !== calculatedSignature) {
  throw new Error('Invalid webhook signature');
}

return $input.first();
```

## Webhook Error Handling

### Common Error Scenarios

1. **Invalid Parameters**: Missing or malformed clientId/automationId
2. **Insufficient Credits**: Client doesn't have enough credits
3. **Business Logic Errors**: Errors in your workflow's main logic
4. **Integration Errors**: Failed third-party API calls

### Error Response Format

Always use a consistent error format:

```json
{
  "error": true,
  "message": "Descriptive error message",
  "code": "ERROR_CODE",
  "details": {
    // Additional error context
  }
}
```

### Implementing Error Handlers

1. Add Error Trigger nodes to catch specific errors
2. Connect them to Respond To Webhook nodes
3. Format appropriate error messages
4. Set appropriate HTTP status codes:
   - 400: Bad Request (invalid parameters)
   - 402: Payment Required (insufficient credits)
   - 403: Forbidden (unauthorized access)
   - 500: Server Error (workflow failures)

## Advanced Webhook Techniques

### Webhook Chaining

For complex workflows, chain multiple n8n workflows together:

1. First workflow performs initial processing
2. Makes an HTTP request to trigger a second workflow
3. Passes data through request parameters
4. Second workflow continues processing
5. Each workflow handles its own credit checking/deduction

### Webhook Rate Limiting

To prevent abuse of your workflows:

1. Add a Function node to implement rate limiting logic
2. Check timestamp of last execution for this client
3. If too recent, return an error response
4. Store execution timestamps in a simple database

### Webhook Testing Tools

Use these tools to test your webhooks during development:

1. **Postman**: Send test requests to your webhook URL
2. **n8n Webhook Debugger**: Built-in testing tool
3. **Keyholders Test Mode**: Platform feature for testing without deducting credits

## Webhook Template JSON Structure

Use this template for creating new webhook-based workflows:

```json
{
  "name": "Your Workflow Name",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "your-path",
        "responseMode": "responseNode",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "url": "={{$env.KEYHOLDERS_API_URL}}/api/n8n/check-credits",
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
      "position": [450, 300]
    },
    {
      "parameters": {
        "conditions": {
          "boolean": [
            {
              "value1": "={{$json.hasCredits}}",
              "value2": true
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
        "url": "={{$env.KEYHOLDERS_API_URL}}/api/n8n/deduct-credit",
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
        },
        "options": {}
      },
      "name": "Deduct Credit",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [1050, 250]
    },
    {
      "parameters": {
        "responseCode": "403",
        "responseData": "json",
        "responseDataJson": "={ \"error\": true, \"message\": \"Insufficient credits\", \"required\": {{$json.required}}, \"available\": {{$json.remaining}} }"
      },
      "name": "Insufficient Credits Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [850, 450]
    },
    {
      "parameters": {
        "responseCode": "200",
        "responseData": "json",
        "responseDataJson": "={ \"success\": true, \"data\": {{$json}} }"
      },
      "name": "Success Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [1250, 250]
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
            "node": "Your Business Logic Node",
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
    "Your Business Logic Node": {
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

## Frequently Asked Questions

### How do I get my webhook URL?

After saving your Webhook node, n8n will display the full webhook URL. You can also find it in the node's details panel or by clicking "Test" on the Webhook node.

### How do I test my webhook without deducting credits?

Enable Test Mode in your Keyholders Dashboard settings, which allows workflow execution without deducting real credits.

### Can I use the same webhook for multiple clients?

Yes. The Keyholders platform passes the clientId parameter, allowing you to differentiate between clients in your workflow.

### What happens if a workflow fails?

If your workflow encounters an error, no credits will be deducted as long as you haven't explicitly called the deduct-credit endpoint.

### How do I pass custom parameters to my workflow?

Use the "payload" object in the webhook request body to pass custom parameters specific to your workflow.

### Can I use multiple webhook nodes in a single workflow?

Yes, but only one should be the main entry point. Additional webhook nodes can be used for specific callback functions. 
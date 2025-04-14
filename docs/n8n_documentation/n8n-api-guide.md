# n8n API Integration Guide

This guide provides detailed information about the API endpoints used for integrating n8n workflows with the Keyholders Agency platform. All interactions between n8n and the Keyholders platform occur through webhooks and REST API calls.

## API Endpoint Reference

### 1. Credit Check API

**Purpose**: Verify if a client has sufficient credits to run a workflow.

**Endpoint**: `GET /api/n8n/check-credits`

**Query Parameters**:
- `clientId` (required): Convex ID of the client
- `automationId` (required): Convex ID of the automation

**Success Response (200 OK)**:
```json
{
  "hasCredits": true,
  "required": 1,
  "remaining": 10,
  "clientId": "conv:12345abcde",
  "automationId": "conv:67890fghij"
}
```

**Error Responses**:
- `400 Bad Request`: Missing required parameters
- `403 Forbidden`: Automation not assigned or not active
- `404 Not Found`: Client not found
- `500 Internal Server Error`: Server-side error

**n8n Node Example**:
```json
{
  "parameters": {
    "url": "=https://{{$env.KEYHOLDERS_API_URL}}/api/n8n/check-credits",
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
  "typeVersion": 3
}
```

### 2. Credit Deduction API

**Purpose**: Deduct credits after successful workflow execution.

**Endpoint**: `POST /api/n8n/deduct-credit`

**Request Body**:
```json
{
  "clientId": "conv:12345abcde",
  "automationId": "conv:67890fghij",
  "n8nExecutionId": "execution_12345",
  "amount": 1  // Optional, defaults to 1
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Credits deducted successfully",
  "clientId": "conv:12345abcde",
  "automationId": "conv:67890fghij",
  "n8nExecutionId": "execution_12345"
}
```

**Error Responses**:
- `400 Bad Request`: Missing required parameters
- `500 Internal Server Error`: Failed to deduct credits

**n8n Node Example**:
```json
{
  "parameters": {
    "url": "=https://{{$env.KEYHOLDERS_API_URL}}/api/n8n/deduct-credit",
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
  "typeVersion": 3
}
```

### 3. Workflow Dispatch API

**Purpose**: Manually trigger an n8n workflow with proper credit checking.

**Endpoint**: `POST /api/n8n/dispatch`

**Request Body**:
```json
{
  "clientId": "conv:12345abcde",
  "automationId": "conv:67890fghij",
  "payload": {
    "parameter1": "value1",
    "parameter2": "value2"
  }
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Workflow triggered successfully"
}
```

**Error Responses**:
- `400 Bad Request`: Missing required parameters
- `402 Payment Required`: Insufficient credits
- `403 Forbidden`: Automation not assigned or inactive
- `404 Not Found`: Client or automation not found
- `500 Internal Server Error`: Server-side error
- `502 Bad Gateway`: Failed to trigger n8n workflow

### 4. Webhook Response API

**Purpose**: Receive responses from n8n workflows upon completion.

**Endpoint**: `POST /api/n8n/webhooks`

**Request Body** (sent by n8n):
```json
{
  "clientId": "conv:12345abcde",
  "automationId": "conv:67890fghij",
  "executionId": "execution_12345",
  "status": "success",
  "result": {
    "processedData": "value"
  }
}
```

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Execution recorded and credits processed"
}
```

**Error Responses**:
- `400 Bad Request`: Missing required parameters
- `500 Internal Server Error`: Failed to record execution

## Using API Endpoints in n8n Workflows

### Standard Workflow Pattern

1. **Start with Webhook Trigger**:
   - This exposes an URL that Keyholders can call
   - Receives client and automation IDs

2. **Check Credits**:
   - Make HTTP request to `/api/n8n/check-credits`
   - Pass client and automation IDs as query parameters

3. **Evaluate Credits**:
   - Use IF node to check `hasCredits` value
   - Only proceed if credits are available

4. **Run Business Logic**:
   - Execute your custom workflow operations
   - Process data as needed

5. **Deduct Credits**:
   - Make HTTP request to `/api/n8n/deduct-credit`
   - Only after successful execution

6. **Return Results**:
   - Return formatted results to caller
   - Use Respond to Webhook node

### Error Handling

Each API endpoint returns specific error codes and messages. Your workflow should handle these appropriately:

1. **Credit Check Errors**:
   - If `hasCredits` is false, return error with required credits
   - If client/automation not found, return appropriate error

2. **Credit Deduction Errors**:
   - Retry logic for temporary failures
   - Alert system for persistent failures

3. **Webhook Response Errors**:
   - Log errors for troubleshooting
   - Consider implementing a retry mechanism

## Environment Variables

To make your workflows portable and secure, use environment variables:

```
KEYHOLDERS_API_URL=https://your-keyholders-app.com
WEBHOOK_SECRET=your-webhook-secret
```

Access these in HTTP Request nodes:
```
url: "={{$env.KEYHOLDERS_API_URL}}/api/n8n/check-credits"
```

## API Authentication

The Keyholders API currently uses clientId and automationId parameters for authentication. These values are automatically provided by the Keyholders platform when triggering your workflow.

For enhanced security, the webhook endpoints support signature verification:

1. Webhook requests include an `X-Keyholders-Signature` header
2. This signature is an HMAC SHA-256 hash of the request body
3. Verify this signature using your webhook secret

Example signature verification in n8n:

```javascript
// Function node to verify signature
const crypto = require('crypto');
const signature = $input.first().headers['x-keyholders-signature'];
const payload = JSON.stringify($input.first().json);
const calculatedSignature = crypto
  .createHmac('sha256', $env.WEBHOOK_SECRET)
  .update(payload)
  .digest('hex');

if (signature !== calculatedSignature) {
  throw new Error('Invalid webhook signature');
}

return $input.first();
```

## Custom API Integration Examples

### Example 1: Social Media Monitor with Credit System

```javascript
// After checking credits and before deducting them
// Make API call to social media platform
const response = await $http.request({
  method: 'GET',
  url: 'https://api.social-platform.com/mentions',
  headers: {
    'Authorization': `Bearer ${$env.SOCIAL_API_KEY}`
  },
  params: {
    'query': $input.first().json.payload.brand,
    'from': $input.first().json.payload.startDate
  }
});

// Process results
const mentions = response.data.results.map(item => ({
  platform: 'twitter',
  text: item.text,
  user: item.user.name,
  sentiment: item.sentiment,
  url: item.url,
  date: item.created_at
}));

// Only deduct credits if we found results
if (mentions.length > 0) {
  // Call deduct-credit API
  await $http.request({
    method: 'POST',
    url: `${$env.KEYHOLDERS_API_URL}/api/n8n/deduct-credit`,
    data: {
      clientId: $input.first().json.clientId,
      automationId: $input.first().json.automationId,
      n8nExecutionId: $execution.id
    }
  });
}

// Return results
return {
  json: {
    success: true,
    mentions: mentions,
    count: mentions.length,
    query: $input.first().json.payload.brand
  }
};
```

### Example 2: Dynamic Credit Cost Based on Complexity

```javascript
// Function to determine credit cost based on request complexity
const calculateCreditCost = (payload) => {
  let baseCost = 1;
  
  // More detailed analysis costs more
  if (payload.detailed === true) baseCost += 1;
  
  // More sources cost more
  if (payload.sources && Array.isArray(payload.sources)) {
    baseCost += Math.min(payload.sources.length, 5);
  }
  
  return baseCost;
};

// Get the dynamic credit cost
const creditCost = calculateCreditCost($input.first().json.payload);

// Deduct the appropriate number of credits
await $http.request({
  method: 'POST',
  url: `${$env.KEYHOLDERS_API_URL}/api/n8n/deduct-credit`,
  data: {
    clientId: $input.first().json.clientId,
    automationId: $input.first().json.automationId,
    n8nExecutionId: $execution.id,
    amount: creditCost
  }
});

// Include the credit cost in the response
return {
  json: {
    success: true,
    results: processedResults,
    creditsUsed: creditCost
  }
};
```

## API Versioning

The current API version is v1 (implicit in the URL structure). Future versions will use explicit versioning:

- v1: `/api/n8n/check-credits` (current)
- v2: `/api/v2/n8n/check-credits` (future)

Always check the Keyholders documentation for the latest API endpoints and parameters.

## Rate Limiting

The Keyholders API implements rate limiting to prevent abuse:

- Maximum 60 requests per minute per client
- Maximum 1000 requests per day per client

If you exceed these limits, you'll receive a `429 Too Many Requests` response.

## Further Resources

- [n8n Webhook Integration Guide](./n8n-webhooks.md)
- [n8n Credit Integration Guide](./n8n-credit-integration.md)
- [Full n8n Integration Documentation](./n8n-integration.md) 
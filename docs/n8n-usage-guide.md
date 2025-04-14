# n8n Workflow Usage Guide

This guide provides step-by-step instructions for creating webhook-based n8n workflows that integrate with the Keyholders Agency platform's credit system. It includes practical examples, templates, and best practices for building workflows that you can monetize through the Keyholders marketplace.

## Getting Started

### Prerequisites

- n8n Cloud account or local n8n installation (v0.214.0 or later recommended)
- Access to the Keyholders Agency platform
- Basic understanding of API calls and webhook concepts

### Setting Up Your Development Environment

1. **Configure Environment Variables**:
   - `KEYHOLDERS_API_URL`: Your Keyholders platform URL
   - `WEBHOOK_SECRET`: Secret key for verifying webhook signatures

2. **Install Required n8n Nodes**:
   - HTTP Request
   - Function
   - IF
   - Switch
   - Respond to Webhook

## Core Workflow Template

Every webhook-based workflow follows this pattern:

### 1. The Webhook Trigger Node

```json
{
  "parameters": {
    "httpMethod": "POST",
    "path": "your-workflow-name",
    "responseMode": "responseNode",
    "options": {
      "rawBody": true
    }
  },
  "name": "Webhook",
  "type": "n8n-nodes-base.webhook",
  "typeVersion": 1
}
```

### 2. Credit Check Node

```json
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
    }
  },
  "name": "Check Credits",
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 3
}
```

### 3. Credit Decision Node

```json
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
  "typeVersion": 1
}
```

### 4. Credit Deduction Node

```json
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
    }
  },
  "name": "Deduct Credit",
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 3
}
```

### 5. Response Nodes

**Success Response**:
```json
{
  "parameters": {
    "responseCode": "200",
    "responseData": "json",
    "responseDataJson": "={ \"success\": true, \"data\": {{$json.result}} }"
  },
  "name": "Success Response",
  "type": "n8n-nodes-base.respondToWebhook",
  "typeVersion": 1
}
```

**Insufficient Credits Response**:
```json
{
  "parameters": {
    "responseCode": "402",
    "responseData": "json",
    "responseDataJson": "={ \"error\": true, \"message\": \"Insufficient credits\", \"required\": {{$json.required}}, \"available\": {{$json.remaining}} }"
  },
  "name": "Insufficient Credits Response",
  "type": "n8n-nodes-base.respondToWebhook",
  "typeVersion": 1
}
```

## Example Workflows

### 1. Google Calendar Meeting Checker

This workflow checks a user's Google Calendar for upcoming meetings and returns the results.

#### Step 1: Create the basic workflow structure using the Core Template

1. Create a new workflow in n8n
2. Add the Webhook Trigger node with path "meeting-checker"
3. Add the Credit Check node connected to the Webhook
4. Add the Credit Decision IF node connected to Credit Check
5. Add the insufficient credits response to the "false" output

#### Step 2: Add the Google Calendar integration

```json
{
  "parameters": {
    "authentication": "oauth2",
    "resource": "event",
    "calendar": "primary",
    "operation": "getAll",
    "timeMin": "={{$now.toISOString()}}",
    "timeMax": "={{$today.endOf('day').toISOString()}}",
    "singleEvents": true,
    "orderBy": "startTime",
    "options": {}
  },
  "name": "Google Calendar",
  "type": "n8n-nodes-base.googleCalendar",
  "typeVersion": 1,
  "position": [800, 300],
  "credentials": {
    "googleCalendarOAuth2Api": {
      "id": "googleCalendarCredential",
      "name": "Google Calendar account"
    }
  }
}
```

#### Step 3: Add a Function node to format the meetings

```json
{
  "parameters": {
    "functionCode": "// Process the calendar events into a cleaner format\nconst meetings = $input.first().json.items?.map(event => ({\n  id: event.id,\n  title: event.summary,\n  start: event.start.dateTime || event.start.date,\n  end: event.end.dateTime || event.end.date,\n  location: event.location,\n  description: event.description,\n  attendees: event.attendees?.map(a => a.email) || [],\n  link: event.htmlLink\n})) || [];\n\n// Return formatted data\nreturn {\n  json: {\n    hasMeetings: meetings.length > 0,\n    meetings,\n    count: meetings.length,\n    date: $now.toISOString()\n  }\n};"
  },
  "name": "Format Meetings",
  "type": "n8n-nodes-base.function",
  "typeVersion": 1,
  "position": [1000, 300]
}
```

#### Step 4: Add the Credit Deduction node

Connect the Credit Deduction node after the Format Meetings node.

#### Step 5: Add the Success Response node

Connect the Success Response node after the Credit Deduction node.

#### Final Workflow Connections

- Webhook → Credit Check
- Credit Check → Has Credits? 
- Has Credits? (true) → Google Calendar
- Has Credits? (false) → Insufficient Credits Response
- Google Calendar → Format Meetings
- Format Meetings → Deduct Credit
- Deduct Credit → Success Response

### 2. Website Change Monitor

This workflow checks if a website has changed since the last check.

#### Step 1: Create the basic workflow structure using the Core Template

Use the same structure as in the previous example, but with path "website-change-monitor".

#### Step 2: Add the HTTP Request to fetch the website

```json
{
  "parameters": {
    "url": "={{$json.payload.url}}",
    "options": {
      "redirect": {
        "follow": true
      }
    }
  },
  "name": "Fetch Website",
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 3,
  "position": [800, 300]
}
```

#### Step 3: Add HTML extraction

```json
{
  "parameters": {
    "functionCode": "// Extract the main content\nconst html = $input.first().json.data;\nlet content = html;\n\n// Remove scripts, styles, and navigation elements to focus on content\ncontent = content.replace(/<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi, '');\ncontent = content.replace(/<style\\b[^<]*(?:(?!<\\/style>)<[^<]*)*<\\/style>/gi, '');\ncontent = content.replace(/<nav\\b[^<]*(?:(?!<\\/nav>)<[^<]*)*<\\/nav>/gi, '');\ncontent = content.replace(/<header\\b[^<]*(?:(?!<\\/header>)<[^<]*)*<\\/header>/gi, '');\ncontent = content.replace(/<footer\\b[^<]*(?:(?!<\\/footer>)<[^<]*)*<\\/footer>/gi, '');\n\n// Generate a hash of the content\nconst crypto = require('crypto');\nconst contentHash = crypto.createHash('md5').update(content).digest('hex');\n\n// Return the processed data\nreturn {\n  json: {\n    url: $input.first().json.payload.url,\n    contentHash,\n    fetchTime: new Date().toISOString(),\n    contentLength: content.length\n  }\n};"
  },
  "name": "Process Content",
  "type": "n8n-nodes-base.function",
  "typeVersion": 1,
  "position": [1000, 300]
}
```

#### Step 4: Add a persistent data node to compare with previous check

```json
{
  "parameters": {
    "functionCode": "// Get data from previous run using n8n's built-in storage\nconst workflow = $getWorkflow();\nconst previousData = await $getWorkflowStaticData('global');\n\n// Get current data\nconst currentData = $input.first().json;\n\n// Initialize response\nlet response = {\n  url: currentData.url,\n  currentHash: currentData.contentHash,\n  fetchTime: currentData.fetchTime,\n  hasChanged: false,\n  previousFetchTime: null\n};\n\n// Check if we have previous data to compare\nif (previousData.contentHash && previousData.url === currentData.url) {\n  response.previousHash = previousData.contentHash;\n  response.previousFetchTime = previousData.fetchTime;\n  response.hasChanged = previousData.contentHash !== currentData.contentHash;\n}\n\n// Save current data for next comparison\nawait $setWorkflowStaticData('global', {\n  url: currentData.url,\n  contentHash: currentData.contentHash,\n  fetchTime: currentData.fetchTime\n});\n\nreturn { json: response };"
  },
  "name": "Compare With Previous",
  "type": "n8n-nodes-base.function",
  "typeVersion": 1,
  "position": [1200, 300]
}
```

#### Step 5: Add an IF node to check if content has changed

```json
{
  "parameters": {
    "conditions": {
      "boolean": [
        {
          "value1": "={{$json.hasChanged}}",
          "value2": true
        }
      ]
    }
  },
  "name": "Has Changed?",
  "type": "n8n-nodes-base.if",
  "typeVersion": 1,
  "position": [1400, 300]
}
```

#### Step 6: Add the Credit Deduction node only if content has changed

Connect the Credit Deduction node after the "true" output of the Has Changed? node.

#### Step 7: Add two Success Response nodes

**Changed Response**:
```json
{
  "parameters": {
    "responseCode": "200",
    "responseData": "json",
    "responseDataJson": "={ \"success\": true, \"hasChanged\": true, \"url\": \"{{$json.url}}\", \"lastChecked\": \"{{$json.previousFetchTime}}\", \"currentCheck\": \"{{$json.fetchTime}}\" }"
  },
  "name": "Changed Response",
  "type": "n8n-nodes-base.respondToWebhook",
  "typeVersion": 1
}
```

**No Change Response**:
```json
{
  "parameters": {
    "responseCode": "200",
    "responseData": "json",
    "responseDataJson": "={ \"success\": true, \"hasChanged\": false, \"url\": \"{{$json.url}}\", \"lastChecked\": \"{{$json.previousFetchTime}}\", \"currentCheck\": \"{{$json.fetchTime}}\" }"
  },
  "name": "No Change Response",
  "type": "n8n-nodes-base.respondToWebhook",
  "typeVersion": 1
}
```

#### Final Workflow Connections

- Webhook → Credit Check
- Credit Check → Has Credits?
- Has Credits? (true) → Fetch Website
- Has Credits? (false) → Insufficient Credits Response
- Fetch Website → Process Content
- Process Content → Compare With Previous
- Compare With Previous → Has Changed?
- Has Changed? (true) → Deduct Credit
- Has Changed? (false) → No Change Response
- Deduct Credit → Changed Response

## Best Practices

### 1. Error Handling

Always implement comprehensive error handling:

```json
{
  "parameters": {
    "functionCode": "try {\n  // Your code here\n  return $input.first();\n} catch (error) {\n  // Return a standardized error format\n  return {\n    json: {\n      error: true,\n      message: error.message,\n      details: error.stack\n    }\n  };\n}"
  },
  "name": "Error Handler",
  "type": "n8n-nodes-base.function",
  "typeVersion": 1
}
```

### 2. Payload Validation

Always validate incoming webhook payloads:

```json
{
  "parameters": {
    "functionCode": "const input = $input.first().json;\n\n// Validate required fields\nif (!input.clientId) {\n  throw new Error('Missing clientId parameter');\n}\n\nif (!input.automationId) {\n  throw new Error('Missing automationId parameter');\n}\n\n// Validate payload structure if needed\nif (input.payload) {\n  // Add specific payload validation here\n  // Example: Check if URL is provided for website monitor\n  if (input.payload.url && !input.payload.url.startsWith('http')) {\n    throw new Error('Invalid URL format');\n  }\n}\n\nreturn $input.first();"
  },
  "name": "Validate Payload",
  "type": "n8n-nodes-base.function",
  "typeVersion": 1
}
```

### 3. Resource Conservation

Only deduct credits when necessary:

```javascript
// Only deduct credits if we actually provided value
if (hasProvidedValue) {
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
```

### 4. Performance Optimization

Optimize your workflows for speed and efficiency:

1. Use parallel processing when possible
2. Implement caching for frequently accessed data
3. Minimize external API calls
4. Batch operations when possible

### 5. Security Best Practices

1. Verify webhook signatures
2. Never expose sensitive credentials
3. Use environment variables for all secrets
4. Implement rate limiting for outgoing requests

## Troubleshooting Common Issues

### Webhook Not Receiving Requests

1. Verify the webhook URL is correctly registered in Keyholders
2. Check n8n logs for incoming requests
3. Ensure proper network connectivity
4. Verify proper port forwarding if using local n8n

### Credit System Issues

1. Log the request and response of all credit API calls
2. Verify client and automation IDs are being passed correctly
3. Check client's credit balance in the Keyholders dashboard
4. Use test mode to validate workflow without deducting credits

### Third-Party API Integration Issues

1. Verify API credentials are valid
2. Check for rate limiting or quota issues
3. Monitor for API changes or deprecations
4. Implement retry logic for transient failures

## Monetization Strategies

### 1. Per-Execution Pricing

- Assign different credit costs based on complexity
- Higher value workflows can command more credits
- Consider volume discounts for frequent users

### 2. Subscription Tiers

- Basic workflows included in entry-level subscriptions
- Premium workflows only available in higher tiers
- Unlimited access for enterprise clients

### 3. Usage-Based Pricing

- Variable credit costs based on actual resource usage
- More intensive operations cost more credits
- Usage metrics tracked and reported to clients

## Resources

- [n8n Official Documentation](https://docs.n8n.io/)
- [Keyholders Webhook API Reference](./n8n-api-guide.md)
- [n8n Credit System Integration Guide](./n8n-credit-integration.md)
- [Webhook Integration Guide](./n8n-webhooks.md)

## Need Help?

For assistance with n8n webhook integration:
- Contact your Keyholders account manager
- Join our developer community on Discord
- Submit a support ticket through the Keyholders dashboard 
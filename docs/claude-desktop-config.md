# Claude Desktop Configuration with n8n MCP Integration

This document explains how to connect Claude Desktop to your n8n cloud instance using our SSE proxy.

## Setup Instructions

1. Deploy your Next.js application to Vercel (or your preferred host)
2. In Claude Desktop settings, configure the MCP endpoint to point to:

```
https://[your-domain]/api/mcp
```

3. Ensure your Claude Desktop app is authorized to connect to this endpoint

## How It Works

The `/api/mcp` route in this project functions as a Server-Sent Events (SSE) proxy that connects to your n8n cloud instance. It:

1. Forwards requests from Claude Desktop to your n8n cloud
2. Maintains the SSE connection for real-time communication
3. Properly handles streaming data in both directions

## Troubleshooting

If you experience connection issues:

- Check that your Next.js application is properly deployed
- Verify that your n8n cloud instance is running and accessible
- Ensure no firewalls or security settings are blocking the connections
- Check the server logs for any specific error messages

## Security Considerations

The proxy forwards authentication headers, so make sure your Claude Desktop is properly configured with any required authentication tokens for your n8n instance. 
// Server-Sent Events (SSE) proxy for n8n cloud
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Set SSE headers on the response
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // Prevents buffering for Nginx
  
  try {
    // Create headers to forward to the n8n cloud
    const headers = new Headers();
    
    // Forward relevant headers from the original request
    Object.entries(req.headers).forEach(([key, value]) => {
      // Skip connection headers that might interfere with the fetch request
      if (!['host', 'connection', 'accept-encoding'].includes(key.toLowerCase()) && value !== undefined) {
        headers.append(key, Array.isArray(value) ? value.join(', ') : value);
      }
    });
    
    // Set the Accept header to text/event-stream
    headers.set('Accept', 'text/event-stream');
    
    const targetUrl = 'https://keyholders.app.n8n.cloud/mcp/845de225-2b3c-4643-8fc5-b310446de9b5/sse';
    
    // Make the fetch request to the n8n cloud
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      throw new Error(`Upstream server returned ${response.status} ${response.statusText}`);
    }
    
    // Ensure we have a readable stream
    if (!response.body) {
      throw new Error("No response body from upstream server");
    }
    
    // Get the ReadableStream from the response
    const reader = response.body.getReader();
    
    // Process the stream
    async function processStream() {
      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            res.end();
            break;
          }
          
          // Write the chunk to the response
          res.write(value);
          
          // No need to flush manually - Node.js will handle the streaming
        }
      } catch (error) {
        console.error('Error processing stream:', error);
        res.end();
      }
    }
    
    // Start processing the stream
    processStream();
    
    // Handle client disconnect
    req.on('close', () => {
      reader.cancel();
    });
    
  } catch (error) {
    console.error('SSE Proxy Error:', error);
    // If headers have already been sent, we can only end the response
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.end();
    }
  }
} 
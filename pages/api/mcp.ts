import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end('Method Not Allowed');
    return;
  }

  const targetUrl = 'https://keyholders.app.n8n.cloud/mcp/845de225-2b3c-4643-8fc5-b310446de9b5/sse';

  try {
    const upstream = await fetch(targetUrl, {
      headers: {
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });

    if (!upstream.ok || !upstream.body) {
      res.status(502).end('Bad upstream response');
      return;
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();

    const pump = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          res.write(chunk);
          if (typeof (res as any).flush === 'function') (res as any).flush();
        }
      } catch (err) {
        console.error('Stream error:', err);
      } finally {
        res.end();
      }
    };

    req.on('close', () => {
      reader.cancel();
      res.end();
    });

    pump();
  } catch (error) {
    console.error('SSE Proxy Error:', error);
    if (!res.headersSent) {
      res.status(500).end('Internal Server Error');
    } else {
      res.end();
    }
  }
}

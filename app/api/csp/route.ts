import { NextRequest, NextResponse } from 'next/server';

// API route to set Content-Security-Policy for iframe embedding
export async function GET(req: NextRequest) {
  const response = NextResponse.json({ status: 'ok' });
  
  // Set CSP header to allow iframe embedding from our n8n instance
  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self' http://localhost:5678"
  );
  
  return response;
} 
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This middleware only adds CSP headers for n8n iframe embedding
export function middleware(request: NextRequest) {
  // Only apply CSP headers to the builder page
  if (request.nextUrl.pathname.startsWith('/dashboard/automations/builder')) {
    const response = NextResponse.next();
    
    // Add Content-Security-Policy header to allow iframe embedding
    response.headers.set(
      'Content-Security-Policy',
      "frame-ancestors 'self' http://localhost:5678"
    );
    
    return response;
  }
  
  return NextResponse.next();
}

// Only apply middleware to the builder page that embeds n8n in an iframe
export const config = {
  matcher: ['/dashboard/automations/builder/:path*'],
};
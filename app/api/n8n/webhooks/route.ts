import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

/**
 * API route for n8n webhooks
 * 
 * This route accepts webhook calls from n8n when workflows complete,
 * allowing us to update execution status and handle credits
 */
export async function POST(request: Request) {
  try {
    // Parse the webhook payload
    const payload = await request.json();
    
    // Log the webhook payload for debugging
    console.log('Received n8n webhook:', payload);
    
    // Extract key information
    const {
      clientId,
      automationId,
      executionId,
      status,
      result,
    } = payload;
    
    // Skip processing if critical data is missing
    if (!clientId || !automationId) {
      return NextResponse.json({ 
        success: false,
        error: 'Missing required parameters (clientId, automationId)' 
      }, { status: 400 });
    }
    
    // Initialize Convex client
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    
    try {
      // Record the execution in our database
      await convex.mutation(api.clients.recordClientExecution, {
        clientId,
        automationId,
        n8nExecutionId: executionId || `webhook-${Date.now()}`,
        status: status || 'success',
        startedAt: Date.now() - 1000, // Approximate start time (1 second ago)
        finishedAt: Date.now(),
        result: result || { received: true },
      });
      
      return NextResponse.json({ 
        success: true,
        message: 'Execution recorded and credits processed' 
      });
    } catch (error) {
      console.error('Error recording execution:', error);
      return NextResponse.json({ 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to record execution'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing n8n webhook:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : 'Failed to process webhook' 
      },
      { status: 500 }
    );
  }
} 
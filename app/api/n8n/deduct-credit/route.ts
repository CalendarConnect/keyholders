import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

/**
 * API endpoint for n8n to deduct credits after a successful workflow execution
 */
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { clientId, automationId, n8nExecutionId, amount = 1 } = body;
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'Missing clientId parameter' },
        { status: 400 }
      );
    }

    if (!automationId) {
      return NextResponse.json(
        { error: 'Missing automationId parameter' },
        { status: 400 }
      );
    }

    if (!n8nExecutionId) {
      return NextResponse.json(
        { error: 'Missing n8nExecutionId parameter' },
        { status: 400 }
      );
    }

    // Initialize Convex client
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    
    try {
      // Record the execution and deduct credits
      await convex.mutation(api.clients.recordClientExecution, {
        clientId,
        automationId,
        n8nExecutionId,
        status: 'success',
        startedAt: Date.now(),
        finishedAt: Date.now(),
        result: { success: true },
      });
      
      return NextResponse.json({
        success: true,
        message: 'Credits deducted successfully',
        clientId,
        automationId,
        n8nExecutionId
      });
    } catch (error) {
      console.error('Error deducting credits:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: error instanceof Error ? error.message : 'Failed to deduct credits' 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in deduct-credit API:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process request' 
      },
      { status: 500 }
    );
  }
} 
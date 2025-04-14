import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

/**
 * API endpoint to dispatch workflows to n8n
 * 
 * This handles:
 * 1. Checking if the client has enough credits
 * 2. Triggering the n8n webhook if they do
 * 3. Returning appropriate response
 */
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { clientId, automationId, payload = {} } = body;
    
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

    // Initialize Convex client
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    
    try {
      // 1. Get client details
      const client = await convex.query(api.clients.getClient, { id: clientId });
      if (!client) {
        return NextResponse.json(
          { error: 'Client not found' },
          { status: 404 }
        );
      }
      
      // 2. Get the automation assignment
      const assignment = await convex.query(api.clients.getClientAutomationAssignment, {
        clientId,
        automationId
      });
      
      if (!assignment) {
        return NextResponse.json(
          { error: 'Automation not assigned to this client' },
          { status: 403 }
        );
      }
      
      if (!assignment.isActive) {
        return NextResponse.json(
          { error: 'Automation is not active for this client' },
          { status: 403 }
        );
      }
      
      // 3. Check if client has enough credits
      if (client.creditBalance < assignment.creditsPerExecution) {
        return NextResponse.json(
          { 
            error: 'Insufficient credits',
            required: assignment.creditsPerExecution,
            available: client.creditBalance
          },
          { status: 402 } // Payment Required
        );
      }
      
      // 4. Get the automation details to get the webhook URL
      const automation = await convex.query(api.automations.getAutomationDetails, { id: automationId });
      if (!automation || !automation.webhookUrl) {
        return NextResponse.json(
          { error: 'Automation webhook not configured' },
          { status: 500 }
        );
      }
      
      // 5. Call the n8n webhook
      const webhookResponse = await fetch(automation.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          clientId,
          automationId,
          executionTime: Date.now(),
        }),
      });
      
      if (!webhookResponse.ok) {
        // Log the error but don't expose details to client
        console.error('n8n webhook error:', await webhookResponse.text());
        return NextResponse.json(
          { error: 'Failed to trigger workflow', status: webhookResponse.status },
          { status: 502 } // Bad Gateway
        );
      }
      
      // 6. Record the execution and deduct credits
      await convex.mutation(api.clients.recordClientExecution, {
        clientId,
        automationId,
        n8nExecutionId: `manual-${Date.now()}`, // For manual triggers without n8n execution ID
        status: 'success',
        startedAt: Date.now(),
        finishedAt: Date.now(),
        result: { success: true },
      });
      
      // 7. Return success
      return NextResponse.json({
        success: true,
        message: 'Workflow triggered successfully',
      });
      
    } catch (error) {
      console.error('Error in dispatch workflow:', error);
      return NextResponse.json(
        { 
          error: error instanceof Error ? error.message : 'Failed to dispatch workflow' 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in dispatch API:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process request' 
      },
      { status: 500 }
    );
  }
} 
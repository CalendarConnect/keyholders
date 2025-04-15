import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

/**
 * API endpoint for n8n to check if a client has enough credits
 * 
 * This will be called by n8n before executing a workflow
 */
export async function GET(request: Request) {
  try {
    // Get the client ID from the query params
    const url = new URL(request.url);
    const clientId = url.searchParams.get('clientId');
    const automationId = url.searchParams.get('automationId');
    
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
    
    // Fetch client and check credits
    try {
      // Get the client automation assignment to determine credits needed
      const assignment = await convex.query(api.clients.getClientAutomationAssignment, {
        clientId,
        automationId
      });
      
      if (!assignment) {
        return NextResponse.json(
          { hasCredits: false, error: 'Automation not assigned to this client' },
          { status: 403 }
        );
      }
      
      if (!assignment.isActive) {
        return NextResponse.json(
          { hasCredits: false, error: 'Automation is not active for this client' },
          { status: 403 }
        );
      }
      
      // Get client's credit balance
      const client = await convex.query(api.clients.getClient, { 
        id: clientId as any // Type cast to prevent type error during build
      });
      
      if (!client) {
        return NextResponse.json(
          { hasCredits: false, error: 'Client not found' },
          { status: 404 }
        );
      }
      
      // Check if client has enough credits
      const hasEnoughCredits = client.creditBalance >= assignment.creditsPerExecution;
      
      return NextResponse.json({
        hasCredits: hasEnoughCredits,
        required: assignment.creditsPerExecution,
        remaining: client.creditBalance,
        clientId: clientId,
        automationId: automationId
      });
    } catch (error) {
      console.error('Error fetching client data:', error);
      return NextResponse.json(
        { 
          hasCredits: false, 
          error: error instanceof Error ? error.message : 'Failed to check client credits' 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in check-credits API:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process request' 
      },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

/**
 * API route for n8n webhooks
 * 
 * This route accepts webhook calls from n8n when workflows complete,
 * allowing us to update execution status and handle credits
 */
const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation for required fields
    if (!data.content) {
      return NextResponse.json(
        { success: false, error: "Missing required field: content" },
        { status: 400 }
      );
    }
    
    // Extract the user ID from the request if present
    const userId = data.userId || data.user?.tokenIdentifier;
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Missing required field: userId" },
        { status: 400 }
      );
    }
    
    // Save the message to Convex
    await client.mutation(api.linkedout.saveWebhookMessage, {
      content: data.content,
      chatId: data.chatId,
      messageId: data.messageId,
      recipientName: data.recipientName,
      linkedinProfileURL: data.linkedinProfileURL,
      recipientLinkedInFollowerCount: data.recipientLinkedInFollowerCount,
      timestamp: data.timestamp || new Date().toISOString(),
      isFromMe: data.isFromMe !== undefined ? data.isFromMe : false,
      userId: userId,
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
} 
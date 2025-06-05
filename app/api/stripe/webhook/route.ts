import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET || "", {
  apiVersion: "2023-10-16",
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed:`, err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    try {
      // Get template details from metadata
      const { templateSlug, tier } = session.metadata || {};
      const email = session.customer_email;
      
      if (!templateSlug || !email) {
        throw new Error("Missing required metadata");
      }

      // Get template from Convex
      const template = await convex.query(api.templates.getBySlug, {
        slug: templateSlug,
      });

      if (!template) {
        throw new Error(`Template with slug "${templateSlug}" not found`);
      }

      // Update order in Convex
      await convex.mutation(api.templates.updateOrderWithDownload, {
        stripeSessionId: session.id,
        downloadUrl: `https://keyholders.agency/templates/${templateSlug}`, // Direct template page
        downloadExpiry: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
      });

      // Send email confirmation
      await resend.emails.send({
        from: "noreply@keyholders.agency",
        to: email,
        subject: `Your Keyholders Template Purchase: ${template.name}`,
        html: `
          <h1>Thank you for your purchase!</h1>
          <p>You've successfully purchased <strong>${template.name}</strong> (${tier}).</p>
          <p><a href="https://keyholders.agency/templates/${templateSlug}" target="_blank">Access Your Template</a></p>
          <p>You can access your template at any time from your account dashboard.</p>
          <p>If you have any questions about setting up your template, please don't hesitate to reach out.</p>
          <p>Best regards,<br>The Keyholders Team</p>
        `,
      });

      console.log(`✅ Successfully processed order for ${templateSlug}`);
    } catch (error) {
      console.error("Error processing checkout session:", error);
      return NextResponse.json(
        { error: "Failed to process checkout session" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
} 
import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET || "", {
  apiVersion: "2023-10-16",
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE || ""
);

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

      // Generate a signed URL for the template file download
      const fileName = `${template.slug}-${tier}.zip`;
      const { data: signedUrl } = await supabase.storage
        .from("template-files")
        .createSignedUrl(`${templateSlug}/${fileName}`, 24 * 60 * 60); // 24 hours

      if (!signedUrl) {
        throw new Error("Failed to generate signed download URL");
      }

      // Update order in Convex with download link
      await convex.mutation(api.templates.updateOrderWithDownload, {
        stripeSessionId: session.id,
        downloadUrl: signedUrl,
        downloadExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
      });

      // Send email with download link
      await resend.emails.send({
        from: "noreply@keyholders.agency",
        to: email,
        subject: `Your Keyholders Template Download: ${template.name}`,
        html: `
          <h1>Thank you for your purchase!</h1>
          <p>Your download for <strong>${template.name}</strong> (${tier}) is ready:</p>
          <p><a href="${signedUrl}" target="_blank">Download Now</a></p>
          <p>This link is valid for 24 hours. If you need to access your download after that, please contact us.</p>
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
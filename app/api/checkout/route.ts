import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import Stripe from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET || "", {
  apiVersion: "2023-10-16",
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

// Validate checkout request data
const checkoutSchema = z.object({
  email: z.string().email(),
  templateSlug: z.string(),
  priceId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    
    // Validate request data
    const result = checkoutSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.message }, { status: 400 });
    }

    const { email, templateSlug, priceId } = result.data;

    // Get template details from Convex
    const template = await convex.query(api.templates.getBySlug, { slug: templateSlug });
    
    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    // Find the selected pricing plan
    const selectedPlan = template.pricing.find(plan => 
      plan.ctaType === "stripe" && plan.ctaValue === priceId
    );

    if (!selectedPlan) {
      return NextResponse.json({ error: "Price not found" }, { status: 404 });
    }

    if (selectedPlan.priceMode !== "fixed" || !selectedPlan.priceCents) {
      return NextResponse.json({ error: "Invalid price configuration" }, { status: 400 });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: template.name,
              description: `${selectedPlan.label} - ${selectedPlan.tier}`,
              images: [template.heroUrl],
            },
            unit_amount: selectedPlan.priceCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/winkel/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/winkel/${template.slug}`,
      customer_email: email,
      metadata: {
        templateSlug,
        priceId,
        tier: selectedPlan.tier,
      },
    });

    // Create pending order in Convex
    await convex.mutation(api.templates.createOrder, {
      stripeSessionId: session.id,
      email,
      templateSlug,
      priceId,
    });

    // Return session ID to the client
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
} 
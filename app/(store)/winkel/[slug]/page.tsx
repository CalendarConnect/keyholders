"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PricingDeck, { PricingPlan } from "@/components/templates/pricing-deck";
import FeatureMatrix from "@/components/templates/feature-matrix";
import CheckoutForm from "@/components/templates/checkout-form";
import { loadStripe } from "@stripe/stripe-js";
import GiveawayTemplatePage from "@/components/templates/giveaway-template-page";
import StandardTemplatePage from "@/components/templates/standard-template-page";

// Initialize Stripe outside of component to avoid re-initialization
const getStripe = () => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "");

export default function TemplateDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug as string;
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isGiveawayOpen, setIsGiveawayOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch template details from Convex
  const template = useQuery(api.templates.getBySlug, { slug });
  
  // Check if there's a hash in the URL to automatically open giveaway
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#giveaway') {
        // Find the giveaway plan
        const giveawayPlan = template?.pricing.find(plan => plan.tier === 'giveaway');
        if (giveawayPlan) {
          handleCheckout(giveawayPlan);
        }
      }
    };

    // Check on initial load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [template]);
  
  // Loading state
  if (!template) {
    return <TemplateDetailSkeleton />;
  }
  
  // Handle 404
  if (template === null) {
    return <TemplateNotFound />;
  }
  
  // Check if this template has a giveaway pricing plan
  const hasGiveaway = template.pricing.some(plan => plan.tier === "giveaway");
  
  // Show giveaway page if this template has a giveaway plan
  if (hasGiveaway) {
    return <GiveawayTemplatePage slug={slug} />;
  }
  
  // Otherwise show standard template page
  return <StandardTemplatePage slug={slug} />;
}

interface DescriptionBlockProps {
  title: string;
  content: string;
}

function DescriptionBlock({ title, content }: DescriptionBlockProps) {
  return (
    <div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/70">{content}</p>
    </div>
  );
}

function TemplateDetailSkeleton() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="w-40 h-6 bg-white/10 rounded-lg animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <div className="aspect-[16/9] rounded-2xl bg-white/10 animate-pulse" />
          
          <div className="mt-8 flex gap-3">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="w-8 h-8 bg-white/10 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-24 h-6 bg-white/10 rounded-full animate-pulse" />
            <div className="w-40 h-6 bg-white/10 rounded-lg animate-pulse" />
          </div>
          
          <div className="h-10 w-3/4 bg-white/10 rounded-xl mb-4 animate-pulse" />
          <div className="h-6 w-2/3 bg-white/10 rounded-lg mb-6 animate-pulse" />
          
          <div className="space-y-6">
            {Array(5).fill(0).map((_, i) => (
              <div key={i}>
                <div className="w-40 h-6 bg-white/10 rounded-lg mb-2 animate-pulse" />
                <div className="w-full h-16 bg-white/10 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <div className="h-8 w-48 mx-auto bg-white/10 rounded-lg mb-8 animate-pulse" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-96 bg-white/10 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
      
      <div>
        <div className="h-8 w-48 mx-auto bg-white/10 rounded-lg mb-8 animate-pulse" />
        <div className="h-80 bg-white/10 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}

import TemplateNotFound from "@/components/templates/template-not-found"; 
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PricingDeck, { PricingPlan } from "@/components/templates/pricing-deck";
import FeatureMatrix from "@/components/templates/feature-matrix";
import CheckoutForm from "@/components/templates/checkout-form";
import { loadStripe } from "@stripe/stripe-js";
import GiveawayPage from "@/components/templates/giveaway-page";
import TemplateDetailSkeleton from "./template-detail-skeleton";
import TemplateNotFound from "./template-not-found";

// Initialize Stripe outside of component to avoid re-initialization
const getStripe = () => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "");

interface StandardTemplatePageProps {
  slug: string;
}

export default function StandardTemplatePage({ slug }: StandardTemplatePageProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isGiveawayOpen, setIsGiveawayOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch template details from Convex
  const template = useQuery(api.templates.getBySlug, { slug });
  
  // Loading state
  if (!template) {
    return <TemplateDetailSkeleton />;
  }
  
  // Handle 404
  if (template === null) {
    return <TemplateNotFound />;
  }
  
  const formatCategoryName = (category: string) => {
    return category
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  
  const handleCheckout = (plan: PricingPlan) => {
    console.log('Handling checkout for plan:', plan);
    setSelectedPlan(plan);
    
    // Check if this is a giveaway plan
    if (plan.tier === "giveaway") {
      console.log('Opening giveaway form');
      setIsGiveawayOpen(true);
      setIsCheckoutOpen(false);
    } else {
      console.log('Opening regular checkout');
      setIsCheckoutOpen(true);
      setIsGiveawayOpen(false);
    }
  };
  
  const handleSubmitCheckout = async (data: { email: string }, plan: PricingPlan) => {
    if (plan.ctaType !== "stripe") return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          templateSlug: slug,
          priceId: plan.ctaValue,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to create checkout session");
      }
      
      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      if (!stripe) throw new Error("Failed to load Stripe");
      
      await stripe.redirectToCheckout({
        sessionId: result.sessionId,
      });
    } catch (error) {
      console.error("Checkout error:", error);
      // Show error toast here
    } finally {
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
    }
  };
  
  return (
    <>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/winkel" className="inline-flex items-center text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <motion.div 
              className="relative aspect-[16/9] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src={template.heroUrl}
                alt={template.name}
                fill
                className="object-cover"
                priority
              />
              {template.sticker && (
                <div className="absolute top-4 right-4 bg-pink-600 text-white text-xs font-medium py-1 px-3 rounded-full">
                  {template.sticker}
                </div>
              )}
            </motion.div>
            
            <div className="mt-8 flex flex-wrap gap-3">
              {template.icons && template.icons.map((icon) => (
                <div key={icon} className="w-8 h-8 relative bg-white/5 rounded-lg p-1.5">
                  <Image
                    src={`/icons/${icon}`}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm py-1 px-2.5 bg-white/10 rounded-full text-white/70">
                  {formatCategoryName(template.category)}
                </span>
                <span className="text-sm text-white/50">
                  By {template.author === "christian" ? "Christian Bleeker" : "Renier Bleeker"}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {template.name}
              </h1>
              
              {template.subtitle && (
                <p className="text-xl text-white/70 mb-6">
                  {template.subtitle}
                </p>
              )}
              
              <div className="space-y-6 text-white/80">
                <DescriptionBlock 
                  title="Who this is for"
                  content={template.descriptionBlocks.whoFor}
                />
                
                <DescriptionBlock 
                  title="The problem it solves"
                  content={template.descriptionBlocks.problem}
                />
                
                <DescriptionBlock 
                  title="What it does"
                  content={template.descriptionBlocks.whatItDoes}
                />
                
                <DescriptionBlock 
                  title="Setup process"
                  content={template.descriptionBlocks.setup}
                />
                
                <DescriptionBlock 
                  title="How to customize"
                  content={template.descriptionBlocks.customise}
                />
              </div>
              
              <div className="mt-8 text-sm text-white/50">
                Last updated: {new Date(template.lastUpdated).toLocaleDateString()}
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Choose Your Plan
          </h2>
          
          <PricingDeck 
            plans={template.pricing}
            templateSlug={template.slug}
            onCheckout={handleCheckout}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Compare Features
          </h2>
          
          <FeatureMatrix />
        </motion.div>
      </div>
      
      <CheckoutForm 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPlan={selectedPlan}
        templateSlug={template.slug}
        onSubmit={handleSubmitCheckout}
      />
      
      {/* Giveaway form */}
      {isGiveawayOpen && (
        <GiveawayPage 
          templateSlug={template.slug}
          isOpen={isGiveawayOpen}
          onClose={() => setIsGiveawayOpen(false)}
        />
      )}
    </>
  );
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
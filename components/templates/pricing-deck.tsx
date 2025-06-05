import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export interface PricingPlan {
  tier: "diy" | "integration" | "custom" | "giveaway";
  label: string;
  tagline?: string;
  priceMode: "fixed" | "text";
  priceCents?: number;
  priceText?: string;
  ctaLabel: string;
  ctaType: "stripe" | "link";
  ctaValue: string;
  bullets: string[];
  footer?: string;
  highlight: boolean;
}

interface PricingDeckProps {
  plans: PricingPlan[];
  templateSlug: string;
  onCheckout: (plan: PricingPlan) => void;
}

export default function PricingDeck({ plans, templateSlug, onCheckout }: PricingDeckProps) {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  
  const handleAction = (plan: PricingPlan) => {
    if (plan.ctaType === "stripe" || plan.tier === "giveaway") {
      onCheckout(plan);
    } else if (plan.ctaType === "link") {
      window.open(plan.ctaValue, "_blank");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PricingCard
            key={plan.tier}
            plan={plan}
            isHovered={hoveredPlan === plan.tier}
            onHover={() => setHoveredPlan(plan.tier)}
            onLeave={() => setHoveredPlan(null)}
            onAction={() => handleAction(plan)}
          />
        ))}
      </div>
    </div>
  );
}

interface PricingCardProps {
  plan: PricingPlan;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onAction: () => void;
}

function PricingCard({ plan, isHovered, onHover, onLeave, onAction }: PricingCardProps) {
  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(cents / 100);
  };

  const isGiveaway = plan.tier === "giveaway";

  return (
    <motion.div
      className={cn(
        "flex flex-col h-full p-6 rounded-2xl border transition-all duration-300",
        isGiveaway
          ? "border-indigo-300/30 bg-gradient-to-b from-indigo-900/20 to-indigo-800/20"
          : plan.highlight 
            ? "border-white/30 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a18]" 
            : "border-white/10 bg-[#0a0a18]",
        isHovered && (isGiveaway ? "border-indigo-400/40" : "border-white/40"),
        isHovered && "shadow-lg shadow-indigo-500/10"
      )}
      whileHover={{ y: -5 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{plan.label}</h3>
          {plan.highlight && (
            <span className="px-2 py-1 text-xs font-medium bg-indigo-600 text-white rounded-full">
              Recommended
            </span>
          )}
          {isGiveaway && (
            <span className="px-2 py-1 text-xs font-medium bg-indigo-500 text-white rounded-full">
              Free
            </span>
          )}
        </div>
        
        {plan.tagline && (
          <p className="mt-2 text-white/60 text-sm">{plan.tagline}</p>
        )}
        
        <div className="mt-6">
          {plan.priceMode === "fixed" && plan.priceCents ? (
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-white">{formatPrice(plan.priceCents)}</span>
              <span className="ml-2 text-sm text-white/60">eenmalig</span>
            </div>
          ) : (
            <div className={cn("text-xl font-semibold", isGiveaway ? "text-indigo-300" : "text-white")}>
              {plan.priceText}
            </div>
          )}
        </div>
        
        <ul className="mt-6 space-y-4">
          {plan.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-400">
                <CheckIcon className="h-5 w-5" />
              </div>
              <span className="ml-3 text-sm text-white/80">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-8">
        <Button
          id={isGiveaway ? "giveaway" : undefined}
          onClick={onAction}
          className={cn(
            "w-full py-6 rounded-xl transition-all duration-300",
            isGiveaway
              ? "bg-indigo-500 text-white hover:bg-indigo-600"
              : plan.highlight 
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-white/10 text-white hover:bg-white/20"
          )}
        >
          {plan.ctaLabel}
        </Button>
        
        {plan.footer && (
          <p className="mt-3 text-xs text-center text-white/60">{plan.footer}</p>
        )}
      </div>
    </motion.div>
  );
} 
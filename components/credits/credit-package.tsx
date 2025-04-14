"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check, Sparkles } from "lucide-react";
import { useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { useState } from "react";

interface CreditPackageProps {
  name: string;
  description: string;
  credits: number;
  price: number;
  popular?: boolean;
  polarPriceId: string;
  isEnterprise?: boolean;
}

/**
 * Component to display a credit package purchase option
 */
export function CreditPackage({
  name,
  description,
  credits,
  price,
  popular = false,
  polarPriceId,
  isEnterprise = false,
}: CreditPackageProps) {
  const [isPending, setIsPending] = useState(false);
  const getCheckoutUrl = useAction(api.subscriptions.getProOnboardingCheckoutUrl);
  const addFreeCredits = useMutation(api.credits.addFreeEnterpriseCredits);
  
  const handlePurchase = async () => {
    setIsPending(true);
    
    try {
      // For Enterprise package in development, use free credits
      if (isEnterprise) {
        const result = await addFreeCredits();
        toast.success(result.message || "Added free credits to your account!");
        setIsPending(false);
        return;
      }
      
      // Get checkout URL using the existing Polar.sh integration
      const url = await getCheckoutUrl({
        priceId: polarPriceId,
      });
      
      // Redirect to Polar.sh checkout
      window.location.href = url;
    } catch (error: any) {
      console.error("Error creating checkout:", error);
      toast.error(`Failed to create checkout: ${error.message}`);
      setIsPending(false);
    }
  };
  
  return (
    <Card className={`relative overflow-hidden flex flex-col h-full ${popular ? 'border-primary' : ''}`}>
      {popular && (
        <div className="absolute right-0 top-0">
          <Badge 
            variant="default" 
            className="rounded-none rounded-bl bg-primary text-primary-foreground"
          >
            <Sparkles className="mr-1 h-3 w-3" />
            Popular
          </Badge>
        </div>
      )}
      
      {isEnterprise && (
        <div className="absolute right-0 top-0">
          <Badge 
            variant="default" 
            className="rounded-none rounded-bl bg-green-600 text-white"
          >
            <Sparkles className="mr-1 h-3 w-3" />
            Free for Dev
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="mb-4 flex items-baseline">
          <span className="text-3xl font-bold">${isEnterprise ? "0" : price}</span>
          <span className="ml-1 text-muted-foreground">USD</span>
          {isEnterprise && <span className="ml-2 text-xs line-through text-muted-foreground">${price}</span>}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span className="text-sm">{credits} credits</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span className="text-sm">Never expires</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span className="text-sm">Instant delivery</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full"
          onClick={handlePurchase}
          disabled={isPending}
          variant={popular || isEnterprise ? "default" : "outline"}
        >
          {isPending ? "Loading..." : isEnterprise ? "Get Free Credits" : "Purchase"}
        </Button>
      </CardFooter>
    </Card>
  );
} 
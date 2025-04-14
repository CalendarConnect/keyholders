"use client";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Coins, AlertCircle, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Credit balance thresholds for visual feedback
 */
const BALANCE_THRESHOLDS = {
  LOW: 20,
  CRITICAL: 5,
};

/**
 * Component to display the user's credit balance with visual indicators based on amount
 */
export function CreditBalanceDisplay({ balance }: { balance: number | undefined }) {
  const router = useRouter();

  // Show loader when balance is loading
  if (balance === undefined) {
    return (
      <Card className="flex items-center gap-2 rounded-full border px-4 py-2">
        <Loader className="h-4 w-4 animate-spin text-muted-foreground" />
        <span className="text-sm font-medium">Loading credits...</span>
      </Card>
    );
  }

  // Determine variant based on balance amount
  let variant = "default";
  let icon = <Coins className="h-4 w-4" />;
  
  if (balance <= BALANCE_THRESHOLDS.CRITICAL) {
    variant = "destructive";
    icon = <AlertCircle className="h-4 w-4" />;
  } else if (balance <= BALANCE_THRESHOLDS.LOW) {
    variant = "warning";
    icon = <AlertCircle className="h-4 w-4" />;
  }

  return (
    <div className="flex items-center gap-2">
      <Card 
        className={`
          flex items-center gap-2 rounded-full px-4 py-2
          ${variant === "destructive" ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400" : ""}
          ${variant === "warning" ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400" : ""}
        `}
      >
        {icon}
        <span className="text-sm font-medium">
          {balance} {balance === 1 ? "Credit" : "Credits"}
        </span>
      </Card>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="h-9 rounded-full"
        onClick={() => router.push("/dashboard/credits")}
      >
        Buy Credits
      </Button>
    </div>
  );
} 
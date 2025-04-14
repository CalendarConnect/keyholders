"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Coins, Calendar, TrendingUp, TrendingDown } from "lucide-react";

interface CreditStatsProps {
  balance: number;
  totalUsed: number;
  totalPurchased: number;
  lastPurchaseDate: string;
}

/**
 * Component to display credit usage statistics
 */
export function CreditStats({
  balance,
  totalUsed,
  totalPurchased,
  lastPurchaseDate,
}: CreditStatsProps) {
  // Calculate percentage of credits used
  const percentageUsed = totalPurchased > 0 
    ? Math.round((totalUsed / totalPurchased) * 100) 
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Current Balance</span>
          </div>
          <span className="font-medium">{balance}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Purchased</span>
          </div>
          <span className="font-medium">{totalPurchased}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Used</span>
          </div>
          <span className="font-medium">{totalUsed}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Last Purchase</span>
          </div>
          <span className="font-medium">{lastPurchaseDate}</span>
        </div>
        
        {/* Usage progress bar */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Usage</span>
            <span>{percentageUsed}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${percentageUsed}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
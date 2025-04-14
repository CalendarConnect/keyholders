"use client";

import { format } from "date-fns";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Coins, ArrowUp, ArrowDown, RefreshCw, AlertCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { TRANSACTION_TYPES } from "../../convex/schema";

// Define interface for credit transaction
interface CreditTransaction {
  _id: string;
  userId: string;
  amount: number;
  transactionType: keyof typeof TRANSACTION_TYPES;
  transactionId?: string;
  notes?: string;
  createdAt: number;
}

interface CreditHistoryProps {
  transactions: CreditTransaction[];
}

/**
 * Transaction type badge component
 */
const TransactionTypeBadge = ({ type }: { type: keyof typeof TRANSACTION_TYPES }) => {
  switch (type) {
    case "PURCHASE":
      return (
        <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
          <ArrowUp className="h-3 w-3" />
          <span>Purchase</span>
        </Badge>
      );
    case "USAGE":
      return (
        <Badge variant="outline" className="flex items-center gap-1 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
          <ArrowDown className="h-3 w-3" />
          <span>Usage</span>
        </Badge>
      );
    case "REFUND":
      return (
        <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
          <RefreshCw className="h-3 w-3" />
          <span>Refund</span>
        </Badge>
      );
    case "ADJUSTMENT":
      return (
        <Badge variant="outline" className="flex items-center gap-1 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400">
          <Coins className="h-3 w-3" />
          <span>Adjustment</span>
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Coins className="h-3 w-3" />
          <span>{type}</span>
        </Badge>
      );
  }
};

/**
 * Component to display credit transaction history
 */
export function CreditHistory({ transactions }: CreditHistoryProps) {
  // Empty state
  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Your credit transaction history will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">No transactions yet</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Once you purchase or use credits, your transactions will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>
          Your credit transaction history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>
                  {format(new Date(transaction.createdAt), "PPp")}
                </TableCell>
                <TableCell>
                  <TransactionTypeBadge type={transaction.transactionType} />
                </TableCell>
                <TableCell>{transaction.notes || "-"}</TableCell>
                <TableCell className={`text-right font-medium ${
                  transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 
                  transaction.amount < 0 ? 'text-red-600 dark:text-red-400' : ''
                }`}>
                  {transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 
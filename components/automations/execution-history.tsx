"use client";

import { formatDistanceToNow, format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

// Interface for the execution object
interface Execution {
  _id: string;
  automationId: string;
  userId?: string; // optional for client executions
  clientId?: string; // added for client executions
  n8nExecutionId: string;
  status: "running" | "success" | "failed";
  creditsUsed?: number;
  startedAt: number;
  finishedAt?: number;
  result?: any;
  createdAt: number;
}

interface ExecutionHistoryProps {
  executions: Execution[];
  isLoading?: boolean;
  clientId?: string; // Optional client ID to distinguish client executions from automation executions
}

/**
 * Status badge component for execution status
 */
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "success":
      return (
        <Badge className="bg-green-500 text-white flex items-center gap-1">
          <CheckCircle className="h-3.5 w-3.5" />
          <span>Success</span>
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3.5 w-3.5" />
          <span>Failed</span>
        </Badge>
      );
    case "running":
    default:
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 animate-spin" />
          <span>Running</span>
        </Badge>
      );
  }
};

/**
 * Component for displaying execution history
 */
export function ExecutionHistory({ executions, isLoading = false, clientId }: ExecutionHistoryProps) {
  const [openExecution, setOpenExecution] = useState<string | null>(null);
  
  // Context text changes based on whether this is client or automation executions
  const contextType = clientId ? "client" : "automation";
  const titleText = clientId ? "Client Execution History" : "Execution History";
  const descriptionText = clientId 
    ? "View the history of all executions for this client" 
    : "View the history of this automation's executions";
  const emptyText = clientId
    ? "This client doesn't have any executions yet"
    : "This automation hasn't been executed yet. Activate it to see execution data here.";

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{titleText}</CardTitle>
          <CardDescription>
            {descriptionText}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-6">
          <Clock className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  // Empty state
  if (executions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{titleText}</CardTitle>
          <CardDescription>
            {descriptionText}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">No executions yet</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              {emptyText}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate execution time if available
  const getExecutionTime = (execution: Execution) => {
    if (execution.finishedAt && execution.startedAt) {
      const durationMs = execution.finishedAt - execution.startedAt;
      if (durationMs < 1000) {
        return `${durationMs}ms`;
      } else {
        const seconds = Math.round(durationMs / 100) / 10;
        return `${seconds}s`;
      }
    }
    return "Running...";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titleText}</CardTitle>
        <CardDescription>
          {descriptionText}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {executions.map((execution) => (
            <Collapsible
              key={execution._id}
              open={openExecution === execution._id}
              onOpenChange={(open: boolean) => setOpenExecution(open ? execution._id : null)}
              className="rounded-lg border"
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <StatusBadge status={execution.status} />
                  <div>
                    <div className="font-medium">
                      {format(new Date(execution.startedAt), "PPp")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(execution.startedAt), { addSuffix: true })}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {execution.status !== "running" && (
                    <div className="text-right mr-4">
                      <div className="font-medium">{getExecutionTime(execution)}</div>
                      <div className="text-sm text-muted-foreground">
                        {execution.creditsUsed ? `${execution.creditsUsed} credits` : "No credits used"}
                      </div>
                    </div>
                  )}
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {openExecution === execution._id ? "Hide Details" : "Show Details"}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
              <CollapsibleContent>
                <div className="border-t px-4 py-3">
                  <h4 className="mb-2 font-medium">Execution Details</h4>
                  {execution.result ? (
                    <ScrollArea className="h-[200px] rounded-md border p-2">
                      <pre className="text-xs">
                        {JSON.stringify(execution.result, null, 2)}
                      </pre>
                    </ScrollArea>
                  ) : (
                    <div className="rounded-md bg-muted p-3 text-sm">
                      No detailed result data available
                    </div>
                  )}
                  <div className="mt-3 text-xs text-muted-foreground">
                    <div>Execution ID: {execution.n8nExecutionId}</div>
                    {clientId && <div>Automation ID: {execution.automationId}</div>}
                    <div>Started: {format(new Date(execution.startedAt), "PPpp")}</div>
                    {execution.finishedAt && (
                      <div>Finished: {format(new Date(execution.finishedAt), "PPpp")}</div>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 
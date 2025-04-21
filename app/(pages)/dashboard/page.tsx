"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Code, 
  Star, 
  TrendingUp, 
  Users, 
  Zap, 
  Coins, 
  RefreshCw,
  AlertCircle,
  Inbox,
  ClipboardList,
  Settings
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/nextjs";

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [error, setError] = useState<string | null>(null);
  
  // Get credit balance and automations data
  const creditBalanceResult = useQuery(api.credits.getCreditBalance);
  const automationsResult = useQuery(api.automations.getAutomations);
  const recentExecutionsResult = useQuery(api.executions.getRecentExecutions, { limit: 3 });
  
  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <RefreshCw className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  // Handle authentication state
  if (!isAuthenticated) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
        <AlertCircle className="h-16 w-16 text-amber-500" />
        <h1 className="text-2xl font-semibold">Authentication Required</h1>
        <p className="text-muted-foreground mb-4">Please sign in to access your dashboard</p>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </div>
    );
  }
  
  // Get valid values or defaults
  const creditBalance = creditBalanceResult !== undefined ? creditBalanceResult : 0;
  const automations = automationsResult !== undefined ? automationsResult : [];
  const recentExecutions = recentExecutionsResult !== undefined ? recentExecutionsResult : [];
  
  // Calculate statistics
  const activeAutomations = automations?.filter(a => a.isActive)?.length || 0;
  const totalAutomations = automations?.length || 0;
  const successfulExecutions = recentExecutions?.filter(e => e.status === "success")?.length || 0;
  const totalExecutions = recentExecutions?.length || 0;
  const successRate = totalExecutions > 0 ? Math.round((successfulExecutions / totalExecutions) * 100) : 0;
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to your automation dashboard.
          </p>
        </div>
        
        {/* Credit balance display */}
        {creditBalance !== undefined && (
          <Card className="flex items-center gap-3 rounded-full border px-4 py-2">
            <Coins className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-sm font-medium">{creditBalance} Credits</p>
              {creditBalance < 20 && (
                <p className="text-xs text-amber-500">Low balance</p>
              )}
            </div>
            <Button asChild variant="ghost" size="sm" className="ml-2 h-8 rounded-full">
              <Link href="/dashboard/credits">Buy Credits</Link>
            </Button>
          </Card>
        )}
      </div>

      {/* Quick Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Credit Balance</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{creditBalance ?? "-"}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Available for automations
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link href="/dashboard/credits">Manage Credits</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAutomations}/{totalAutomations}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently running workflows
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link href="/dashboard/automations">View Automations</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExecutions > 0 ? `${successRate}%` : "-"}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Execution success rate
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link href="/dashboard/automations">View History</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Executions</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExecutions}</div>
            <p className="text-xs text-muted-foreground mt-1">
              In the last 24 hours
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link href="/dashboard/automations">View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Automation Status</CardTitle>
            <CardDescription>
              Overview of your active and inactive automations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {automations === undefined ? (
              <div className="flex h-[200px] items-center justify-center">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : automations.length === 0 ? (
              <div className="flex h-[200px] flex-col items-center justify-center gap-2 text-center">
                <Zap className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">No automations yet</h3>
                <p className="max-w-md text-sm text-muted-foreground">
                  Contact us to set up your first automation workflow.
                </p>
                <Button asChild className="mt-2">
                  <Link href="/dashboard/automations">Go to Automations</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {automations.slice(0, 5).map((automation) => (
                  <div key={automation._id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{automation.name}</p>
                      <p className="text-sm text-muted-foreground">{automation.description.substring(0, 60)}{automation.description.length > 60 ? '...' : ''}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${automation.isActive ? 'bg-green-500' : 'bg-amber-500'}`} />
                      <span className="text-sm">{automation.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                  </div>
                ))}
                
                {automations.length > 5 && (
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/dashboard/automations">View All Automations</Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Executions</CardTitle>
            <CardDescription>
              Latest workflow execution results
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentExecutions === undefined ? (
              <div className="flex h-[200px] items-center justify-center">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : recentExecutions.length === 0 ? (
              <div className="flex h-[200px] flex-col items-center justify-center gap-2 text-center">
                <Activity className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">No recent executions</h3>
                <p className="max-w-md text-sm text-muted-foreground">
                  Activate an automation to see execution data here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentExecutions.map((execution) => {
                  const automation = automations?.find(a => a._id === execution.automationId);
                  
                  return (
                    <div key={execution._id} className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        execution.status === "success" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                        execution.status === "failed" ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" :
                        "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                      }`}>
                        {execution.status === "success" ? (
                          <Star className="h-5 w-5" />
                        ) : execution.status === "failed" ? (
                          <Activity className="h-5 w-5" />
                        ) : (
                          <RefreshCw className="h-5 w-5 animate-spin" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{automation?.name || "Unknown Automation"}</p>
                        <p className="text-xs text-muted-foreground">
                          {execution.status === "success" ? "Completed successfully" : 
                           execution.status === "failed" ? "Failed to complete" : 
                           "Running..."}
                          {execution.creditsUsed !== undefined && ` • ${execution.creditsUsed} credits used`}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(execution.startedAt).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
                
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/dashboard/linkedout/inbox">View LinkedIn Messages</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link href="/dashboard/linkedout/inbox">
                <Inbox className="h-4 w-4" />
                LinkedOut Inbox
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link href="/dashboard/linkedout/snippets">
                <ClipboardList className="h-4 w-4" />
                Manage Text Snippets
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link href="/dashboard/settings">
                <Settings className="h-4 w-4" />
                Account Settings
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Latest Updates</CardTitle>
            <CardDescription>Recent changes and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Credit System Launched",
                  description: "You can now purchase credits to run your automations more efficiently.",
                  time: "Just now"
                },
                {
                  title: "New Automation Features",
                  description: "Enhanced workflow controls and monitoring tools are now available.",
                  time: "2 days ago"
                },
                {
                  title: "System Update",
                  description: "Performance improvements and bug fixes for the automation engine.",
                  time: "1 week ago"
                }
              ].map((update, i) => (
                <div key={i} className="flex justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{update.title}</p>
                    <p className="text-sm text-muted-foreground">{update.description}</p>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">{update.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">View All Updates</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

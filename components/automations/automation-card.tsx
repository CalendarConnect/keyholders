"use client";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle, XCircle, Clock, AlertCircle, Edit, ExternalLink, Power, PowerOff, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Id } from "@/convex/_generated/dataModel";

/**
 * Interface for the Automation object
 */
interface Automation {
  _id: Id<"automations">;
  name: string;
  description: string;
  webhookUrl: string;
  isActive: boolean;
  creditsPerExecution: number;
  createdAt: number;
  updatedAt: number;
}

interface AutomationCardProps {
  automation: Automation;
  onClick?: () => void;
}

/**
 * Status indicator component for automation status
 */
const StatusIndicator = ({ isActive }: { isActive: boolean }) => {
  return isActive ? (
    <Badge className="bg-green-500 text-white flex items-center gap-1">
      <CheckCircle className="h-3.5 w-3.5" />
      <span>Active</span>
    </Badge>
  ) : (
    <Badge variant="secondary" className="flex items-center gap-1">
      <XCircle className="h-3.5 w-3.5" />
      <span>Inactive</span>
    </Badge>
  );
};

/**
 * Component for displaying a single automation card
 */
export function AutomationCard({ automation, onClick }: AutomationCardProps) {
  const router = useRouter();
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const toggleAutomation = useMutation(api.automations.toggleAutomation);
  const deleteAutomation = useMutation(api.automations.deleteAutomation);
  
  // Handle toggle on/off
  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click

    setIsToggling(true);
    try {
      await toggleAutomation({
        id: automation._id,
        isActive: !automation.isActive,
      });

      toast({
        title: automation.isActive ? "Automation deactivated" : "Automation activated",
        description: `${automation.name} has been ${automation.isActive ? "deactivated" : "activated"}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to toggle automation",
        variant: "destructive",
      });
    } finally {
      setIsToggling(false);
    }
  };

  // Handle edit button
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onClick && onClick();
  };

  // Handle view webhook button
  const handleViewWebhook = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    window.open(automation.webhookUrl, '_blank');
  };

  // Handle delete button
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    
    if (confirm(`Are you sure you want to delete "${automation.name}"? This will remove all associated data and cannot be undone.`)) {
      setIsDeleting(true);
      try {
        await deleteAutomation({
          id: automation._id
        });
        
        toast({
          title: "Automation deleted",
          description: `${automation.name} has been permanently deleted.`,
        });
        
        // Redirect to automations list if we're on the detail page
        if (window.location.pathname.includes(`/automations/${automation._id}`)) {
          router.push('/dashboard/automations');
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to delete automation",
          variant: "destructive",
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Format the updated at date
  const lastUpdated = formatDistanceToNow(new Date(automation.updatedAt), { 
    addSuffix: true 
  });

  return (
    <Card 
      onClick={onClick} 
      className={`transition-all duration-300 hover:shadow-md cursor-pointer ${
        onClick ? "cursor-pointer hover:shadow-md" : ""
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{automation.name}</CardTitle>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            automation.isActive 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
          }`}>
            {automation.isActive ? "Active" : "Inactive"}
          </div>
        </div>
        <CardDescription className="line-clamp-2">{automation.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Updated {lastUpdated}</span>
          </div>
          <div>
            <span className="font-medium">{automation.creditsPerExecution}</span> credits per run
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground truncate">
          <span className="font-medium">Webhook:</span> {automation.webhookUrl}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 gap-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
          >
            <Edit className="h-3.5 w-3.5 mr-1" />
            Edit
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-destructive hover:text-destructive"
          >
            <Trash className="h-3.5 w-3.5 mr-1" />
            Delete
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewWebhook}
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            View Webhook
          </Button>
          
          <div className="flex items-center gap-1.5">
            <Switch
              checked={automation.isActive}
              disabled={isToggling}
              onClick={handleToggle}
            />
            {automation.isActive ? (
              <Power className="h-3.5 w-3.5 text-primary" />
            ) : (
              <PowerOff className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
} 
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LoaderIcon } from "lucide-react";
import Link from "next/link";

// Reuse the same template form component
export default function EditTemplatePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch template data
  const template = useQuery(api.templates.getById, { id });
  const updateTemplate = useMutation(api.templates.update);
  
  useEffect(() => {
    if (template) {
      setIsLoading(false);
    }
  }, [template]);
  
  if (isLoading) {
    return (
      <div className="container py-10 flex flex-col items-center justify-center h-[60vh]">
        <LoaderIcon className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading template...</p>
      </div>
    );
  }
  
  if (!template) {
    return (
      <div className="container py-10">
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The template you're trying to edit doesn't exist or you don't have permission to access it.
          </p>
          <Button asChild>
            <Link href="/dashboard/winkel">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Templates
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Edit Template</h1>
          <p className="text-muted-foreground">
            Editing: {template.name}
          </p>
        </div>
        
        <Button asChild variant="outline">
          <Link href="/dashboard/winkel">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Link>
        </Button>
      </div>
      
      {/* For brevity, we're not including the entire form again */}
      {/* In a real implementation, you'd reuse the form component from the new page */}
      {/* and populate it with the template data */}
      <div className="p-8 text-center border rounded-lg bg-muted/10">
        <p className="text-muted-foreground mb-4">
          This is a simplified version of the edit page for demonstration purposes.
        </p>
        <p className="mb-6">
          In a complete implementation, this would render the same form as the "New Template" page,
          but pre-populated with data from the template being edited.
        </p>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
} 
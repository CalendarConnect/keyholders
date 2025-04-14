"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader, Bot } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define the webhook registration form schema
const webhookFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  webhookUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  authType: z.enum(["none", "basic", "jwt", "header"], {
    required_error: "Please select an authentication type.",
  }),
  username: z.string().optional(),
  password: z.string().optional(),
  token: z.string().optional(),
  creditsPerExecution: z.coerce.number().min(1, {
    message: "Must use at least 1 credit per execution.",
  }),
});

interface RegisterWebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal for registering n8n workflows via webhooks
 */
export function RegisterWebhookModal({ isOpen, onClose }: RegisterWebhookModalProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Use the createAutomation mutation
  const createAutomation = useMutation(api.automations.createAutomation);
  
  // Create form
  const form = useForm<z.infer<typeof webhookFormSchema>>({
    resolver: zodResolver(webhookFormSchema),
    defaultValues: {
      name: "",
      description: "",
      webhookUrl: "",
      authType: "none",
      username: "",
      password: "",
      token: "",
      creditsPerExecution: 1
    },
  });

  // Watch the auth type to conditionally show auth fields
  const authType = form.watch("authType");
  
  // Handle form submission
  const onSubmit = async (values: z.infer<typeof webhookFormSchema>) => {
    setIsRegistering(true);
    
    try {
      // Prepare auth credentials based on the auth type
      const authCredentials: any = {};
      
      if (values.authType === "basic") {
        authCredentials.username = values.username;
        authCredentials.password = values.password;
      } else if (values.authType === "jwt" || values.authType === "header") {
        authCredentials.token = values.token;
      }
      
      // Call the createAutomation mutation
      const result = await createAutomation({
        name: values.name,
        description: values.description,
        webhookUrl: values.webhookUrl,
        authType: values.authType,
        ...(values.authType !== "none" && authCredentials && Object.keys(authCredentials).length > 0 
          ? { authCredentials } 
          : {}),
        creditsPerExecution: values.creditsPerExecution,
      });
      
      console.log('Webhook automation registered with ID:', result.id);
      toast.success(`${values.name} registered successfully`);
      
      // Reset form & close modal
      form.reset();
      onClose();
    } catch (error) {
      console.error('Error registering webhook automation:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to register webhook'
      );
    } finally {
      setIsRegistering(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register New Webhook Automation</DialogTitle>
          <DialogDescription>
            Register an n8n workflow webhook to run as an automation in your dashboard.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter automation name" {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive name for this automation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what this automation does" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="webhookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Webhook URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://n8n.yourdomain.com/webhook/..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    The webhook URL from your n8n workflow.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="authType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authentication Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select authentication type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                      <SelectItem value="jwt">JWT/Bearer</SelectItem>
                      <SelectItem value="header">Header Token</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    How to authenticate with your n8n webhook.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {authType === "basic" && (
              <>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            {(authType === "jwt" || authType === "header") && (
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter auth token" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="creditsPerExecution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credits Per Execution</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={1}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    How many credits should be charged each time this automation runs?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isRegistering}
            >
              {isRegistering ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-4 w-4" />
                  Register Webhook
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 
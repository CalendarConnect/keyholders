import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LEAD_SOURCES } from "@/convex/schema";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

// Form schema for lead registration
const leadSchema = z.object({
  firstName: z.string().min(2, "Voornaam is verplicht"),
  lastName: z.string().min(2, "Achternaam is verplicht"),
  website: z.string().url("Vul een geldig website adres in"),
  email: z.string().email("Vul een geldig e-mailadres in"),
  source: z.enum([
    "linkedin-christian",
    "linkedin-renier",
    "linkedin-erik",
    "linkedin-els",
    "linkedin-general",
    "friend-colleague",
    "other",
  ]),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface GiveawayFormProps {
  isOpen: boolean;
  onClose: () => void;
  templateSlug: string;
  onSubmitSuccess: (leadId: Id<"giveawayLeads">) => void;
}

export default function GiveawayForm({
  isOpen,
  onClose,
  templateSlug,
  onSubmitSuccess,
}: GiveawayFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const registerLead = useMutation(api.templates.registerGiveawayLead);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      website: "",
      email: "",
      source: "linkedin-general",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    console.log("Submitting form data:", data);
    
    try {
      const result = await registerLead({
        ...data,
        templateSlug,
      });
      
      console.log("Registration result:", result);
      
      // Check if result is valid and can be used as a lead ID
      if (result) {
        console.log("Calling onSubmitSuccess with ID:", result);
        
        // Ensure the result is a valid ID before proceeding
        try {
          // First close this dialog
          setTimeout(() => {
            // Call the success callback to change parent component state
            onSubmitSuccess(result);
          }, 100);
        } catch (error) {
          console.error("Error processing successful registration:", error);
          form.setError("root", { 
            message: "Er is een probleem opgetreden bij het verwerken van de registratie." 
          });
        }
      } else {
        console.error("No result returned from registerGiveawayLead mutation");
        form.setError("root", { 
          message: "Er is een technisch probleem opgetreden. Probeer het later nog eens." 
        });
      }
    } catch (error) {
      console.error("Failed to register lead:", error);
      form.setError("root", { 
        message: "Er is een probleem opgetreden. Probeer het later nog eens." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Download deze template
          </DialogTitle>
          <DialogDescription>
            Vul uw bedrijfsgegevens in om toegang te krijgen tot onze gratis template.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voornaam</FormLabel>
                    <FormControl>
                      <Input placeholder="Voornaam" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Achternaam</FormLabel>
                    <FormControl>
                      <Input placeholder="Achternaam" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://uw-website.nl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="uw-email@bedrijf.nl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hoe heb je ons gevonden?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer een optie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="linkedin-christian">LinkedIn post van Christian Bleeker</SelectItem>
                      <SelectItem value="linkedin-renier">LinkedIn post van Renier Bleeker</SelectItem>
                      <SelectItem value="linkedin-erik">LinkedIn post van Erik van der Veen</SelectItem>
                      <SelectItem value="linkedin-els">LinkedIn post van Els Verheirstraeten</SelectItem>
                      <SelectItem value="linkedin-general">LinkedIn in het algemeen</SelectItem>
                      <SelectItem value="friend-colleague">Vriend of collega</SelectItem>
                      <SelectItem value="other">Overige</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <div className="text-sm text-red-500 mt-2">
                {form.formState.errors.root.message}
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Annuleren
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Versturen
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 
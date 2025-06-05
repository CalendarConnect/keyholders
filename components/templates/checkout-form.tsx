import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { PricingPlan } from "./pricing-deck";

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type CheckoutData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PricingPlan | null;
  templateSlug: string;
  onSubmit: (data: CheckoutData, plan: PricingPlan) => Promise<void>;
}

export default function CheckoutForm({
  isOpen,
  onClose,
  selectedPlan,
  templateSlug,
  onSubmit,
}: CheckoutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: CheckoutData) => {
    if (!selectedPlan) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(data, selectedPlan);
    } catch (error) {
      console.error("Checkout error:", error);
      // Handle error here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#0a0a18] text-white border-white/20">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription className="text-white/60">
            Enter your email to receive your download link.
          </DialogDescription>
        </DialogHeader>
        
        {selectedPlan && (
          <div className="bg-white/5 p-4 rounded-lg text-sm mb-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Plan:</span>
              <span className="font-medium">{selectedPlan.label}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-white/80">Price:</span>
              <span className="font-medium">
                {selectedPlan.priceMode === "fixed" && selectedPlan.priceCents
                  ? new Intl.NumberFormat('nl-NL', {
                      style: 'currency',
                      currency: 'EUR',
                      minimumFractionDigits: 0,
                    }).format(selectedPlan.priceCents / 100)
                  : selectedPlan.priceText}
              </span>
            </div>
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="your.email@example.com" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
                className="border-white/20 text-white hover:bg-white/10 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {isSubmitting ? (
                  <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Proceed to Payment
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 
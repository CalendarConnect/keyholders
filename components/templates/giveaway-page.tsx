import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import GiveawayForm from "./giveaway-form";
import DownloadsPage from "./downloads-page";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface GiveawayPageProps {
  templateSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function GiveawayPage({
  templateSlug,
  isOpen,
  onClose,
}: GiveawayPageProps) {
  const [leadId, setLeadId] = useState<Id<"giveawayLeads"> | null>(null);
  
  // Handle successful lead registration
  const handleLeadRegistered = (id: Id<"giveawayLeads">) => {
    setLeadId(id);
  };
  
  // Show form dialog or downloads dialog based on state
  if (!leadId) {
    return (
      <GiveawayForm
        isOpen={isOpen}
        onClose={onClose}
        templateSlug={templateSlug}
        onSubmitSuccess={handleLeadRegistered}
      />
    );
  }
  
  // Show downloads page in a dialog
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <Button
            className="absolute top-2 right-2"
            size="icon"
            variant="ghost"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="py-6 px-1">
            <DownloadsPage
              leadId={leadId}
              templateSlug={templateSlug}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
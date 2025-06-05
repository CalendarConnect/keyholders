import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TemplateNotFound() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <div className="text-white/30 text-7xl mb-4">🔍</div>
      <h1 className="text-3xl font-bold text-white mb-4">Template Not Found</h1>
      <p className="text-white/60 mb-8">
        The template you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/winkel" className="inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Templates
        </Link>
      </Button>
    </div>
  );
} 
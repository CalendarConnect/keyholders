import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Download, Star, ChevronRight, FileText, File, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GiveawayForm from "./giveaway-form";
import { Id } from "@/convex/_generated/dataModel";
import DownloadsPage from "./downloads-page";
import gsap from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface GiveawayTemplatePageProps {
  slug: string;
}

export default function GiveawayTemplatePage({ slug }: GiveawayTemplatePageProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const [leadId, setLeadId] = useState<Id<"giveawayLeads"> | null>(null);
  const router = useRouter();
  
  // Animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  
  // Fetch template details from Convex
  const template = useQuery(api.templates.getBySlug, { slug });
  
  // Fetch template files to know how many are available
  const templateFiles = useQuery(api.templates.getTemplateFilesBySlug, { slug });
  
  // Set up animations
  useEffect(() => {
    if (template) {
      // Create animations with GSAP
      const tl = gsap.timeline();
      
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        benefitsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Interactive button glow
      const button = buttonRef.current?.querySelector("button");
      if (button) {
        button.addEventListener("mousemove", (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          gsap.to(button, {
            "--x": `${x}px`,
            "--y": `${y}px`,
            duration: 0.1,
          });
        });
      }
    }
    
    // Check URL hash on load
    if (window.location.hash === "#giveaway") {
      setIsFormOpen(true);
    }
    
    // Listen for hash changes
    const handleHashChange = () => {
      if (window.location.hash === "#giveaway") {
        setIsFormOpen(true);
      }
    };
    
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [template]);
  
  // Add a useEffect to log state changes
  useEffect(() => {
    console.log("State changed - isFormOpen:", isFormOpen, "isDownloadsOpen:", isDownloadsOpen, "leadId:", leadId);
  }, [isFormOpen, isDownloadsOpen, leadId]);
  
  // Loading state
  if (!template) {
    return <div className="flex items-center justify-center h-screen">
      <div className="relative inline-flex">
        <div className="w-12 h-12 bg-indigo-600 rounded-full opacity-60 animate-ping"></div>
        <div className="w-12 h-12 bg-indigo-600 rounded-full absolute top-0 left-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
    </div>;
  }
  
  // Handle 404
  if (template === null) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="text-white/30 text-7xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-white mb-4">Template Niet Gevonden</h1>
        <p className="text-white/60 mb-8">
          De template die je zoekt bestaat niet of is verwijderd.
        </p>
        <Button asChild>
          <Link href="/winkel" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Terug naar Templates
          </Link>
        </Button>
      </div>
    );
  }
  
  const handleLeadRegistered = (id: Id<"giveawayLeads">) => {
    console.log("Lead ID received in parent component:", id);
    
    // Validate the ID before proceeding
    if (!id) {
      console.error("Invalid lead ID received");
      return;
    }
    
    // Set the lead ID first
    setLeadId(id);
    
    // Close the form dialog 
    setIsFormOpen(false);
    
    // Give time for the UI to update
    setTimeout(() => {
      // Then open the downloads dialog
      setIsDownloadsOpen(true);
      console.log("Downloads dialog should now be open with leadId:", id);
    }, 500); // Longer delay for more reliable transition
  };
  
  const handleOpenGiveaway = () => {
    setIsFormOpen(true);
  };
  
  return (
    <>
      <div className="relative min-h-screen bg-[#050510] overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]" />
        
        {/* Gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-indigo-900/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-indigo-900/20 to-transparent"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, index) => (
            <div 
              key={index}
              className="absolute w-2 h-2 rounded-full bg-indigo-500/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatParticle ${5 + Math.random() * 10}s linear infinite`,
                opacity: 0.1 + Math.random() * 0.5,
              }}
            />
          ))}
        </div>
        
        <style jsx global>{`
          @keyframes floatParticle {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 0.3;
            }
            90% {
              opacity: 0.2;
            }
            100% {
              transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
              opacity: 0;
            }
          }
          
          .glow-button {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }
          
          .glow-button::before {
            content: '';
            position: absolute;
            top: var(--y, 0);
            left: var(--x, 0);
            width: 0;
            height: 0;
            background: radial-gradient(circle closest-side, rgba(139, 92, 246, 0.4), transparent);
            transform: translate(-50%, -50%);
            transition: width 0.3s ease, height 0.3s ease;
          }
          
          .glow-button:hover::before {
            width: 200px;
            height: 200px;
          }
        `}</style>
        
        <div className="container mx-auto px-4 py-12 pt-24 relative z-10">
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto">
              {/* Left column - Image */}
              <div ref={heroRef} className="relative">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/30 border border-indigo-500/20">
                  <Image 
                    src={template.heroUrl}
                    alt={template.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-indigo-600/90 text-white text-xs font-medium py-1 px-3 rounded-full backdrop-blur-sm">
                    {template.category
                      .split("-")
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </div>
                  
                  {/* Author badge */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white text-xs font-medium py-1 px-3 rounded-full backdrop-blur-sm">
                    Door {template.author === "christian" ? "Christian Bleeker" : "Renier Bleeker"}
                  </div>
                  
                  {/* Sticker if available */}
                  {template.sticker && (
                    <div className="absolute bottom-4 right-4 bg-pink-600 text-white text-xs font-medium py-1 px-3 rounded-full">
                      {template.sticker}
                    </div>
                  )}
                </div>
                
                {/* Files preview */}
                {templateFiles && templateFiles.length > 0 && (
                  <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center mb-3">
                      <FileText className="h-5 w-5 text-indigo-400 mr-2" />
                      <h3 className="font-semibold text-white">Inbegrepen bestanden</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {templateFiles.slice(0, 4).map((file, index) => (
                        <div key={index} className="flex items-center p-2 rounded-lg bg-black/20">
                          <File className="h-4 w-4 text-indigo-300 mr-2 flex-shrink-0" />
                          <p className="text-sm text-white/80 truncate">{file.fileName}</p>
                        </div>
                      ))}
                      {templateFiles.length > 4 && (
                        <div className="flex items-center justify-center p-2 rounded-lg bg-black/20">
                          <p className="text-sm text-white/80">+{templateFiles.length - 4} meer</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right column - Content */}
              <div className="flex flex-col justify-center">
                <Badge className="self-start mb-4 bg-indigo-500/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-500/30">
                  Gratis Giveaway
                </Badge>
                
                <h1 ref={headlineRef} className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {template.name}
                </h1>
                
                <div ref={descriptionRef} className="space-y-6 text-white/80 mb-8">
                  <p className="text-xl text-white/90">{template.subtitle}</p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 rounded-lg border border-indigo-500/20 bg-indigo-500/5">
                      <h3 className="font-semibold text-white mb-2">Voor wie is dit?</h3>
                      <p>{template.descriptionBlocks.whoFor}</p>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-indigo-500/20 bg-indigo-500/5">
                      <h3 className="font-semibold text-white mb-2">Welk probleem lost het op?</h3>
                      <p>{template.descriptionBlocks.problem}</p>
                    </div>
                  </div>
                </div>
                
                <div ref={buttonRef} className="mb-8">
                  <Button 
                    onClick={handleOpenGiveaway}
                    size="lg"
                    className="w-full py-6 h-auto text-lg glow-button rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download nu gratis
                  </Button>
                  <p className="text-sm text-center text-white/60 mt-2">
                    Registreer je gegevens éénmalig voor toegang
                  </p>
                </div>
                
                <div ref={benefitsRef} className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <h3 className="font-semibold text-white mb-4 flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-2" />
                    <span>Voordelen van deze template</span>
                  </h3>
                  
                  <ul className="space-y-3">
                    {template.pricing.find(p => p.tier === "giveaway")?.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Additional info section */}
            <div className="w-full max-w-6xl mx-auto mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-white mb-4">Wat doet het?</h3>
                    <p className="text-white/80">{template.descriptionBlocks.whatItDoes}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-white mb-4">Setup proces</h3>
                    <p className="text-white/80">{template.descriptionBlocks.setup}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10 md:col-span-2">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-white mb-4">Hoe te customizen?</h3>
                    <p className="text-white/80">{template.descriptionBlocks.customise}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* CTA section */}
            <div className="mt-16 w-full max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Klaar om nog slimmer te werken?
              </h2>
              <p className="text-lg text-white/70 mb-8">
                Plan een gratis AI‑consult en ontdek in 30 minuten hoe jij met slimme workflows honderden uren wint!
              </p>
              
              <Link href="/ai-scan">
                <Button 
                  size="lg" 
                  className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-6 h-auto text-base glow-button"
                >
                  <span className="mr-2">Ja, ik wil een gratis AI consult!</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              
              <div className="flex justify-center gap-6 mt-8">
                <div className="flex items-center text-white/70">
                  <Check className="h-5 w-5 text-green-400 mr-2" />
                  <span>Persoonlijk AI‑consult op maat</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Check className="h-5 w-5 text-green-400 mr-2" />
                  <span>Honderden ondernemers geholpen</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-sm text-white/50 text-center">
              Laatst bijgewerkt: {new Date(template.lastUpdated).toLocaleDateString('nl-NL')}
            </div>
          </div>
        </div>
      </div>
      
      {/* Giveaway Form Dialog */}
      <GiveawayForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        templateSlug={slug}
        onSubmitSuccess={handleLeadRegistered}
      />
      
      {/* Downloads Dialog */}
      <Dialog 
        open={isDownloadsOpen} 
        onOpenChange={(open) => {
          console.log("Downloads dialog open state changing to:", open);
          setIsDownloadsOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <Button
              className="absolute top-2 right-2"
              size="icon"
              variant="ghost"
              onClick={() => setIsDownloadsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            {leadId && (
              <div className="py-6 px-1">
                <DownloadsPage
                  leadId={leadId}
                  templateSlug={slug}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 
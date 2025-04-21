"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/app/i18n/context";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutHero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const { language } = useI18n();
  
  const content = {
    en: {
      badge: "Our Story",
      title: "About",
      agencyName: "Keyholders",
      subtitle: "Agency",
      whyAiTitle: "Why AI?",
      description: "At Keyholders Agency, we believe that AI will fundamentally transform how businesses operate. Through our custom automations, training programs, and implementation services, we work daily toward our mission: unlocking business growth through intelligent automation that's accessible, secure, and human-guided.",
      quote: "The key to effective AI implementation isn't just the technology—it's understanding how businesses actually function from the inside."
    },
    nl: {
      badge: "Ons Verhaal",
      title: "Over",
      agencyName: "Keyholders",
      subtitle: "Agency",
      whyAiTitle: "Waarom AI?",
      description: "Bij Keyholders Agency geloven we dat AI fundamenteel zal veranderen hoe bedrijven opereren. Via onze maatwerk automatiseringen, trainingsprogramma's en implementatiediensten werken we dagelijks aan onze missie: bedrijfsgroei ontgrendelen door intelligente automatisering die toegankelijk, veilig en door mensen begeleid wordt.",
      quote: "De sleutel tot effectieve AI-implementatie is niet alleen de technologie, het is begrijpen hoe bedrijven van binnenuit functioneren."
    }
  };

  const currentContent = language === "nl" ? content.nl : content.en;
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: 0.2
        }
      );
      
      // Animate badge
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6
        }
      );
      
      // Animate text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: 0.4
        }
      );
      
      // Spotlight text effect
      gsap.fromTo(
        ".spotlight-text",
        { backgroundSize: "0% 40%" },
        { 
          backgroundSize: "100% 40%", 
          duration: 1.2, 
          delay: 0.8,
          ease: "power2.out"
        }
      );
    });
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section className="relative pt-14 pb-20 overflow-hidden flex items-center min-h-[70vh]">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20 bg-[#0a0a0f]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Animated gradients */}
        <div className="absolute top-1/4 -right-64 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse-slow"></div>
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-slow delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">{currentContent.badge}</span>
          </div>
          
          <h1 
            ref={headingRef}
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
          >
            {currentContent.title} <span className="relative">
              <span className="relative z-10">{currentContent.agencyName}</span>
              <div className="absolute -inset-1 -z-0 opacity-30 blur-lg rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
            </span> {currentContent.subtitle}
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">{currentContent.whyAiTitle}</h2>
              <p 
                ref={textRef}
                className="text-xl text-gray-300 leading-relaxed"
              >
                {currentContent.description}
              </p>
            </div>
            
            <div className="relative h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 rounded-2xl border border-purple-500/10"></div>
              <div className="relative p-4">
                <Image
                  src="/images/logos/logo-dark.webp"
                  alt="Keyholders Agency Logo"
                  width={200}
                  height={200}
                  className="mx-auto object-contain"
                />
                <div className="mt-8 text-center">
                  <p className="text-white font-light text-xl italic">&ldquo;{currentContent.quote}&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
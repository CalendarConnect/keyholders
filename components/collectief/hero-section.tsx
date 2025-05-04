"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Set up animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out" 
        }
      );
      
      // Heading animation with text reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          delay: 0.4,
          ease: "power2.out" 
        }
      );
      
      // Text paragraph animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          delay: 0.6,
          ease: "power2.out" 
        }
      );
    });
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section className="relative pt-20 pb-20 overflow-hidden flex items-center min-h-[80vh]">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20 bg-[#0a0a0f]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Animated gradients */}
        <div className="absolute top-1/4 -right-64 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse-slow"></div>
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-slow delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Het Keyholders Collectief</span>
          </div>
          
          <h1 
            ref={headingRef}
            className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
          >
            <div className="mb-2">Ontgrendel AI‑impact.</div>
            <div className="mb-2">
              <span className="relative">
                <span className="relative z-10">Eén Collectief</span>
                <div className="absolute -inset-1 -z-0 opacity-30 blur-lg rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
              </span>
              <span>, alle Keys.</span>
            </div>
          </h1>
          
          <p 
            ref={textRef}
            className="text-lg md:text-xl text-gray-300"
          >
            Elke groeivraag is een ander slot.
            Keyholders is een zorgvuldig samengesteld netwerk van senior‑experts dat samen de <strong className="text-white">master Key</strong> vormt voor duurzame AI‑groei: <strong className="text-white">strategie, automatisering, adoptie, compliance en security</strong>. Geen traditioneel bureau, nul logge overhead, wél de gecombineerde denkkracht van specialisten die elkaar blind vertrouwen.
          </p>
        </div>
      </div>
    </section>
  );
} 
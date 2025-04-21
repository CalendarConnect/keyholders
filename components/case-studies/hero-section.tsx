"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/app/i18n/context";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CaseStudiesHero() {
  const { dictionary } = useI18n();
  
  // Add fallback for missing translations
  const caseStudies = dictionary.caseStudies || {
    hero: {
      badge: "Client Success Stories",
      heading: "Real Results Through Intelligent Automation",
      description: "Discover how our custom AI solutions have transformed businesses across industries, delivering measurable ROI and sustainable growth."
    },
    features: {
      title: "Our Case Studies"
    }
  };
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
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
    } catch (error) {
      console.error("Animation error:", error);
    }
  }, []);
  
  return (
    <section className="relative pt-14 pb-20 overflow-hidden flex items-center min-h-[60vh]">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20 bg-[#0a0a0f]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Animated gradients */}
        <div className="absolute top-1/4 -right-64 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse-slow"></div>
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-slow delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">{caseStudies.hero.badge}</span>
          </div>
          
          <h1 
            ref={headingRef}
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
          >
            {caseStudies.hero.heading}
          </h1>
          
          <p 
            ref={textRef}
            className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12"
          >
            {caseStudies.hero.description}
          </p>
          
          <Link 
            href="#case-studies"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <span>{caseStudies.features.title}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
} 
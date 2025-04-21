"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useI18n } from "@/app/i18n/context";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Update the border style to ensure it maintains the pill shape
const borderGlimmerStyle = `
  .cta-button::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid transparent;
    border-radius: 9999px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  .cta-button:hover::before {
    opacity: 1;
  }
  
  /* Ensure the button itself has proper border-radius */
  .cta-button {
    position: relative;
    border-radius: 9999px !important;
  }
`;

export default function AIActHeroSection() {
  const { dictionary, language } = useI18n();
  const aiAct = dictionary.aiAct;
  
  // References for animation targets
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Mouse spotlight effect
    const handleMouseMove = (e: MouseEvent) => {
      // Direct manipulation without using React state at all
      const spotlight = spotlightRef.current;
      if (spotlight) {
        // Use pageX/pageY instead of clientX/clientY for absolute positioning
        spotlight.style.left = `${e.pageX}px`;
        spotlight.style.top = `${e.pageY}px`;
        
        // Check if the cursor is over the CTA button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
          const buttonRect = ctaButton.getBoundingClientRect();
          const isOverButton = 
            e.clientX >= buttonRect.left && 
            e.clientX <= buttonRect.right && 
            e.clientY >= buttonRect.top && 
            e.clientY <= buttonRect.bottom;
          
          // Change z-index based on whether the cursor is over the button
          spotlight.style.zIndex = isOverButton ? '30' : '1';
          
          // Add effect for the button
          if (isOverButton) {
            // Apply a simple light glow effect at cursor position
            const shadowColor = `rgba(255, 255, 255, 0.8)`;
            const glowSize = 15;
            
            // Use a spread of styles to ensure the glow follows the rounded shape
            (ctaButton as HTMLElement).style.boxShadow = `0 0 ${glowSize}px ${shadowColor}`;
            (ctaButton as HTMLElement).style.borderColor = shadowColor;
            (ctaButton as HTMLElement).style.borderWidth = '2px';
            (ctaButton as HTMLElement).style.borderStyle = 'solid';
          } else {
            // Reset the effects when not hovering
            (ctaButton as HTMLElement).style.boxShadow = '';
            (ctaButton as HTMLElement).style.borderColor = 'transparent';
          }
        }
      }
      
      // Dynamic shadow effect for the headline
      if (headlineRef.current) {
        const headingRect = headlineRef.current.getBoundingClientRect();
        const headingCenterX = headingRect.left + headingRect.width / 2;
        const headingCenterY = headingRect.top + headingRect.height / 2;
        
        // Calculate vector from mouse to heading center
        const vectorX = e.clientX - headingCenterX;
        const vectorY = e.clientY - headingCenterY;
        
        // Normalize and scale for shadow offset (inverted to create natural shadow)
        const distance = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
        const maxDistance = 300; // Max distance to consider for shadow effect
        const shadowIntensity = Math.min(1, distance / maxDistance);
        
        // Apply realistic shadow projection effect
        const maxOffset = 25; // Increased for more dramatic shadow offset
        // Handle potential NaN by checking if distance is too small
        let shadowX = 0;
        let shadowY = 0;
        
        if (distance > 0.1) { // Avoid division by very small numbers
          shadowX = -vectorX / distance * shadowIntensity * maxOffset;
          shadowY = -vectorY / distance * shadowIntensity * maxOffset;
        }
        
        // Apply dynamic text shadow - projection shadow effect
        gsap.to(headlineRef.current, {
          textShadow: `${shadowX}px ${shadowY}px 3px rgba(0, 0, 0, 0.9)`,
          duration: 0.2
        });
      }
    };
    
    // Add mouse move event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Main content animations
    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
    
    // Trust badge animation
    timeline.fromTo(".hero-badge",
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      0.3
    );
    
    // Main headline animation
    if (headlineRef.current) {
      timeline.fromTo(headlineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.5
      );
    }
    
    // Subheading animation
    if (subheadingRef.current) {
      timeline.fromTo(subheadingRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.8
      );
    }
    
    // Description animation
    if (descriptionRef.current) {
      timeline.fromTo(descriptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        1.0
      );
    }
    
    // CTA buttons animation
    if (ctaGroupRef.current) {
      timeline.fromTo(ctaGroupRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        1.2
      );
    }
    
    return () => {
      // Cleanup
      if (headlineRef.current) {
        gsap.killTweensOf(headlineRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden pt-28 pb-16 cursor-default"
    >
      {/* Pure black background */}
      <div className="absolute inset-0 -z-10 bg-black"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-[#0a0a0f]/30 to-[#0a0a0f] opacity-60 -z-10" />
      
      {/* Purple grid overlay */}
      <div 
        className="absolute inset-0 -z-9"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(139, 92, 246, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Mouse spotlight effect */}
      <div 
        ref={spotlightRef}
        className="fixed pointer-events-none w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(138, 75, 175, 0.35) 0%, rgba(91, 50, 130, 0.2) 35%, rgba(0, 0, 0, 0) 70%)',
          position: 'absolute',
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'screen',
          zIndex: 1, // Default z-index
        }}
      />
      
      {/* Content container */}
      <div className="container mx-auto px-4 max-w-5xl z-20 cursor-default">
        <div className="flex flex-col items-center text-center">
          {/* Badge - EU AI ACT */}
          <div className="mb-4" ref={badgeRef}>
            <Badge variant="glow" size="lg" className="hero-badge py-1.5 px-4 cursor-default">
              <div className="flex items-center gap-2">
                <span className="text-s font-large">
                  {aiAct.hero.badge}
                </span>
              </div>
            </Badge>
          </div>
          
          {/* Main headline */}
          <h1 
            ref={headlineRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight cursor-default relative"
            style={{ 
              textShadow: '5px 5px 3px rgba(0, 0, 0, 0.75)',
              transition: 'text-shadow 0.2s ease-out'
            }}
          >
            {aiAct.hero.heading}
          </h1>
          
          {/* Subheading */}
          <div 
            ref={subheadingRef}
            className="text-lg md:text-xl lg:text-2xl font-medium text-purple-300 mb-6 cursor-default"
          >
            {aiAct.hero.subheading}
          </div>
          
          {/* Description */}
          <p 
            ref={descriptionRef}
            className="text-md md:text-lg text-white/80 max-w-4xl mb-10 leading-relaxed"
          >
            {aiAct.hero.description}
          </p>
          
          {/* CTAs */}
          <div ref={ctaGroupRef} className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center">
            <Link href="https://www.keyholders.agency/ai-scan" className="relative z-20">
              <Button 
                size="lg" 
                className="cta-button rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-6 h-auto text-base relative group"
                style={{
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  borderRadius: '9999px',
                }}
              >
                {/* Border glimmer effect - only visible on hover */}
                <style jsx global>{borderGlimmerStyle}</style>
                <span className="mr-2 relative z-10">{aiAct.hero.primaryCta}</span>
                <ChevronRight className="h-4 w-4 relative z-10" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 
"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "motion/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Border glimmer style - exactly matching homepage
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

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef(null);
  const isInView = useInView(ctaRef, { once: true });
  
  // Set up animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom-=100",
          }
        }
      );
      
      // Mouse move event for dynamic border effects
      const handleMouseMove = (e: MouseEvent) => {
        // Find our CTA button
        const ctaButton = document.querySelector('.cta-section .cta-button');
        if (ctaButton) {
          const buttonRect = ctaButton.getBoundingClientRect();
          const isOverButton = 
            e.clientX >= buttonRect.left && 
            e.clientX <= buttonRect.right && 
            e.clientY >= buttonRect.top && 
            e.clientY <= buttonRect.bottom;
          
          // Add new code for the dynamic border glimmer effect
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
      };
      
      // Add mouse move event listener
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="cta-section relative py-20 overflow-hidden bg-[#080810]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold text-white mb-12"
          >
            Klaar om de AI deur te openen?
          </h2>
          
          {/* CTAs - Using the exact same implementation as homepage */}
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="cta-group flex flex-row gap-5 items-center justify-center mb-6"
          >
            <Link
              href="https://www.keyholders.agency/ai-scan"
              className="relative z-20"
            >
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
                <span className="mr-2 relative z-10">
                  Boek nu de gratis AI Scan
                </span>
                <ChevronRight className="h-4 w-4 relative z-10" />
              </Button>
            </Link>
          </motion.div>
          
          <p className="mt-6 text-gray-400 text-sm md:text-base">
            Ontdek welke Keyholder jouw uitdaging in recordtijd ontgrendelt.
          </p>
        </div>
      </div>
    </section>
  );
} 
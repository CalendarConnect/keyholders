"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/app/i18n/context";
import { ChevronRight, Scan, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Border glimmer style
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

// Register GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScanSection() {
  const { dictionary } = useI18n();
  const aiAct = dictionary.aiAct;
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<HTMLUListElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Create animations with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 75%",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(headingRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    ).fromTo(descriptionRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );
    
    // Animate list items
    const listItems = itemsRef.current?.querySelectorAll("li");
    if (listItems && listItems.length > 0) {
      tl.fromTo(listItems, 
        { x: -20, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );
    }
    
    // Card animation
    tl.fromTo(cardRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.1"
    );
    
    // Button animation
    tl.fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );
    
    // Scan icon animation
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: "-10px",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Pulse glow effect
      gsap.to(".scan-glow", {
        scale: 1.2,
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    return () => {
      if (sectionRef.current) {
        ScrollTrigger.getAll().forEach(st => st.kill());
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0a0a15] to-[#070710]"></div>
      
      {/* Radial gradient */}
      <div className="absolute inset-0 -z-9 bg-[radial-gradient(circle_at_center,rgba(104,58,183,0.1),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* Heading */}
            <h2 
              ref={headingRef}
              className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight"
            >
              {aiAct.scan.heading}
            </h2>
            
            {/* Description */}
            <p 
              ref={descriptionRef}
              className="text-xl text-white/80 max-w-3xl mx-auto mb-10"
            >
              {aiAct.scan.description}
            </p>
            
            {/* Scan benefits */}
            <ul 
              ref={itemsRef}
              className="max-w-xl mx-auto mb-12 space-y-4"
            >
              {aiAct.scan.items.map((item: string, index: number) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 text-left"
                >
                  <div className="mt-1 p-1 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <span className="text-lg text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Card with CTA */}
          <div className="relative">
            {/* Card */}
            <div 
              ref={cardRef}
              className="bg-[#0a0a18] border border-purple-800/30 rounded-3xl p-10 max-w-xl mx-auto flex flex-col items-center"
            >
              {/* CTA Buttons */}
              <div 
                ref={ctaRef}
                className="flex justify-center w-full"
              >
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
                    <span className="mr-2 relative z-10">{aiAct.scan.primaryCta}</span>
                    <ChevronRight className="h-4 w-4 relative z-10" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
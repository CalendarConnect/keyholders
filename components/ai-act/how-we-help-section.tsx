"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/app/i18n/context";
import { CheckSquare, Search, FileText } from "lucide-react";

// Register GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowWeHelpSection() {
  const { dictionary } = useI18n();
  const aiAct = dictionary.aiAct;
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  
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
    
    // Handle list items animation
    const listItems = listRef.current?.querySelectorAll(".help-item");
    if (listItems && listItems.length > 0) {
      tl.fromTo(listItems, 
        { x: -20, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );
    }
    
    // Magnifying glass hovering animation
    if (illustrationRef.current) {
      // Gentle hovering animation for magnifying glass
      gsap.to(illustrationRef.current.querySelector('.magnifying-glass'), {
        y: "-8px",
        x: "5px",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Subtle pulse for the glow effect
      gsap.to(illustrationRef.current.querySelector('.glow-effect'), {
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
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#0a0a12]"></div>
      
      {/* Side decoration */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-purple-900/5 to-transparent -z-5"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            {/* Content Column */}
            <h2 
              ref={headingRef}
              className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight"
            >
              {aiAct.howWeHelp.heading}
            </h2>
            
            <p 
              ref={descriptionRef}
              className="text-xl text-white/80 mb-12 max-w-lg"
            >
              {aiAct.howWeHelp.description}
            </p>
            
            <ul ref={listRef} className="space-y-6">
              {aiAct.howWeHelp.items.map((item: string, index: number) => (
                <li key={index} className="help-item flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-1 rounded bg-gradient-to-br from-indigo-600 to-purple-600">
                      <CheckSquare className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <span className="text-white/80 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Illustration Column - Using exact implementation from roadmap section */}
          <div ref={illustrationRef} className="relative hidden lg:flex items-center justify-center">
            {/* Center glow effect */}
            <div className="glow-effect absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
            
            {/* Magnifying Glass over Document Icon */}
            <div className="flex-shrink-0 relative">
              <div className="glow-effect absolute -inset-4 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-full blur-xl opacity-70"></div>
              
              <div className="relative">
                {/* Document */}
                <div className="p-6 rounded-lg bg-gradient-to-br from-[#0c0c18] to-[#090915] border border-purple-500/20">
                  <FileText className="w-16 h-16 text-purple-500/40" />
                </div>
                
                {/* Magnifying Glass */}
                <div className="magnifying-glass absolute -top-8 -right-6 p-3 rounded-full bg-gradient-to-br from-[#1a1a30] to-[#0c0c1c] border border-purple-500/30 shadow-lg">
                  <Search className="w-10 h-10 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
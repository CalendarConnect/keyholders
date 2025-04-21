"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/app/i18n/context";

// Register GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RequirementsSection() {
  const { dictionary } = useI18n();
  const aiAct = dictionary.aiAct;
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  
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
    
    // Handle cards animation
    const cards = cardsContainerRef.current?.querySelectorAll(".requirement-card");
    if (cards && cards.length > 0) {
      tl.fromTo(cards, 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );
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
      {/* Background with gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a0a0f] to-[#050510]"></div>
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 -z-9 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(120, 79, 241, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight text-center"
          >
            {aiAct.requirements.heading}
          </h2>
          
          {/* Description */}
          <p 
            ref={descriptionRef}
            className="text-xl text-white/80 mb-16 max-w-3xl mx-auto text-center"
          >
            {aiAct.requirements.description}
          </p>
          
          {/* Requirements Cards Grid */}
          <div 
            ref={cardsContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {aiAct.requirements.items.map((item: { title: string, description: string }, index: number) => (
              <div 
                key={index}
                className="requirement-card group bg-[#0a0a15] border border-purple-900/20 rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/30 hover:bg-[#0c0c1a]"
              >
                {/* Card number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-bold">
                    {index + 1}
                  </span>
                  
                  {/* Animated glow on hover */}
                  <div className="absolute top-2 right-2 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Card Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                
                {/* Card Description */}
                <p className="text-white/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
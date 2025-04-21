"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/app/i18n/context";

// Register GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RoadmapSection() {
  const { dictionary } = useI18n();
  const aiAct = dictionary.aiAct;
  
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Parallax effect for the background texture
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        if (backgroundRef.current) {
          gsap.to(backgroundRef.current, {
            y: `${self.progress * 50}px`,
            duration: 0.1,
            ease: "none"
          });
        }
      }
    });
    
    // Create animations with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 75%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Reveal animation for the content
    if (contentRef.current) {
      const heading = contentRef.current.querySelector('h2');
      const description = contentRef.current.querySelector('p');
      
      tl.fromTo(heading, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      ).fromTo(description, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
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
      {/* Background with pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a0a12] to-[#050510]"></div>
      
      {/* Moving background texture */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 -z-9 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.09'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container mx-auto px-4">
        <div 
          ref={contentRef}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Content */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            {aiAct.roadmap.heading}
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {aiAct.roadmap.description}
          </p>
        </div>
      </div>
    </section>
  );
} 
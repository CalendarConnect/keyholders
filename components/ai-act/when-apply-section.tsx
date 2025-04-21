"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/app/i18n/context";
import { Check, Shield } from "lucide-react";

// Register GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhenApplySection() {
  const { dictionary } = useI18n();
  const aiAct = dictionary.aiAct;
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<HTMLUListElement>(null);
  const additionalInfoRef = useRef<HTMLParagraphElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);
  
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
    
    // Handle list items animation safely
    const listItems = itemsRef.current?.querySelectorAll("li");
    if (listItems && listItems.length > 0) {
      tl.fromTo(listItems, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );
    }
    
    tl.fromTo(additionalInfoRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );
    
    // Shield icon floating animation
    if (decorationRef.current) {
      gsap.to(decorationRef.current, {
        y: "-10px",
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
      {/* Background with gradient */}
      <div className="absolute inset-0 -z-10 bg-[#0a0a0f]"></div>
      
      {/* Decorative Shield Icon */}
      <div
        ref={decorationRef}
        className="absolute left-20 top-1/3 hidden lg:block"
      >
        <Shield className="w-32 h-32 text-purple-500/10" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight"
          >
            {aiAct.whenApply.heading}
          </h2>
          
          {/* Description */}
          <p 
            ref={descriptionRef}
            className="text-xl text-purple-100 mb-10 max-w-3xl"
          >
            {aiAct.whenApply.description}
          </p>
          
          {/* Items */}
          <ul 
            ref={itemsRef}
            className="space-y-4 mb-12"
          >
            {aiAct.whenApply.items.map((item: string, index: number) => (
              <li 
                key={index} 
                className="flex items-start gap-4 text-white/80 group"
              >
                <div className="mt-1 p-1 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 group-hover:from-purple-400 group-hover:to-indigo-500 transition-colors">
                  <Check className="w-4 h-4 text-black" />
                </div>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
          
          {/* Additional Info */}
          <p 
            ref={additionalInfoRef}
            className="text-lg text-white/70 max-w-4xl p-6 border border-purple-800/20 rounded-xl bg-purple-900/5"
          >
            {aiAct.whenApply.additionalInfo}
          </p>
        </div>
      </div>
    </section>
  );
} 
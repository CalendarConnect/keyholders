"use client";

import React, { useEffect, useRef } from "react";
import { PhoneCall, Users, Zap, Shield } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    id: 1,
    icon: <PhoneCall className="h-6 w-6 text-purple-400" />,
    title: "Unlock Call",
    description: "20 minuten om jouw grootste 'slot' scherp te definiëren."
  },
  {
    id: 2,
    icon: <Users className="h-6 w-6 text-purple-400" />,
    title: "Key Match",
    description: "We selecteren precies de juiste Keyholders voor jouw case."
  },
  {
    id: 3,
    icon: <Zap className="h-6 w-6 text-purple-400" />,
    title: "Rapid Prototype",
    description: "Tastbaar resultaat binnen dagen, niet kwartalen."
  },
  {
    id: 4,
    icon: <Shield className="h-6 w-6 text-purple-400" />,
    title: "Scale & Secure",
    description: "Governance, training en cyber‑weerbaarheid stevig verankerd."
  }
];

export default function KeyFormula() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
      
      // Steps animation with timeline for sequential reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stepsRefs.current[0],
          start: "top bottom-=50",
        }
      });
      
      stepsRefs.current.forEach((step, index) => {
        if (!step) return;
        
        tl.fromTo(
          step,
          { opacity: 0, x: -20 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.5,
            ease: "power1.out"
          },
          index * 0.15 // Stagger timing
        );
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0c0c18] to-[#090913]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
      </div>
      
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold text-white mb-16 text-center"
          >
            Onze Key‑formule
          </h2>
          
          <div className="relative">
            {/* Vertical line connector */}
            <div className="absolute left-6 top-12 bottom-12 w-px bg-purple-600/30 hidden md:block"></div>
            
            <div className="space-y-8 md:space-y-10">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  ref={el => {
                    stepsRefs.current[index] = el;
                  }}
                  className="relative flex items-start gap-5"
                >
                  {/* Step number with icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center relative z-10">
                    {step.icon}
                  </div>
                  
                  <div className="pt-1">
                    <h3 className="text-xl font-bold text-white flex items-center mb-1">
                      <span className="opacity-50 mr-2">{step.id}.</span> {step.title}
                    </h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
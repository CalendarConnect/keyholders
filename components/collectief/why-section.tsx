"use client";

import React, { useEffect, useRef } from "react";
import { Key, Users, Zap, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    icon: <Key className="h-6 w-6 text-purple-400" />,
    title: "Alle Keys aan één ring",
    description: "Eén aanspreekpunt, vijf bewezen expertises. Jouw organisatie schakelt meteen op volle kracht vooruit."
  },
  {
    icon: <Users className="h-6 w-6 text-purple-400" />,
    title: "Geen hiërarchie",
    description: "Je krijgt één Keyholder op de lijn, maar profiteert van de volledige brainpower van het Collectief."
  },
  {
    icon: <Zap className="h-6 w-6 text-purple-400" />,
    title: "Senior‑only",
    description: "200+ AI‑trajecten afgerond. We weten wat werkt en wat niet."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-purple-400" />,
    title: "Ethics & Security",
    description: "Elke flow wordt getoetst op EU AI Act, AVG, GDPR en NIS2. Zo bouw je toekomstvast."
  }
];

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
      
      // Staggered animation for items
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.7,
            delay: 0.1 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=50",
            }
          }
        );
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-[#0a0a0f] to-[#0c0c18]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0c0c18_70%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold text-white mb-16 text-center"
          >
            Waarom organisaties voor Keyholders kiezen
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {reasons.map((reason, index) => (
              <div
                key={index}
                ref={el => {
                  itemRefs.current[index] = el;
                }}
                className="bg-[#0F0F1A] p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="bg-purple-500/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-purple-500/20 transition-colors duration-300">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-gray-300">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
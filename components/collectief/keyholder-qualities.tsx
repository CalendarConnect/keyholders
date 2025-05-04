"use client";

import React, { useEffect, useRef } from "react";
import { Brain, Book, Zap, Hammer, Shield, Users, Rocket } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const qualities = [
  {
    icon: <Brain className="h-6 w-6 text-purple-400" />,
    title: "Radicale nieuwsgierigheid.",
    description: "We blijven vragen tot we het echte probleem zien."
  },
  {
    icon: <Book className="h-6 w-6 text-purple-400" />,
    title: "Leer‑drive zonder eindpunt.",
    description: "Dagelijks nieuwe kennis vasthaken → morgen toepassen."
  },
  {
    icon: <Zap className="h-6 w-6 text-purple-400" />,
    title: "Kracht van simplificatie.",
    description: "Complexiteit eruit, één Key en klaar voor actie."
  },
  {
    icon: <Hammer className="h-6 w-6 text-purple-400" />,
    title: "Doeners‑mentaliteit.",
    description: "Denken + bouwen blijft bij dezelfde persoon; geen overdracht, geen ruis."
  },
  {
    icon: <Shield className="h-6 w-6 text-purple-400" />,
    title: "Ethiek als default.",
    description: "EU AI Act, GDPR en NIS2 zitten al in het ontwerp."
  },
  {
    icon: <Users className="h-6 w-6 text-purple-400" />,
    title: "Collectieve scherpte.",
    description: "Solo focus, gezamenlijke brainpower, jij krijgt het hele Collectief in je hoek."
  }
];

export default function KeyholderQualities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const qualityRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
      
      // Subheading animation
      gsap.fromTo(
        subheadingRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: subheadingRef.current,
            start: "top bottom-=100",
          }
        }
      );
      
      // Staggered animation for qualities
      qualityRefs.current.forEach((quality, index) => {
        if (!quality) return;
        
        gsap.fromTo(
          quality,
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.7,
            delay: 0.1 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quality,
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
      className="relative py-24 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/5 blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Wat maakt een Keyholder?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {qualities.map((quality, index) => (
              <div
                key={index}
                ref={el => {
                  qualityRefs.current[index] = el;
                }}
                className="bg-gradient-to-br from-[#0c0c18]/60 to-[#13131f]/60 p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="bg-purple-500/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-purple-500/20 transition-colors duration-300">
                  {quality.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{quality.title}</h3>
                <p className="text-gray-300">{quality.description}</p>
              </div>
            ))}
          </div>
          
          <div 
            ref={subheadingRef}
            className="mt-12 p-6 rounded-xl border border-purple-500/20 bg-purple-500/5 text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Rocket className="h-6 w-6 text-purple-400 mr-2" />
              <h3 className="text-xl font-bold text-white">Kernkracht</h3>
            </div>
            <p className="text-gray-300">
              Unlock sneller, bouw slimmer, lever duurzame impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 
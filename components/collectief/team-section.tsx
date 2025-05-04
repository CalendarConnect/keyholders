"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface KeyholderMember {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  linkedin: string;
}

const keyholders: KeyholderMember[] = [
  {
    id: "christian",
    name: "Christian Bleeker",
    title: "The Flowsmith",
    description: "Full‑stack AI‑software‑developer. Smelt processen, data en AI‑infrastructuur tot end‑to‑end automatiseringen. Bouwt alles in eigen beheer, van VPS‑hosting en datastructuur tot chat‑interfaces, n8n‑workflows en koppelingen met jouw bestaande stack.",
    image: "/images/keyholders/Chris.jfif",
    linkedin: "https://www.linkedin.com/in/cbleeker/"
  },
  {
    id: "renier",
    name: "Renier Bleeker",
    title: "The Optimus Tacticus",
    description: "Converteert complexe ideeën naar kristalheldere n8n‑strategieën. Ontwerpt en lanceert schaalbare low‑code workflows die AI‑power naadloos verbinden met business‑logica, en levert businesswaarde in weken.",
    image: "/images/keyholders/Renier.jfif",
    linkedin: "https://www.linkedin.com/in/renierbleeker/"
  },
  {
    id: "els",
    name: "Els Verheirstraeten",
    title: "The Compliance Compass",
    description: "Architect van de AI Compliance Kit. Maakt regels menselijk en voorkomt sancties nog vóór ze ontstaan.",
    image: "/images/keyholders/Els.jfif",
    linkedin: "https://www.linkedin.com/in/els-verheirstraeten/"
  },
  {
    id: "erik",
    name: "Erik van der Veen",
    title: "The Adoption Accelerator",
    description: "Traint teams in prompt‑craft en AI‑mindset. Verankert verandering in dagelijkse routines.",
    image: "/images/keyholders/erikvanderveen.jfif",
    linkedin: "https://www.linkedin.com/in/erikvanderveen/"
  },
  {
    id: "sandra",
    name: "Sandra Dorrio Estrada",
    title: "The Cyber Sentinel",
    description: "NIS2‑specialist. Stemt elk AI‑systeem af op top‑security en houdt auditors én hackers buiten.",
    image: "/images/keyholders/Sandra.jfif",
    linkedin: "https://www.linkedin.com/in/sandranl/"
  }
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
      
      // Staggered animation for team member cards
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            delay: 0.1 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
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
      className="relative py-24 overflow-hidden bg-[#0c0c18]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0c0c18_70%)]"></div>
      </div>
      
      {/* Background glows */}
      <div className="absolute -left-32 top-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute -right-32 bottom-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold text-white mb-16 text-center"
          >
            De Keyholders
          </h2>
          
          <div className="space-y-8">
            {keyholders.map((member, index) => (
              <div
                key={member.id}
                ref={el => {
                  cardRefs.current[index] = el;
                }}
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0d0d19] to-[#14142a] border border-white/5 hover:border-purple-500/20 transition-all duration-300"
              >
                {/* Top accent border */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                <div className="flex flex-col md:flex-row">
                  {/* Image container */}
                  <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden">
                    <div className="h-full w-full md:aspect-square relative overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                            <span>🔑</span> {member.name}
                          </h3>
                          <p className="text-purple-400 font-medium">{member.title}</p>
                        </div>
                        
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="mt-3 md:mt-0 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200 w-fit"
                        >
                          <Linkedin className="w-5 h-5 text-blue-400" />
                        </a>
                      </div>
                      
                      <p className="text-gray-300">{member.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
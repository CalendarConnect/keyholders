"use client";

import PageWrapper from "@/components/wrapper/page-wrapper";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import { useI18n } from "../i18n/context";

export default function AIScanPage() {
  const particlesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Register GSAP plugins inside useEffect
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate particles
    const particles = particlesRef.current?.querySelectorAll('.particle');
    if (particles) {
      particles.forEach((particle) => {
        gsap.to(particle, {
          y: "random(-20, 20)",
          x: "random(-20, 20)",
          rotation: "random(-15, 15)",
          duration: "random(3, 6)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      });
    }

    // Fade in the container
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        delay: 0.2
      }
    );
    
    // Set mounted state to true to allow client-side only rendering of iframe
    setMounted(true);
    
    return () => {
      // Cleanup ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // This is the exact iframe code provided by Notion when sharing
  const notionIframe = (
    <iframe 
      src="https://astonishing-moonflower-5d7.notion.site/ebd/1d731f3c9d2e8158a614d906aedd7573" 
      width="100%" 
      height="2200px" 
      style={{ 
        border: 'none', 
        borderRadius: '0.5rem', 
        display: 'block', 
        margin: '0 auto',
      }}
      frameBorder="0"
      allowFullScreen 
    />
  );

  return (
    <PageWrapper>
      <main className="relative bg-[#0a0a0f] min-h-screen">
        {/* Background Elements */}
        <div className="fixed inset-0 -z-20 bg-[#0a0a0f]">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
          
          {/* Animated gradients */}
          <div className="absolute top-1/4 -right-64 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse-slow"></div>
          <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-slow delay-1000"></div>
        </div>
        
        {/* Floating particles */}
        <div 
          ref={particlesRef}
          className="fixed inset-0 overflow-hidden pointer-events-none"
        >
          <div className="particle absolute top-[15%] left-[10%] w-1 h-1 bg-purple-400 rounded-full opacity-60"></div>
          <div className="particle absolute top-[25%] right-[20%] w-2 h-2 bg-blue-400 rounded-full opacity-40"></div>
          <div className="particle absolute bottom-[30%] left-[15%] w-2 h-2 bg-indigo-400 rounded-full opacity-50"></div>
          <div className="particle absolute bottom-[20%] right-[25%] w-1 h-1 bg-purple-400 rounded-full opacity-60"></div>
          <div className="particle absolute top-[40%] left-[30%] w-1.5 h-1.5 bg-blue-400 rounded-full opacity-30"></div>
          <div className="particle absolute top-[45%] right-[40%] w-1 h-1 bg-indigo-400 rounded-full opacity-40"></div>
          <div className="particle absolute bottom-[40%] left-[20%] w-1 h-1 bg-blue-300 rounded-full opacity-50"></div>
          <div className="particle absolute bottom-[45%] right-[15%] w-2 h-2 bg-purple-300 rounded-full opacity-30"></div>
          <div className="particle absolute top-[60%] left-[40%] w-1.5 h-1.5 bg-indigo-300 rounded-full opacity-40"></div>
        </div>

        {/* Top gradient line */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

        {/* Page content */}
        <div className="pt-28 pb-16 w-full flex flex-col items-center">
          {/* Title badge - optional */}
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">AI Assessment</span>
          </div>
          
          {/* Form container */}
          <div 
            ref={containerRef}
            className="w-full max-w-5xl bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5"></div>
            
            {/* Only render the iframe after component has mounted (client-side only) */}
            {mounted && (
              <div className="relative" style={{ width: '100%', height: '100%', minHeight: '600px' }}>
                {notionIframe}
              </div>
            )}
          </div>
        </div>
      </main>
    </PageWrapper>
  );
} 
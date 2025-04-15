"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ExternalLink, Star, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AIActHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const cursorTrailerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<string | null>(null);

  // Initialize animations
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Main timeline for staggered animations on load
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(badgeRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6 }
    ).fromTo(headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(subheadingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 }
    , "-=0.4").fromTo(descriptionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }
    , "-=0.3").fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    , "-=0.3").fromTo(statsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    , "-=0.4");
    
    // Floating particles animation
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
    
    // Spotlight text effect
    gsap.fromTo(".spotlight-text",
      { backgroundSize: "0% 40%" },
      { 
        backgroundSize: "100% 40%", 
        duration: 1.2, 
        delay: 1.2,
        ease: "power2.out"
      }
    );
  }, []);
  
  // Mouse movement effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      
      // Move cursor trailer with a slight delay
      if (cursorTrailerRef.current) {
        gsap.to(cursorTrailerRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Button hover effects
  const handleButtonHover = (id: string) => {
    setIsHovering(id);
    
    if (id === "main-cta") {
      gsap.to(".cta-light", {
        opacity: 0.8,
        scale: 1.4,
        duration: 0.4,
        ease: "power2.out"
      });
      
      gsap.to(".cta-glow", {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
    
    if (id === "learn-more") {
      gsap.to(".learn-light", {
        opacity: 0.8,
        scale: 1.4,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };
  
  const handleButtonLeave = (id: string) => {
    setIsHovering(null);
    
    if (id === "main-cta") {
      gsap.to(".cta-light", {
        opacity: 0.4,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
      
      gsap.to(".cta-glow", {
        opacity: 0.3,
        duration: 0.4,
        ease: "power2.out"
      });
    }
    
    if (id === "learn-more") {
      gsap.to(".learn-light", {
        opacity: 0.3,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20 bg-[#050510]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Animated gradients */}
        <div className="absolute top-1/4 -right-64 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse-slow"></div>
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-slow delay-1000"></div>
      </div>
      
      {/* Floating particles */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
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
      
      {/* Cursor effects */}
      <div 
        ref={cursorTrailerRef}
        className="fixed w-[350px] h-[350px] rounded-full pointer-events-none z-10 opacity-20 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          left: '-175px',
          top: '-175px'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Agency Badge */}
          <div 
            ref={badgeRef}
            className="mb-8 inline-flex items-center gap-2"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-0.5 rounded-full">
              <div className="bg-[#0c0c18] px-4 py-1.5 rounded-full flex items-center gap-2">
                <span className="text-white text-sm font-medium">EU AI Act</span>
                <div className="w-px h-4 bg-gray-700"></div>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-yellow-500" />
                  <span className="text-yellow-500 text-xs font-medium">Important Regulation</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Content */}
          <div className="mb-12">
            <h1 
              ref={headingRef}
              className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
            >
              EU AI Act: Intelligent Automation 
              <span className="relative">
                <span className="relative z-10"> With </span>
                <div className="absolute -inset-1 -z-0 opacity-30 blur-lg rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
              </span> Confidence
            </h1>
            
            <div 
              ref={subheadingRef}
              className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8"
            >
              <div 
                className="bg-gradient-to-br from-[#0c0c18] to-[#13131f] p-6 rounded-xl border border-white/5 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-20"></div>
                
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    <span className="spotlight-text relative bg-gradient-to-r from-purple-400 to-blue-400 bg-no-repeat bg-left-bottom">
                      Navigate AI Regulation Without Slowing Innovation
                    </span>
                  </h2>
                </div>
              </div>
            </div>
            
            <p 
              ref={descriptionRef}
              className="text-xl text-gray-300 max-w-3xl mb-10"
            >
              The EU&apos;s new AI Act impacts how businesses implement AI starting February 2025. Stay ahead of regulations while unlocking AI&apos;s full potential for your business.
            </p>

            {/* CTA Buttons */}
            <div 
              ref={ctaRef}
              className="flex flex-wrap gap-6 items-center"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-70 blur-sm cta-glow"></div>
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full px-8 py-6 h-auto text-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-shadow group"
                  onMouseEnter={() => handleButtonHover("main-cta")}
                  onMouseLeave={() => handleButtonLeave("main-cta")}
                >
                  <span className="mr-2">Book a Consultation</span>
                  <div className="relative">
                    <div className="absolute inset-0 bg-white rounded-full opacity-40 cta-light"></div>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Button>
              </div>

              <Link
                href="/resources/ai-act" 
                className="text-white/80 hover:text-white flex items-center gap-2 group"
                onMouseEnter={() => handleButtonHover("learn-more")}
                onMouseLeave={() => handleButtonLeave("learn-more")}
              >
                <span>Learn more about the regulations</span>
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full opacity-0 learn-light"></div>
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
          
          {/* Stats */}
          <div 
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-purple-500/20 transition-colors group relative overflow-hidden">
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">85%</div>
                <div className="text-gray-400">of businesses are uncertain about how the AI Act affects their operations</div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-blue-500/20 transition-colors group relative overflow-hidden">
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">42%</div>
                <div className="text-gray-400">of companies delay AI implementation due to regulatory concerns</div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-red-500/20 transition-colors group relative overflow-hidden">
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">7%</div>
                <div className="text-gray-400">maximum global turnover penalty for serious AI Act violations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
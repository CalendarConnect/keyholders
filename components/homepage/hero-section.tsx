"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const cursorTrailerRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [currentTextState, setCurrentTextState] = useState(0);
  const textStates = [
    { highlight: "Spot issues faster", description: "Our automation solutions highlight inefficiencies in real-time" },
    { highlight: "Convert more leads", description: "Intelligent workflows that nurture prospects through each stage" },
    { highlight: "Scale operations", description: "Systems that grow with your business without adding overhead" },
  ];
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    
    // Cycle through text states
    startTextCycle();
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Function to handle text state cycling
  const startTextCycle = () => {
    timeoutRef.current = setTimeout(() => {
      setCurrentTextState((prev) => (prev + 1) % textStates.length);
      
      // Animate the text change
      gsap.fromTo(".state-text",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
      
      gsap.fromTo(".spotlight-text",
        { backgroundSize: "0% 40%" },
        { 
          backgroundSize: "100% 40%", 
          duration: 1.2,
          ease: "power2.out"
        }
      );
      
      startTextCycle();
    }, 5000);
  };
  
  // Mouse movement effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      
      // Move cursor trailer with a slight delay
      if (cursorTrailerRef.current && cursorDotRef.current) {
        gsap.to(cursorDotRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.1,
          ease: "power1.out"
        });
        
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
    
    if (id === "success-link") {
      gsap.to(".success-light", {
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
    
    if (id === "success-link") {
      gsap.to(".success-light", {
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
      className="relative pt-14 pb-20 overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20 bg-[#0a0a0f]">
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
        ref={cursorDotRef}
        className="fixed w-2 h-2 rounded-full bg-white opacity-70 pointer-events-none z-50 will-change-transform"
        style={{
          left: '-5px',
          top: '-5px',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      ></div>
      
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
          {/* Hero Content */}
          <div className="mb-12 pt-12">
            <h1 
              ref={headingRef}
              className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
            >
              Unlock Business Growth Through
              <span className="relative">
                <span className="relative z-10"> Intelligent </span>
                <div className="absolute -inset-1 -z-0 opacity-30 blur-lg rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
              </span> Automation
            </h1>
            
            <div 
              ref={subheadingRef}
              className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8"
            >
              <div 
                className="flex-1 bg-gradient-to-br from-[#0c0c18] to-[#13131f] p-6 rounded-xl border border-white/5 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-20"></div>
                
                <div className="state-text">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    <span className="spotlight-text relative bg-gradient-to-r from-purple-400 to-blue-400 bg-no-repeat bg-left-bottom">
                      {textStates[currentTextState].highlight}
                    </span>
                  </h2>
                  <p className="text-gray-400">
                    {textStates[currentTextState].description}
                  </p>
                </div>
              </div>
            </div>
            
            <p 
              ref={descriptionRef}
              className="text-xl text-gray-300 max-w-3xl mb-10"
            >
              Our bespoke RevOps solutions connect your entire tech stack to eliminate silos, reduce manual tasks, and accelerate your business performance.
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
                  <span className="mr-2">Do the AI Scan!</span>
                  <div className="relative">
                    <div className="absolute inset-0 bg-white rounded-full opacity-40 cta-light"></div>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
            </Button>
              </div>

          <Link
                href="/case-studies" 
                className="text-white/80 hover:text-white flex items-center gap-2 group"
              >
                <span>View case studies</span>
                <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
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
                <div className="text-gray-400">Time saved on manual data entry tasks</div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-blue-500/20 transition-colors group relative overflow-hidden">
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">42%</div>
                <div className="text-gray-400">Average increase in lead conversion rates</div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-indigo-500/20 transition-colors group relative overflow-hidden">
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400">Automation systems that never sleep</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

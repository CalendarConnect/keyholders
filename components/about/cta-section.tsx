"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Zap, Check, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion, useMotionValue, useTransform } from "motion/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const btnRef = useRef<HTMLDivElement>(null);
  const [hasHovered, setHasHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  // For the glowing effect on the button
  const maskImage = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(180px at ${x}px ${y}px, rgba(255, 255, 255, 0.15), transparent 100%)`
  );
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
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
      
      // Animate description
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top bottom-=80",
          }
        }
      );
      
      // Animate badge
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: -10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom-=100",
          }
        }
      );
      
      // Animate benefit items
      gsap.fromTo(
        ".benefit-item",
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top bottom-=50",
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const benefits = [
    "Streamlined workflows and processes",
    "Reduced manual tasks through intelligent automation",
    "Secure and compliant AI implementation",
    "Enhanced data-driven decision making",
    "Personalized training and ongoing support"
  ];
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,76,255,0.15),transparent_80%)]"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.07)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Glowing orb effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120vh] aspect-square rounded-full bg-purple-600/10 blur-[120px] animate-pulse-slow"></div>
      </div>
      
      {/* Decorative top light accent */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div
              ref={badgeRef}
              className="inline-block py-1.5 px-6 rounded-full border border-purple-500/20 bg-purple-500/5 text-sm text-purple-300 mb-6"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Begin Your AI Journey Today</span>
              </div>
            </div>

            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white"
            >
              Ready to Transform Your Business?
            </h2>

            <p
              ref={descriptionRef}
              className="text-xl text-gray-300 font-light mb-10 max-w-3xl mx-auto"
            >
              Join forward-thinking companies that have transformed their operations with our intelligent automation solutions. Let&apos;s build AI systems that respect your business values and deliver measurable results.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Benefits column */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8">
                Partner with Keyholders to gain:
              </h3>

              <ul ref={listRef} className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="benefit-item flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <Check className="w-4 h-4" />
                    </div>
                    <p className="text-lg text-gray-300">{benefit}</p>
                  </li>
                ))}
              </ul>
              
              {/* Stats */}
              <div className="p-6 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm relative overflow-hidden">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">90%</p>
                    <p className="text-gray-400 mt-1">faster process completion</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">75%</p>
                    <p className="text-gray-400 mt-1">reduction in manual errors</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA card */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30"></div>
              <div className="relative p-8 md:p-10 rounded-2xl bg-[#0c0c18] border border-white/10 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-blue-600/5 to-transparent"></div>
                
                {/* Background glow spots */}
                <div className="absolute left-0 top-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2"></div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    Start your automation journey
                  </h3>
                  <p className="text-gray-300 mb-8">
                    Book a free consultation with our automation specialists and discover how we can transform your business processes.
                  </p>

                  {/* CTA Button with glow effect */}
                  <div 
                    ref={btnRef} 
                    className="relative group mb-8"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setHasHovered(true)}
                  >
                    <Link href="/contact">
                      <div className="relative overflow-hidden rounded-xl">
                        <div 
                          className="absolute inset-0 transition-opacity duration-300"
                          style={{ 
                            opacity: hasHovered ? 1 : 0,
                            backgroundImage: maskImage as any
                          }}
                        />
                        <Button
                          size="lg"
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-lg py-6 px-8 h-auto rounded-xl"
                        >
                          <span className="mr-2">Book a Free Consultation</span>
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </Link>
                  </div>

                  {/* Secondary options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                      href="/case-studies"
                      className="flex items-center justify-center px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-center transition-colors"
                    >
                      <span>View Case Studies</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                      href="https://form.typeform.com/to/tTwl3rjL"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-center transition-colors"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      <span>Automation Scan</span>
                    </Link>
                    <Link
                      href="https://www.europarl.europa.eu/topics/en/article/20230601STO93804/eu-ai-act-first-regulation-on-artificial-intelligence"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-center transition-colors"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Learn more about the regulations</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
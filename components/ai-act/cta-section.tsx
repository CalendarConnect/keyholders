"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Shield, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasHovered, setHasHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: badgeRef.current,
            start: "top bottom-=100",
          },
        }
      );

      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom-=100",
          },
        }
      );

      // Description animation
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top bottom-=100",
          },
        }
      );

      // List items animation
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
            start: "top bottom-=100",
          },
        }
      );

      // CTA buttons animation
      gsap.fromTo(
        ctaButtonsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          scrollTrigger: {
            trigger: ctaButtonsRef.current,
            start: "top bottom-=100",
          },
        }
      );

      // Background animation
      gsap.to(".bg-glow", {
        opacity: 0.6,
        scale: 1.1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const benefits = [
    "Reduced operational overhead",
    "Enhanced data security",
    "Improved productivity",
    "Real-time data insights",
    "Faster decision making",
    "Superior client value",
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 lg:py-40 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[#050510]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>

        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,76,255,0.15),transparent_80%)]"></div>

        {/* Glowing orb effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120vh] aspect-square rounded-full bg-purple-600/10 blur-[120px] bg-glow"></div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

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
                <span>AI Act Compliance Experts</span>
              </div>
            </div>

            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white"
            >
              Ready to Automate Securely?
            </h2>

            <p
              ref={descriptionRef}
              className="text-xl text-gray-300 font-light mb-10 max-w-3xl mx-auto"
            >
              Join forward-thinking companies that have implemented AI-powered automation with confidence. Transform your business with Keyholders&apos; custom automation solutions that respect regulatory boundaries.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Benefits column */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8">
                Transform your business with:
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
            </div>

            {/* CTA card */}
            <div>
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
                    Book a free consultation with an automation specialist to explore compliant solutions aligned with your business goals.
                  </p>

                  {/* CTA Buttons */}
                  <div ref={ctaButtonsRef} className="space-y-4">
                    {/* Main CTA Button with glow effect */}
                    <div
                      ref={btnRef}
                      className="relative group"
                      onMouseMove={handleMouseMove}
                      onMouseEnter={() => setHasHovered(true)}
                    >
                      <Link href="/contact">
                        <div className="relative overflow-hidden rounded-xl">
                          <div
                            className="absolute inset-0 transition-opacity duration-300"
                            style={{
                              opacity: hasHovered ? 1 : 0,
                              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.15) 0%, transparent 70%)`,
                            }}
                          ></div>
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

                    {/* Secondary CTA */}
                    <Link
                      href="/ai-scan"
                      className="flex items-center justify-center px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-center transition-colors"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      <span>Take Our AI Scan</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
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
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Bot, Sparkles } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/app/i18n/context";
import CaseStudyCard from "./case-study-card";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface CaseStudy {
  companyName: string;
  clientName: string;
  description: string;
  clientQuote: string;
}

export default function CaseStudiesGrid() {
  const { dictionary } = useI18n();
  
  // Add fallback for missing translations
  const caseStudies = dictionary.caseStudies || {
    features: {
      title: "Our Case Studies",
      items: []
    },
    caseStudies: [],
    conclusion: {
      heading: "The Keyholders Difference",
      description: "Our approach focuses on creating custom solutions that precisely fit your business needs, not forcing you to adapt to off-the-shelf products.",
      benefits: []
    },
    cta: {
      heading: "Ready to transform your business?",
      description: "Let's discuss how intelligent automation can solve your specific challenges and accelerate your growth.",
      primaryCta: "Get your free AI scan",
      secondaryCta: "Schedule a consultation",
      tertiaryLink: "Learn about EU AI Act compliance",
      caseStudyLink: "Read full case study"
    }
  };
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const conclusionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const ctx = gsap.context(() => {
        // Animate heading
        if (headingRef.current) {
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
        }
        
        // Animate features
        featureRefs.current.forEach((feature, index) => {
          if (!feature) return;
          
          gsap.fromTo(
            feature,
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.6,
              delay: 0.1 * index,
              ease: "power2.out",
              scrollTrigger: {
                trigger: feature,
                start: "top bottom-=50",
              }
            }
          );
        });
        
        // Animate conclusion
        if (conclusionRef.current) {
          gsap.fromTo(
            conclusionRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: conclusionRef.current,
                start: "top bottom-=100"
              }
            }
          );
        }
        
        // Animate stats
        if (statsRef.current) {
          gsap.fromTo(
            statsRef.current.querySelectorAll('.stat-item'),
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.2,
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top bottom-=50"
              }
            }
          );
        }
      }, sectionRef);
      
      return () => ctx.revert();
    } catch (error) {
      console.error("Animation error:", error);
    }
  }, []);
  
  // Create features array with fallback
  const features: Feature[] = Array.isArray(caseStudies.features.items) ? 
    caseStudies.features.items.map((item: any, index: number) => ({
      icon: index === 0 ? <Code className="h-6 w-6" /> : 
            index === 1 ? <Bot className="h-6 w-6" /> : 
                          <Sparkles className="h-6 w-6" />,
      title: item.title || "",
      description: item.description || ""
    })) : [];
  
  return (
    <section 
      id="case-studies"
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-[#090912]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,76,255,0.15),transparent_70%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2
              ref={headingRef}
              className="text-3xl md:text-4xl font-bold text-white mb-12"
            >
              {caseStudies.features.title}
            </h2>
          </div>
          
          {/* Key features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {features.map((feature: Feature, index: number) => (
              <div
                key={index}
                ref={el => { featureRefs.current[index] = el; }}
                className="rounded-xl p-6 bg-gradient-to-br from-[#0c0c18] to-[#13131f] border border-white/5 hover:border-purple-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-5 text-purple-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Case Studies */}
          <div className="space-y-8 mb-16">
            {Array.isArray(caseStudies.caseStudies) && caseStudies.caseStudies.map((study: CaseStudy, index: number) => {
              // Custom image handling for specific clients
              let imagePath = `/images/case-studies/${study.clientName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
              
              // Special cases for each client based on the client's text
              if (study.clientName === "Bob") {
                imagePath = "/images/case-studies/bob.jpg";
              } else if (study.clientName === "Sandra" && study.companyName === "SDE Consultancy") {
                imagePath = "/images/case-studies/Sandra_SDE_COnsultancy.jpg";
              } else if (study.clientName === "Pascal") {
                imagePath = "/images/case-studies/Pascal.jpg";
              } else if (study.clientName === "Ashra") {
                imagePath = "/images/case-studies/ashra.jpg";
              }
              
              return (
                <CaseStudyCard
                  key={index}
                  companyName={study.companyName}
                  clientName={study.clientName}
                  clientImage={imagePath}
                  companyUrl={`#${study.companyName.toLowerCase().replace(/\s+/g, '-')}`}
                  description={study.description}
                  clientQuote={study.clientQuote}
                  ctaText={caseStudies.cta.caseStudyLink}
                  ctaLink="https://www.keyholders.agency/ai-scan"
                  index={index}
                />
              );
            })}
          </div>
          
          {/* Conclusion */}
          <div
            ref={conclusionRef}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {caseStudies.conclusion.heading}
            </h2>
            <p className="text-xl text-white/80 mb-10">
              {caseStudies.conclusion.description}
            </p>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {Array.isArray(caseStudies.conclusion.benefits) && caseStudies.conclusion.benefits.map((benefit: string, index: number) => (
                <div 
                  key={index}
                  className="bg-white/5 p-4 rounded-lg flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span className="text-white/80">{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* Stats - Add this section */}
            {caseStudies.conclusion.stats && (
              <div 
                ref={statsRef}
                className="flex flex-col md:flex-row items-center justify-center gap-10 mb-16"
              >
                {caseStudies.conclusion.stats.taskCompletion && (
                  <div className="stat-item bg-gradient-to-br from-purple-600/10 to-indigo-600/10 border border-purple-500/20 p-6 rounded-xl text-center min-w-[200px]">
                    <div className="text-4xl font-bold text-white mb-2">
                      {caseStudies.conclusion.stats.taskCompletion.value}
                    </div>
                    <div className="text-purple-300">
                      {caseStudies.conclusion.stats.taskCompletion.label}
                    </div>
                  </div>
                )}
                {caseStudies.conclusion.stats.errors && (
                  <div className="stat-item bg-gradient-to-br from-indigo-600/10 to-blue-600/10 border border-indigo-500/20 p-6 rounded-xl text-center min-w-[200px]">
                    <div className="text-4xl font-bold text-white mb-2">
                      {caseStudies.conclusion.stats.errors.value}
                    </div>
                    <div className="text-indigo-300">
                      {caseStudies.conclusion.stats.errors.label}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {caseStudies.cta.heading}
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              {caseStudies.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://www.keyholders.agency/ai-scan"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors duration-200"
              >
                <span>{caseStudies.cta.primaryCta}</span>
                <Sparkles className="h-4 w-4" />
              </Link>
              <Link 
                href="https://www.keyholders.agency/ai-scan"
                className="inline-flex items-center justify-center gap-2 border border-purple-500/30 hover:border-purple-500/60 text-white py-3 px-6 rounded-lg transition-colors duration-200"
              >
                <span>{caseStudies.cta.secondaryCta}</span>
              </Link>
              <Link 
                href="https://www.keyholders.agency/ai-act"
                className="text-purple-300 hover:text-purple-200 py-3 px-3 transition-colors duration-200"
              >
                {caseStudies.cta.tertiaryLink}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
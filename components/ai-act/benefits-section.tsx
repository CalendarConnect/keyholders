"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Sparkles, 
  Shield, 
  Eye, 
  Users, 
  BookOpen, 
  Check,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor: string;
  index: number;
}

const BenefitCard = ({ icon, title, description, iconColor, index }: BenefitCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
        },
        delay: index * 0.15,
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="bg-gradient-to-br from-[#0c0c18] to-[#13131f] rounded-xl p-6 border border-white/5 hover:border-purple-500/20 transition-all duration-300 group overflow-hidden relative"
    >
      {/* Subtle gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Corner accent */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-${iconColor}-500/10 to-transparent rounded-bl-[100px] opacity-30`}></div>
      
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-lg bg-${iconColor}-500/10 flex items-center justify-center mb-5 text-${iconColor}-400`}>
          {icon}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

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
          },
        }
      );

      // Description animation
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
            start: "top bottom-=100",
          },
        }
      );

      // Glowing background animation
      gsap.to(".bg-glow", {
        opacity: 0.6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "No Exposure of Sensitive Data",
      description: "Our secure implementation approach prevents customer information, financial data, and proprietary knowledge from leaving your control.",
      iconColor: "purple",
      index: 0,
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Transparent AI Operations",
      description: "Clear documentation and processes allow you to demonstrate compliance when needed.",
      iconColor: "blue",
      index: 1,
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Human Oversight Built In",
      description: "Maintain appropriate human review of AI systems as required by the AI Act.",
      iconColor: "teal",
      index: 2,
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "AI Literacy Integration",
      description: "Ensure your team has the knowledge required by the February 2025 deadline.",
      iconColor: "amber",
      index: 3,
    },
  ];

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[#050510]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Animated background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[120vh] aspect-square rounded-full bg-purple-600/10 blur-[150px] animate-pulse-slow bg-glow"></div>
        
        {/* Top gradient line */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">AI Act Compliant Solutions</span>
          </div>
          
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Transform Your Approach
          </h2>
          
          <p
            ref={descriptionRef}
            className="text-xl text-gray-300"
          >
            We built our automation systems with AI Act compliance in mind. Implement intelligent workflows that meet regulatory requirements while accelerating your business performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#0c0c18] to-[#13131f] rounded-xl p-8 border border-white/5 relative overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute -left-32 -top-32 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]"></div>
          <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
          
          {/* Main content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">Popular Integration Combinations</h3>
              <p className="text-gray-300 mb-8">
                Pre-built, AI Act-compliant automation solutions ready to deploy:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="font-semibold text-white mb-2">Slack + N8N</p>
                  <p className="text-sm text-gray-400">Automate workflows from conversations while maintaining compliance documentation</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="font-semibold text-white mb-2">HubSpot + OpenAI</p>
                  <p className="text-sm text-gray-400">Customer communications with appropriate transparency and content controls</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="font-semibold text-white mb-2">Notion + Google Calendar</p>
                  <p className="text-sm text-gray-400">Meeting scheduling and documentation with proper oversight mechanisms</p>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <Link href="/integrations/ai-act">
                <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 group">
                  <span className="mr-2">Explore more integrations</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
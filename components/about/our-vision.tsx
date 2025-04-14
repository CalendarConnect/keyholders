"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ShieldCheck, 
  Users, 
  LineChart, 
  Accessibility, 
  Eye, 
  CheckCircle2 
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  index: number;
}

const ValueCard = ({ icon, title, description, color, index }: ValueCardProps) => {
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
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
        },
        delay: index * 0.1,
      }
    );
  }, [index]);
  
  return (
    <div
      ref={cardRef}
      className="rounded-xl p-6 bg-gradient-to-br from-[#0c0c18] to-[#13131f] border border-white/5 hover:border-purple-500/20 transition-all duration-300 group overflow-hidden relative"
    >
      {/* Corner accent */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-${color}-500/20 to-transparent rounded-bl-full opacity-30`}></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-lg bg-${color}-500/10 flex items-center justify-center mb-5 text-${color}-400`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default function OurVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  
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
            start: "top bottom-=100",
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const values = [
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Secure by design",
      description: "Protecting sensitive information at every step of the AI implementation process.",
      color: "purple",
      index: 0
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Human-guided",
      description: "Enhancing capabilities without replacing human judgment in critical decisions.",
      color: "blue",
      index: 1
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Business-focused",
      description: "Creating measurable impact on operations and growth with practical solutions.",
      color: "indigo",
      index: 2
    },
    {
      icon: <Accessibility className="h-6 w-6" />,
      title: "Accessible",
      description: "Making advanced technology approachable for organizations of all sizes.",
      color: "teal",
      index: 3
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Transparent",
      description: "Ensuring systems operate in understandable, accountable ways.",
      color: "cyan",
      index: 4
    }
  ];
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-[#0a0a0f]/80"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20 bg-[#0a0a0f]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Subtle gradient */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              The Keyholders Vision
            </h2>
            
            <p
              ref={descriptionRef}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              We believe AI implementation should be ethical, effective, and aligned with your business goals. Our approach goes beyond technology to understand your organizational dynamics.
            </p>
          </div>
          
          {/* Value cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
          
          {/* The Keyholders difference */}
          <div className="bg-gradient-to-br from-[#0c0c18] to-[#13131f] rounded-2xl p-8 border border-purple-500/10 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <div className="absolute -left-32 top-0 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px]"></div>
            <div className="absolute -right-32 bottom-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">What truly defines a Keyholder</h3>
              
              <div className="space-y-6 text-gray-300">
                <p>In Christian&apos;s view, what truly defines a Keyholder is the ability to see beyond technical possibilities to business realities. A Keyholder doesn&apos;t just understand AI capabilities – they understand organizational workflows, data structures, team dynamics, and business objectives. They bridge the gap between what AI can do technically and what businesses need practically.</p>
                
                <p>This dual perspective is what makes our approach different. We don&apos;t implement AI for the sake of using cutting-edge technology; we implement it to solve real business challenges, streamline specific processes, and create tangible value. Our solutions are designed with a deep understanding of how departments interconnect, how information flows, and where the real friction points exist in organizations.</p>
              </div>
              
              <div className="mt-10 p-5 bg-purple-500/5 rounded-xl border border-purple-500/10">
                <h4 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-purple-400" />
                  <span>We Are Keyholders</span>
                </h4>
                
                <p className="text-gray-300">Our team of AI enthusiasts builds custom automations that transform business processes. We work collaboratively on client projects while each Keyholder also maintains their own specialty areas.</p>
                
                <p className="mt-4 text-gray-300">Being a Keyholder means serving as the point of reference for all things AI. We're launching Keyholders Academy soon, which will offer comprehensive training for technical professionals who want to become the AI experts guiding and overseeing intelligent automation within their companies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
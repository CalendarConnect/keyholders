"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, Check, Clock, ShieldAlert, ShieldCheck, ShieldQuestion, Info } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RiskCategoryProps {
  title: string;
  description: string[];
  icon: React.ReactNode;
  color: string;
  delay: number;
}

const RiskCategory: React.FC<RiskCategoryProps> = ({ title, description, icon, color, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
        delay,
      }
    );
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`rounded-xl p-6 bg-[#0c0c18] border border-${color}-500/20 hover:border-${color}-500/40 transition-all duration-300 relative overflow-hidden group`}
    >
      <div className={`absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-${color}-500/20 to-transparent opacity-20 rounded-bl-full`}></div>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-400`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className={`text-xl font-bold mb-3 text-${color}-400`}>{title}</h4>
          <ul className="space-y-2">
            {description.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <span className="mt-1 flex-shrink-0">
                  <Check className={`h-4 w-4 text-${color}-400`} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function InfoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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
            start: 'top bottom-=100',
          },
        }
      );

      // Animate timeline
      gsap.fromTo(
        '.timeline-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top bottom-=100',
          },
        }
      );
      
      // Animate the timeline line
      gsap.fromTo(
        '.timeline-line',
        { height: 0 },
        {
          height: '100%',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top bottom-=100',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const riskCategories = [
    {
      title: 'Unacceptable Risk',
      icon: <ShieldAlert className="h-6 w-6" />,
      color: 'red',
      description: [
        'Social scoring by governments',
        'Manipulative AI systems',
        'Real-time public facial recognition',
      ],
      delay: 0,
    },
    {
      title: 'High Risk',
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'amber',
      description: [
        'Hiring and employee evaluation',
        'Credit and insurance decisions',
        'Educational assessment',
      ],
      delay: 0.1,
    },
    {
      title: 'Limited Risk',
      icon: <ShieldQuestion className="h-6 w-6" />,
      color: 'blue',
      description: [
        'AI chatbots',
        'Generated content',
        'Emotion recognition',
      ],
      delay: 0.2,
    },
    {
      title: 'Minimal Risk',
      icon: <ShieldCheck className="h-6 w-6" />,
      color: 'green',
      description: [
        'Spam filters',
        'Basic recommendation systems',
        'AI in games',
      ],
      delay: 0.3,
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[#050510]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Subtle gradient */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-500/10 text-purple-400 rounded-full p-3">
              <Info className="h-6 w-6" />
            </div>
          </div>
          
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-8"
          >
            What Business Leaders Need to Know
          </h2>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-500/10 text-purple-400 p-2 rounded-lg">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Effective August 1, 2024</h3>
            </div>
            <p className="text-gray-300 text-lg">
              The world&apos;s first comprehensive AI regulation is now in force, with key deadlines approaching.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white text-center mb-8">
          Four-Tier Risk System
        </h3>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
          AI applications are classified by risk level, determining your compliance requirements:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {riskCategories.map((category) => (
            <RiskCategory key={category.title} {...category} />
          ))}
        </div>

        <h3 className="text-2xl font-bold text-white text-center mb-8">
          Key Compliance Deadlines
        </h3>
        
        <div ref={timelineRef} className="relative max-w-4xl mx-auto px-8 py-4">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-teal-500/50 timeline-line transform md:-translate-x-px"></div>

          {/* February 2025 */}
          <div className="timeline-item relative grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 mb-16">
            <div className="md:col-span-2 md:text-right">
              <div className="md:hidden absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              </div>
              <div className="hidden md:block absolute left-1/2 top-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 -translate-x-1/2 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 pl-10 md:pl-0">February 2025</h4>
            </div>
            <div className="md:col-span-3 pl-10 md:pl-0">
              <div className="bg-gradient-to-br from-[#0c0c18] to-[#13131f] rounded-xl p-5 border border-purple-500/20">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Prohibitions on unacceptable risk systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Employee AI knowledge requirement begins</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* August 2025-2026 */}
          <div className="timeline-item relative grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 mb-16">
            <div className="md:col-span-2 md:text-right">
              <div className="md:hidden absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              </div>
              <div className="hidden md:block absolute left-1/2 top-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 -translate-x-1/2 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 pl-10 md:pl-0">August 2025-2026</h4>
            </div>
            <div className="md:col-span-3 pl-10 md:pl-0">
              <div className="bg-gradient-to-br from-[#0c0c18] to-[#13131f] rounded-xl p-5 border border-blue-500/20">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Rules for general-purpose AI begin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>High-risk system requirements phase in</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* August 2027 */}
          <div className="timeline-item relative grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
            <div className="md:col-span-2 md:text-right">
              <div className="md:hidden absolute left-0 top-0 w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-teal-400"></div>
              </div>
              <div className="hidden md:block absolute left-1/2 top-0 w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/30 -translate-x-1/2 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-teal-400"></div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 pl-10 md:pl-0">August 2027</h4>
            </div>
            <div className="md:col-span-3 pl-10 md:pl-0">
              <div className="bg-gradient-to-br from-[#0c0c18] to-[#13131f] rounded-xl p-5 border border-teal-500/20">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>Full compliance required across all systems</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
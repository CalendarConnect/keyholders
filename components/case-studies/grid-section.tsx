"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Bot, Sparkles } from "lucide-react";
import CaseStudyCard from "./case-study-card";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Define case studies data
const caseStudies = [
  {
    companyName: "Kindergarten Ikke",
    clientName: "Bob",
    clientImage: "/images/case-studies/bob.jpg",
    companyUrl: "https://kinderopvangikke.nl/",
    description: "A custom GPT that enables all employees to create and write pedagogical activities with expertise in the pedagogical approach of Reggio Emilia which is the cornerstone of the kindergarten.",
    clientQuote: "Keyholders helped us not only save time, but it expands our creativity and our approach to the pedagogical approach of Reggio Emilia. And I use the GPT to write my emails, but that&apos;s a little secret.",
  },
  {
    companyName: "SDE Consultancy Cyber Security",
    clientName: "Sandra",
    clientImage: "/images/case-studies/Sandra_SDE_COnsultancy.jpg",
    companyUrl: "https://sdeconsultancy.nl/",
    description: "A custom GPT that enables Sandra to always be automatically up to date regarding cyber security daily news, nicely summarized every day in her mailbox. During the discovery session with Christian, he created the SDE brand identity, tone of voice and the automation needed within 2 hours.",
    clientQuote: "I can&apos;t calculate how much Christian with Keyholders has saved me in time, but it&apos;s a lot. And I love numbers and accuracy!",
  },
  {
    companyName: "Upbeatles PubQuiz",
    clientName: "Pascal",
    clientImage: "/images/case-studies/Pascal.jpg",
    companyUrl: "https://www.upbeatles.nl",
    description: "A custom GPT that integrates with Canva so it automatically creates ready to use pub quizzes.",
    clientQuote: "I met Chris at Startup Nijmegen, and Sandra referred me to his Keyholders Agency. 2 hours after I sent the mail, he sent me the link of the custom GPT I now use daily. I couldn&apos;t believe my eyes, what previously took me at least 90 minutes per day, is now done in a matter of seconds.",
  },
  {
    companyName: "Fokker V.O.F Constructor",
    clientName: "Ashra",
    clientImage: "/images/case-studies/ashra.jpg",
    companyUrl: "https://www.fokkervof.nl",
    description: "For Fokker V.O.F we created a complete automation flow that enables Ashra to create custom offers by speaking in a voice memo in WhatsApp. This automatically is analyzed by ChatGPT which then uses the Fokker database which includes all calculation values of products to use and the current pricing. The automation then writes a complete offer in the branding of Fokker V.O.F and saves it as draft in the mailbox of Ashra, ready to be sent.",
    clientQuote: "I heard about Christian through a friend of mine, and I just asked what he could build. What started with a custom GPT with our brand identity, tone of voice and company project knowledge, grew into a fully automated process. I highly recommend the free AI consult with Christian, his eye on automating processes is next level.",
  },
];

export default function CaseStudiesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
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
              See how we&apos;re transforming businesses
            </h2>
          </div>
          
          {/* Key features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <Code className="h-6 w-6" />,
                title: "Custom AI Solutions",
                description: "Tailored AI automations built specifically for your business needs and workflows."
              },
              {
                icon: <Bot className="h-6 w-6" />,
                title: "Rapid Implementation",
                description: "From concept to working solution in as little as 2 hours, not weeks or months."
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: "Measurable Results",
                description: "Our clients see dramatic time savings and efficiency gains almost immediately."
              }
            ].map((feature, index) => (
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
          <div className="space-y-10">
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyCard
                key={index}
                companyName={caseStudy.companyName}
                clientName={caseStudy.clientName}
                clientImage={caseStudy.clientImage}
                companyUrl={caseStudy.companyUrl}
                description={caseStudy.description}
                clientQuote={caseStudy.clientQuote}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
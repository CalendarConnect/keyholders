"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Code, Brain, Zap } from "lucide-react";
import JobCard, { JobListing } from "./job-card";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Sample job data
const jobs: JobListing[] = [
  {
    id: "ai-integration-specialist",
    title: "AI Integration Specialist",
    type: "Full-Time",
    location: "Remote (Europe)",
    salary: "€2,000-€3,500",
    slug: "ai-integration-specialist"
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    type: "Full-Time",
    location: "Remote (Europe)",
    salary: "€1,500-€5,000",
    slug: "ai-engineer"
  },
  {
    id: "ai-trainer",
    title: "AI Trainer",
    type: "Full-Time",
    location: "Remote (Europe)",
    salary: "€2,000-€3,500",
    slug: "ai-trainer"
  }
];

export default function JobListings() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const perksRef = useRef<HTMLDivElement>(null);
  
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
      
      // Animate perks
      gsap.fromTo(
        ".perk-item",
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: perksRef.current,
            start: "top bottom-=50",
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const perks = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Remote First",
      description: "Work from anywhere in Europe with a flexible schedule that fits your lifestyle."
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Latest Technologies",
      description: "Work with cutting-edge AI tools and technologies to solve real business challenges."
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: "Continuous Learning",
      description: "Access to courses, conferences, and learning opportunities to keep your skills sharp."
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Meaningful Work",
      description: "Create solutions that transform how businesses operate and increase efficiency."
    }
  ];
  
  return (
    <section 
      id="job-listings"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-[#090912]"
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
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-3xl md:text-4xl font-bold text-white mb-12"
            >
              Open Positions
            </h2>
          </div>
          
          {/* Job Listings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {jobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>
          
          {/* Why Join Us */}
          <div className="bg-gradient-to-br from-[#0c0c18] to-[#13131f] rounded-2xl p-8 border border-purple-500/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <div className="absolute -left-32 top-0 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px]"></div>
            <div className="absolute -right-32 bottom-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Why Join Keyholders?</h3>
              
              <div ref={perksRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {perks.map((perk, index) => (
                  <div key={index} className="perk-item p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                      {perk.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{perk.title}</h4>
                    <p className="text-gray-300 text-sm">{perk.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
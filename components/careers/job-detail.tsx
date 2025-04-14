"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, MapPin, Clock, DollarSign, CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface JobDetailProps {
  job: {
    title: string;
    type: string;
    location: string;
    salary?: string;
    aboutUs: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
  };
}

export default function JobDetail({ job }: JobDetailProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
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
          delay: 0.2
        }
      );
      
      // Animate job details
      gsap.fromTo(
        ".detail-section",
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20 bg-[#0a0a0f]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Animated gradients */}
        <div className="absolute top-1/4 -right-64 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse-slow"></div>
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-slow delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Link href="/careers" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to All Positions</span>
          </Link>
          
          <div ref={headingRef} className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{job.title}</h1>
            
            <div className="flex flex-wrap gap-4">
              <div className="inline-flex items-center text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-full">
                <Clock className="h-4 w-4 mr-2 text-purple-400" />
                <span>{job.type}</span>
              </div>
              
              {job.location && (
                <div className="inline-flex items-center text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-full">
                  <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                  <span>{job.location}</span>
                </div>
              )}
              
              {job.salary && (
                <div className="inline-flex items-center text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-full">
                  <DollarSign className="h-4 w-4 mr-2 text-purple-400" />
                  <span>{job.salary}</span>
                </div>
              )}
            </div>
          </div>
          
          <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-10">
              {/* About Us Section */}
              <div className="detail-section">
                <h2 className="text-2xl font-bold text-white mb-4">About Us</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300">{job.aboutUs}</p>
                </div>
              </div>
              
              {/* Responsibilities Section */}
              <div className="detail-section">
                <h2 className="text-2xl font-bold text-white mb-4">What You&apos;ll Do</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 ml-2">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Requirements Section */}
              <div className="detail-section">
                <h2 className="text-2xl font-bold text-white mb-4">What We&apos;re Looking For</h2>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 ml-2">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Benefits Section */}
              <div className="detail-section bg-gradient-to-br from-[#0c0c18] to-[#13131f] rounded-xl p-6 border border-purple-500/10">
                <h2 className="text-xl font-bold text-white mb-4">What We Offer</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm ml-2">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Apply Button */}
              <div className="detail-section sticky top-8">
                <Link href="/careers#application-form">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-30"></div>
                    <button className="relative w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-medium">
                      Apply for This Position
                    </button>
                  </motion.div>
                </Link>
                <p className="text-center text-gray-400 text-sm mt-3">
                  Or email your CV to <a href="mailto:info@keyholders.agency" className="text-purple-400 hover:text-purple-300">info@keyholders.agency</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
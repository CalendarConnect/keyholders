"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin, Clock, DollarSign } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface JobListing {
  id: string;
  title: string;
  type: string;
  location: string;
  salary?: string;
  slug: string;
}

interface JobCardProps {
  job: JobListing;
  index: number;
}

export default function JobCard({ job, index }: JobCardProps) {
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
        duration: 0.7,
        ease: "power2.out",
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
      className="group relative p-6 bg-gradient-to-br from-[#0c0c18] to-[#13131f] rounded-xl border border-white/5 hover:border-purple-500/20 transition-all duration-300"
    >
      {/* Top accent border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
      
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
            {job.title}
          </h3>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="inline-flex items-center text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              <span>{job.type}</span>
            </div>
            
            {job.location && (
              <div className="inline-flex items-center text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                <MapPin className="h-3.5 w-3.5 mr-1.5" />
                <span>{job.location}</span>
              </div>
            )}
            
            {job.salary && (
              <div className="inline-flex items-center text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                <DollarSign className="h-3.5 w-3.5 mr-1.5" />
                <span>{job.salary}</span>
              </div>
            )}
          </div>
        </div>
        
        <Link 
          href={`/careers/${job.slug}`}
          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mt-4"
        >
          <span>View Details</span>
          <ArrowUpRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
} 
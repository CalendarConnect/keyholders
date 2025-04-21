"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, ArrowUpRight, Quote } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CaseStudyCardProps {
  companyName: string;
  clientName: string;
  clientImage: string;
  companyUrl: string;
  description: string;
  clientQuote: string;
  ctaText?: string;
  ctaLink?: string;
  index: number;
}

export default function CaseStudyCard({
  companyName,
  clientName,
  clientImage,
  companyUrl,
  description,
  clientQuote,
  ctaText = "Need a similar solution?",
  ctaLink = "/contact",
  index
}: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState(clientImage);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const card = cardRef.current;
      if (!card) return;
      
      gsap.fromTo(
        card,
        { 
          opacity: 0, 
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
          delay: index * 0.15,
        }
      );
    } catch (error) {
      console.error("Animation error:", error);
    }
  }, [index]);
  
  // Handle image error
  const handleImageError = () => {
    if (!imageError) {
      console.log(`Image not found: ${clientImage}, using fallback`);
      setImageSrc("/images/placeholder-profile.jpg");
      setImageError(true);
    }
  };
  
  return (
    <div 
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c0c18] to-[#13131f] border border-white/5 hover:border-purple-500/20 transition-all duration-300"
    >
      {/* Top accent border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Image container - 2 columns on large screens */}
        <div className="lg:col-span-2 h-full overflow-hidden">
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-full">
            <Image
              src={imageSrc}
              alt={`${clientName} from ${companyName}`}
              fill
              className="object-cover filter grayscale transition-all duration-500 group-hover:scale-105"
              style={{ objectPosition: "center top" }}
              onError={handleImageError}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c18]/80 to-transparent"></div>
          </div>
        </div>
        
        {/* Content container - 3 columns on large screens */}
        <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{companyName}</h3>
                <p className="text-purple-400">{clientName}</p>
              </div>
              <Link 
                href={companyUrl} 
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                <span>Details</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Wat we bouwden</h4>
              <p className="text-gray-300">{description}</p>
            </div>
            
            <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-lg relative mb-6">
              <Quote className="absolute text-purple-500/20 h-12 w-12 -top-2 -left-2" />
              <p className="text-gray-300 italic relative z-10 pl-4">
                &ldquo;{clientQuote}&rdquo;
              </p>
            </div>
          </div>
          
          <Link 
            href={ctaLink}
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>{ctaText}</span>
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
} 
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItemProps {
  value: string;
  label: string;
  color: string;
  delay: number;
}

const StatItem = ({ value, label, color, delay }: StatItemProps) => {
  const statRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const stat = statRef.current;
    if (!stat) return;
    
    // Animate the stat card
    gsap.fromTo(
      stat,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay,
        scrollTrigger: {
          trigger: stat,
          start: "top bottom-=100"
        }
      }
    );
    
    // Animate the value counter
    const valueEl = stat.querySelector(".stat-value");
    if (valueEl) {
      const endValue = parseInt(value);
      gsap.fromTo(
        valueEl,
        { innerText: "0" },
        {
          innerText: endValue,
          duration: 2,
          delay: delay + 0.3,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: "top bottom-=100"
          }
        }
      );
    }
  }, [value, delay]);
  
  return (
    <div 
      ref={statRef} 
      className="relative bg-gradient-to-br from-[#0c0c18] to-[#13131f] rounded-2xl p-8 border border-white/5 overflow-hidden group"
    >
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Background decoration */}
      <div className={`absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-${color}-500/20 to-transparent opacity-20 rounded-bl-full`}></div>
      
      <div className="relative z-10">
        <h3 className={`stat-value text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-${color}-400 to-${color}-300 mb-4`}>
          {value}
        </h3>
        <p className="text-gray-300 text-lg">{label}</p>
      </div>
    </div>
  );
};

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background gradient
      gsap.to(".bg-pulse", {
        opacity: 0.6,
        scale: 1.1,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const stats = [
    {
      value: "95",
      label: "Client Satisfaction with our compliant AI solutions",
      color: "purple",
      delay: 0
    },
    {
      value: "60",
      label: "Work Tasks Handled by our regulation-aware automations",
      color: "blue",
      delay: 0.2
    },
    {
      value: "40",
      label: "Growth Acceleration while maintaining full regulatory compliance",
      color: "teal",
      delay: 0.4
    }
  ];
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[#050510]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Glowing orb effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] rounded-full bg-purple-600/5 blur-[120px] bg-pulse"></div>
        
        {/* Subtle gradient lines */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <StatItem {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
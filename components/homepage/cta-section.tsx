"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { ArrowRight, Sparkles, Zap, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState, useRef } from "react";

export default function CTASection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const btnRef = useRef<HTMLDivElement>(null);
  const [hasHovered, setHasHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  // For the glowing effect on the button
  const maskImage = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(180px at ${x}px ${y}px, rgba(255, 255, 255, 0.15), transparent 100%)`
  );

  const benefits = [
    "Increased operational efficiency",
    "Reduced manual errors",
    "Enhanced productivity",
    "Real-time data insights",
    "Faster decision making",
    "Scalable workflows"
  ];
  
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background with light beam and gradient */}
      <div className="absolute inset-0 -z-10 bg-[#050510] overflow-hidden">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,76,255,0.15),transparent_80%)]"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.07)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Glowing orb effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120vh] aspect-square rounded-full bg-purple-600/10 blur-[120px] animate-pulse-slow"></div>
      </div>
      
      {/* Decorative top light accent */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      />
      
      {/* Animated particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-purple-400"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 100,
                opacity: 0.4 + Math.random() * 0.4
              }}
              animate={{ 
                y: -100,
                opacity: 0
              }}
              transition={{ 
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          {/* Section header with light effects */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="inline-block py-1.5 px-6 rounded-full border border-purple-500/20 bg-purple-500/5 text-sm text-purple-300 mb-6"
            >
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Transform Your Business Today</span>
              </div>
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white"
            >
              <span className="relative z-10">Ready to Automate?</span>
              <div className="absolute -inset-1 -z-10 opacity-30 blur-2xl rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-gray-300 font-light mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Join forward-thinking companies that have revolutionized their operations with Keyholders&apos; custom automation solutions.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Benefits column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-white mb-8">Transform your business with:</h3>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <Check className="w-4 h-4" />
                    </div>
                    <p className="text-lg text-gray-300">{benefit}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Stats spotlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-10 p-6 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md relative overflow-hidden group"
              >
                {/* Sparkle effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-1000">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">93%</p>
                    <p className="text-gray-400 mt-1">of clients see ROI within 2 months</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">60+</p>
                    <p className="text-gray-400 mt-1">hours saved per week on average</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* CTA card with glow effect */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30"></div>
              <div className="relative p-8 md:p-10 rounded-2xl bg-[#0c0c18] border border-white/10 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-blue-600/5 to-transparent" />
                
                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Start your automation journey</h3>
                <p className="text-gray-300 mb-8">Book a free consultation with our automation specialists and discover how we can transform your business processes.</p>
                
                {/* Interactive CTA button with glow effect */}
                <div 
                  ref={btnRef} 
                  className="relative group"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setHasHovered(true)}
                >
                  <Link href="/contact">
                    <div className="relative overflow-hidden rounded-xl">
                      <div 
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{ 
                          opacity: hasHovered ? 1 : 0,
                          background: maskImage as any
                        }}
                      />
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-lg py-6 px-8 h-auto rounded-xl"
                      >
                        <span className="mr-2">Book a Free Consultation</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </Link>
                </div>
                
                <div className="mt-10 grid grid-cols-2 gap-4">
                  <Link 
                    href="/case-studies" 
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-center justify-center transition-colors"
                  >
                    View Case Studies
                  </Link>
                  <Link 
                    href="/about" 
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-center justify-center transition-colors"
                  >
                    About Our Team
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 
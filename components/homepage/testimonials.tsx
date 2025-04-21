"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    quote: "Ik kon mijn ogen niet geloven: wat me eerder minstens 90 minuten per dag kostte, is nu in een kwestie van seconden klaar.",
    author: "Pascal",
    title: "Upbeatles PubQuiz",
    company: "Upbeatles",
    avatar: "/avatars/avatar-1.png",
    rating: 5,
    stats: "90 minuten bespaard per dag"
  },
  {
    id: 2,
    quote: "Keyholders hielp ons niet alleen tijd besparen, maar vergrootte ook onze creativiteit en onze Reggio Emilia‑benadering. En ik gebruik GPT om mijn e‑mails te schrijven, maar dat blijft even ons geheimpje.",
    author: "Bob",
    title: "Kinderopvang Ikke",
    company: "Kinderopvang Ikke",
    avatar: "/avatars/avatar-2.png",
    rating: 5,
    stats: "Vergrote creativiteit"
  },
  {
    id: 3,
    quote: "Ik kan niet berekenen hoeveel tijd Christian met Keyholders me heeft bespaard, maar het is enorm!",
    author: "Sandra",
    title: "SDE Consultancy Cyber Security",
    company: "SDE Consultancy",
    avatar: "/avatars/avatar-3.png",
    rating: 5,
    stats: "Dagelijkse tijdbesparing"
  },
  {
    id: 4,
    quote: "Ik beveel de gratis AI‑consult met Christian ten zeerste aan; zijn blik op het automatiseren van processen is echt next level.",
    author: "Ashra",
    title: "Fokker V.O.F Constructor",
    company: "Fokker V.O.F",
    avatar: "/avatars/avatar-4.png",
    rating: 5,
    stats: "Volledig geautomatiseerd proces"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-300, 300], [5, -5]);
  
  // Handle autoplay
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [autoplay]);
  
  // Handle mouse move effect
  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    mouseX.set(event.clientX - centerX);
  }

  function handleMouseLeave() {
    mouseX.set(0);
  }
  
  function navigateTestimonial(direction: 'prev' | 'next') {
    setAutoplay(false);
    if (direction === 'prev') {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    } else {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }
  }

  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Background with subtle patterns */}
      <div className="absolute inset-0 -z-10 bg-[#050510]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Purple glow accent */}
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[130px] opacity-60"></div>
      </div>
      
      {/* Decorative light accent */}
      <div className="absolute left-1/2 top-0 w-px h-20 bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="inline-block py-1.5 px-5 rounded-full border border-purple-500/20 bg-purple-500/5 text-sm text-purple-300">
              Succesverhalen
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative inline-block text-5xl md:text-6xl font-bold mb-6 text-white"
          >
            <span className="relative z-10">Succesverhalen</span>
            <div className="absolute -inset-1 -z-10 opacity-30 blur-2xl rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Ontdek hoe klanten met onze automatiseringen spectaculaire resultaten boeken.
          </motion.p>
        </div>
        
        {/* Testimonial slider */}
        <div className="max-w-6xl mx-auto">
          <motion.div 
            ref={testimonialsRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden p-10"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
          >
            {/* Active testimonial card */}
            <motion.div
              className="relative w-full rounded-2xl bg-gradient-to-b from-[#13131f] to-[#0e0e1a] border border-white/5 p-8 md:p-10 overflow-hidden"
              style={{ rotateY }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-blue-600/5 to-transparent" />
              </div>
              
              {/* Decorative quote mark with light effect */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="h-20 w-20 text-purple-400" />
              </div>
              
              {/* Content */}
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-purple-500 text-purple-500" />
                  ))}
                </div>
                
                <blockquote className="mb-8">
                  <p className="text-2xl font-light text-white leading-relaxed mb-5">"{testimonials[activeIndex].quote}"</p>
                  
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      {/* Avatar with glow */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 to-blue-500/30 rounded-full blur-md" />
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-purple-900/30 border border-white/10 relative">
                          <div className="absolute inset-0 flex items-center justify-center text-purple-500 text-lg font-bold">
                            {testimonials[activeIndex].author.charAt(0)}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-medium text-white">{testimonials[activeIndex].author}</p>
                        <p className="text-purple-300">{testimonials[activeIndex].title}</p>
                      </div>
                    </div>
                    
                    {/* Results highlight */}
                    <div className="group px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                      <p className="text-purple-300 font-medium">
                        <span className="inline-block relative">
                          {testimonials[activeIndex].stats}
                          <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </span>
                      </p>
                    </div>
                  </div>
                </blockquote>
              </div>
            </motion.div>
            
            {/* Navigation controls */}
            <div className="flex justify-between mt-8">
              <div className="flex gap-4">
                <button 
                  onClick={() => navigateTestimonial('prev')}
                  className="w-12 h-12 rounded-full border border-purple-500/20 bg-white/5 flex items-center justify-center hover:bg-purple-500/10 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <button 
                  onClick={() => navigateTestimonial('next')}
                  className="w-12 h-12 rounded-full border border-purple-500/20 bg-white/5 flex items-center justify-center hover:bg-purple-500/10 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </div>
              
              {/* Pagination indicators */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index);
                      setAutoplay(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-6 bg-purple-500' : 'bg-white/20'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Results metrics with motion effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Metric 1 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent h-full">
              <div className="mb-4 text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">63%</div>
              <h3 className="text-xl font-semibold text-white mb-2">efficiënter werken</h3>
              <p className="text-gray-400">Resultaten in cijfers</p>
            </div>
          </div>
          
          {/* Metric 2 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-teal-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent h-full">
              <div className="mb-4 text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-teal-300">12×</div>
              <h3 className="text-xl font-semibold text-white mb-2">hogere conversies</h3>
              <p className="text-gray-400">Resultaten in cijfers</p>
            </div>
          </div>
          
          {/* Metric 3 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent h-full">
              <div className="mb-4 text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-purple-300">24/7</div>
              <h3 className="text-xl font-semibold text-white mb-2">altijd automatisch</h3>
              <p className="text-gray-400">Resultaten in cijfers</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
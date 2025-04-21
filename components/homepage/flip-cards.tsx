"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useI18n } from "@/app/i18n/context";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FlipCardProps {
  frontTitle: string;
  frontDescription: string;
  frontStats: string;
  backTitle: string;
  backDescription: string;
  index: number;
  icon: React.ReactNode;
  gradient: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  frontTitle,
  frontDescription,
  frontStats,
  backTitle,
  backDescription,
  index,
  icon,
  gradient
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Handle lighting effect on hover
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  }

  // GSAP animation for card entry
  useEffect(() => {
    if (!cardRef.current) return;
    
    gsap.fromTo(cardRef.current, 
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        },
        delay: index * 0.1
      }
    );
    
    // Clean up
    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => trigger.kill(true));
    };
  }, [index]);

  // Animation for card flip
  useEffect(() => {
    if (!cardRef.current) return;
    
    if (isFlipped) {
      gsap.to(cardRef.current.querySelector(".card-front"), { 
        rotateY: 180, 
        opacity: 0,
        duration: 0.6, 
        ease: "power2.inOut"
      });
      gsap.to(cardRef.current.querySelector(".card-back"), { 
        rotateY: 0, 
        opacity: 1,
        duration: 0.6, 
        ease: "power2.inOut",
        delay: 0.05
      });
    } else {
      gsap.to(cardRef.current.querySelector(".card-front"), { 
        rotateY: 0, 
        opacity: 1,
        duration: 0.6, 
        ease: "power2.inOut",
        delay: 0.05
      });
      gsap.to(cardRef.current.querySelector(".card-back"), { 
        rotateY: -180, 
        opacity: 0,
        duration: 0.6, 
        ease: "power2.inOut" 
      });
    }
  }, [isFlipped]);

  return (
    <div
      ref={cardRef}
      className="relative h-[360px] w-full perspective-[1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Interactive light effect */}
      <div 
        className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none z-20 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.08) 0%, transparent 70%)`
        }}
      ></div>
      
      {/* Card Front */}
      <div className="card-front absolute inset-0 backface-hidden preserve-3d transition-all duration-500">
        <div className="relative h-full w-full rounded-2xl bg-gradient-to-b from-[#0e0e1a] to-[#13131f] border border-white/5 overflow-hidden">
          {/* Background gradient */}
          <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${isHovering ? 'opacity-20' : ''}`}>
            <div className={`absolute inset-0 ${gradient}`}></div>
          </div>
          
          {/* Content */}
          <div className="p-8 flex flex-col h-full justify-between relative z-10">
            <div>
              {/* Icon with glow effect */}
              <div className="mb-6 p-3 w-14 h-14 rounded-xl flex items-center justify-center relative">
                <div className={`absolute inset-0 ${gradient} opacity-20 rounded-xl blur-sm transition-opacity duration-300 ${isHovering ? 'opacity-40' : ''}`}></div>
                <div className="relative">{icon}</div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{frontTitle}</h3>
              <p className="text-gray-400 leading-relaxed">{frontDescription}</p>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <span className="text-lg font-medium text-purple-300">{frontStats}</span>
              <div className={`p-2 rounded-full ${gradient.replace('bg-gradient-to-br', 'bg-gradient-to-r')} opacity-80 transform transition-transform duration-300 ${isHovering ? 'scale-110' : ''}`}>
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          
          {/* Border glow effect on hover */}
          <div className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 ${isHovering ? 'border-opacity-30' : 'border-opacity-0'}`} 
            style={{
              borderImage: isHovering ? `${gradient.replace('bg-', 'linear-')} 1` : 'none',
            }}
          ></div>
        </div>
      </div>
      
      {/* Card Back */}
      <div className="card-back absolute inset-0 backface-hidden preserve-3d transition-all duration-500 opacity-0" style={{ transform: 'rotateY(-180deg)' }}>
        <div className="relative h-full w-full rounded-2xl bg-gradient-to-b from-[#13131f] to-[#0e0e1a] border border-white/5 overflow-hidden">
          <div className="absolute inset-0">
            <div className={`absolute inset-0 opacity-20 ${gradient}`}></div>
          </div>
          
          <div className="p-8 flex flex-col h-full justify-between relative z-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">{backTitle}</h3>
              <p className="text-gray-400 leading-relaxed">{backDescription}</p>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-gray-500">Flip terug</span>
              <div className={`p-2 rounded-full ${gradient.replace('bg-gradient-to-br', 'bg-gradient-to-r')} opacity-80`}>
                <ArrowRight className="h-4 w-4 text-white rotate-180" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FlipCardsSection() {
  const { language } = useI18n();

  const cardData = language === "nl" ? [
    {
      frontTitle: "Offerteflow",
      frontDescription: "Automatisch offertes versturen na aanvraag",
      frontStats: "+30% conversies",
      backTitle: "Offertes binnen 5 min de deur uit.",
      backDescription: "80% minder handmatig werk.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-purple-400"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M12 17v-6"/><path d="M9 14l3 3 3-3"/></svg>,
      gradient: "bg-gradient-to-br from-purple-600 to-indigo-600",
    },
    {
      frontTitle: "Contentteam",
      frontDescription: "AI‑agents schrijven blogs & socials",
      frontStats: "3× meer content",
      backTitle: "Wekelijks posts zonder extra uren.",
      backDescription: "Altijd jouw tone of voice.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-400"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="m17 11 2 2 4-4"/></svg>,
      gradient: "bg-gradient-to-br from-blue-600 to-cyan-600",
    },
    {
      frontTitle: "Slim Plannen",
      frontDescription: "Automatische afspraak­planning",
      frontStats: "Nooit meer dubbel",
      backTitle: "90% minder misbookings.",
      backDescription: "4 uur extra per week.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>,
      gradient: "bg-gradient-to-br from-teal-600 to-emerald-600",
    },
    {
      frontTitle: "FAQ‑Bot",
      frontDescription: "24/7 support via website, WhatsApp & Slack",
      frontStats: "Altijd paraat",
      backTitle: "70% minder supporttickets.",
      backDescription: "Direct antwoord dankzij historisch geheugen.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-emerald-400"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>,
      gradient: "bg-gradient-to-br from-emerald-600 to-lime-600",
    },
    {
      frontTitle: "CRM‑Query",
      frontDescription: "Chat met al je data in één workflow",
      frontStats: "Data‑vraag beantwoord",
      backTitle: "Stel vragen in Slack/Teams en krijg meteen antwoord uit je CRM.",
      backDescription: "",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-lime-400"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>,
      gradient: "bg-gradient-to-br from-amber-600 to-yellow-600",
    },
    {
      frontTitle: "Leadalerts",
      frontDescription: "Nieuwe leads direct in chat of inbox",
      frontStats: "Supersnelle opvolging",
      backTitle: "2× hogere contact‑snelheid.",
      backDescription: "Leads landen direct bij jou.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-amber-400"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
      gradient: "bg-gradient-to-br from-orange-600 to-red-600",
    },
    {
      frontTitle: "Realtime Dash",
      frontDescription: "Omzet & KPI's live in één overzicht",
      frontStats: "Slim beslissen",
      backTitle: "In één oogopslag inzicht.",
      backDescription: "30% sneller reageren op trends.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-red-400"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
      gradient: "bg-gradient-to-br from-red-600 to-pink-600",
    },
    {
      frontTitle: "Doc‑Generator",
      frontDescription: "Automatische n8n‑documentatie met GPT",
      frontStats: "5 min admin",
      backTitle: "Workflows direct gedocumenteerd.",
      backDescription: "90% minder adminwerk.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-pink-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M8 18v-1"/><path d="M16 18v-3"/></svg>,
      gradient: "bg-gradient-to-br from-pink-600 to-purple-600",
    },
  ] : [
    {
      frontTitle: "Quote Flow",
      frontDescription: "Automatically send quotes after request",
      frontStats: "+30% conversions",
      backTitle: "Quotes out within 5 min.",
      backDescription: "80% less manual work.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-purple-400"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M12 17v-6"/><path d="M9 14l3 3 3-3"/></svg>,
      gradient: "bg-gradient-to-br from-purple-600 to-indigo-600",
    },
    {
      frontTitle: "Content Team",
      frontDescription: "AI agents write blogs & socials",
      frontStats: "3× more content",
      backTitle: "Weekly posts with no extra hours.",
      backDescription: "Always in your tone of voice.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-400"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="m17 11 2 2 4-4"/></svg>,
      gradient: "bg-gradient-to-br from-blue-600 to-cyan-600",
    },
    {
      frontTitle: "Smart Scheduling",
      frontDescription: "Automatic appointment planning",
      frontStats: "No more double bookings",
      backTitle: "90% fewer misbookings.",
      backDescription: "4 extra hours per week.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>,
      gradient: "bg-gradient-to-br from-teal-600 to-emerald-600",
    },
    {
      frontTitle: "FAQ Bot",
      frontDescription: "24/7 support via website, WhatsApp & Slack",
      frontStats: "Always available",
      backTitle: "70% fewer support tickets.",
      backDescription: "Immediate answers thanks to historical memory.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-emerald-400"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>,
      gradient: "bg-gradient-to-br from-emerald-600 to-lime-600",
    },
    {
      frontTitle: "CRM Query",
      frontDescription: "Chat with all your data in one workflow",
      frontStats: "Data question answered",
      backTitle: "Ask questions in Slack/Teams and get instant answers from your CRM.",
      backDescription: "",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-lime-400"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>,
      gradient: "bg-gradient-to-br from-amber-600 to-yellow-600",
    },
    {
      frontTitle: "Lead Alerts",
      frontDescription: "New leads directly in chat or inbox",
      frontStats: "Super-fast follow-up",
      backTitle: "2× higher contact speed.",
      backDescription: "Leads land directly with you.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-amber-400"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
      gradient: "bg-gradient-to-br from-orange-600 to-red-600",
    },
    {
      frontTitle: "Realtime Dashboard",
      frontDescription: "Revenue & KPIs live in one overview",
      frontStats: "Smart decisions",
      backTitle: "At-a-glance insight.",
      backDescription: "30% faster response to trends.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-red-400"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
      gradient: "bg-gradient-to-br from-red-600 to-pink-600",
    },
    {
      frontTitle: "Doc Generator",
      frontDescription: "Automatic n8n documentation with GPT",
      frontStats: "5 min admin",
      backTitle: "Workflows immediately documented.",
      backDescription: "90% less admin work.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-pink-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M8 18v-1"/><path d="M16 18v-3"/></svg>,
      gradient: "bg-gradient-to-br from-pink-600 to-purple-600",
    },
  ];

  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Background with subtle patterns */}
      <div className="absolute inset-0 -z-10 bg-[#050510]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Purple glow accent */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-slow"></div>
      </div>

      {/* Decorative top light beam */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {language === "nl" ? "Transformeer je werkprocessen" : "Transform Your Workflows"}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {language === "nl" 
              ? "Flip de kaarten voor concrete AI‑flows die je vandaag nog kunt inzetten."
              : "Flip the cards for concrete AI flows you can implement today."}
          </motion.p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <FlipCard
              key={index}
              frontTitle={card.frontTitle}
              frontDescription={card.frontDescription}
              frontStats={card.frontStats}
              backTitle={card.backTitle}
              backDescription={card.backDescription}
              index={index}
              icon={card.icon}
              gradient={card.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 
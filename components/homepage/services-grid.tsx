"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { 
  ArrowRight,
  BarChart, 
  Bot, 
  Calendar, 
  Clock, 
  Code2, 
  Database, 
  FileSpreadsheet, 
  Key, 
  LineChart, 
  MessagesSquare, 
  Network, 
  Users,
  BookOpen,
  Zap,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  outcomeTitle: string;
  outcomeDescription: string;
  index: number;
}

function ServiceCard({ title, description, icon, gradient, outcomeTitle, outcomeDescription, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
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
      gsap.to(".card-front", { 
        rotationY: 180, 
        opacity: 0,
        duration: 0.6, 
        ease: "power2.inOut"
      });
      gsap.to(".card-back", { 
        rotationY: 0, 
        opacity: 1,
        duration: 0.6, 
        ease: "power2.inOut",
        delay: 0.05
      });
    } else {
      gsap.to(".card-front", { 
        rotationY: 0, 
        opacity: 1,
        duration: 0.6, 
        ease: "power2.inOut",
        delay: 0.05
      });
      gsap.to(".card-back", { 
        rotationY: -180, 
        opacity: 0,
        duration: 0.6, 
        ease: "power2.inOut" 
      });
    }
  }, [isFlipped]);

  return (
    <div
      ref={cardRef}
      className="relative h-[380px] w-full perspective-[1000px] cursor-pointer"
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
              
              <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
              <p className="text-gray-400 leading-relaxed">{description}</p>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-gray-500">See results</span>
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
              <div className="mb-6 p-3 w-14 h-14 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className={`absolute inset-0 ${gradient} opacity-30 rounded-xl blur-sm`}></div>
                
                {/* Pulsing effect */}
                <div className={`absolute inset-0 ${gradient} opacity-20 rounded-xl animate-pulse-slow`}></div>
                
                <div className="relative">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{outcomeTitle}</h3>
              <p className="text-gray-400 leading-relaxed">{outcomeDescription}</p>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-gray-500">Back to service</span>
              <div className={`p-2 rounded-full ${gradient.replace('bg-gradient-to-br', 'bg-gradient-to-r')} opacity-80`}>
                <ArrowRight className="h-4 w-4 text-white rotate-180" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    id: 1,
    title: "RevOps Automation",
    description: "Streamline your revenue operations with intelligent automation solutions.",
    icon: <BarChart className="h-8 w-8 text-purple-400" />,
    gradient: "bg-gradient-to-br from-purple-600 to-blue-600",
    outcomeTitle: "Revenue Growth",
    outcomeDescription: "35% increase in conversions and 28% faster deal cycles. Your team can focus on strategy instead of repetitive tasks."
  },
  {
    id: 2,
    title: "Business Intelligence",
    description: "Transform data into actionable insights that drive strategic decision-making.",
    icon: <LineChart className="h-8 w-8 text-blue-400" />,
    gradient: "bg-gradient-to-br from-blue-600 to-teal-600",
    outcomeTitle: "Data-Driven Success",
    outcomeDescription: "Access real-time insights that reveal hidden opportunities and help you make confident decisions faster than competitors."
  },
  {
    id: 3,
    title: "Smart Scheduling",
    description: "Eliminate coordination headaches with intelligent meeting management.",
    icon: <Calendar className="h-8 w-8 text-teal-400" />,
    gradient: "bg-gradient-to-br from-teal-600 to-emerald-600",
    outcomeTitle: "Time Reclaimed",
    outcomeDescription: "Save 5+ hours weekly on scheduling and coordination. Higher meeting attendance rates and zero double-bookings."
  },
  {
    id: 4,
    title: "Productivity Systems",
    description: "Track and optimize performance with seamless time management solutions.",
    icon: <Clock className="h-8 w-8 text-emerald-400" />,
    gradient: "bg-gradient-to-br from-emerald-600 to-lime-600",
    outcomeTitle: "Optimized Performance",
    outcomeDescription: "20% boost in team productivity with clear metrics on what's working and what needs improvement."
  },
  {
    id: 5,
    title: "Unified Data Flow",
    description: "Connect your entire tech ecosystem with seamless data integration.",
    icon: <Database className="h-8 w-8 text-amber-400" />,
    gradient: "bg-gradient-to-br from-amber-600 to-orange-600",
    outcomeTitle: "Single Source of Truth",
    outcomeDescription: "Eliminate data silos and reduce errors by 40%. Every system updated in real-time with consistent information."
  },
  {
    id: 6,
    title: "Team Synchronization",
    description: "Foster collaboration with purpose-built workflows and communication tools.",
    icon: <Users className="h-8 w-8 text-orange-400" />,
    gradient: "bg-gradient-to-br from-orange-600 to-red-600",
    outcomeTitle: "Seamless Collaboration",
    outcomeDescription: "Cross-functional teams working in perfect harmony with 50% faster project completion and improved satisfaction."
  },
  {
    id: 7,
    title: "System Connectivity",
    description: "Create powerful connections between all your business platforms and tools.",
    icon: <Code2 className="h-8 w-8 text-red-400" />,
    gradient: "bg-gradient-to-br from-red-600 to-rose-600",
    outcomeTitle: "Unified Workflows",
    outcomeDescription: "Automated data exchange between systems eliminates 95% of manual transfers and copy-paste tasks."
  },
  {
    id: 8,
    title: "AI Assistants",
    description: "Deploy intelligent assistants that handle routine tasks with human-like precision.",
    icon: <Bot className="h-8 w-8 text-rose-400" />,
    gradient: "bg-gradient-to-br from-rose-600 to-pink-600",
    outcomeTitle: "24/7 Operation",
    outcomeDescription: "Continuous task execution and customer service that never sleeps, reducing response times by 80%."
  }
];

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Text highlight animation for "Spot issues faster"
  useEffect(() => {
    const spotlightTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".highlight-section",
        start: "top center",
        toggleActions: "play none none reset"
      }
    });
    
    spotlightTl
      .fromTo(".spotlight-text",
        { backgroundSize: "0% 40%" },
        { 
          backgroundSize: "100% 40%", 
          duration: 1.2,
          ease: "power2.out"
        }
      )
      .to(".spotlight-glow", {
        opacity: 0.7,
        duration: 0.8,
        ease: "sine.inOut"
      }, "-=0.8");
  }, []);
  
  // Track mouse movement for lighting effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          x: e.clientX,
          y: e.clientY - window.scrollY,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Initial animations
  useEffect(() => {
    // Don't run on server
    if (typeof window === 'undefined') return;
    
    // Main section animations
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top bottom-=100"
        }
      }
    );
    
    gsap.fromTo(descriptionRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        delay: 0.2,
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top bottom-=100"
        }
      }
    );
    
    // Clean up
    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => trigger.kill(true));
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-28 md:py-36 relative overflow-hidden"
    >
      {/* Background with custom lighting */}
      <div className="absolute inset-0 -z-20 bg-[#050510]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Subtle animated gradients */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-slow"></div>
      </div>
      
      {/* Light spotlight that follows cursor */}
      <div 
        ref={spotlightRef}
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none -z-10 opacity-10 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          left: '-200px',
          top: '-200px'
        }}
      ></div>
      
      {/* Decorative top light beam */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header with special highlight effect */}
        <div className="text-center mb-20 highlight-section">
          <h2 
            ref={headingRef}
            className="relative inline-block text-5xl md:text-6xl font-bold mb-8 text-white"
          >
            <span className="relative z-10">Transform Your Workflow</span>
            
            {/* Spotlight effect behind text */}
            <div className="absolute -inset-4 -z-10 opacity-0 spotlight-glow rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur-2xl"></div>
          </h2>
          
          <div 
            ref={descriptionRef}
            className="max-w-3xl mx-auto relative"
          >
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We don't just automate tasks—we reinvent how your business operates. 
              Our solutions help you <span className="spotlight-text relative font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-no-repeat bg-left-bottom">spot issues faster</span> and focus on what matters.
            </p>
            
            <div className="flex items-center justify-center gap-2 font-light text-gray-400">
              <BookOpen className="h-4 w-4" />
              <span>Tap or click cards to see the outcomes</span>
            </div>
          </div>
        </div>
        
        {/* Services grid with improved cards */}
        <div 
          ref={servicesGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              gradient={service.gradient}
              outcomeTitle={service.outcomeTitle}
              outcomeDescription={service.outcomeDescription}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 
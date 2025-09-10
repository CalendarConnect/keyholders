'use client';

import { useEffect, useRef, useState } from 'react';

interface ProcessStepProps {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
}

function ProcessStep({ step, title, subtitle, description, icon, isActive }: ProcessStepProps) {
  return (
    <div className={`relative transition-all duration-1000 ${isActive ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
      {/* Step Number */}
      <div className={`absolute -left-4 top-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500 ${
        isActive 
          ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg scale-110' 
          : 'bg-gray-200 text-gray-500'
      }`}>
        {step}
      </div>
      
      {/* Content Card */}
      <div className={`ml-12 p-8 rounded-2xl transition-all duration-500 ${
        isActive 
          ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-xl' 
          : 'bg-gray-50 border border-gray-200'
      }`}>
        {/* Icon */}
        <div className={`mb-6 transform transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
          {icon}
        </div>
        
        {/* Title */}
        <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
          isActive ? 'text-blue-900' : 'text-gray-700'
        }`}>
          {title}
        </h3>
        
        {/* Subtitle */}
        <h4 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
          isActive ? 'text-blue-700' : 'text-gray-600'
        }`}>
          {subtitle}
        </h4>
        
        {/* Description */}
        <p className={`leading-relaxed transition-colors duration-300 ${
          isActive ? 'text-slate-700' : 'text-gray-600'
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
}

function IntroductionIcon() {
  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        {/* Two overlapping circles */}
        <circle cx="24" cy="32" r="16" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" className="animate-pulse" />
        <circle cx="40" cy="32" r="16" fill="#f3e5f5" stroke="#9c27b0" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Handshake in the overlap */}
        <g transform="translate(32, 32)">
          <path d="M-6,-4 L-2,-2 L2,-2 L6,-4" stroke="#4caf50" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M-6,4 L-2,2 L2,2 L6,4" stroke="#4caf50" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="0" cy="0" r="2" fill="#4caf50" />
        </g>
        
        {/* Connection particles */}
        {[...Array(6)].map((_, i) => (
          <circle
            key={i}
            cx={20 + Math.cos(i * Math.PI / 3) * 12}
            cy={32 + Math.sin(i * Math.PI / 3) * 12}
            r="1"
            fill="#00bcd4"
            className="animate-ping"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

function MappingIcon() {
  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        {/* Org chart structure */}
        <rect x="24" y="8" width="16" height="8" rx="2" fill="#2196f3" />
        <rect x="8" y="24" width="12" height="6" rx="1" fill="#4caf50" />
        <rect x="44" y="24" width="12" height="6" rx="1" fill="#4caf50" />
        <rect x="16" y="40" width="10" height="6" rx="1" fill="#ff9800" />
        <rect x="38" y="40" width="10" height="6" rx="1" fill="#ff9800" />
        <rect x="28" y="52" width="8" height="4" rx="1" fill="#9c27b0" />
        
        {/* Connecting lines */}
        <line x1="32" y1="16" x2="32" y2="20" stroke="#666" strokeWidth="1" />
        <line x1="20" y1="24" x2="44" y2="24" stroke="#666" strokeWidth="1" />
        <line x1="32" y1="20" x2="32" y2="24" stroke="#666" strokeWidth="1" />
        <line x1="14" y1="30" x2="14" y2="36" stroke="#666" strokeWidth="1" />
        <line x1="50" y1="30" x2="50" y2="36" stroke="#666" strokeWidth="1" />
        <line x1="21" y1="40" x2="21" y2="36" stroke="#666" strokeWidth="1" />
        <line x1="43" y1="40" x2="43" y2="36" stroke="#666" strokeWidth="1" />
        <line x1="32" y1="46" x2="32" y2="52" stroke="#666" strokeWidth="1" />
        
        {/* Data flow animation */}
        <circle cx="32" cy="20" r="1" fill="#00bcd4" className="animate-ping" />
      </svg>
    </div>
  );
}

function PersonalityIcon() {
  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        {/* Personality matrix */}
        <rect x="16" y="16" width="32" height="32" fill="none" stroke="#2196f3" strokeWidth="2" rx="4" />
        
        {/* Quadrants */}
        <line x1="32" y1="16" x2="32" y2="48" stroke="#e0e0e0" strokeWidth="1" />
        <line x1="16" y1="32" x2="48" y2="32" stroke="#e0e0e0" strokeWidth="1" />
        
        {/* Dial controls */}
        {[...Array(4)].map((_, i) => (
          <g key={i}>
            <circle 
              cx={24 + (i % 2) * 16} 
              cy={24 + Math.floor(i / 2) * 16} 
              r="4" 
              fill="#4caf50" 
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
            <circle 
              cx={24 + (i % 2) * 16} 
              cy={24 + Math.floor(i / 2) * 16} 
              r="6" 
              fill="none" 
              stroke="#4caf50" 
              strokeWidth="1"
            />
          </g>
        ))}
        
        {/* Labels */}
        <text x="20" y="14" textAnchor="middle" fill="#666" fontSize="6">Strategic</text>
        <text x="44" y="14" textAnchor="middle" fill="#666" fontSize="6">Tactical</text>
        <text x="12" y="28" textAnchor="middle" fill="#666" fontSize="6">Direct</text>
        <text x="12" y="40" textAnchor="middle" fill="#666" fontSize="6">Collaborative</text>
      </svg>
    </div>
  );
}

function IntegrationIcon() {
  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        {/* Central hub */}
        <circle cx="32" cy="32" r="8" fill="#2196f3" />
        <text x="32" y="36" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">AI</text>
        
        {/* App icons around the hub */}
        {[
          { x: 32, y: 12, color: '#4285f4', label: 'G' }, // Gmail
          { x: 52, y: 22, color: '#7b68ee', label: 'S' }, // Slack
          { x: 52, y: 42, color: '#ff6b35', label: 'C' }, // Calendar
          { x: 32, y: 52, color: '#28a745', label: 'D' }, // Docs
          { x: 12, y: 42, color: '#ffc107', label: 'N' }, // Notes
          { x: 12, y: 22, color: '#dc3545', label: 'E' }, // Email
        ].map((app, i) => (
          <g key={i}>
            <circle cx={app.x} cy={app.y} r="6" fill={app.color} />
            <text x={app.x} y={app.y + 2} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">{app.label}</text>
            
            {/* Connection lines with data flow */}
            <line 
              x1={32 + (app.x - 32) * 0.3} 
              y1={32 + (app.y - 32) * 0.3} 
              x2={app.x - (app.x - 32) * 0.2} 
              y2={app.y - (app.y - 32) * 0.2} 
              stroke="#00bcd4" 
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const interval = setInterval(() => {
              setActiveStep((prev) => (prev + 1) % 4);
            }, 3000);
            
            return () => clearInterval(interval);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      title: "Introduction Meeting",
      subtitle: "Get to Know Each Other",
      description: "We explore your communication style, work patterns, role requirements, and partnership preferences. Your AI Partner begins building your unique interaction profile.",
      icon: <IntroductionIcon />
    },
    {
      title: "Professional Function Mapping",
      subtitle: "Map Your Professional Context",
      description: "Your AI Partner learns your company structure, decision-making authority, key relationships, and functional responsibilities. Context that guides every interaction.",
      icon: <MappingIcon />
    },
    {
      title: "AI Partner Personality Creation",
      subtitle: "Calibrate Partnership Style",
      description: "Configure your AI Partner's interaction approach - strategic vs tactical, direct vs collaborative, formal vs casual. Personality that complements your actual working style.",
      icon: <PersonalityIcon />
    },
    {
      title: "Software Integration Setup",
      subtitle: "Connect Your Digital Ecosystem",
      description: "Integrate your AI Partner with your email, calendar, documents, and communication tools. Seamless access to context and memory across all your work.",
      icon: <IntegrationIcon />
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, #0066cc 25%, transparent 25%), linear-gradient(-45deg, #0066cc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #0066cc 75%), linear-gradient(-45deg, transparent 75%, #0066cc 75%)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">
            Four Steps to
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Memory-Driven Partnership
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From introduction to integration - building intelligence that knows you
          </p>
        </div>

        {/* Process Timeline */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              number: 1,
              title: "Introduction Meeting",
              subtitle: "Get to Know Each Other",
              description: "We explore your communication style, work patterns, and partnership preferences."
            },
            {
              number: 2,
              title: "Function Mapping",
              subtitle: "Map Your Professional Context",
              description: "Learn your company structure, decision-making authority, and key relationships."
            },
            {
              number: 3,
              title: "Personality Creation",
              subtitle: "Calibrate Partnership Style",
              description: "Configure interaction approach that complements your actual working style."
            },
            {
              number: 4,
              title: "Integration Setup",
              subtitle: "Connect Your Digital Ecosystem",
              description: "Integrate with your tools for seamless access to context and memory."
            }
          ].map((step, index) => (
            <div 
              key={index}
              className={`relative p-6 rounded-2xl transition-all duration-1000 ${
                index === activeStep 
                  ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-xl scale-105' 
                  : 'bg-white border border-gray-200 opacity-70'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4 ${
                index === activeStep
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step.number}
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${
                index === activeStep ? 'text-blue-900' : 'text-gray-700'
              }`}>
                {step.title}
              </h3>
              
              <h4 className={`text-sm font-semibold mb-3 ${
                index === activeStep ? 'text-blue-700' : 'text-gray-600'
              }`}>
                {step.subtitle}
              </h4>
              
              <p className={`text-sm leading-relaxed ${
                index === activeStep ? 'text-slate-700' : 'text-gray-600'
              }`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Dots */}
        <div className="flex justify-center mt-12 space-x-4">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeStep 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 
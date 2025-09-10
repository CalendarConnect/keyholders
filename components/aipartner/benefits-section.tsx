'use client';

import { useEffect, useRef } from 'react';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function BenefitCard({ icon, title, description, delay }: BenefitCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in-up');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}

function ToneAnalysisIcon() {
  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        {/* Animated waveform */}
        {[...Array(5)].map((_, i) => (
          <rect
            key={i}
            x={8 + i * 12}
            y={32 - (Math.sin(i * 0.5) * 15 + 10)}
            width="4"
            height={Math.sin(i * 0.5) * 30 + 20}
            fill="url(#waveGradient)"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00a8ff" />
            <stop offset="100%" stopColor="#0078d4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function MemoryContinuityIcon() {
  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        {/* Timeline base */}
        <line x1="8" y1="32" x2="56" y2="32" stroke="#4a5568" strokeWidth="2" />
        
        {/* Memory nodes */}
        {[...Array(4)].map((_, i) => (
          <g key={i}>
            <circle
              cx={16 + i * 12}
              cy={32}
              r="4"
              fill="#00a8ff"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            {/* Connection lines */}
            {i < 3 && (
              <line
                x1={20 + i * 12}
                y1={32}
                x2={24 + i * 12}
                y2={32}
                stroke="#00a8ff"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.3 + 0.15}s` }}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

function AdaptiveGuidanceIcon() {
  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        {/* Compass circle */}
        <circle cx="32" cy="32" r="24" fill="none" stroke="#4a5568" strokeWidth="2" />
        
        {/* Compass needle */}
        <g className="animate-spin" style={{ transformOrigin: '32px 32px', animationDuration: '4s' }}>
          <line x1="32" y1="16" x2="32" y2="32" stroke="#00a8ff" strokeWidth="3" strokeLinecap="round" />
          <line x1="32" y1="32" x2="32" y2="48" stroke="#ffa500" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="32" r="3" fill="#00a8ff" />
        </g>
        
        {/* Cardinal directions */}
        <text x="32" y="12" textAnchor="middle" fill="#00a8ff" fontSize="8" fontWeight="bold">N</text>
        <text x="52" y="36" textAnchor="middle" fill="#4a5568" fontSize="8">E</text>
        <text x="32" y="56" textAnchor="middle" fill="#4a5568" fontSize="8">S</text>
        <text x="12" y="36" textAnchor="middle" fill="#4a5568" fontSize="8">W</text>
      </svg>
    </div>
  );
}

export default function BenefitsSection() {
  return (
    <section className="relative py-32 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00a8ff 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">
            Intelligence That Actually
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Knows You
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Not generic responses. Real awareness of your unique style and context.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <BenefitCard
            icon={<ToneAnalysisIcon />}
            title="Reads Your Communication Style"
            description="Your AI Partner analyzes how you communicate - your tone, energy, and preferred interaction style. Adapts responses to match your actual state, not generic assumptions."
            delay={200}
          />
          
          <BenefitCard
            icon={<MemoryContinuityIcon />}
            title="Remembers Everything That Matters"
            description="Your AI Partner maintains perfect memory of your role, company context, past decisions, and evolving preferences. No starting over, no repeated explanations."
            delay={400}
          />
          
          <BenefitCard
            icon={<AdaptiveGuidanceIcon />}
            title="Guides Based on Your Strengths"
            description="Your AI Partner understands your personality patterns, strengths, and growth areas. Provides guidance calibrated to how you actually work, not generic advice."
            delay={600}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
} 
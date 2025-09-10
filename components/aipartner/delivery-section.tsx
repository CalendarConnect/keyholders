'use client';

import { useEffect, useRef } from 'react';

interface DeliveryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function DeliveryCard({ icon, title, description, delay }: DeliveryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-delivery-card');
            }, delay);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="group relative p-8 bg-white rounded-3xl border border-gray-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 opacity-0 transform translate-y-8"
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-900 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-slate-600 text-lg leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-bl-3xl rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}

function LightningIcon() {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <defs>
          <linearGradient id="lightning" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <path 
          d="M32 8 L20 28 L28 28 L24 56 L44 24 L36 24 L32 8 Z" 
          fill="url(#lightning)" 
          className="animate-pulse"
        />
        {/* Electric sparks */}
        {[...Array(6)].map((_, i) => (
          <circle
            key={i}
            cx={24 + Math.cos(i * Math.PI / 3) * 16}
            cy={32 + Math.sin(i * Math.PI / 3) * 12}
            r="1"
            fill="#fbbf24"
            className="animate-ping"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

function DevicesIcon() {
  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        {/* Laptop */}
        <rect x="8" y="20" width="20" height="14" rx="2" fill="#2563eb" />
        <rect x="6" y="34" width="24" height="2" rx="1" fill="#1d4ed8" />
        
        {/* Tablet */}
        <rect x="32" y="16" width="14" height="20" rx="2" fill="#06b6d4" />
        <rect x="36" y="32" width="6" height="1" rx="0.5" fill="white" />
        
        {/* Phone */}
        <rect x="50" y="18" width="8" height="14" rx="2" fill="#10b981" />
        <rect x="52" y="28" width="4" height="1" rx="0.5" fill="white" />
        
        {/* Connection lines */}
        <path d="M18 20 Q24 12 39 16" stroke="#6366f1" strokeWidth="2" fill="none" className="animate-pulse" />
        <path d="M39 36 Q48 40 54 32" stroke="#6366f1" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        <path d="M18 34 Q32 44 54 32" stroke="#6366f1" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Data particles */}
        {[...Array(4)].map((_, i) => (
          <circle
            key={i}
            cx={16 + i * 12}
            cy={12}
            r="1"
            fill="#8b5cf6"
            className="animate-bounce"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

function GrowingTreeIcon() {
  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        {/* Tree trunk */}
        <rect x="30" y="40" width="4" height="16" fill="#8b4513" />
        
        {/* Growing branches */}
        <g className="animate-pulse">
          {/* Main branch */}
          <circle cx="32" cy="32" r="8" fill="#22c55e" opacity="0.8" />
          
          {/* Secondary branches */}
          <circle cx="24" cy="24" r="5" fill="#16a34a" opacity="0.9" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="40" cy="26" r="6" fill="#16a34a" opacity="0.9" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="28" cy="40" r="4" fill="#15803d" opacity="0.8" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
          <circle cx="36" cy="42" r="5" fill="#15803d" opacity="0.8" className="animate-pulse" style={{ animationDelay: '2s' }} />
        </g>
        
        {/* Growing leaves */}
        {[...Array(8)].map((_, i) => (
          <circle
            key={i}
            cx={20 + Math.cos(i * Math.PI / 4) * 16}
            cy={28 + Math.sin(i * Math.PI / 4) * 12}
            r="2"
            fill="#4ade80"
            className="animate-ping"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

function SupportIcon() {
  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        {/* Communication bubbles */}
        <path d="M12 16 Q12 12 16 12 L28 12 Q32 12 32 16 L32 24 Q32 28 28 28 L20 28 L16 32 L16 28 Q12 28 12 24 Z" fill="#3b82f6" />
        <path d="M36 24 Q36 20 40 20 L52 20 Q56 20 56 24 L56 32 Q56 36 52 36 L44 36 L40 40 L40 36 Q36 36 36 32 Z" fill="#06b6d4" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Communication lines */}
        <path d="M32 20 L36 24" stroke="#6366f1" strokeWidth="2" strokeDasharray="2,2" className="animate-pulse" />
        
        {/* Hearts/support symbols */}
        <path d="M22 20 Q20 18 18 20 Q16 18 14 20 Q16 24 22 20" fill="#ef4444" className="animate-pulse" />
        <path d="M46 28 Q44 26 42 28 Q40 26 38 28 Q40 32 46 28" fill="#ef4444" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
        
        {/* Connection particles */}
        {[...Array(6)].map((_, i) => (
          <circle
            key={i}
            cx={24 + i * 4}
            cy={8 + Math.sin(i) * 4}
            r="1"
            fill="#8b5cf6"
            className="animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function DeliverySection() {
  return (
    <section className="relative py-32 bg-gradient-to-br from-gray-50 to-slate-100 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `conic-gradient(from 0deg at 50% 50%, #0066cc, #00a8ff, #0066cc)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">
            Your Keith
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ready to work, from day one. Complete partnership intelligence, fully configured for you.
          </p>
        </div>

        {/* Delivery Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Same-Day Activation",
              description: "Your AI Partner is ready to work within hours, not weeks. Full memory continuity and personality calibration from your first real conversation.",
              icon: "⚡"
            },
            {
              title: "Everywhere You Work",
              description: "Email, calendar, documents, Slack, mobile - your AI Partner maintains context and memory across every platform you use.",
              icon: "📱"
            },
            {
              title: "Evolves With You",
              description: "Your AI Partner's understanding of your style, preferences, and context deepens with every interaction. Partnership that gets better over time.",
              icon: "🌱"
            },
            {
              title: "Partnership Optimization",
              description: "Ongoing calibration and enhancement. We ensure your AI Partner continues to serve your evolving needs and work style.",
              icon: "🤝"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="group relative p-8 bg-white rounded-3xl border border-gray-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="text-4xl mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-900 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes delivery-card {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-delivery-card {
          animation: delivery-card 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
} 
'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const logoRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-32">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-32">
          {/* AI Partner Logo - Perfectly Centered with More Breathing Room */}
          <div className="relative flex items-center justify-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            {/* Exact Glowing Circle Logo - 18% Larger */}
            <div 
              ref={logoRef}
              className="relative"
              style={{
                width: '472px',
                height: '472px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '35px solid #ffffff',
                                  boxShadow: '0 0 71px 21px #a7eaff, inset 0 0 43px 7px #a7eaff',
                animation: 'glowFlame 6s ease-in-out infinite'
              }}
            >
            </div>
          </div>

          {/* Essential Text Only - Lower Position */}
          <div className="space-y-8">
            <h1 className="text-7xl lg:text-8xl font-black text-slate-900 leading-none tracking-tight">
              <span className="block opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">YOUR</span>
              <span className="block opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                AI PARTNER
              </span>
            </h1>
            <p className="text-2xl text-slate-600 font-light opacity-0 animate-[fadeInUp_0.8s_ease-out_1s_forwards]">
              Volledig op maat gebouwd in jouw favoriete LLM interface
            </p>
            
            {/* LLM Interface Logos */}
            <div className="flex items-center justify-center space-x-8 pt-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_1.2s_forwards]">
              {/* ChatGPT */}
              <div className="flex items-center space-x-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GP</span>
                </div>
                <span className="text-lg font-semibold text-slate-700">ChatGPT</span>
              </div>
              
              {/* Claude */}
              <div className="flex items-center space-x-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CL</span>
                </div>
                <span className="text-lg font-semibold text-slate-700">Claude</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes glowFlame {
          0% {
            box-shadow: 
              0 0 71px 21px #a7eaff,
              0 0 106px 35px rgba(167, 234, 255, 0.4),
              0 0 35px 13px #a7eaff,
              /* Wavy outer edge - blue flames */
              -5px -7px 27px 9px rgba(167, 234, 255, 0.6),
              7px -11px 31px 11px rgba(167, 234, 255, 0.5),
              11px 5px 29px 10px rgba(167, 234, 255, 0.6),
              -4px 9px 33px 11px rgba(167, 234, 255, 0.4),
              -9px -2px 25px 8px rgba(167, 234, 255, 0.7),
              inset 0 0 43px 7px #a7eaff;
          }
          16.66% {
            box-shadow: 
              0 0 71px 21px #a7eaff,
              0 0 106px 35px rgba(167, 234, 255, 0.4),
              -1px -2px 37px 13px #a7eaff,
              /* Shifted flame positions */
              -7px -5px 28px 10px rgba(167, 234, 255, 0.6),
              5px -13px 30px 10px rgba(167, 234, 255, 0.5),
              13px 2px 28px 9px rgba(167, 234, 255, 0.6),
              -1px 11px 32px 11px rgba(167, 234, 255, 0.4),
              -11px 1px 26px 9px rgba(167, 234, 255, 0.7),
              inset 0 0 43px 7px #a7eaff;
          }
          33.33% {
            box-shadow: 
              0 0 71px 21px #a7eaff,
              0 0 106px 35px rgba(167, 234, 255, 0.4),
              2px -4px 39px 14px #a7eaff,
              /* Different flame positions */
              -3px -9px 29px 10px rgba(167, 234, 255, 0.6),
              9px -9px 32px 11px rgba(167, 234, 255, 0.5),
              12px 7px 31px 11px rgba(167, 234, 255, 0.6),
              -5px 7px 28px 10px rgba(167, 234, 255, 0.4),
              -7px -4px 28px 10px rgba(167, 234, 255, 0.7),
              inset 0 0 43px 7px #a7eaff;
          }
          50% {
            box-shadow: 
              0 0 71px 21px #a7eaff,
              0 0 106px 35px rgba(167, 234, 255, 0.4),
              1px -3px 38px 14px #a7eaff,
              /* More flame movement */
              -4px -8px 28px 9px rgba(167, 234, 255, 0.6),
              8px -10px 31px 11px rgba(167, 234, 255, 0.5),
              13px 6px 30px 10px rgba(167, 234, 255, 0.6),
              -3px 8px 29px 10px rgba(167, 234, 255, 0.4),
              -8px -3px 27px 9px rgba(167, 234, 255, 0.7),
              inset 0 0 43px 7px #a7eaff;
          }
          66.66% {
            box-shadow: 
              0 0 71px 21px #a7eaff,
              0 0 106px 35px rgba(167, 234, 255, 0.4),
              0px -2px 37px 13px #a7eaff,
              /* Different flame dance */
              -6px -5px 26px 8px rgba(167, 234, 255, 0.6),
              5px -12px 29px 10px rgba(167, 234, 255, 0.5),
              15px 4px 31px 11px rgba(167, 234, 255, 0.6),
              -2px 12px 29px 10px rgba(167, 234, 255, 0.4),
              -12px 1px 27px 9px rgba(167, 234, 255, 0.7),
              inset 0 0 43px 7px #a7eaff;
          }
          83.33% {
            box-shadow: 
              0 0 71px 21px #a7eaff,
              0 0 106px 35px rgba(167, 234, 255, 0.4),
              -2px -4px 38px 15px #a7eaff,
              /* Final flame positions */
              -8px -4px 28px 9px rgba(167, 234, 255, 0.6),
              4px -14px 32px 11px rgba(167, 234, 255, 0.5),
              13px 1px 26px 9px rgba(167, 234, 255, 0.6),
              -7px 8px 29px 10px rgba(167, 234, 255, 0.4),
              -8px 5px 29px 10px rgba(167, 234, 255, 0.7),
              inset 0 0 43px 7px #a7eaff;
          }
          100% {
            box-shadow: 
              0 0 71px 21px #a7eaff,
              0 0 106px 35px rgba(167, 234, 255, 0.4),
              0 0 35px 13px #a7eaff,
              /* Back to start */
              -5px -7px 27px 9px rgba(167, 234, 255, 0.6),
              7px -11px 31px 11px rgba(167, 234, 255, 0.5),
              11px 5px 29px 10px rgba(167, 234, 255, 0.6),
              -4px 9px 33px 11px rgba(167, 234, 255, 0.4),
              -9px -2px 25px 8px rgba(167, 234, 255, 0.7),
              inset 0 0 43px 7px #a7eaff;
          }
        }
      `}</style>
    </section>
  );
} 
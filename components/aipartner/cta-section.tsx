'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let animationId: number;
    let scene: any, camera: any, renderer: any, particles: any[] = [];

    const initThreeJS = async () => {
      try {
        const THREE = await import('three');
        
        if (!canvasRef.current) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ 
          canvas: canvasRef.current, 
          antialias: true, 
          alpha: true 
        });
        
        renderer.setSize(400, 400);
        renderer.setClearColor(0x000000, 0);
        
        // Create converging particles
        const particleCount = 80;
        
        for (let i = 0; i < particleCount; i++) {
          const geometry = new THREE.SphereGeometry(0.03, 8, 8);
          const material = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.8, 0.7),
            transparent: true,
            opacity: 0.8
          });
          
          const particle = new THREE.Mesh(geometry, material);
          
          // Position particles in a sphere around center
          const radius = 5 + Math.random() * 3;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          
          particle.position.set(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
          );
          
          particles.push(particle);
          scene.add(particle);
        }
        
        camera.position.z = 10;
        
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          
          const time = Date.now() * 0.001;
          
          // Move particles toward center
          particles.forEach((particle, index) => {
            const speed = 0.02;
            particle.position.multiplyScalar(1 - speed);
            
            // Reset particle if too close to center
            if (particle.position.length() < 0.5) {
              const radius = 5 + Math.random() * 3;
              const theta = Math.random() * Math.PI * 2;
              const phi = Math.random() * Math.PI;
              
              particle.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
              );
            }
            
            // Pulse effect
            particle.material.opacity = 0.4 + Math.sin(time * 2 + index * 0.1) * 0.4;
          });
          
          // Gentle rotation
          scene.rotation.y += 0.01;
          
          renderer.render(scene, camera);
        };
        
        animate();
      } catch (error) {
        console.log('Three.js not available');
      }
    };

    initThreeJS();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <section className="relative py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Flowing connections */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600">
          {[...Array(15)].map((_, i) => (
            <path
              key={i}
              d={`M${Math.random() * 800},${Math.random() * 600} Q${Math.random() * 800},${Math.random() * 600} ${Math.random() * 800},${Math.random() * 600}`}
              stroke="url(#flowGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Side - CTA Content */}
          <div className="space-y-8">
            <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight">
              Ready for AI Partnership That
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Actually Knows You?
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
              Stop explaining yourself to technology. Start working with intelligence that remembers, adapts, and grows with your unique style.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="relative bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-2xl hover:shadow-blue-400/30 transition-all duration-300 hover:scale-105 overflow-hidden group"
              >
                <span className="relative z-10">Begin Your AI Partnership</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-slate-900 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300"
              >
                Schedule Introduction Call
              </Button>
            </div>

            {/* Trust Elements */}
            <div className="flex flex-wrap gap-6 pt-8 border-t border-blue-800/50">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-blue-200 text-sm">Enterprise-grade privacy protection</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-blue-200 text-sm">Same-day setup available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-blue-200 text-sm">All major platforms supported</span>
              </div>
            </div>
          </div>

          {/* Right Side - 3D Visualization */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main visualization container */}
              <div className="relative w-96 h-96 rounded-full bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full rounded-full"
                />
                
                {/* Central AI indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 flex items-center justify-center shadow-2xl animate-pulse">
                    <span className="text-white font-black text-xl">AI</span>
                  </div>
                </div>
              </div>
              
              {/* Orbiting elements */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s' }}>
                {['Memory', 'Context', 'Learning', 'Adaptation'].map((label, index) => (
                  <div
                    key={index}
                    className="absolute w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateY(-200px)`,
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    <span className="text-xs font-bold text-white">{label[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
'use client';

import { useEffect, useRef } from 'react';
import { Metadata } from 'next';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageWrapper from '@/components/wrapper/page-wrapper';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// AI Partner Landing Page Components
const AIPartnerHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js Memory Network Visualization
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create memory network
    const geometry = new THREE.SphereGeometry(0.05, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x00a8ff, emissive: 0x001122 });
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];

    // Generate network nodes
    for (let i = 0; i < 200; i++) {
      const node = new THREE.Mesh(geometry, material);
      node.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      nodes.push(node);
      scene.add(node);
    }

    // Create connections between nearby nodes
    nodes.forEach((node, i) => {
      const nearbyNodes = nodes.filter((otherNode, j) => {
        if (i === j) return false;
        const distance = node.position.distanceTo(otherNode.position);
        return distance < 2;
      });

      nearbyNodes.forEach(nearbyNode => {
        const points = [node.position, nearbyNode.position];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00a8ff, opacity: 0.3, transparent: true });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        connections.push(line);
        scene.add(line);
      });
    });

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00a8ff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 15;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the entire network
      scene.rotation.y += 0.005;
      scene.rotation.x += 0.002;

      // Pulse nodes
      nodes.forEach((node, i) => {
        const time = Date.now() * 0.001;
        node.scale.setScalar(1 + Math.sin(time + i) * 0.1);
      });

      renderer.render(scene, camera);
    };
    animate();

    // GSAP Hero Animations
    const tl = gsap.timeline();
    tl.fromTo('.hero-headline', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' })
      .fromTo('.hero-subtitle', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
      .fromTo('.hero-benefits', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
      .fromTo('.hero-cta', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.2');

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center bg-gradient-to-br from-[#1a2332] via-[#0f1419] to-[#050510] overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="stars"></div>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Copy Zone */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="hero-headline text-6xl lg:text-8xl font-bold text-white leading-tight">
              YOUR AI
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a8ff] to-[#ffa500]">
                PARTNER
              </span>
            </h1>
            <p className="hero-subtitle text-xl text-gray-300 font-light">
              Intelligence With Perfect Memory
            </p>
          </div>

          <div className="hero-subtitle space-y-4 text-lg text-gray-400 leading-relaxed max-w-lg">
            <p>Not another chatbot. Not artificial helpfulness.</p>
            <p>Real memory continuity that knows your tone, role, and style.</p>
            <p className="text-white font-medium">Partnership that adapts to who you actually are.</p>
          </div>

          <div className="space-y-3">
            {[
              'Analyzes your tone while you speak',
              'Remembers your role, company, and function',
              'Understands your personality strengths & gaps',
              'Guides you with memory-driven intelligence'
            ].map((benefit, index) => (
              <div key={index} className="hero-benefits flex items-center space-x-3 text-gray-300">
                <div className="w-2 h-2 bg-[#00a8ff] rounded-full animate-pulse"></div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <button className="hero-cta group relative px-8 py-4 bg-gradient-to-r from-[#00a8ff] to-[#ffa500] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00a8ff]/20">
            <span className="relative z-10">Experience Intelligent Partnership</span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
        </div>

        {/* Right: AI Partner Visualization */}
        <div className="relative h-[600px] flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full" />
          
          {/* Glowing AI Partner Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="ai-partner-logo w-48 h-48 rounded-full bg-white border-[12px] border-white shadow-[0_0_50px_15px_#00a8ff,inset_0_0_30px_5px_#00a8ff] animate-pulse-slow">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#00a8ff]/20 to-[#ffa500]/20 flex items-center justify-center">
                <div className="text-4xl font-bold text-[#1a2332]">AI</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-ping"></div>
        </div>
      </div>

      <style jsx>{`
        .stars {
          background: radial-gradient(2px 2px at 20px 30px, #eee, transparent),
                      radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.5), transparent),
                      radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                      radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.5), transparent),
                      radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          animation: sparkle 20s linear infinite;
        }
        
        @keyframes sparkle {
          from { transform: translateY(0px); }
          to { transform: translateY(-100px); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
};

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.benefit-card');
    
    gsap.fromTo(cards, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center center',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const benefits = [
    {
      icon: '🎵',
      title: 'Reads Your Communication Style',
      description: 'Your AI Partner analyzes how you communicate - your tone, energy, and preferred interaction style. Adapts responses to match your actual state, not generic assumptions.',
      gradient: 'from-[#00a8ff] to-[#0066cc]'
    },
    {
      icon: '🧠',
      title: 'Remembers Everything That Matters',
      description: 'Your AI Partner maintains perfect memory of your role, company context, past decisions, and evolving preferences. No starting over, no repeated explanations.',
      gradient: 'from-[#ffa500] to-[#ff6b35]'
    },
    {
      icon: '🧭',
      title: 'Guides Based on Your Strengths',
      description: 'Your AI Partner understands your personality patterns, strengths, and growth areas. Provides guidance calibrated to how you actually work, not generic advice.',
      gradient: 'from-[#00a8ff] to-[#ffa500]'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-[#050510] to-[#1a2332] relative overflow-hidden">
      {/* Background mesh pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300a8ff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl lg:text-6xl font-bold text-white">
            Intelligence That Actually
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a8ff] to-[#ffa500]">
              Knows You
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Not generic responses. Real awareness of your unique style.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#00a8ff]/10"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10 space-y-6">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white group-hover:text-[#00a8ff] transition-colors duration-300">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00a8ff]/0 to-[#ffa500]/0 group-hover:from-[#00a8ff]/10 group-hover:to-[#ffa500]/10 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = gsap.utils.toArray('.process-step');
    
    steps.forEach((step, index) => {
      gsap.fromTo(step,
        { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step as Element,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animate progress line
    gsap.fromTo('.progress-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Introduction Meeting',
      subtitle: 'Get to Know Each Other',
      description: 'We explore your communication style, work patterns, role requirements, and partnership preferences. Your AI Partner begins building your unique interaction profile.',
      icon: '🤝',
      color: 'from-[#00a8ff] to-[#0066cc]'
    },
    {
      number: '02',
      title: 'Professional Function Mapping',
      subtitle: 'Map Your Professional Context',
      description: 'Your AI Partner learns your company structure, decision-making authority, key relationships, and functional responsibilities. Context that guides every interaction.',
      icon: '🏢',
      color: 'from-[#ffa500] to-[#ff6b35]'
    },
    {
      number: '03',
      title: 'AI Partner Personality Creation',
      subtitle: 'Calibrate Partnership Style',
      description: 'Configure your AI Partner\'s interaction approach - strategic vs tactical, direct vs collaborative, formal vs casual. Personality that complements your actual working style.',
      icon: '⚙️',
      color: 'from-[#00a8ff] to-[#ffa500]'
    },
    {
      number: '04',
      title: 'Software Integration Setup',
      subtitle: 'Connect Your Digital Ecosystem',
      description: 'Integrate your AI Partner with your email, calendar, documents, and communication tools. Seamless access to context and memory across all your work.',
      icon: '🔗',
      color: 'from-[#ffa500] to-[#00a8ff]'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-[#1a2332] to-[#050510] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl lg:text-6xl font-bold text-white">
            Four Steps to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a8ff] to-[#ffa500]">
              Memory-Driven Partnership
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From introduction to integration - building intelligence that knows you
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Progress Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#00a8ff] to-[#ffa500] progress-line origin-top"></div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`process-step flex items-center gap-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className={`text-6xl transform hover:scale-110 transition-transform duration-300`}>
                          {step.icon}
                        </span>
                        <div>
                          <div className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${step.color} mb-1`}>
                            STEP {step.number}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {step.title}
                          </h3>
                          <h4 className="text-lg text-[#00a8ff] font-semibold">
                            {step.subtitle}
                          </h4>
                        </div>
                      </div>
                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step Number Circle */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-2xl`}>
                    {step.number}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ClientsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.client-card');
    
    gsap.fromTo(cards,
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const clients = [
    {
      name: 'Bruce',
      company: 'WayneTech Enterprises',
      role: 'Strategic Executive',
      quote: 'My AI Partner knows my decision-making style and company politics. Every briefing is calibrated to how I actually think and communicate.',
      avatar: '👨‍💼',
      color: 'from-[#1a1a2e] to-[#16213e]',
      accent: '#00a8ff'
    },
    {
      name: 'Alfred',
      company: 'Manor Operations Ltd',
      role: 'Operational Manager',
      quote: 'My AI Partner remembers every team member\'s strengths and communication preferences. Makes coordination effortless.',
      avatar: '👨‍💻',
      color: 'from-[#2d1b69] to-[#11998e]',
      accent: '#ffa500'
    },
    {
      name: 'Gigi',
      company: 'Hadid Design Studios',
      role: 'Creative Director',
      quote: 'My AI Partner understands my creative process and client relationships. Adapts communication for each project\'s unique personality.',
      avatar: '👩‍🎨',
      color: 'from-[#ff6b6b] to-[#4ecdc4]',
      accent: '#00a8ff'
    },
    {
      name: 'Lucy',
      company: 'Quantum Development Co',
      role: 'Technical Lead',
      quote: 'My AI Partner knows our codebase, team dynamics, and technical constraints. Every conversation builds on previous context.',
      avatar: '👩‍💻',
      color: 'from-[#667eea] to-[#764ba2]',
      accent: '#ffa500'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-[#050510] to-[#1a2332] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl lg:text-6xl font-bold text-white">
            Real People,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a8ff] to-[#ffa500]">
              Real Partnership
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how memory-driven AI transforms professional performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {clients.map((client, index) => (
            <div
              key={index}
              className="client-card group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${client.color} opacity-80`}></div>
              
              {/* Content */}
              <div className="relative z-10 p-8 space-y-6">
                {/* Avatar and Info */}
                <div className="flex items-center gap-4">
                  <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                    {client.avatar}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {client.name}
                    </h3>
                    <p className="text-gray-300 font-semibold">
                      {client.role}
                    </p>
                    <p className="text-sm text-gray-400">
                      {client.company}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-gray-200 leading-relaxed text-lg italic">
                  "{client.quote}"
                </blockquote>

                {/* Accent line */}
                <div 
                  className="w-full h-1 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: client.accent }}
                ></div>
              </div>

              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"
                style={{ 
                  background: `radial-gradient(circle at center, ${client.accent}, transparent 70%)` 
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // GSAP CTA Animation
    gsap.fromTo('.cta-content',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Three.js convergence animation
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, 400);
    renderer.setClearColor(0x000000, 0);

    // Particle system
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      colors[i] = 0; // R
      colors[i + 1] = 0.66; // G (blue)
      colors[i + 2] = 1; // B
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Converge particles toward center
      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] *= 0.99; // X
        positions[i + 1] *= 0.99; // Y
        positions[i + 2] *= 0.99; // Z
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      particleSystem.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-[#1a2332] to-[#050510] overflow-hidden">
      {/* Background visualization */}
      <div className="absolute inset-0">
        <canvas ref={canvasRef} className="w-full h-full opacity-30" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="cta-content text-center space-y-8 max-w-4xl mx-auto">
          <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
            Ready for AI Partnership
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a8ff] to-[#ffa500]">
              That Actually Knows You?
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Stop explaining yourself to technology.
            <br />
            Start working with intelligence that remembers, adapts, and grows with your unique style.
          </p>

          <div className="space-y-6">
            <button className="group relative px-12 py-6 bg-gradient-to-r from-[#00a8ff] to-[#ffa500] text-white text-xl font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#00a8ff]/30">
              <span className="relative z-10">Begin Your AI Partnership</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              
              {/* Pulse animation */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00a8ff] to-[#ffa500] animate-ping opacity-20"></div>
            </button>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
              <button className="hover:text-[#00a8ff] transition-colors duration-300 underline underline-offset-4">
                Schedule Introduction Call
              </button>
              <span className="hidden sm:block">|</span>
              <button className="hover:text-[#ffa500] transition-colors duration-300 underline underline-offset-4">
                See AI Partner in Action
              </button>
            </div>
          </div>

          {/* Trust elements */}
          <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Enterprise-grade privacy protection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#00a8ff] rounded-full animate-pulse"></div>
              <span>Same-day setup available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#ffa500] rounded-full animate-pulse"></div>
              <span>Major platforms supported</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main AI Partner Page Component
export default function AIPartnerPage() {
  return (
    <PageWrapper>
      <div className="bg-[#050510] min-h-screen">
        <AIPartnerHero />
        <BenefitsSection />
        <ProcessSection />
        <ClientsSection />
        <CTASection />
      </div>
    </PageWrapper>
  );
}

// Metadata for the page
export const metadata: Metadata = {
  title: "AI Partner | Memory-Driven Intelligence - Keyholders Agency",
  description: "Experience AI partnership that actually knows you. Memory-driven intelligence that adapts to your unique style, role, and communication preferences.",
  openGraph: {
    title: "AI Partner | Intelligence With Perfect Memory",
    description: "Not another chatbot. Real memory continuity that knows your tone, role, and style. Partnership that adapts to who you actually are.",
    images: [
      {
        url: "/images/og/ai-partner.jpg",
        width: 1200,
        height: 630,
        alt: "AI Partner - Memory-Driven Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://keyholders.agency/aura",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "AI Partner, Memory-Driven AI, Intelligent Partnership, Personalized AI, Business AI Assistant, AI That Remembers, Adaptive AI, Professional AI Partner",
};

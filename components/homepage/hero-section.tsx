"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/app/i18n/context";
import { motion, useInView } from 'motion/react';

// Update the border style to ensure it maintains the pill shape

// Update the CSS for the border glimmer effect
const borderGlimmerStyle = `
  .cta-button::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid transparent;
    border-radius: 9999px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  .cta-button:hover::before {
    opacity: 1;
  }
  
  /* Ensure the button itself has proper border-radius */
  .cta-button {
    position: relative;
    border-radius: 9999px !important;
  }
  
  /* Styles for the Prosper icon shadow effect */
  .prosper-shadow {
    opacity: 0;
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 0px rgba(0, 0, 0, 0));
  }
  
  .prosper-icon:hover .prosper-shadow {
    opacity: 0; /* Still invisible on regular hover */
  }
  
  /* Add hover effect for regular icons */
  .integration-icon:not(.prosper-icon):hover img {
    opacity: 1 !important;
    transition: opacity 0.3s ease;
  }
`;

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const { dictionary, language } = useI18n();
  
  // References for animation targets
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  
  // Mouse position state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Integration icons to replace red crosses
  const integrationIcons = [
    // Top row
    { src: "/icons/wordpress.svg", alt: "WordPress", size: 50, position: { top: "16%", left: "8%" } },
    { src: "/icons/twitter.svg", alt: "Twitter", size: 40, position: { top: "10%", left: "25%" } },
    { src: "/icons/gmail.svg", alt: "Gmail", size: 60, position: { top: "9%", right: "17%" } },
    { src: "/icons/stripe-trigger.svg", alt: "Stripe", size: 100, position: { top: "30%", right: "15%" } },
    { src: "/icons/hubspot.svg", alt: "HubSpot", size: 50, position: { top: "8%", right: "5%" } },
    
    // Middle row - left side
    { src: "/icons/telegram.svg", alt: "Telegram", size: 56, position: { top: "57%", left: "38%" }, className: "telegram-icon" },
    { src: "/icons/salesforce.svg", alt: "Salesforce", size: 0, position: { top: "35%", left: "2%" } },
    { src: "/icons/slack.svg", alt: "Slack", size: 60, position: { top: "38%", left: "18%" } },
    { src: "/icons/notion.svg", alt: "Notion", size: 60, position: { top: "52%", left: "5%" } },
    
    // Middle row - right side
    { src: "/icons/google-analytics.svg", alt: "Google Analytics", size: 50, position: { top: "85%", right: "93%" } },
    { src: "/icons/discord.svg", alt: "Discord", size: 60, position: { top: "40%", right: "3%" } },
    { src: "/icons/intercom.svg", alt: "Intercom", size: 50, position: { top: "50%", right: "30%" } },
    { src: "/icons/whatsapp-business-cloud.svg", alt: "WhatsApp", size: 65, position: { top: "14%", right: "27%" } },
    
    // Bottom row
    { src: "/icons/n8n.png", alt: "n8n", size: 200, position: { bottom: "0%", left: "35.5%" } },
    { src: "/icons/google_ai_studio_gemini_e157b42786.png", alt: "Google AI", size: 60, position: { bottom: "28%", left: "21%" } },
    { src: "/icons/openailogo.png", alt: "OpenAI", size: 160, position: { bottom: "2.8%", right: "38%" } },
    { src: "/icons/shopify.svg", alt: "Shopify", size: 80, position: { bottom: "13%", right: "10%" } },
    { src: "/icons/microsoft-teams.svg", alt: "Microsoft Teams", size: 60, position: { bottom: "33%", left: "80%" } },
    { src: "/icons/trello.svg", alt: "Trello", size: 50, position: { bottom: "22%", right: "2%" } },
    { src: "/icons/prosper.png", alt: "Prosper", size: 50, position: { bottom: "10%", right: "25%" }, className: "prosper-icon", spotlight: true },
  ];

  // Content data for stats cards
  const statsData = language === "nl" ? [
    {
      value: "63%",
      label: "Verbeterde efficiëntie",
      color: "text-blue-400"
    },
    {
      value: "12x",
      label: "Hogere conversies",
      color: "text-blue-400"
    },
    {
      value: "24/7",
      label: "Automatische werking",
      color: "text-blue-400"
    }
  ] : [
    {
      value: "63%",
      label: "Improved efficiency",
      color: "text-blue-400"
    },
    {
      value: "12x",
      label: "Higher conversions",
      color: "text-blue-400"
    },
    {
      value: "24/7",
      label: "Automatic operation",
      color: "text-blue-400"
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Mouse spotlight effect
    const handleMouseMove = (e: MouseEvent) => {
      // Direct manipulation without using React state at all
      const spotlight = spotlightRef.current;
      if (spotlight) {
        // Use pageX/pageY instead of clientX/clientY for absolute positioning
        spotlight.style.left = `${e.pageX}px`;
        spotlight.style.top = `${e.pageY}px`;
        
        // Check if the cursor is over the CTA button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
          const buttonRect = ctaButton.getBoundingClientRect();
          const isOverButton = 
            e.clientX >= buttonRect.left && 
            e.clientX <= buttonRect.right && 
            e.clientY >= buttonRect.top && 
            e.clientY <= buttonRect.bottom;
          
          // Change z-index based on whether the cursor is over the button
          spotlight.style.zIndex = isOverButton ? '30' : '1';
          
          // Add new code for the dynamic border glimmer effect
          if (isOverButton) {
            // Calculate the position of the cursor relative to the button
            const relativeX = (e.clientX - buttonRect.left) / buttonRect.width;
            const relativeY = (e.clientY - buttonRect.top) / buttonRect.height;
            
            // Determine which side of the button the cursor is closest to
            // This helps create a more natural light reflection effect
            let gradientAngle = 0;
            let gradientPos = 0;
            
            // Find closest edge by comparing distances
            const distToLeft = relativeX;
            const distToRight = 1 - relativeX;
            const distToTop = relativeY;
            const distToBottom = 1 - relativeY;
            
            // Find minimum distance to determine closest edge
            const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
            
            if (minDist === distToLeft) {
              // Closest to left edge
              gradientAngle = 90;
              gradientPos = relativeY * 100;
            } else if (minDist === distToRight) {
              // Closest to right edge
              gradientAngle = 270;
              gradientPos = relativeY * 100;
            } else if (minDist === distToTop) {
              // Closest to top edge
              gradientAngle = 180;
              gradientPos = relativeX * 100;
            } else {
              // Closest to bottom edge
              gradientAngle = 0;
              gradientPos = relativeX * 100;
            }
            
            // Apply a simple light glow effect at cursor position
            const shadowColor = `rgba(255, 255, 255, 0.8)`;
            const shadowSize = 5;
            const glowSize = 15;
            
            // Create glow that follows cursor position
            const glowX = (relativeX - 0.5) * 2 * 20; // -20px to +20px horizontal offset
            const glowY = (relativeY - 0.5) * 2 * 20; // -20px to +20px vertical offset
            
            // Use a spread of styles to ensure the glow follows the rounded shape
            (ctaButton as HTMLElement).style.boxShadow = `0 0 ${glowSize}px ${shadowColor}`;
            (ctaButton as HTMLElement).style.borderColor = shadowColor;
            (ctaButton as HTMLElement).style.borderWidth = '2px';
            (ctaButton as HTMLElement).style.borderStyle = 'solid';
          } else {
            // Reset the effects when not hovering
            (ctaButton as HTMLElement).style.boxShadow = '';
            (ctaButton as HTMLElement).style.borderColor = 'transparent';
          }
        }
      }
      
      // Dynamic shadow effect for the headline
      if (headlineRef.current) {
        const headingRect = headlineRef.current.getBoundingClientRect();
        const headingCenterX = headingRect.left + headingRect.width / 2;
        const headingCenterY = headingRect.top + headingRect.height / 2;
        
        // Calculate vector from mouse to heading center
        const vectorX = e.clientX - headingCenterX;
        const vectorY = e.clientY - headingCenterY;
        
        // Normalize and scale for shadow offset (inverted to create natural shadow)
        const distance = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
        const maxDistance = 300; // Max distance to consider for shadow effect
        const shadowIntensity = Math.min(1, distance / maxDistance);
        
        // Apply realistic shadow projection effect
        const maxOffset = 25; // Increased for more dramatic shadow offset
        // Handle potential NaN by checking if distance is too small
        let shadowX = 0;
        let shadowY = 0;
        
        if (distance > 0.1) { // Avoid division by very small numbers
          shadowX = -vectorX / distance * shadowIntensity * maxOffset;
          shadowY = -vectorY / distance * shadowIntensity * maxOffset;
        }
        
        // Apply dynamic text shadow - projection shadow effect
        gsap.to(headlineRef.current, {
          textShadow: `${shadowX}px ${shadowY}px 3px rgba(0, 0, 0, 0.9)`,
          duration: 0.2
        });
      }
      
      // Highlight icons when the spotlight is near them
      const iconEls = document.querySelectorAll('.integration-icon');
      iconEls.forEach((icon) => {
        const rect = icon.getBoundingClientRect();
        const iconCenterX = rect.left + rect.width / 2;
        const iconCenterY = rect.top + rect.height / 2;
        
        // Calculate distance between mouse and icon center
        const distanceX = e.clientX - iconCenterX;
        const distanceY = e.clientY - iconCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Spotlight radius (adjust as needed)
        const spotlightRadius = 200;
        
        // Calculate spotlight intensity based on distance
        const intensity = Math.max(0, 1 - distance / spotlightRadius);
        
        // Apply simple brightness effect to the image (no drop-shadow)
        const iconImage = icon.querySelector('img');
        
        // Special handling for Prosper icon - only visible under spotlight
        if (icon.classList.contains('prosper-icon') && iconImage) {
          if (intensity > 0) {
            // Make only the shadow visible when spotlight hits it
            gsap.to(iconImage, {
              opacity: intensity * 0.8, // More intense spotlight = more visible
              filter: `brightness(0) drop-shadow(0 0 ${intensity * 8}px rgba(0, 0, 0, ${intensity * 0.9}))`, 
              duration: 0.3
            });
          } else {
            // Keep invisible when spotlight is not on it
            gsap.to(iconImage, {
              opacity: 0,
              filter: "brightness(0) drop-shadow(0 0 0px rgba(0, 0, 0, 0))",
              duration: 0.3
            });
          }
        } 
        // Regular handling for other icons
        else if (iconImage && intensity > 0) {
          gsap.to(iconImage, {
            scale: 1 + (intensity * 0.12),
            filter: `brightness(${1 + intensity * 0.3})`,
            duration: 0.2
          });
        } else if (iconImage) {
          gsap.to(iconImage, {
            scale: 1,
            filter: "brightness(1)",
            duration: 0.3
          });
        }
      });
    };
    
    // Add mouse move event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Enhanced floating icons animation
    const iconEls = document.querySelectorAll('.integration-icon');
    iconEls.forEach((icon, index) => {
      // Initial state with slight offset
      gsap.set(icon, { 
        opacity: 0,
        rotation: "random(-4, 4)",
        y: "random(-5, 5)",
        x: "random(-5, 5)"
      });
      
      // Fade in animation with scale effect
      gsap.to(icon, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: index * 0.1 + Math.random() * 0.5,
        ease: "power2.out"
      });
      
      // Get icon size to determine animation range
      const iconSize = parseInt((icon as HTMLElement).style.width || '50');
      const isLargeIcon = iconSize > 60;
      const floatRange = isLargeIcon ? 8 : 16; // Smaller movement for larger icons
      
      // Primary floating animation - larger vertical movement
      gsap.to(icon, {
        y: `random(-${floatRange}, ${floatRange})`,
        duration: "random(8, 14)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
      
      // Secondary floating animation - smaller horizontal movement on different timeline
      gsap.to(icon, {
        x: `random(-${floatRange * 0.7}, ${floatRange * 0.7})`,
        duration: "random(7, 12)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
      
      // Subtle rotation animation
      gsap.to(icon, {
        rotation: "random(-6, 6)",
        duration: "random(12, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
      
      // Subtle scale breathing
      gsap.to(icon, {
        scale: "random(0.95, 1.05)",
        duration: "random(6, 10)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    });
    
    // Main content animations
    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
    
    // Trust badge animation
    timeline.fromTo(".hero-badge",
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      0.3
    );
    
    // Main headline animation
    if (headlineRef.current) {
      timeline.fromTo(headlineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.5
      );
    }
    
    // Tagline animation
    if (taglineRef.current) {
      timeline.fromTo(taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.8
      );
    }
    
    // CTA buttons animation
    timeline.fromTo(".cta-group",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      1.0
    );
    
    // Stats cards animation
    timeline.fromTo(".stat-card",
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        stagger: 0.15
      },
      1.2
    );
    
    return () => {
      // Cleanup
      gsap.killTweensOf('.integration-icon');
      if (headlineRef.current) {
        gsap.killTweensOf(headlineRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden pt-16 pb-24 cursor-default"
    >
      {/* Pure black background */}
      <div className="absolute inset-0 -z-10 bg-black"></div>
      
      {/* Mouse spotlight effect */}
      <div 
        ref={spotlightRef}
        className="fixed pointer-events-none w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(138, 75, 175, 0.35) 0%, rgba(91, 50, 130, 0.2) 35%, rgba(0, 0, 0, 0) 70%)',
          position: 'absolute',
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'screen',
          zIndex: 1, // Default z-index
        }}
      ></div>
      
      {/* Integration icons - placed where red crosses were in the reference */}
      {integrationIcons.map((icon, index) => (
        <div 
          key={`icon-${index}`}
          className={`integration-icon absolute z-10 transition-shadow hidden md:block ${icon.className || ''}`}
          style={{
            ...icon.position,
            width: `${icon.size}px`,
            height: `${icon.size}px`,
          }}
        >
          <Image
            src={icon.src}
            alt={icon.alt}
            width={icon.size}
            height={icon.size}
            className={`w-full h-full object-contain ${
              icon.alt === "Telegram" ? "hover:rotate-[20deg] transition-transform duration-200" :
              icon.alt === "Prosper" ? "prosper-shadow transition-all duration-300" :
              "transition-all duration-300"
            }`}
            style={{
              transformOrigin: 'center',
              ...(icon.alt === "Prosper" ? {
                filter: "brightness(0) blur(0px) opacity(0)",
                opacity: 0,
              } : {
                opacity: 0.65, // Reduced from 0.8 to 0.65 (15% reduction)
              })
            }}
          />
        </div>
      ))}
      
      <div ref={ref} className="container mx-auto px-4 max-w-5xl z-20 cursor-default">
        <div className="flex flex-col items-center text-center">
          {/* Trust badge */}
          <div className="mb-4">
            <Badge variant="glow" size="lg" className="hero-badge py-1.5 px-4 cursor-default">
              <div className="flex items-center gap-2">
                <span className="text-s font-large">
                  {language === "nl" ? "Automatiseren kun je leren!" : "You can learn to automate!"}
                </span>
              </div>
            </Badge>
          </div>
          
          {/* Main headline - WEAREKEYHOLDERS */}
          <h1
            className="text-5xl md:text-7xl lg:text-7xl font-bold text-white mb-6 tracking-tight uppercase cursor-default relative"
            style={{ 
              textShadow: '5px 5px 3px rgba(0, 0, 0, 0.75)',
              transition: 'text-shadow 0.2s ease-out'
            }}
            ref={headlineRef}
          >
            We Are Keyholders
          </h1>
          
          {/* Tagline */}
          <div
            ref={taglineRef}
            className="text-xl md:text-2xl lg:text-3xl font-medium text-white/90 mb-12 cursor-default"
          >
            {language === "nl" ? (
              <>
                Wij automatiseren je werkdag door <br />
                AI en software aan elkaar te verbinden
              </>
            ) : (
              <>
                We automate your workday by <br />
                connecting AI and software together
              </>
            )}
          </div>
          
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="cta-group flex flex-row gap-5 items-center justify-center mb-20"
          >
            <Link
              href={language === "nl" ? "/ai-scan" : "/en/ai-scan"}
              className="relative z-20"
            >
              <Button 
                size="lg" 
                className="cta-button rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-6 h-auto text-base relative group"
                style={{
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  borderRadius: '9999px',
                }}
              >
                {/* Border glimmer effect - only visible on hover */}
                <style jsx global>{borderGlimmerStyle}</style>
                <span className="mr-2 relative z-10">
                  {language === "nl" ? "Ja, ik wil een gratis AI consult!" : "Yes, I want a free AI consultation!"}
                </span>
                <ChevronRight className="h-4 w-4 relative z-10" />
              </Button>
            </Link>
          </motion.div>
            
          {/* Stats cards */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
            {statsData.map((stat, index) => (
              <div 
                key={index}
                className="stat-card border border-white/10 bg-black/50 rounded-lg p-6 flex flex-col items-center cursor-default"
              >
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color} cursor-default`}>
                  {stat.value}
                  </div>
                <div className="text-gray-300 font-medium cursor-default">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

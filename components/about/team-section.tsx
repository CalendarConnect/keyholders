"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: "christian",
    name: "Christian Bleeker",
    role: "Founder & CEO",
    bio: "With over 15 years of experience leading AI implementations across Fortune 500 companies, Christian founded Keyholders Agency to transform how businesses adopt AI. His unique methodology ensures seamless integration of AI systems into existing workflows.",
    image: "/logos/Christian.jpeg",
    socials: {
      twitter: "https://twitter.com/christianbleeker",
      linkedin: "https://linkedin.com/in/christianbleeker",
      github: "https://github.com/christianbleeker"
    }
  },
  {
    id: "emma",
    name: "Emma Chen",
    role: "Chief Technology Officer",
    bio: "Emma oversees our technical implementations and ensures all solutions align with industry best practices. Her background in machine learning and software architecture brings technical rigor to every project.",
    image: "/logos/person1.jpg",
    socials: {
      twitter: "https://twitter.com/emmachen",
      linkedin: "https://linkedin.com/in/emmachen",
      github: "https://github.com/emmachen"
    }
  },
  {
    id: "marcus",
    name: "Marcus Williams",
    role: "Lead AI Engineer",
    bio: "Marcus specializes in natural language processing and conversational AI implementations. He works directly with clients to design systems that enhance human capabilities rather than replace them.",
    image: "/logos/person2.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/marcuswilliams",
      github: "https://github.com/marcuswilliams"
    }
  },
  {
    id: "sarah",
    name: "Sarah Johnson",
    role: "Client Success Manager",
    bio: "Sarah ensures all our implementations deliver measurable business value. She translates technical capabilities into business outcomes and guides our clients through the transformation process.",
    image: "/logos/person3.jpg",
    socials: {
      twitter: "https://twitter.com/sarahjohnson",
      linkedin: "https://linkedin.com/in/sarahjohnson"
    }
  }
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const teamMemberRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Set up animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom-=100",
          }
        }
      );
      
      // Animate team members
      teamMemberRefs.current.forEach((member, index) => {
        if (!member) return;
        
        gsap.fromTo(
          member,
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            delay: 0.1 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: member,
              start: "top bottom-=50",
            }
          }
        );
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  // Social media icon component
  const SocialIcon = ({ platform, url }: { platform: string; url: string }) => {
    const iconClasses = "w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors duration-200";
    
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/5 transition-colors duration-200">
        {platform === "twitter" && <Twitter className={iconClasses} />}
        {platform === "linkedin" && <Linkedin className={iconClasses} />}
        {platform === "github" && <Github className={iconClasses} />}
      </a>
    );
  };
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0f_70%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Meet the Keyholders
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 xl:gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                ref={el => {
                  teamMemberRefs.current[index] = el;
                }}
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c0c18] to-[#13131f] border border-white/5 hover:border-purple-500/20 transition-all duration-300"
              >
                {/* Top accent border */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                <div className="flex flex-col md:flex-row p-5 md:p-0">
                  {/* Image container */}
                  <div className="w-full md:w-40 h-40 md:h-auto overflow-hidden">
                    <div className="h-full w-full md:aspect-[3/4] relative overflow-hidden rounded-lg md:rounded-r-none md:rounded-l-xl">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-4 md:p-6 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-purple-400 font-medium mb-4">{member.role}</p>
                      <p className="text-gray-300 text-sm">{member.bio}</p>
                    </div>
                    
                    {/* Social links */}
                    <div className="mt-4 flex items-center">
                      {member.socials.twitter && (
                        <SocialIcon platform="twitter" url={member.socials.twitter} />
                      )}
                      {member.socials.linkedin && (
                        <SocialIcon platform="linkedin" url={member.socials.linkedin} />
                      )}
                      {member.socials.github && (
                        <SocialIcon platform="github" url={member.socials.github} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 px-6 py-10 bg-gradient-to-br from-[#0c0c18] to-[#13131f] rounded-2xl border border-purple-500/10 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute -left-32 top-0 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px]"></div>
            <div className="absolute -right-32 bottom-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Join Our Growing Team</h3>
              <p className="text-gray-300 mb-8">
                We&apos;re always looking for talented individuals passionate about AI and its practical applications in business. 
                If you&apos;re excited about transforming how companies work with intelligent automation, we&apos;d love to hear from you.
              </p>
              
              <a 
                href="/careers" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors duration-200"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
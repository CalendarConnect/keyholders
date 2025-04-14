"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BlogCardProps {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  index: number;
}

const BlogCard = ({ title, description, imageUrl, slug, index }: BlogCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative bg-gradient-to-br from-[#0c0c18] to-[#13131f] rounded-xl overflow-hidden border border-white/5 hover:border-purple-500/20 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c18] to-transparent opacity-60"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-3">{description}</p>
        
        <Link 
          href={`/blog/${slug}`}
          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          <span>Read more</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
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
          },
        }
      );

      // Subheading animation
      gsap.fromTo(
        subheadingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: subheadingRef.current,
            start: "top bottom-=100",
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top bottom-=100",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const blogPosts = [
    {
      title: "Understanding AI Literacy Requirements",
      description: "Learn what the February 2025 AI knowledge requirements mean for your team and how to prepare for compliance ahead of the deadline.",
      imageUrl: "/images/blog/ai-literacy.jpg",
      slug: "ai-literacy-requirements",
      index: 0,
    },
    {
      title: "Secure GPT Implementation Strategies",
      description: "How to use generative AI without exposing sensitive company data to ensure your AI implementations stay compliant with the AI Act.",
      imageUrl: "/images/blog/secure-gpt.jpg",
      slug: "secure-gpt-implementation",
      index: 1,
    },
    {
      title: "Automation Compliance: A Practical Guide",
      description: "Real-world examples of AI Act compliance in business processes, with actionable steps for your organization.",
      imageUrl: "/images/blog/automation-compliance.jpg",
      slug: "automation-compliance-guide",
      index: 2,
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[#050510]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Subtle gradient */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
            <BookOpen className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">AI Act Resources</span>
          </div>
          
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Stay Informed: AI Act Insights
          </h2>
          
          <p
            ref={subheadingRef}
            className="text-xl text-gray-300"
          >
            Explore our latest articles about the EU AI Act and intelligent automation strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>

        <div ref={ctaRef} className="text-center">
          <Link 
            href="/blog/category/ai-act"
            className="inline-flex items-center justify-center border border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 text-purple-400 px-6 py-3 rounded-lg transition-colors group"
          >
            <span>View All Articles</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
} 
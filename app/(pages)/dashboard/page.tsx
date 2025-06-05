"use client";

import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  ArrowRight,
  LayoutTemplate,
  RefreshCw,
  ShoppingBag,
  PlusCircle,
  AlertCircle,
  ListFilter,
  Settings,
  ChevronRight,
  ExternalLink,
  FileText,
  Edit,
  Star,
  Layout
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import gsap from "gsap";

// CSS for animation and effects
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
  
  .cta-button {
    position: relative;
    border-radius: 9999px !important;
  }

  .card-glow {
    transition: all 0.3s ease;
  }
  
  .card-glow:hover {
    border-color: rgba(138, 75, 175, 0.5);
    box-shadow: 0 0 15px rgba(138, 75, 175, 0.3);
  }

  .stats-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .stats-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Fetch templates from Convex
  const templates = useQuery(api.templates.list, {});
  
  // Animation for cards only
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Animation for cards
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.animate-card');
      
      gsap.fromTo(cards, 
        { y: 30, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power2.out"
        }
      );
    }
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-[#050510]">
        <RefreshCw className="h-10 w-10 animate-spin text-indigo-400" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-4 bg-[#050510]">
        <AlertCircle className="h-16 w-16 text-indigo-400" />
        <h1 className="text-2xl font-semibold text-white">Authentication Required</h1>
        <p className="text-gray-400 mb-4">Please sign in to access your dashboard</p>
        <SignInButton mode="modal">
          <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700">Sign In</Button>
        </SignInButton>
      </div>
    );
  }
  
  // Format recent templates
  const recentTemplates = templates?.slice(0, 3) || [];
  
  return (
    <div 
      ref={sectionRef}
      className="min-h-screen bg-[#050510] text-white pb-12 relative overflow-hidden cursor-default"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Glow accents */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px]"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[150px]"></div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx global>{borderGlimmerStyle}</style>
      
      {/* Decorative top light beam */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-6">
        <header className="pt-16 pb-10 text-center">
          <div className="mb-4">
            <Badge variant="outline" size="lg" className="py-1.5 px-4 border-indigo-500/30 bg-indigo-500/10">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-medium text-indigo-300">
                  Templates Marketplace
                </span>
              </div>
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
            Your Dashboard
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Create and manage your marketplace templates with a beautiful interface
          </p>
        </header>
        
        {/* Quick Actions */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="animate-card"
            >
              <ActionCard 
                title="Create Template" 
                description="Design a new template with our intuitive builder"
                icon={<PlusCircle className="h-6 w-6 text-purple-400" />}
                href="/dashboard/winkel/new"
                gradient="from-purple-600 to-indigo-600"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="animate-card"
            >
              <ActionCard 
                title="Manage Templates" 
                description="Edit and organize your existing templates"
                icon={<LayoutTemplate className="h-6 w-6 text-blue-400" />}
                href="/dashboard/winkel"
                gradient="from-blue-600 to-cyan-600"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="animate-card"
            >
              <ActionCard 
                title="Store Settings" 
                description="Configure your template store appearance"
                icon={<Settings className="h-6 w-6 text-teal-400" />}
                href="/dashboard/settings"
                gradient="from-teal-600 to-emerald-600"
              />
            </motion.div>
          </div>
        </section>
        
        {/* Recent Templates */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Recent Templates</h2>
            <Button asChild variant="ghost" size="sm" className="text-indigo-300 hover:text-indigo-200 hover:bg-indigo-950/50">
              <Link href="/dashboard/winkel" className="flex items-center gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
      </div>

          {templates === undefined ? (
            <div className="flex justify-center py-16">
              <RefreshCw className="h-8 w-8 animate-spin text-indigo-400" />
            </div>
          ) : templates.length === 0 ? (
            <Card className="bg-black/40 border-indigo-500/20 overflow-hidden card-glow animate-card">
              <div className="p-10 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 rounded-full bg-indigo-500/10">
                    <LayoutTemplate className="h-10 w-10 text-indigo-400" />
              </div>
                  <h3 className="text-xl font-semibold text-white">No templates yet</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    Get started by creating your first template for the marketplace.
                  </p>
                  <Button asChild className="rounded-full bg-indigo-600 hover:bg-indigo-700 cta-button">
                    <Link href="/dashboard/winkel/new" className="flex items-center gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Create First Template
                    </Link>
                </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {recentTemplates.map((template, index) => (
                <motion.div
                  key={template._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  className="animate-card"
                >
                  <TemplateCard 
                    template={template}
                    index={index}
                  />
                </motion.div>
              ))}
                    </div>
          )}
        </section>
        
        {/* Stats Cards */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8">Marketplace Overview</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="animate-card"
            >
              <StatsCard 
                title="Total Templates" 
                value={templates?.length || 0} 
                description="Templates in your marketplace"
                icon={<LayoutTemplate className="h-5 w-5" />}
                gradient="from-purple-600 to-indigo-600"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="animate-card"
            >
              <StatsCard 
                title="Categories" 
                value="14" 
                description="Template categories"
                icon={<ListFilter className="h-5 w-5" />}
                gradient="from-blue-600 to-cyan-600"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="animate-card"
            >
              <StatsCard 
                title="Latest Template" 
                value={templates && templates.length > 0 ? formatDistanceToNow(templates[0].updatedAt) : "--"} 
                description="Since last update"
                icon={<FileText className="h-5 w-5" />}
                gradient="from-teal-600 to-emerald-600"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="animate-card"
            >
              <StatsCard 
                title="Active Users" 
                value="47" 
                description="Using your templates"
                icon={<ShoppingBag className="h-5 w-5" />}
                gradient="from-amber-600 to-orange-600"
              />
            </motion.div>
                    </div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="animate-card"
          >
            <Card className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-indigo-500/20 overflow-hidden card-glow">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Visit Your Marketplace
                    </h3>
                    <p className="text-gray-300 max-w-xl">
                      See how your templates look to your customers and explore your public marketplace.
                    </p>
                  </div>
                  <Button asChild className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-6 h-auto text-base cta-button">
                    <Link href="/winkel" className="flex items-center gap-2">
                      <span>Visit Marketplace</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
              </div>
          </CardContent>
        </Card>
          </motion.div>
        </section>
              </div>
              </div>
  );
}

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  gradient: string;
}

function ActionCard({ title, description, icon, href, gradient }: ActionCardProps) {
  const [isHovering, setIsHovering] = useState(false);
                  
                  return (
    <Link 
      href={href} 
      className="block h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Card className="h-full bg-black/40 border-indigo-500/20 overflow-hidden card-glow relative">
        {/* Gradient background that shows on hover */}
        <div 
          className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${isHovering ? 'opacity-20' : ''}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}></div>
                      </div>
        
        <CardHeader className="relative z-10">
          <div className="mb-4 p-3 w-14 h-14 rounded-xl flex items-center justify-center relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 rounded-xl blur-sm`}></div>
            <div className="relative">{icon}</div>
                      </div>
          <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <p className="text-gray-400">{description}</p>
        </CardContent>
        
        <CardFooter className="pt-0 relative z-10">
          <div className="flex justify-between items-center w-full">
            <span className="text-sm text-gray-500">Get Started</span>
            <div className={`p-2 rounded-full bg-gradient-to-r ${gradient} opacity-80 transform transition-transform duration-300 ${isHovering ? 'scale-110' : ''}`}>
              <ArrowRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

function StatsCard({ title, value, description, icon, gradient }: StatsCardProps) {
  return (
    <Card className="stats-card bg-black/40 border-indigo-500/20 overflow-hidden relative">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-10 flex items-center justify-center`}>
            {icon}
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
              </div>
          </CardContent>
        </Card>
  );
}

interface TemplateCardProps {
  template: any;
  index: number;
}

function TemplateCard({ template, index }: TemplateCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  const formatCategoryName = (category: string): string => {
    return category
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  
  // Format timestamp using relative time
  const formatDistanceToNow = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <Card 
      className="h-full bg-black/40 border-indigo-500/20 overflow-hidden card-glow"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={template.heroUrl}
          alt={template.name}
          fill
          className={`object-cover transition-transform duration-500 ${isHovering ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-indigo-500/30 backdrop-blur-sm text-xs font-medium text-white">
          {formatCategoryName(template.category)}
        </div>
        
        {/* Sticker if present */}
        {template.sticker && (
          <div className="absolute right-4 top-4 rounded-full bg-pink-600/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
            {template.sticker}
          </div>
        )}
      </div>

      <CardHeader className="pb-2 relative">
        <CardTitle className="text-xl text-white">{template.name}</CardTitle>
        {template.subtitle && (
          <CardDescription className="line-clamp-2 text-gray-400">
            {template.subtitle}
            </CardDescription>
        )}
          </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 mb-4">
          {template.icons.slice(0, 4).map((icon: string, idx: number) => (
            <div key={icon} className="relative h-6 w-6">
              <Image
                src={`/icons/${icon}`}
                alt=""
                fill
                className="object-contain"
              />
                </div>
              ))}
          {template.icons.length > 4 && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] text-indigo-300">
              +{template.icons.length - 4}
            </div>
          )}
            </div>
          </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2 border-t border-white/10">
        <div className="text-xs text-gray-500">
          Updated {formatDistanceToNow(template.updatedAt)}
        </div>
        
        <Button asChild variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/50">
          <Link href={`/dashboard/winkel/${template._id}/edit`} className="flex items-center gap-1">
            <Edit className="h-3 w-3" />
            Edit
          </Link>
        </Button>
          </CardFooter>
        </Card>
  );
}

// Helper function for timestamp formatting
function formatDistanceToNow(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
}

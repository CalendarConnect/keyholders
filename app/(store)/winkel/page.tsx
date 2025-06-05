"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import CategoryFilter from "@/components/templates/category-filter";
import TemplateCard, { TemplateCardProps } from "@/components/templates/template-card";
import { TemplateCategory } from "@/convex/schema";

export default function TemplatesListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | null>(null);
  
  // Fetch templates and categories from Convex
  const templates = useQuery(api.templates.list, {
    category: selectedCategory,
  });
  
  const categories = useQuery(api.templates.getCategories);
  
  // Loading state
  if (!templates || !categories) {
    return <TemplatesListSkeleton />;
  }
  
  // Format templates for card props
  const templateCards: TemplateCardProps[] = templates.map(template => ({
    id: template._id,
    slug: template.slug,
    name: template.name,
    subtitle: template.subtitle,
    sticker: template.sticker,
    heroUrl: template.heroUrl,
    category: template.category,
    categoryLabel: formatCategoryName(template.category),
    icons: template.icons,
    author: template.author,
  }));
  
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          AI Workflow Templates
        </h1>
        <p className="text-xl text-white/60 max-w-3xl mx-auto">
          Ready-made automation templates to elevate your business processes and save valuable time.
        </p>
      </motion.div>
      
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(category) => {
          // Type assertion to help TypeScript understand the conversion
          setSelectedCategory(category as TemplateCategory | null);
        }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templateCards.map((template) => (
          <TemplateCard 
            key={template.id} 
            {...template} 
          />
        ))}
        
        {templateCards.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="text-white/30 text-7xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No templates found</h3>
            <p className="text-white/60 max-w-md">
              {selectedCategory 
                ? "No templates available in this category yet. Please check back later or select another category."
                : "No templates available yet. Please check back later."}
            </p>
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory(null)}
                className="mt-4 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                View all templates
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TemplatesListSkeleton() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="h-12 w-3/4 max-w-3xl mx-auto bg-white/10 rounded-xl mb-4 animate-pulse" />
        <div className="h-6 w-2/3 max-w-2xl mx-auto bg-white/10 rounded-lg animate-pulse" />
      </div>
      
      <div className="overflow-x-auto pb-2 mb-8">
        <div className="flex gap-2">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="h-10 w-32 bg-white/10 rounded-full animate-pulse" />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col bg-white/5 rounded-2xl overflow-hidden animate-pulse">
            <div className="w-full aspect-[16/9] bg-white/10" />
            <div className="p-5">
              <div className="h-6 w-3/4 bg-white/10 rounded-lg mb-2" />
              <div className="h-4 w-1/2 bg-white/10 rounded-lg mb-4" />
              <div className="flex gap-2 mb-4">
                {Array(3).fill(0).map((_, j) => (
                  <div key={j} className="w-5 h-5 bg-white/10 rounded-full" />
                ))}
              </div>
              <div className="h-4 w-1/4 bg-white/10 rounded-lg mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatCategoryName(category: string): string {
  return category
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
} 
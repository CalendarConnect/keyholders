import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Category = {
  id: string;
  label: string;
  count: number;
};

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto pb-2 mb-8">
      <div className="flex gap-2">
        <CategoryPill
          key="all"
          label="All Templates"
          count={categories.reduce((sum, cat) => sum + cat.count, 0)}
          isSelected={selectedCategory === null}
          onSelect={() => onCategoryChange(null)}
          onHover={() => setHovered("all")}
          onLeave={() => setHovered(null)}
          isHovered={hovered === "all"}
        />
        
        {categories.map((category) => (
          <CategoryPill
            key={category.id}
            label={category.label}
            count={category.count}
            isSelected={selectedCategory === category.id}
            onSelect={() => onCategoryChange(category.id)}
            onHover={() => setHovered(category.id)}
            onLeave={() => setHovered(null)}
            isHovered={hovered === category.id}
          />
        ))}
      </div>
    </div>
  );
}

interface CategoryPillProps {
  label: string;
  count: number;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
  isHovered: boolean;
}

function CategoryPill({
  label,
  count,
  isSelected,
  onSelect,
  onHover,
  onLeave,
  isHovered,
}: CategoryPillProps) {
  return (
    <button
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "relative transition-all duration-300 whitespace-nowrap px-4 py-2 rounded-full text-sm border",
        isSelected
          ? "bg-white text-black border-white" 
          : "bg-transparent text-white/80 border-white/20 hover:border-white/40"
      )}
    >
      <div className="flex items-center gap-1.5">
        <span>{label}</span>
        <span className={cn(
          "text-xs py-0.5 px-1.5 rounded-full",
          isSelected ? "bg-black/20 text-black" : "bg-white/10 text-white/60"
        )}>
          {count}
        </span>
      </div>
      
      {isHovered && !isSelected && (
        <motion.div
          layoutId="hoverBg"
          className="absolute inset-0 -z-10 rounded-full bg-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {isSelected && (
        <motion.div
          layoutId="selectedBg"
          className="absolute inset-0 -z-10 rounded-full bg-white"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
} 
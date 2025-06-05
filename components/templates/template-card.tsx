import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface TemplateCardProps {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  sticker?: string;
  heroUrl: string;
  category: string;
  categoryLabel: string;
  icons: string[];
  author: "christian" | "renier";
}

export default function TemplateCard({
  slug,
  name,
  subtitle,
  sticker,
  heroUrl,
  category,
  categoryLabel,
  icons,
  author,
}: TemplateCardProps) {
  return (
    <Link href={`/winkel/${slug}`}>
      <motion.div 
        className="group flex flex-col bg-[#0a0a18] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={heroUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {sticker && (
            <div className="absolute top-3 right-3 bg-pink-600 text-white text-xs font-medium py-1 px-2 rounded-full">
              {sticker}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a18] to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-white text-lg">{name}</h3>
              {subtitle && (
                <p className="text-white/60 text-sm mt-1">{subtitle}</p>
              )}
            </div>
            <span className="text-xs py-1 px-2 bg-white/10 rounded-full text-white/70">
              {categoryLabel}
            </span>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {icons.slice(0, 5).map((icon) => (
              <div key={icon} className="w-5 h-5 relative">
                <Image
                  src={`/icons/${icon}`}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            ))}
            {icons.length > 5 && (
              <div className="w-5 h-5 flex items-center justify-center text-xs text-white/60 bg-white/10 rounded-full">
                +{icons.length - 5}
              </div>
            )}
          </div>
          
          <div className="mt-auto pt-4 flex items-center">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <Image
                src={`/images/team/${author}.jpg`}
                alt={author === "christian" ? "Christian" : "Renier"}
                width={24}
                height={24}
              />
            </div>
            <span className="text-xs text-white/60 ml-2">
              {author === "christian" ? "Christian Bleeker" : "Renier Bleeker"}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 
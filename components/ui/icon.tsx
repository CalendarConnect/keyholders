import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface IconProps {
  name: keyof typeof Icons;
  className?: string;
}

export function Icon({ name, className }: IconProps): ReactNode {
  const IconComponent = Icons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return <IconComponent className={cn("h-5 w-5", className)} />;
} 
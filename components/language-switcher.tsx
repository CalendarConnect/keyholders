"use client";

import { useI18n, Language } from "@/app/i18n/context";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const { language } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (lang: Language) => {
    // Get the current path without language prefix
    let newPath = pathname;
    
    // Remove language prefix if it exists
    if (pathname.startsWith('/en/')) {
      newPath = pathname.substring(3); // Remove '/en'
    } else if (pathname.startsWith('/en')) {
      newPath = '/'; // Special case for /en root
    }
    
    // Add new language prefix or use root for Dutch
    if (lang === 'en') {
      newPath = newPath === '/' ? '/en' : `/en${newPath}`;
    }
    
    // Navigate to the new URL
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full w-8 h-8 overflow-hidden p-0 hover:bg-purple-500/10"
        >
          <Image 
            src={language === 'nl' ? '/images/flags/nl.svg' : '/images/flags/gb.svg'} 
            alt={language === 'nl' ? 'Dutch' : 'English'} 
            width={24} 
            height={24} 
            className="rounded-full object-cover"
          />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#0a0a0f] border border-purple-900/20 backdrop-blur-lg">
        <DropdownMenuItem 
          className={`flex items-center gap-2 ${language === 'nl' ? 'bg-purple-500/10 text-purple-300' : 'text-white hover:bg-purple-500/10 hover:text-purple-300'}`}
          onClick={() => handleLanguageChange('nl')}
        >
          <Image 
            src="/images/flags/nl.svg" 
            alt="Nederlands" 
            width={16} 
            height={16} 
            className="rounded-full"
          />
          <span>Nederlands</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={`flex items-center gap-2 ${language === 'en' ? 'bg-purple-500/10 text-purple-300' : 'text-white hover:bg-purple-500/10 hover:text-purple-300'}`}
          onClick={() => handleLanguageChange('en')}
        >
          <Image 
            src="/images/flags/gb.svg" 
            alt="English" 
            width={16} 
            height={16} 
            className="rounded-full"
          />
          <span>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
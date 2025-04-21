"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import enDictionary from "./dictionaries/en.json";
import nlDictionary from "./dictionaries/nl.json";

export type Language = "en" | "nl";

interface I18nContextType {
  language: Language;
  dictionary: Record<string, any>;
  changeLanguage: (lang: Language) => void;
}

const dictionaries = {
  en: enDictionary,
  nl: nlDictionary,
};

const I18nContext = createContext<I18nContextType | null>(null);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

interface I18nProviderProps {
  children: ReactNode;
  forcedLocale?: Language;
}

export function I18nProvider({ children, forcedLocale }: I18nProviderProps) {
  const pathname = usePathname();
  
  // Determine initial language based on pathname or forced locale
  const getInitialLanguage = (): Language => {
    if (forcedLocale) return forcedLocale;
    
    // Check URL path for language
    if (pathname?.startsWith('/en')) return 'en';
    return 'nl';
  };
  
  const [language, setLanguage] = useState<Language>(getInitialLanguage());
  const [dictionary, setDictionary] = useState(dictionaries[language]);
  const router = useRouter();

  // Update language when pathname changes
  useEffect(() => {
    const newLang = pathname?.startsWith('/en') ? 'en' : 'nl';
    if (newLang !== language) {
      setLanguage(newLang);
      setDictionary(dictionaries[newLang]);
    }
  }, [pathname, language]);

  // Load language preference from localStorage on client side
  useEffect(() => {
    // Only use localStorage if we don't have a forced locale and we're not in a language-specific URL path
    if (forcedLocale || pathname?.startsWith('/en')) {
      return;
    }
    
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "nl")) {
      setLanguage(savedLanguage);
      setDictionary(dictionaries[savedLanguage]);
    }
  }, [forcedLocale, pathname]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setDictionary(dictionaries[lang]);
    localStorage.setItem("language", lang);
  };

  return (
    <I18nContext.Provider value={{ language, dictionary, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
} 
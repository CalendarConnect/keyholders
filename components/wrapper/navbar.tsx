"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Dialog } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Menu, MessagesSquare, Bot, BarChart, LineChart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { Button } from "../ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { UserProfile } from "../user-profile";
import { useI18n } from "@/app/i18n/context";
import LanguageSwitcher from "../language-switcher";

export default function NavBar() {
  const { userId } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { dictionary } = useI18n();

  // Create service items using i18n translations
  const serviceItems: { title: string; href: string; description: string, icon: React.ReactNode }[] = [
    {
      title: dictionary.services.revops.title,
      href: "/services/revops",
      description: dictionary.services.revops.description,
      icon: <BarChart className="h-4 w-4 text-purple-400" />
    },
    {
      title: dictionary.services.businessIntelligence.title,
      href: "/services/business-intelligence",
      description: dictionary.services.businessIntelligence.description,
      icon: <LineChart className="h-4 w-4 text-blue-400" />
    },
    {
      title: dictionary.services.integrations.title,
      href: "/services/integrations",
      description: dictionary.services.integrations.description,
      icon: <Bot className="h-4 w-4 text-teal-400" />
    },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0f]"
      style={{
        borderBottom: isScrolled ? '1px solid rgba(88, 28, 135, 0.2)' : '1px solid transparent',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
      }}
    >
      <div className="flex items-center justify-between py-2 px-4 max-w-7xl mx-auto">
        {/* Logo - Mobile */}
        <div className="flex lg:hidden items-center gap-2">
          <Dialog>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-purple-500/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-[#0a0a0f] backdrop-blur-lg border-purple-900/20">
              <SheetHeader className="pb-6 border-b border-purple-900/20">
                <SheetTitle className="flex items-center gap-2 text-white">
                  <Image 
                    src="/images/logos/logo-dark.webp" 
                    alt="Keyholders Logo" 
                    width={24} 
                    height={24}
                  />
                  <span>Keyholders Agency</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 mt-6">
                {/* AI Act link for mobile menu */}
                <div className="px-2 pb-4 border-b border-purple-900/20">
                  <Link href="/ai-act" prefetch={true}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-normal h-11 border border-purple-900/20 mb-2 text-white hover:bg-purple-500/10 hover:text-purple-300 transition-colors"
                    >
                      <span className="mr-2">🇪🇺</span> {dictionary.nav.euAiAct}
                    </Button>
                  </Link>
                </div>

                <div className="px-2 pb-4 hidden">
                  <h2 className="text-sm font-medium text-purple-400 mb-2">
                    {dictionary.nav.services}
                  </h2>
                  {serviceItems.map((item) => (
                    <Link key={item.href} href={item.href} prefetch={true}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-base font-normal h-11 border border-purple-900/20 mb-2 text-white hover:bg-purple-500/10 hover:text-purple-300 transition-colors"
                      >
                        <span className="mr-2">{item.icon}</span> {item.title}
                      </Button>
                    </Link>
                  ))}
                </div>

                <div className="px-2 py-4 border-t border-purple-900/20">
                  <h2 className="text-sm font-medium text-purple-400 mb-2">
                    {dictionary.companySection.title}
                  </h2>
                  <Link href="/about" prefetch={true}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-normal h-11 border border-purple-900/20 mb-2 text-white hover:bg-purple-500/10 hover:text-purple-300 transition-colors"
                    >
                      {dictionary.nav.about}
                    </Button>
                  </Link>
                  <Link href="/case-studies" prefetch={true}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-normal h-11 border border-purple-900/20 mb-2 text-white hover:bg-purple-500/10 hover:text-purple-300 transition-colors"
                    >
                      {dictionary.nav.caseStudies}
                    </Button>
                  </Link>
                  <Link href="/ai-scan" prefetch={true}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-normal h-11 border border-purple-900/20 mb-2 text-white hover:bg-purple-500/10 hover:text-purple-300 transition-colors hidden"
                    >
                      {dictionary.nav.aiScan}
                    </Button>
                  </Link>
                  <Link href="/careers" prefetch={true}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-normal h-11 border border-purple-900/20 mb-2 text-white hover:bg-purple-500/10 hover:text-purple-300 transition-colors"
                    >
                      {dictionary.nav.careers}
                    </Button>
                  </Link>
                  <Link href="/contact" prefetch={true}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-normal h-11 border border-purple-900/20 hover:bg-purple-500/10 hover:text-purple-300 transition-colors"
                    >
                      <MessagesSquare className="h-4 w-4 mr-2" />
                      {dictionary.nav.contact}
                    </Button>
                  </Link>
                </div>

                {!userId && (
                  <div className="px-2 py-4 border-t border-purple-900/20 mt-auto">
                    <Link href="/sign-in" prefetch={true}>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0">
                        {dictionary.nav.signIn}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Dialog>
          <Link href="/" prefetch={true} className="flex items-center gap-2 text-white">
            <Image 
              src="/images/logos/logo-dark.webp" 
              alt="Keyholders Logo" 
              width={24} 
              height={24}
            />
            <span className="font-semibold">Keyholders</span>
          </Link>
        </div>

        {/* Logo - Desktop */}
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/" prefetch={true} className="flex items-center gap-2 text-white group">
            <Image 
              src="/images/logos/logo-dark.webp" 
              alt="Keyholders Logo" 
              width={24} 
              height={24}
            />
            <span className="font-semibold">Keyholders Agency</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/ai-act" prefetch={true}>
            <span className="text-white hover:text-purple-300 transition-colors text-sm">{dictionary.nav.euAiAct}</span>
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="hidden">
                <NavigationMenuTrigger className="text-white hover:text-purple-300 bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-purple-300 px-0">
                  <span className="text-sm">{dictionary.nav.services}</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#0a0a0f] border border-purple-900/20 rounded-xl backdrop-blur-lg">
                    {serviceItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/case-studies" prefetch={true}>
            <span className="text-white hover:text-purple-300 transition-colors text-sm">{dictionary.nav.caseStudies}</span>
          </Link>
          <Link href="/ai-scan" prefetch={true}>
            <span className="text-white hover:text-purple-300 transition-colors text-sm hidden">{dictionary.nav.aiScan}</span>
          </Link>
          <Link href="/about" prefetch={true}>
            <span className="text-white hover:text-purple-300 transition-colors text-sm">{dictionary.nav.about}</span>
          </Link>
          <Link href="/careers" prefetch={true}>
            <span className="text-white hover:text-purple-300 transition-colors text-sm">{dictionary.nav.careers}</span>
          </Link>
          <Link href="/contact" prefetch={true}>
            <span className="text-white hover:text-purple-300 transition-colors text-sm">{dictionary.nav.contact}</span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {!userId && (
            <Link href="/sign-in" prefetch={true} className="hidden">
              <Button
                variant="default"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0"
              >
                {dictionary.nav.clientPortal}
              </Button>
            </Link>
          )}
          {userId && <div className="hidden"><UserProfile /></div>}
        </div>
      </div>
    </motion.div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-purple-500/10 text-white hover:text-purple-300",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none flex items-center gap-2">
            {icon && <span>{icon}</span>}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

import AIActHeroSection from "@/components/ai-act/hero-section";
import WhenApplySection from "@/components/ai-act/when-apply-section";
import RequirementsSection from "@/components/ai-act/requirements-section";
import HowWeHelpSection from "@/components/ai-act/how-we-help-section";
import RoadmapSection from "@/components/ai-act/roadmap-section";
import ScanSection from "@/components/ai-act/scan-section";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { Metadata } from "next";
import { useI18n } from "@/app/i18n/context";

export const generateMetadata = async (): Promise<Metadata> => {
  // Since this is a server component, we need to handle both languages
  const enDict = (await import("@/app/i18n/dictionaries/en.json")).default;
  const nlDict = (await import("@/app/i18n/dictionaries/nl.json")).default;
  
  return {
    title: enDict.aiAct.meta.title,
    description: enDict.aiAct.meta.description,
    openGraph: {
      title: enDict.aiAct.hero.heading,
      description: enDict.aiAct.hero.description,
      images: [
        {
          url: "/images/og/ai-act.jpg",
          width: 1200,
          height: 630,
          alt: "EU AI Act Compliance Solutions",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: "https://keyholders.agency/ai-act",
      languages: {
        'en': 'https://keyholders.agency/ai-act',
        'nl': 'https://keyholders.agency/ai-act',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: "EU AI Act, GDPR, AI regulation, AI compliance, intelligent automation, AI solutions, automation, regulatory compliance, AI governance, EU AI compliance, AI risk management",
    authors: [{ name: "Keyholders Agency" }],
    category: "AI Compliance",
  };
};

export default function AIActPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "EU AI Act Compliance Solutions",
            "provider": {
              "@type": "Organization",
              "name": "Keyholders Agency",
              "url": "https://keyholders.agency"
            },
            "description": "Navigate the EU AI Act and GDPR with confidence. We provide compliant AI-powered automation solutions that ensure regulatory adherence while accelerating your business growth.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock",
              "validFrom": "2024-01-01"
            },
            "audience": {
              "@type": "BusinessAudience",
              "audienceType": "European businesses using AI technologies"
            },
            "serviceType": "AI Compliance",
            "termsOfService": "https://keyholders.agency/terms",
            "serviceOutput": "Compliant AI automation implementation",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://keyholders.agency/ai-act"
            }
          })
        }}
      />
      <PageWrapper>
        <main className="flex flex-col w-full bg-[#050510]">
          <AIActHeroSection />
          <WhenApplySection />
          <RequirementsSection />
          <HowWeHelpSection />
          <RoadmapSection />
          <ScanSection />
        </main>
      </PageWrapper>
    </>
  );
} 
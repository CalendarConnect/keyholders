import AIActHeroSection from "@/components/ai-act/hero-section";
import InfoSection from "@/components/ai-act/info-section";
import BenefitsSection from "@/components/ai-act/benefits-section";
import StatsSection from "@/components/ai-act/stats-section";
import BlogSection from "@/components/ai-act/blog-section";
import CTASection from "@/components/ai-act/cta-section";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EU AI Act Compliance | Intelligent Automation Solutions",
  description: "Navigate the EU AI Act with confidence. Our AI-powered automation solutions ensure regulatory compliance while accelerating your business growth.",
  openGraph: {
    title: "EU AI Act: Intelligent Automation With Confidence",
    description: "Stay ahead of the EU AI Act regulations while unlocking AI's full potential for your business with Keyholders' compliant automation solutions.",
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
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "EU AI Act, AI regulation, AI compliance, intelligent automation, AI solutions, automation, regulatory compliance, AI governance, EU AI compliance, AI risk management",
  authors: [{ name: "Keyholders Agency" }],
  category: "AI Compliance",
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
            "description": "Navigate the EU AI Act with confidence. We provide compliant AI-powered automation solutions that ensure regulatory adherence while accelerating your business growth.",
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
          <InfoSection />
          <BenefitsSection />
          <StatsSection />
          <BlogSection />
          <CTASection />
        </main>
      </PageWrapper>
    </>
  );
} 
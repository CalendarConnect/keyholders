import HeroSection from "@/components/homepage/hero-section";
import ServicesGrid from "@/components/homepage/services-grid";
import Testimonials from "@/components/homepage/testimonials";
import CTASection from "@/components/homepage/cta-section";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { polar } from "@/lib/polar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyholders Agency | Intelligent Automation Solutions",
  description: "Unlock business growth with RevOps automation, intelligent workflows, and custom integrations that eliminate silos and accelerate performance.",
  openGraph: {
    title: "Keyholders Agency | Intelligent Automation for Business Growth",
    description: "Our bespoke RevOps solutions connect your entire tech stack to eliminate silos, reduce manual tasks, and accelerate your business performance.",
    images: [
      {
        url: "/images/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Keyholders Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://keyholders.agency",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "RevOps, Automation, AI, Workflow Optimization, Business Intelligence, Custom Integrations, EU AI Act, intelligent automation",
};

export default async function Home() {
  const data = await polar.products.list({
    organizationId: process.env.POLAR_ORGANIZATION_ID,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Keyholders Agency",
            "url": "https://keyholders.agency",
            "logo": "https://keyholders.agency/images/logos/logo-dark.webp",
            "description": "RevOps automation solutions that connect your entire tech stack to eliminate silos, reduce manual tasks, and accelerate your business performance.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Stationsplein 26",
              "addressLocality": "Nijmegen",
              "postalCode": "6512 AB",
              "addressCountry": "NL"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "info@keyholders.agency",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://www.linkedin.com/in/cbleeker/"
            ]
          })
        }}
      />
      <PageWrapper>
        <main className="flex flex-col w-full bg-[#050510]">
          <HeroSection />
          <ServicesGrid />
          <Testimonials />
          <CTASection />
        </main>
      </PageWrapper>
    </>
  );
}

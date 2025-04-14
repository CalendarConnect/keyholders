import PageWrapper from "@/components/wrapper/page-wrapper";
import AboutHero from "@/components/about/hero-section";
import OurJourney from "@/components/about/our-journey";
import OurVision from "@/components/about/our-vision";
import CTASection from "@/components/about/cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Keyholders Agency | AI Automation Experts",
  description: "We're a team of AI enthusiasts building custom automations that transform business processes while respecting privacy, security, and human guidance.",
  openGraph: {
    title: "About Keyholders Agency",
    description: "We unlock business growth through intelligent automation that's accessible, secure, and human-guided.",
    images: [
      {
        url: "/images/og/about-us.jpg",
        width: 1200,
        height: 630,
        alt: "About Keyholders Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://keyholders.agency/about",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "about us, Keyholders Agency, AI experts, automation team, company mission, business automation, custom AI solutions, EU AI Act compliance, AI ethics, team members",
  authors: [{ name: "Keyholders Agency" }],
  category: "Company Information",
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Keyholders Agency",
            "description": "We're a team of AI enthusiasts building custom automations that transform business processes while respecting privacy, security, and human guidance.",
            "publisher": {
              "@type": "Organization",
              "name": "Keyholders Agency",
              "logo": {
                "@type": "ImageObject",
                "url": "https://keyholders.agency/images/logos/logo-dark.webp"
              },
              "foundingDate": "2022",
              "foundingLocation": "Nijmegen, Netherlands",
              "description": "Keyholders Agency specializes in building custom AI automations that transform business processes while ensuring compliance with regulations like the EU AI Act.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Stationsplein 26",
                "addressLocality": "Nijmegen",
                "postalCode": "6512 AB",
                "addressCountry": "NL"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@keyholders.agency"
              },
              "sameAs": [
                "https://www.linkedin.com/in/cbleeker/"
              ]
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://keyholders.agency/about"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://keyholders.agency"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "About Us",
                  "item": "https://keyholders.agency/about"
                }
              ]
            }
          })
        }}
      />
      <PageWrapper>
        <main className="bg-[#050510]">
          <AboutHero />
          <OurJourney />
          <OurVision />
          <CTASection />
        </main>
      </PageWrapper>
    </>
  );
} 
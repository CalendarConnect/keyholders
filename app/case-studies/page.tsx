import PageWrapper from "@/components/wrapper/page-wrapper";
import CaseStudiesHero from "@/components/case-studies/hero-section";
import CaseStudiesGrid from "@/components/case-studies/grid-section";
import CTASection from "@/components/about/cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Success Stories | Keyholders Agency",
  description: "Discover how Keyholders Agency has transformed businesses with custom AI automations and intelligent solutions.",
  openGraph: {
    title: "AI Automation Success Stories | Keyholders Agency",
    description: "Real businesses achieving remarkable results with our custom AI solutions and intelligent automations.",
    images: [
      {
        url: "/images/og/case-studies.jpg",
        width: 1200,
        height: 630,
        alt: "Keyholders Agency Case Studies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://keyholders.agency/case-studies",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "case studies, customer success, AI automation, business transformation, ROI, workflow automation, custom GPT, time savings, efficiency, intelligent integration",
  authors: [{ name: "Keyholders Agency" }],
  category: "Success Stories",
};

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Client Success Stories",
            "description": "Discover how businesses have transformed their operations with Keyholders Agency's custom AI automations and intelligent solutions.",
            "publisher": {
              "@type": "Organization",
              "name": "Keyholders Agency",
              "logo": {
                "@type": "ImageObject",
                "url": "https://keyholders.agency/images/logos/logo-dark.webp"
              }
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "url": "https://keyholders.agency/case-studies#kindergarten-ikke",
                  "name": "Kindergarten Ikke"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "url": "https://keyholders.agency/case-studies#sde-consultancy",
                  "name": "SDE Consultancy Cyber Security"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "url": "https://keyholders.agency/case-studies#upbeatles",
                  "name": "Upbeatles PubQuiz"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "url": "https://keyholders.agency/case-studies#fokker",
                  "name": "Fokker V.O.F Constructor"
                }
              ]
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
                  "name": "Case Studies",
                  "item": "https://keyholders.agency/case-studies"
                }
              ]
            }
          })
        }}
      />
      <PageWrapper>
        <main className="bg-[#050510]">
          <CaseStudiesHero />
          <CaseStudiesGrid />
          <CTASection />
        </main>
      </PageWrapper>
    </>
  );
} 
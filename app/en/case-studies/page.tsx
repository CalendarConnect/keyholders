import PageWrapper from "@/components/wrapper/page-wrapper";
import CaseStudiesHero from "@/components/case-studies/hero-section";
import CaseStudiesGrid from "@/components/case-studies/grid-section";
import CTASection from "@/components/about/cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation Success Stories | Keyholders Agency",
  description: "See how other companies are working smarter—not over years, but within days.",
  openGraph: {
    title: "AI Automation That Actually Works | Keyholders Agency",
    description: "See how other companies are working smarter—not over years, but within days. We build GPT solutions that connect to your processes.",
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
    canonical: "https://keyholders.agency/en/case-studies",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "ai automation, success stories, GPT solutions, workflow automation, time savings, custom AI, integration, business intelligence",
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
            "name": "AI Automation That Actually Works",
            "description": "See how other companies are working smarter—not over years, but within days. We build GPT solutions that connect to your processes.",
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
                  "url": "https://keyholders.agency/en/case-studies#kindergarten-ikke",
                  "name": "Kindergarten Ikke"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "url": "https://keyholders.agency/en/case-studies#sde-consultancy",
                  "name": "SDE Consultancy Cyber Security"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "url": "https://keyholders.agency/en/case-studies#upbeatles",
                  "name": "Upbeatles PubQuiz"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "url": "https://keyholders.agency/en/case-studies#fokker",
                  "name": "Fokker V.O.F."
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
                  "item": "https://keyholders.agency/en"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Case Studies",
                  "item": "https://keyholders.agency/en/case-studies"
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
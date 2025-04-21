import PageWrapper from "@/components/wrapper/page-wrapper";
import CaseStudiesHero from "@/components/case-studies/hero-section";
import CaseStudiesGrid from "@/components/case-studies/grid-section";
import CTASection from "@/components/about/cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automatisering Succesverhalen | Keyholders Agency",
  description: "Zie hoe andere bedrijven hun werk slimmer zijn gaan doen — niet over jaren, maar binnen dagen.",
  openGraph: {
    title: "AI-automatisering die echt werkt | Keyholders Agency",
    description: "Zie hoe andere bedrijven hun werk slimmer zijn gaan doen — niet over jaren, maar binnen dagen. We bouwen GPT-oplossingen die aansluiten op jouw processen.",
    images: [
      {
        url: "/images/og/case-studies.jpg",
        width: 1200,
        height: 630,
        alt: "Keyholders Agency Case Studies",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  alternates: {
    canonical: "https://keyholders.agency/nl/case-studies",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "ai-automatisering, succesverhalen, GPT-oplossingen, workflow automatisering, tijdsbesparing, maatwerk AI, integratie, business intelligence",
  authors: [{ name: "Keyholders Agency" }],
  category: "Succesverhalen",
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
            "name": "AI-automatisering die echt werkt",
            "description": "Zie hoe andere bedrijven hun werk slimmer zijn gaan doen — niet over jaren, maar binnen dagen. We bouwen GPT-oplossingen die aansluiten op jouw processen.",
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
                  "url": "https://keyholders.agency/nl/case-studies#kindergarten-ikke",
                  "name": "Kindergarten Ikke"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "url": "https://keyholders.agency/nl/case-studies#sde-consultancy",
                  "name": "SDE Consultancy Cyber Security"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "url": "https://keyholders.agency/nl/case-studies#upbeatles",
                  "name": "Upbeatles PubQuiz"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "url": "https://keyholders.agency/nl/case-studies#fokker",
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
                  "item": "https://keyholders.agency/nl"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Case Studies",
                  "item": "https://keyholders.agency/nl/case-studies"
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
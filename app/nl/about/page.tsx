import PageWrapper from "@/components/wrapper/page-wrapper";
import AboutHero from "@/components/about/hero-section";
import OurJourney from "@/components/about/our-journey";
import OurVision from "@/components/about/our-vision";
import CTASection from "@/components/about/cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over Keyholders Agency | AI Automatisering Experts",
  description: "Wij zijn een team van AI-enthousiastelingen die aangepaste automatiseringen bouwen die bedrijfsprocessen transformeren met respect voor privacy, veiligheid en menselijke begeleiding.",
  openGraph: {
    title: "Over Keyholders Agency",
    description: "Wij ontgrendelen bedrijfsgroei door intelligente automatisering die toegankelijk, veilig en door mensen begeleid wordt.",
    images: [
      {
        url: "/images/og/about-us.jpg",
        width: 1200,
        height: 630,
        alt: "Over Keyholders Agency",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  alternates: {
    canonical: "https://keyholders.agency/nl/about",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "over ons, Keyholders Agency, AI experts, automatiseringsteam, bedrijfsmissie, bedrijfsautomatisering, aangepaste AI-oplossingen, EU AI Act naleving, AI-ethiek, teamleden",
  authors: [{ name: "Keyholders Agency" }],
  category: "Bedrijfsinformatie",
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
            "name": "Over Keyholders Agency",
            "description": "Wij zijn een team van AI-enthousiastelingen die aangepaste automatiseringen bouwen die bedrijfsprocessen transformeren met respect voor privacy, veiligheid en menselijke begeleiding.",
            "publisher": {
              "@type": "Organization",
              "name": "Keyholders Agency",
              "logo": {
                "@type": "ImageObject",
                "url": "https://keyholders.agency/images/logos/logo-dark.webp"
              },
              "foundingDate": "2022",
              "foundingLocation": "Nijmegen, Nederland",
              "description": "Keyholders Agency is gespecialiseerd in het bouwen van aangepaste AI-automatiseringen die bedrijfsprocessen transformeren met naleving van regelgeving zoals de EU AI Act.",
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
              "@id": "https://keyholders.agency/nl/about"
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
                  "name": "Over Ons",
                  "item": "https://keyholders.agency/nl/about"
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
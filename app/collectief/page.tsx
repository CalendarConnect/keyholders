import PageWrapper from "@/components/wrapper/page-wrapper";
import HeroSection from "@/components/collectief/hero-section";
import TeamSection from "@/components/collectief/team-section";
import KeyFormula from "@/components/collectief/key-formula";
import CTASection from "@/components/collectief/cta-section";
import WhySection from "@/components/collectief/why-section";
import KeyholderQualities from "@/components/collectief/keyholder-qualities";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Het Keyholders Collectief | Keyholders Agency",
  description: "Ontgrendel AI‑impact met één Collectief en alle Keys. Het Keyholders Collectief bestaat uit senior‑experts die samen de master Key vormen voor duurzame AI‑groei.",
  openGraph: {
    title: "Het Keyholders Collectief | Keyholders Agency",
    description: "Ontgrendel AI‑impact met één Collectief en alle Keys. Het Keyholders Collectief bestaat uit senior‑experts die samen de master Key vormen voor duurzame AI‑groei.",
    images: [
      {
        url: "/images/og/collectief.jpg",
        width: 1200,
        height: 630,
        alt: "Het Keyholders Collectief",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  alternates: {
    canonical: "https://keyholders.agency/collectief",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "Keyholders Collectief, AI-impact, strategie, automatisering, adoptie, compliance, security, senior-experts, AI-groei",
};

export default function CollectiefPage() {
  return (
    <PageWrapper>
      <HeroSection />
      <KeyholderQualities />
      <WhySection />
      <TeamSection />
      <KeyFormula />
      <CTASection />
    </PageWrapper>
  );
} 
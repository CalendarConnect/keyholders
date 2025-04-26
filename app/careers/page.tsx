import PageWrapper from "@/components/wrapper/page-wrapper";
import CareersHero from "@/components/careers/hero-section";
import JobListings from "@/components/careers/job-listings";
import CareersCTA from "@/components/careers/cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Keyholders Agency | Join Our Team",
  description: "Explore career opportunities at Keyholders Agency. Join our team of AI automation specialists and help shape the future of business efficiency.",
  openGraph: {
    title: "Join the Keyholders Team | AI Automation Careers",
    description: "Be part of a team that's revolutionizing business automation with AI. Explore our current openings and apply today.",
    images: [
      {
        url: "/images/og/careers.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at Keyholders Agency",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  alternates: {
    canonical: "https://keyholders.agency/careers",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "careers, jobs, Keyholders Agency, AI jobs, automation specialist, join our team, job openings, hiring, AI Solutions Architect, Automation Enablement Consultant, remote work, Netherlands, EU AI Act",
  authors: [{ name: "Keyholders Agency" }],
  category: "Vacatures",
};

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": "Become a Keyholder",
            "description": "Join our team of AI solutions architects and help shape the future of business efficiency. We're looking for talented individuals passionate about AI solutions that respect privacy, security, and human guidance.",
            "datePosted": new Date().toISOString().split('T')[0],
            "hiringOrganization": {
              "@type": "Organization",
              "name": "Keyholders Agency",
              "sameAs": "https://keyholders.agency",
              "logo": "https://keyholders.agency/images/logos/logo-dark.webp"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Stationsplein 26",
                "addressLocality": "Nijmegen",
                "postalCode": "6512 AB",
                "addressCountry": "NL"
              }
            },
            "employmentType": ["FULL_TIME", "REMOTE"],
            "baseSalary": {
              "@type": "MonetaryAmount",
              "currency": "EUR",
              "value": {
                "@type": "QuantitativeValue",
                "minValue": 50000,
                "maxValue": 120000,
                "unitText": "YEAR"
              }
            },
            "skills": "AI, Machine Learning, Process Automation, EU AI Act, API Integration, JavaScript, TypeScript, Python",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://keyholders.agency/careers"
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
                  "name": "Become a Keyholder",
                  "item": "https://keyholders.agency/careers"
                }
              ]
            }
          })
        }}
      />
      <PageWrapper>
        <main className="bg-[#050510]">
          <CareersHero />
          <section id="openings">
            <JobListings />
          </section>
          <CareersCTA />
        </main>
      </PageWrapper>
    </>
  );
} 
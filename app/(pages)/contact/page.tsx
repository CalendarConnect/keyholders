// This is a server component
import dynamic from 'next/dynamic';

// Import the client component dynamically
const ContactForm = dynamic(() => import("@/components/contact/contact-form"), {
  ssr: true
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Meet with an Expert | Keyholders Agency",
            "description": "Transform your business with intelligent automation. Connect with our experts to discuss custom solutions for your specific needs.",
            "url": "https://keyholders.agency/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Keyholders Agency",
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
              "description": "Keyholders Agency helps businesses transform their operations through intelligent automation. Our custom AI solutions eliminate manual tasks, connect tech stacks, and accelerate growth with solutions that respect privacy and security."
            },
            "offers": {
              "@type": "Offer",
              "name": "Free Consultation",
              "description": "Book a free consultation with our automation specialists to explore how we can transform your business processes."
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
                  "name": "Contact",
                  "item": "https://keyholders.agency/contact"
                }
              ]
            }
          })
        }}
      />
      <ContactForm />
    </>
  );
} 
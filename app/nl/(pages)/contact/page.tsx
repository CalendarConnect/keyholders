// This is a server component
import dynamic from 'next/dynamic';

// Import the client component dynamically
const ContactForm = dynamic(() => import("@/components/contact/contact-form-i18n"), {
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
            "name": "Overleg met een Expert | Keyholders Agency",
            "description": "Transformeer je bedrijf met intelligente automatisering. Verbind met onze experts om aangepaste oplossingen voor jouw specifieke behoeften te bespreken.",
            "url": "https://keyholders.agency/nl/contact",
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
              "description": "Keyholders Agency helpt bedrijven hun activiteiten te transformeren door intelligente automatisering. Onze op maat gemaakte AI-oplossingen elimineren handmatige taken, verbinden technologiestacks en versnellen groei met oplossingen die privacy en veiligheid respecteren."
            },
            "offers": {
              "@type": "Offer",
              "name": "Gratis Consultatie",
              "description": "Boek een gratis consultatie met onze automatiseringsspecialisten om te ontdekken hoe we je bedrijfsprocessen kunnen transformeren."
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
                  "name": "Contact",
                  "item": "https://keyholders.agency/nl/contact"
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
// This is a server component
import PageWrapper from "@/components/wrapper/page-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Keyholders Agency",
  description: "Read our terms of service for using Keyholders Agency's automation solutions and services.",
  openGraph: {
    title: "Terms of Service | Keyholders Agency",
    description: "Legal terms governing the use of Keyholders Agency's intelligent automation services and solutions.",
    images: [
      {
        url: "/images/og/legal.jpg",
        width: 1200,
        height: 630,
        alt: "Keyholders Agency Terms of Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://keyholders.agency/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "terms of service, legal terms, conditions, keyholders agency, automation services, service agreement",
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Service",
            "description": "Terms and conditions for using Keyholders Agency's intelligent automation services.",
            "publisher": {
              "@type": "Organization",
              "name": "Keyholders Agency",
              "logo": {
                "@type": "ImageObject",
                "url": "https://keyholders.agency/images/logos/logo-dark.webp"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://keyholders.agency/terms"
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
                  "name": "Terms of Service",
                  "item": "https://keyholders.agency/terms"
                }
              ]
            }
          })
        }}
      />
      <PageWrapper>
        <main className="bg-[#050510] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
              <div className="bg-purple-900/10 border border-purple-900/20 rounded-xl p-6 md:p-8 space-y-8 text-gray-300">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                  <p className="mb-4">These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of Keyholders Agency&apos;s website, services, and automation solutions (collectively, the &ldquo;Services&rdquo;). By accessing or using our Services, you agree to be bound by these Terms.</p>
                  <p>These Terms constitute a legally binding agreement between you and Keyholders Agency (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). If you do not agree to these Terms, please do not access or use our Services.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Services</h2>
                  <p className="mb-4">Keyholders Agency provides intelligent automation solutions, including but not limited to RevOps automation, workflow optimization, and custom integrations. Our Services may include AI-powered tools that assist in business automation and process optimization.</p>
                  <p>We reserve the right to modify, suspend, or discontinue any part of our Services at any time without prior notice.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. Account Registration</h2>
                  <p className="mb-4">Some of our Services may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                  <p className="mb-4">You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
                  <p>We reserve the right to suspend or terminate your account if any information provided proves to be inaccurate, not current, or incomplete.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property Rights</h2>
                  <p className="mb-4">All content, features, and functionality of our Services, including but not limited to text, graphics, logos, button icons, images, audio clips, data compilations, and software, are the property of Keyholders Agency or our licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
                  <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services without our prior written consent.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. User Content</h2>
                  <p className="mb-4">You retain ownership of any content you submit, post, or display on or through our Services ("User Content"). By providing User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such User Content in connection with providing and improving our Services.</p>
                  <p>You represent and warrant that you own or have the necessary rights to your User Content and that the User Content does not infringe upon the rights of any third party.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. AI and Automation Services</h2>
                  <p className="mb-4">Our Services may utilize artificial intelligence and machine learning technologies. You acknowledge that AI systems may not be perfect and may produce unexpected results. We strive to ensure our AI-powered solutions comply with relevant regulations, including the EU AI Act where applicable.</p>
                  <p className="mb-4">You agree to use our AI and automation services responsibly and in compliance with applicable laws and regulations.</p>
                  <p>We reserve the right to monitor the use of our AI services to ensure compliance with these Terms and applicable laws.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Payment Terms</h2>
                  <p className="mb-4">Certain Services may require payment. By subscribing to a paid Service, you agree to pay all fees associated with the Service.</p>
                  <p className="mb-4">We use secure third-party payment processors to handle transactions. You agree to provide accurate and complete payment information and authorize us to charge your payment method for the Services.</p>
                  <p>All fees are exclusive of taxes, which may be added to the final charge.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Termination</h2>
                  <p className="mb-4">We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including but not limited to a breach of these Terms.</p>
                  <p>Upon termination, your right to use the Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive termination.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
                  <p className="mb-4">In no event shall Keyholders Agency, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.</p>
                  <p>Our liability is limited to the maximum extent permitted by law.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">10. Governing Law</h2>
                  <p className="mb-4">These Terms shall be governed by and construed in accordance with the laws of the Netherlands, without regard to its conflict of law provisions.</p>
                  <p>Any legal suit, action, or proceeding arising out of or related to these Terms or the Services shall be instituted exclusively in the courts of the Netherlands.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to Terms</h2>
                  <p className="mb-4">We reserve the right to modify these Terms at any time. We will provide notice of any significant changes through our Services or by other means.</p>
                  <p>Your continued use of the Services after such modifications will constitute your acknowledgment of the modified Terms and agreement to abide and be bound by them.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Us</h2>
                  <p>If you have any questions about these Terms, please contact us at <a href="mailto:info@keyholders.agency" className="text-purple-400 hover:text-purple-300">info@keyholders.agency</a>.</p>
                </section>

                <section className="pt-4 border-t border-purple-900/20">
                  <p className="text-sm text-gray-400">Last updated: April 2025</p>
                </section>
              </div>
            </div>
          </div>
        </main>
      </PageWrapper>
    </>
  );
} 
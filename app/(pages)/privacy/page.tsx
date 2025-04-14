// This is a server component
import PageWrapper from "@/components/wrapper/page-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Keyholders Agency",
  description: "Learn how Keyholders Agency collects, uses, and protects your personal information in compliance with data protection regulations.",
  openGraph: {
    title: "Privacy Policy | Keyholders Agency",
    description: "Our commitment to protecting your privacy while delivering intelligent automation solutions.",
    images: [
      {
        url: "/images/og/legal.jpg",
        width: 1200,
        height: 630,
        alt: "Keyholders Agency Privacy Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://keyholders.agency/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "privacy policy, data protection, GDPR, personal data, keyholders agency, data privacy, information security",
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "description": "How Keyholders Agency collects, uses, and protects your personal information.",
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
              "@id": "https://keyholders.agency/privacy"
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
                  "name": "Privacy Policy",
                  "item": "https://keyholders.agency/privacy"
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
              <div className="bg-purple-900/10 border border-purple-900/20 rounded-xl p-6 md:p-8 space-y-8 text-gray-300">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                  <p className="mb-4">At Keyholders Agency ("we," "us," or "our"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
                  <p>We adhere to applicable data protection laws, including the General Data Protection Regulation (GDPR) in the European Union.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                  <p className="mb-4">We may collect the following types of information:</p>
                  <h3 className="text-xl font-semibold text-white mb-2">Personal Data</h3>
                  <ul className="list-disc pl-5 mb-4 space-y-2">
                    <li>Contact information (name, email address, phone number, company name)</li>
                    <li>Account credentials (username, password)</li>
                    <li>Profile information (job title, professional background)</li>
                    <li>Payment information (processed through secure third-party payment processors)</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">Usage Data</h3>
                  <ul className="list-disc pl-5 mb-4 space-y-2">
                    <li>IP address and browser information</li>
                    <li>Pages visited and features used</li>
                    <li>Time spent on the website and interaction patterns</li>
                    <li>Device information (type, operating system, unique identifiers)</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">Business Data</h3>
                  <p>When using our automation and AI services, we may process business data that you provide to us for the purpose of integrating systems, automating workflows, or analyzing processes.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. How We Collect Information</h2>
                  <p className="mb-4">We collect information through the following methods:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Direct interactions (when you contact us, create an account, or subscribe to services)</li>
                    <li>Automated technologies (cookies, server logs, web beacons)</li>
                    <li>Third-party sources (business partners, service providers, publicly available sources)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. How We Use Your Information</h2>
                  <p className="mb-4">We use your information for the following purposes:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>To provide and maintain our services</li>
                    <li>To process and complete transactions</li>
                    <li>To improve and personalize user experience</li>
                    <li>To communicate with you about services, updates, and support</li>
                    <li>To comply with legal obligations</li>
                    <li>To detect, prevent, and address technical issues</li>
                    <li>To analyze usage patterns and optimize our services</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. AI and Automation Data Processing</h2>
                  <p className="mb-4">Our Services may utilize artificial intelligence and automation technologies. When processing data through our AI-powered solutions:</p>
                  <ul className="list-disc pl-5 mb-4 space-y-2">
                    <li>We process data in accordance with our data processing agreements and applicable laws</li>
                    <li>Our AI systems are designed with privacy-by-design principles</li>
                    <li>We implement appropriate security measures to protect data processed by our AI systems</li>
                    <li>We are committed to responsible AI use in compliance with emerging regulations, including the EU AI Act</li>
                  </ul>
                  <p>We maintain transparency about how our AI systems process data and make decisions.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Data Sharing and Disclosure</h2>
                  <p className="mb-4">We may share your information with:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Service providers who perform services on our behalf</li>
                    <li>Business partners with whom we jointly offer products or services</li>
                    <li>Affiliates within our corporate family</li>
                    <li>Legal authorities when required by law</li>
                    <li>Third parties in connection with a business transaction (e.g., merger, acquisition)</li>
                  </ul>
                  <p className="mt-4">We do not sell, rent, or trade your personal information to third parties for their marketing purposes without your explicit consent.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Data Security</h2>
                  <p className="mb-4">We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Encryption of sensitive data</li>
                    <li>Regular security assessments</li>
                    <li>Access controls and authentication procedures</li>
                    <li>Data backup and recovery processes</li>
                    <li>Security awareness training for our staff</li>
                  </ul>
                  <p className="mt-4">However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security of your information.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Your Data Protection Rights</h2>
                  <p className="mb-4">Under applicable data protection laws, you may have the following rights:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span className="font-medium">Access:</span> Request information about the personal data we hold about you</li>
                    <li><span className="font-medium">Rectification:</span> Request correction of inaccurate or incomplete information</li>
                    <li><span className="font-medium">Erasure:</span> Request deletion of your personal data under certain circumstances</li>
                    <li><span className="font-medium">Restriction:</span> Request limitation of processing of your personal data</li>
                    <li><span className="font-medium">Data Portability:</span> Receive your personal data in a structured, machine-readable format</li>
                    <li><span className="font-medium">Objection:</span> Object to processing of your personal data in certain situations</li>
                    <li><span className="font-medium">Withdrawal of Consent:</span> Withdraw consent where processing is based on consent</li>
                  </ul>
                  <p className="mt-4">To exercise these rights, please contact us using the details provided in the &ldquo;Contact Us&rdquo; section.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">9. Cookies and Tracking Technologies</h2>
                  <p className="mb-4">We use cookies and similar tracking technologies to enhance your experience on our website. For detailed information about our use of cookies, please see our <a href="/cookies" className="text-purple-400 hover:text-purple-300">Cookie Policy</a>.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">10. International Data Transfers</h2>
                  <p className="mb-4">Your information may be transferred to, and processed in, countries other than the one in which you reside. These countries may have data protection laws that differ from those in your country.</p>
                  <p>When we transfer your information internationally, we implement appropriate safeguards in accordance with applicable data protection laws to ensure that your information receives adequate protection.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">11. Data Retention</h2>
                  <p className="mb-4">We retain your personal information for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
                  <p>To determine the appropriate retention period, we consider the amount, nature, and sensitivity of the data, the potential risk of harm from unauthorized use or disclosure, the purposes for which we process the data, and applicable legal requirements.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">12. Children's Privacy</h2>
                  <p>Our Services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we learn that we have collected personal information from a child under 16, we will take steps to delete such information promptly.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">13. Changes to This Privacy Policy</h2>
                  <p className="mb-4">We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &ldquo;Last Updated&rdquo; date.</p>
                  <p>We encourage you to review this Privacy Policy periodically for any changes.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">14. Contact Us</h2>
                  <p className="mb-4">If you have any questions about this Privacy Policy, or if you would like to exercise your data protection rights, please contact us at:</p>
                  <p className="mb-2">Email: <a href="mailto:info@keyholders.agency" className="text-purple-400 hover:text-purple-300">info@keyholders.agency</a></p>
                  <p className="mb-2">Address: Stationsplein 26, 6512 AB, Nijmegen, The Netherlands</p>
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
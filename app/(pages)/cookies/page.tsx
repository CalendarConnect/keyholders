// This is a server component
import PageWrapper from "@/components/wrapper/page-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Keyholders Agency",
  description: "Learn how Keyholders Agency uses cookies and similar technologies to enhance your browsing experience.",
  openGraph: {
    title: "Cookie Policy | Keyholders Agency",
    description: "Information about the cookies and tracking technologies used on the Keyholders Agency website.",
    images: [
      {
        url: "/images/og/legal.jpg",
        width: 1200,
        height: 630,
        alt: "Keyholders Agency Cookie Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://keyholders.agency/cookies",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "cookie policy, cookies, tracking technologies, web beacons, keyholders agency, browser cookies, cookie consent",
};

export default function CookiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cookie Policy",
            "description": "Information about the cookies and tracking technologies used on the Keyholders Agency website.",
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
              "@id": "https://keyholders.agency/cookies"
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
                  "name": "Cookie Policy",
                  "item": "https://keyholders.agency/cookies"
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Cookie Policy</h1>
              <div className="bg-purple-900/10 border border-purple-900/20 rounded-xl p-6 md:p-8 space-y-8 text-gray-300">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                  <p className="mb-4">This Cookie Policy explains how Keyholders Agency (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar technologies on our website to enhance your browsing experience, analyze site traffic, and personalize content.</p>
                  <p>By continuing to use our website, you consent to our use of cookies in accordance with this Cookie Policy. You can manage your cookie preferences as described in this policy.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. What Are Cookies?</h2>
                  <p className="mb-4">Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit websites. They allow websites to recognize your device and remember information about your visit, such as your preferences and settings.</p>
                  <p>Cookies are widely used to make websites work more efficiently, enhance user experience, and provide website owners with information about how users interact with their site.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. Types of Cookies We Use</h2>
                  <p className="mb-4">We use the following types of cookies on our website:</p>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">Essential Cookies</h3>
                  <p className="mb-4">These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies.</p>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">Performance and Analytics Cookies</h3>
                  <p className="mb-4">These cookies collect information about how visitors use our website, such as which pages they visit most often and if they receive error messages. The information is used to improve how the website works. All information collected is aggregated and anonymous.</p>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">Functionality Cookies</h3>
                  <p className="mb-4">These cookies allow the website to remember choices you make (such as your language preference or region) and provide enhanced, personalized features. They may be set by us or by third-party providers whose services we have added to our pages.</p>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">Targeting and Advertising Cookies</h3>
                  <p>These cookies record your visit to our website, the pages you have visited, and the links you have followed. We may use this information to make our website and the advertising displayed on it more relevant to your interests. We may also share this information with third parties for this purpose.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Specific Cookies We Use</h2>
                  <p className="mb-4">Here are examples of the cookies we use on our website:</p>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-purple-900/20 border border-purple-900/30 rounded-lg mt-2">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-white border-b border-purple-900/30">Cookie Name</th>
                          <th className="px-4 py-3 text-left text-white border-b border-purple-900/30">Purpose</th>
                          <th className="px-4 py-3 text-left text-white border-b border-purple-900/30">Duration</th>
                          <th className="px-4 py-3 text-left text-white border-b border-purple-900/30">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-3 border-b border-purple-900/30">_ga</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">Used by Google Analytics to distinguish users</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">2 years</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">Analytics</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 border-b border-purple-900/30">_gid</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">Used by Google Analytics to distinguish users</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">24 hours</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">Analytics</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 border-b border-purple-900/30">_gat</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">Used by Google Analytics to throttle request rate</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">1 minute</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">Analytics</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 border-b border-purple-900/30">clerk_session</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">Used for user authentication</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">Session</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">Essential</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 border-b border-purple-900/30">cookie_consent</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">Stores your cookie consent preferences</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">1 year</td>
                          <td className="px-4 py-3 border-b border-purple-900/30">Essential</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">theme_preference</td>
                          <td className="px-4 py-3">Remembers your dark/light mode preference</td>
                          <td className="px-4 py-3">1 year</td>
                          <td className="px-4 py-3">Functionality</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Third-Party Cookies</h2>
                  <p className="mb-4">Our website may use third-party services that set their own cookies. These include:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Google Analytics (for website analytics)</li>
                    <li>Clerk (for authentication)</li>
                    <li>Polar.sh (for subscription management)</li>
                    <li>Social media platforms (when you use social sharing features)</li>
                  </ul>
                  <p className="mt-4">These third parties have their own privacy policies and cookie practices. We recommend reviewing their privacy policies to understand how they use cookies.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Other Tracking Technologies</h2>
                  <p className="mb-4">In addition to cookies, we may use other similar technologies, such as:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span className="font-medium">Web Beacons:</span> Small graphic files placed on web pages or in emails that allow us to determine whether you have performed a specific action.</li>
                    <li><span className="font-medium">Local Storage:</span> A feature of your browser that allows websites to store data on your device for longer periods and with larger storage capacity than cookies.</li>
                    <li><span className="font-medium">Pixels:</span> Tiny images embedded in web pages or emails that collect information about your device and visits.</li>
                  </ul>
                  <p className="mt-4">These technologies serve similar purposes as cookies and are subject to the same controls and preferences.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Managing Your Cookie Preferences</h2>
                  <p className="mb-4">You can manage your cookie preferences in several ways:</p>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">Browser Settings</h3>
                  <p className="mb-4">Most web browsers allow you to control cookies through their settings. You can typically find these settings in the &quot;Options,&quot; &quot;Preferences,&quot; or &quot;Settings&quot; menu of your browser. The links below provide information on how to manage cookies in common browsers:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">Google Chrome</a></li>
                    <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">Mozilla Firefox</a></li>
                    <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">Microsoft Edge</a></li>
                    <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">Safari</a></li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">Cookie Consent Tools</h3>
                  <p className="mb-4">Our website displays a cookie consent banner when you first visit. You can use this to accept or decline non-essential cookies.</p>
                  
                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">Third-Party Opt-Out Tools</h3>
                  <p>You can opt out of third-party analytics services like Google Analytics by using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">Google Analytics Opt-out Browser Add-on</a>.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Impact of Disabling Cookies</h2>
                  <p className="mb-4">If you disable or decline cookies, some features of our website may not function properly. Essential cookies are necessary for the core functionality of the website, while non-essential cookies enhance your browsing experience and help us improve our services.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">9. Changes to This Cookie Policy</h2>
                  <p className="mb-4">We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page and updating the &quot;Last Updated&quot; date.</p>
                  <p>We encourage you to review this Cookie Policy periodically for any changes.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Us</h2>
                  <p className="mb-4">If you have any questions about our Cookie Policy, please contact us at:</p>
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
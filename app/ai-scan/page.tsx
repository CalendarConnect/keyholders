import PageWrapper from "@/components/wrapper/page-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation Scan | Keyholders Agency",
  description: "Take our AI Automation Scan to discover how intelligent automation can transform your business processes and accelerate growth.",
  openGraph: {
    title: "AI Automation Scan | Keyholders Agency",
    description: "Discover how intelligent automation can transform your business processes and accelerate growth with our comprehensive AI scan.",
    images: [
      {
        url: "/images/og/ai-scan.jpg",
        width: 1200,
        height: 630,
        alt: "Keyholders Agency AI Scan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://keyholders.agency/ai-scan",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "AI scan, automation assessment, business process automation, workflow analysis, AI implementation, RevOps, intelligent automation",
  authors: [{ name: "Keyholders Agency" }],
  category: "Business Services",
};

export default function AIScanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AI Automation Scan",
            "description": "Take our AI Automation Scan to discover how intelligent automation can transform your business processes and accelerate growth.",
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
              "@id": "https://keyholders.agency/ai-scan"
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
                  "name": "AI Scan",
                  "item": "https://keyholders.agency/ai-scan"
                }
              ]
            }
          })
        }}
      />
      <PageWrapper>
        <main className="bg-[#050510]">
          <div className="relative pt-24 pb-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
              {/* Radial gradient background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,76,255,0.15),transparent_80%)]"></div>
              
              {/* Grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.07)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
              
              {/* Animated gradients */}
              <div className="absolute top-1/4 -right-64 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse-slow"></div>
              <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-slow delay-1000"></div>
            </div>
            
            {/* Top gradient line */}
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
            
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                  <div className="inline-block py-1.5 px-6 rounded-full border border-purple-500/20 bg-purple-500/5 text-sm text-purple-300 mb-6">
                    Free Automation Assessment
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                    AI Automation Scan
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                    Discover how intelligent automation can transform your business processes, eliminate redundancies, and accelerate growth.
                  </p>
                </div>
                
                {/* Form Container */}
                <div className="relative">
                  {/* Decorative border glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-30"></div>
                  
                  {/* Form content */}
                  <div className="relative bg-[#0c0c18] border border-white/10 rounded-xl p-6 md:p-8 shadow-xl overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-blue-600/5 to-transparent"></div>
                    
                    {/* Background glow spots */}
                    <div className="absolute left-0 top-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2"></div>
                    
                    {/* Notion Form Embed */}
                    <div className="relative z-10">
                      <iframe 
                        src="https://astonishing-moonflower-5d7.notion.site/1d731f3c9d2e8158a614d906aedd7573?pvs=105" 
                        className="w-full min-h-[800px] md:min-h-[700px] border-0 rounded-lg"
                        title="Keyholders AI Automation Scan"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Benefits Section */}
                <div className="mt-16">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                    What You'll Discover
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-purple-500/20 transition-colors group relative overflow-hidden">
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity"></div>
                      
                      <div className="relative z-10">
                        <div className="text-xl font-bold text-white mb-2">Automation Opportunities</div>
                        <div className="text-gray-400">Identify key processes ready for intelligent automation</div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-blue-500/20 transition-colors group relative overflow-hidden">
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity"></div>
                      
                      <div className="relative z-10">
                        <div className="text-xl font-bold text-white mb-2">Cost Analysis</div>
                        <div className="text-gray-400">Quantify the impact of automation on your bottom line</div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-indigo-500/20 transition-colors group relative overflow-hidden">
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity"></div>
                      
                      <div className="relative z-10">
                        <div className="text-xl font-bold text-white mb-2">Implementation Roadmap</div>
                        <div className="text-gray-400">Get a clear path to transforming your business operations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PageWrapper>
    </>
  );
} 
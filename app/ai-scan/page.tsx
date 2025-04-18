import { Metadata } from "next";
import PageWrapper from "@/components/wrapper/page-wrapper";

export const metadata: Metadata = {
  title: "AI Automation Scan",
  description: "Get a free assessment of how AI can automate your operations",
  openGraph: {
    title: "AI Automation Scan | Agency AI Scan",
    description: "Get a free assessment of how AI can automate your operations",
    url: "https://agency-starter-kit.vercel.app/ai-scan",
    siteName: "Agency Starter Kit",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@vercel",
    title: "AI Automation Scan | Agency AI Scan",
    description: "Get a free assessment of how AI can automate your operations",
  },
};

export default function AIScanPage() {
  return (
    <PageWrapper>
      <main className="relative flex flex-col items-center justify-center overflow-hidden py-6 sm:py-12">
        <div className="absolute top-0 h-[20rem] w-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400" />

        <div className="pointer-events-none absolute inset-0 h-screen w-screen bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,transparent,white,white,transparent)]" />

        <div className="container relative justify-center sm:mt-20 sm:px-0 lg:mt-32">
          <div className="mx-auto grid max-w-screen-lg px-5">
            <h1 className="text-center text-4xl font-semibold text-black">
              AI Automation Scan
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-center text-base text-gray-600 sm:text-lg">
              Get a free assessment of how AI can automate your operations and
              boost your team&apos;s efficiency
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-screen-lg">
            <iframe
              src="https://embednpages.com/embed?url=https://astonishing-moonflower-5d7.notion.site/1d731f3c9d2e8158a614d906aedd7573"
              style={{
                width: "100%",
                height: "800px",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
              }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
} 
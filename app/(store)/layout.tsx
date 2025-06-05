import { Metadata } from "next";
import PageWrapper from "@/components/wrapper/page-wrapper";

export const metadata: Metadata = {
  title: "Keyholders Templates | AI Workflow Templates & Automations",
  description: "Pre-built templates for n8n and other automation tools to jumpstart your business workflows. Skip the setup and dive straight into productivity.",
  openGraph: {
    title: "Keyholders Templates | AI Workflow Templates & Automations",
    description: "Pre-built templates for n8n and other automation tools to jumpstart your business workflows.",
    images: [
      {
        url: "/images/og/templates.jpg",
        width: 1200,
        height: 630,
        alt: "Keyholders Templates",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  alternates: {
    canonical: "https://keyholders.agency/winkel",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "n8n templates, workflow templates, automation templates, ai workflows, business automation, ready-made workflows",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <main className="min-h-screen flex flex-col bg-[#050510]">
        {children}
      </main>
    </PageWrapper>
  );
} 
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation Scan | Keyholders Agency",
  description: "Get a free assessment of how AI can transform your business operations and unlock new efficiency gains",
  openGraph: {
    title: "AI Automation Scan | Keyholders Agency",
    description: "Get a free assessment of how AI can transform your business operations and unlock new efficiency gains",
    url: "https://keyholders.agency/ai-scan",
    siteName: "Keyholders Agency",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@keyholders",
    title: "AI Automation Scan | Keyholders Agency",
    description: "Get a free assessment of how AI can transform your business operations and unlock new efficiency gains",
  },
};

export default function AIScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
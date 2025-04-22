import Provider from "@/app/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import CookieConsent from "@/components/cookie/cookie-consent";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { I18nProvider } from "./i18n/context";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nextstarter.xyz/"),
  title: {
    default: 'Keyholders Agency',
    template: `%s | Keyholders Agency`
  },
  description:
    "Unlock Business Growth Through Intelligent Automation with Keyholders Agency",
  openGraph: {
    description:
      "Unlock Business Growth Through Intelligent Automation with Keyholders Agency",
    images: [
      "https://dwdwn8b5ye.ufs.sh/f/MD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c",
    ],
    url: "https://keyholders.agency/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keyholders Agency",
    description:
      "Unlock Business Growth Through Intelligent Automation",
    siteId: "",
    creator: "@christianbleeker",
    creatorId: "",
    images: [
      "https://dwdwn8b5ye.ufs.sh/f/MD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c",
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/favicon.ico',
    other: {
      rel: 'apple-touch-icon',
      url: '/favicon/favicon.ico',
    },
  },
};

// Fallback publishable key for development and deployment
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_placeholder-key-for-development-mode";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The forced locale is now handled in app/nl/layout.tsx for Dutch pages
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="nl" suppressHydrationWarning>
        <body className={GeistSans.className}>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <I18nProvider>
                {children}
                <Toaster />
                <CookieConsent />
              </I18nProvider>
            </ThemeProvider>
          </Provider>
          <Analytics />
          <GoogleAnalytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

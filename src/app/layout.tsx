import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Forge - Build The Body You've Always Wanted",
    template: "%s | Forge",
  },
  description:
    "Ready to transform? Forge combines AI coaching with expert guidance to help you build strength, confidence, and the body you've always wanted. Start today.",
  keywords: [
    "AI personal trainer",
    "custom workout plans",
    "AI fitness coach",
    "virtual personal trainer",
    "affordable fitness coaching",
    "24/7 workout guidance",
    "personalized exercise plans",
  ],
  authors: [{ name: "Forge", url: "https://forgetrainer.ai" }],
  creator: "10D Labs, LLC",
  metadataBase: new URL("https://forgetrainer.ai"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://forgetrainer.ai",
    siteName: "Forge",
    title: "Forge - Build The Body You've Always Wanted",
    description:
      "Ready to transform? Forge combines AI coaching with expert guidance to help you build strength, confidence, and the body you've always wanted.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Forge - AI Personal Trainer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge - Build The Body You've Always Wanted",
    description:
      "Ready to transform? Forge combines AI coaching with expert guidance to help you build strength, confidence, and the body you've always wanted.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Load Barlow fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Header />
            <main>{children}</main>
            <Footer />
            <CookieConsent />
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

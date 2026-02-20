import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsentWrapper from "@/components/CookieConsentWrapper";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Forge - AI Personal Trainer App",
    template: "%s | Forge AI Trainer",
  },
  description:
    "Your AI personal trainer for custom workout plans, real-time coaching, and 24/7 fitness guidance. 4 trainer personalities. Fraction of the cost. Try Forge free.",
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
    title: "Forge - AI Personal Trainer App | Custom Workouts & 24/7 Coaching",
    description:
      "Your AI personal trainer for custom workout plans, real-time coaching, and 24/7 fitness guidance. 4 trainer personalities. Fraction of the cost. Try Forge free.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge - AI Personal Trainer App | Custom Workouts & 24/7 Coaching",
    description:
      "Your AI personal trainer for custom workout plans, real-time coaching, and 24/7 fitness guidance. 4 trainer personalities. Fraction of the cost. Try Forge free.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className={barlow.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Header />
            <main>{children}</main>
            <Footer />
            <CookieConsentWrapper />
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

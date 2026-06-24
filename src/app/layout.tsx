import type { Metadata } from "next";
import Script from "next/script";
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

const GOOGLE_ADS_ID = "AW-18087937976";

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
    default: "Forge Trainer: Gym & Strength Workout App | Under $5/mo",
    template: "%s | Forge Trainer",
  },
  description:
    "Stop wandering the gym without a plan. Forge builds custom workouts for your goals, schedule, and injuries. 4 AI coaches. Under $5/mo. Free 7-day trial.",
  keywords: [
    "strength training app",
    "gym workout plans",
    "custom workout plans",
    "workout planner app",
    "personal trainer app",
    "AI fitness coach",
    "affordable fitness coaching",
  ],
  authors: [{ name: "Forge", url: "https://forgetrainer.ai" }],
  creator: "10D Labs, LLC",
  metadataBase: new URL("https://forgetrainer.ai"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://forgetrainer.ai",
    siteName: "Forge",
    title: "Forge Trainer: Gym & Strength Workout App | Under $5/mo",
    description:
      "Stop wandering the gym without a plan. Forge builds custom workouts for your goals, schedule, and injuries. 4 AI coaches. Under $5/mo. Free 7-day trial.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge Trainer: Gym & Strength Workout App | Under $5/mo",
    description:
      "Stop wandering the gym without a plan. Forge builds custom workouts for your goals, schedule, and injuries. 4 AI coaches. Under $5/mo. Free 7-day trial.",
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
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
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

        {/* Google Ads tag (gtag.js) with Consent Mode v2 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Consent Mode v2: default all signals to denied until user accepts
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'wait_for_update': 500
            });

            // Restore consent from prior visit before firing page_view
            try {
              var savedConsent = localStorage.getItem('cookie-consent');
              if (savedConsent === 'accepted') {
                gtag('consent', 'update', {
                  'ad_storage': 'granted',
                  'ad_user_data': 'granted',
                  'ad_personalization': 'granted',
                  'analytics_storage': 'granted',
                  'functionality_storage': 'granted',
                  'personalization_storage': 'granted'
                });
              }
            } catch (e) {}

            // Keep attribution working even when ad_storage is denied
            gtag('set', 'url_passthrough', true);
            gtag('set', 'ads_data_redaction', true);

            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}

"use client";

import dynamic from "next/dynamic";

// Lazy load CookieConsent on client side only to prevent it from affecting LCP
const CookieConsent = dynamic(() => import("./CookieConsent"), {
  ssr: false,
});

export default function CookieConsentWrapper() {
  return <CookieConsent />;
}

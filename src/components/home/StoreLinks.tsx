"use client";

import Image from "next/image";
import { trackAppStoreClick } from "@/lib/tracking";
import { APP_NAME } from "@/config/app";

export default function StoreLinks({ placement = "hero" }: { placement?: string }) {
  return <div className="store-links">
    <a href={`https://apps.apple.com/us/app/forge-trainer-gym-strength/id6758403402?pt=128493451&ct=${encodeURIComponent(placement)}&mt=8`} onClick={trackAppStoreClick} target="_blank" rel="noopener noreferrer" aria-label={`Download ${APP_NAME} on the App Store`}><Image src="/app-store-badge.svg" width={140} height={47} alt="Download on the App Store" /></a>
    <a href={`https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=website&utm_medium=badge&utm_campaign=organic&utm_content=${encodeURIComponent(placement)}`} target="_blank" rel="noopener noreferrer" aria-label={`Get ${APP_NAME} on Google Play`}><Image src="/google-play-badge.svg" width={155} height={60} alt="Get it on Google Play" /></a>
  </div>;
}

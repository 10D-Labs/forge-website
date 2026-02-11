import { readFileSync } from "fs";
import { join } from "path";

// Brand constants
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
export const ORANGE = "#FF6600";
export const WARM_BLACK = "#0d0a07";
export const WARM_800 = "#1e140a";
export const WHITE = "#FFFFFF";
export const WHITE_60 = "rgba(255,255,255,0.6)";
export const GREEN = "#10B981";
export const RED = "#DC2626";

/**
 * Load Barlow Condensed 800 from Google Fonts for OG image rendering.
 * Cached in module scope so it's only fetched once per build.
 */
let fontCache: ArrayBuffer | null = null;

export async function loadFont(): Promise<ArrayBuffer> {
  if (fontCache) return fontCache;

  // Satori requires TTF or OTF (not woff2). Request without browser UA
  // so Google Fonts returns TTF format.
  const cssRes = await fetch(
    "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800&display=swap"
  );
  const css = await cssRes.text();

  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\(/);
  if (!match?.[1]) {
    throw new Error("Could not extract font URL from Google Fonts CSS");
  }

  const fontRes = await fetch(match[1]);
  if (!fontRes.ok) {
    throw new Error(`Failed to fetch font: ${fontRes.status}`);
  }
  fontCache = await fontRes.arrayBuffer();
  return fontCache;
}

/**
 * Read the Forge logo as a base64 data URL for embedding in OG images.
 */
let logoBase64Cache: string | null = null;

export function getLogoBase64(): string {
  if (logoBase64Cache) return logoBase64Cache;

  const logoPath = join(process.cwd(), "public", "forge-logo.png");
  const logoBuffer = readFileSync(logoPath);
  logoBase64Cache = `data:image/png;base64,${logoBuffer.toString("base64")}`;
  return logoBase64Cache;
}

/**
 * Read the app mockup as base64 for the root OG image.
 */
let mockupBase64Cache: string | null = null;

export function getMockupBase64(): string {
  if (mockupBase64Cache) return mockupBase64Cache;

  const mockupPath = join(process.cwd(), "public", "app-mockup-hero-rounded.png");
  const mockupBuffer = readFileSync(mockupPath);
  mockupBase64Cache = `data:image/png;base64,${mockupBuffer.toString("base64")}`;
  return mockupBase64Cache;
}

/**
 * Shared image config for all OG images.
 */
export const ogImageConfig = {
  width: OG_WIDTH,
  height: OG_HEIGHT,
  contentType: "image/png" as const,
};

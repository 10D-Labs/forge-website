// Layout constants
export const CARD_WIDTHS = {
  mobile: 280,
  desktop: 320,
} as const;

export const CARD_GAP = 24;

export const SCROLL_AMOUNTS = {
  mobile: CARD_WIDTHS.mobile + CARD_GAP,  // 304
  desktop: CARD_WIDTHS.desktop + CARD_GAP, // 344
} as const;

// SEO constants
export const BASE_URL = 'https://forgetrainer.ai';
export const DEFAULT_OG_IMAGE = `${BASE_URL}/icon-512.png`;
export const SITE_NAME = 'Forge';
export const DEFAULT_AUTHOR = 'The Forge Team';

// Animation durations (in seconds)
export const ANIMATION_DURATIONS = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.0,
  float: 6,
  glow: 4,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Trainer carousel configuration
export const TRAINER_CAROUSEL = {
  cardWidthMobile: CARD_WIDTHS.mobile,
  cardWidthDesktop: CARD_WIDTHS.desktop,
  gap: CARD_GAP,
  mobileBreakpoint: BREAKPOINTS.md,
  scrollThreshold: 10,
} as const;

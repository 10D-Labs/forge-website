// Maps variant codes (A, B, C...) to store listing URLs.
// Add new entries as you create ad campaigns / custom store listings.

type VariantUrls = {
  android: string;
  ios?: string;
};

export const variants: Record<string, VariantUrls> = {
  // Example:
  // A: { android: "https://play.google.com/store/apps/details?id=com.tendylabs.forge&listing=custom-listing-1" },
  // B: { android: "https://play.google.com/store/apps/details?id=com.tendylabs.forge&listing=custom-listing-2" },
};

export const defaultUrls = {
  android: "https://play.google.com/store/apps/details?id=com.tendylabs.forge",
  ios: "https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402",
  desktop: "/",
};

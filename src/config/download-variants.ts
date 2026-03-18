// Maps variant codes (A, B, C...) to store listing URLs.
// Add new entries as you create ad campaigns / custom store listings.

type VariantUrls = {
  android: string;
  ios?: string; // optional until App Store launch
};

export const variants: Record<string, VariantUrls> = {
  // Example:
  // A: { android: "https://play.google.com/store/apps/details?id=com.tendylabs.forge&listing=custom-listing-1" },
  // B: { android: "https://play.google.com/store/apps/details?id=com.tendylabs.forge&listing=custom-listing-2" },
};

export const defaultUrls = {
  android: "https://play.google.com/store/apps/details?id=com.tendylabs.forge",
  ios: "/", // homepage until App Store launch
  desktop: "/",
};

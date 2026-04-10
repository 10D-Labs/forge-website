// Maps variant codes to store listing URLs with tracking params.
// Add new entries as you create ad campaigns / custom store listings.

type VariantUrls = {
  android: string;
  ios: string;
};

export const variants: Record<string, VariantUrls> = {
  // Creator tracking links
  mj: {
    android:
      "https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=mj&utm_medium=social&utm_campaign=creator",
    ios: "https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402?pt=128493451&ct=mj&mt=8",
  },
  brandon: {
    android:
      "https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=brandon&utm_medium=social&utm_campaign=creator",
    ios: "https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402?pt=128493451&ct=brandon&mt=8",
  },
  lukas: {
    android:
      "https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=lukas&utm_medium=social&utm_campaign=creator",
    ios: "https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402?pt=128493451&ct=lukas&mt=8",
  },
  krista: {
    android:
      "https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=krista&utm_medium=social&utm_campaign=creator",
    ios: "https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402?pt=128493451&ct=krista&mt=8",
  },
  courtney: {
    android:
      "https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=courtney&utm_medium=social&utm_campaign=creator",
    ios: "https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402?pt=128493451&ct=courtney&mt=8",
  },
};

export const defaultUrls = {
  android:
    "https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=download_link&utm_campaign=direct",
  ios: "https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402?pt=128493451&ct=download_link&mt=8",
  desktop: "/",
};

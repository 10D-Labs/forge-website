// Maps variant codes to store listing URLs with tracking params.
// Add new entries as you create ad campaigns / custom store listings.

type VariantUrls = {
  android: string;
  ios: string;
};

export const variants: Record<string, VariantUrls> = {
  // "Getting Back Into It" UGC campaign creators
  sarah: {
    android:
      "https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=ugc&utm_medium=tiktok&utm_campaign=getting-back-into-it&utm_content=sarah",
    ios: "https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402?ct=sarah&mt=8",
  },

  // Creator tracking links
  mj: {
    android:
      "https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=mj&utm_medium=social&utm_campaign=creator",
    ios: "https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402?ct=mj&mt=8",
  },
  brandon: {
    android:
      "https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=brandon&utm_medium=social&utm_campaign=creator",
    ios: "https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402?ct=brandon&mt=8",
  },
  lukas: {
    android:
      "https://play.google.com/store/apps/details?id=com.tendylabs.forge&utm_source=lukas&utm_medium=social&utm_campaign=creator",
    ios: "https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402?ct=lukas&mt=8",
  },
};

export const defaultUrls = {
  android: "https://play.google.com/store/apps/details?id=com.tendylabs.forge",
  ios: "https://apps.apple.com/us/app/forge-ai-personal-trainer/id6758403402",
  desktop: "/",
};

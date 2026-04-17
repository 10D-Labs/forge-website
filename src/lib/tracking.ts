// Google Ads conversion tracking helpers
// Conversion labels come from Google Ads → Goals → Conversions → event snippet

const GOOGLE_ADS_ID = "AW-18087937976";

// TODO: Replace with your actual conversion label from Google Ads
const IOS_CLICK_LABEL = "qbkHCNWx4J0cELiPgLFD";

export const trackAppStoreClick = () => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${IOS_CLICK_LABEL}`,
  });
};

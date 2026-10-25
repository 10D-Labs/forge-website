"use client";

import { useEffect } from "react";

// Public project key (PostHog sends it to every browser). This is the app's PostHog project;
// website events carry $lib = "web", which brain-data uses to keep them apart from app events.
const POSTHOG_KEY = "phc_3ipPhVgVFVQWJAEsjJbw4JGv8FBOS2oGdIIc3oanquZ";
const POSTHOG_HOST = "https://us.i.posthog.com";

// Until a visitor accepts cookies, PostHog keeps its ID in memory only: page views still count,
// but nothing is stored in the browser and each page load looks like a new visitor.
export const posthogPersistence = (consent: string | null) =>
  consent === "accepted" ? "localStorage+cookie" : "memory";

export const setPostHogConsent = (granted: boolean) => {
  import("posthog-js").then(({ default: posthog }) => {
    if (posthog.__loaded) posthog.set_config({ persistence: posthogPersistence(granted ? "accepted" : null) });
  });
};

const PostHogAnalytics = () => {
  useEffect(() => {
    let consent: string | null = null;
    try {
      consent = localStorage.getItem("cookie-consent");
    } catch {}
    // Loaded after hydration so the library stays out of the first page bundle.
    import("posthog-js").then(({ default: posthog }) => {
      if (posthog.__loaded) return;
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        persistence: posthogPersistence(consent),
        person_profiles: "identified_only",
        capture_pageview: "history_change",
        capture_pageleave: true,
        autocapture: false,
        disable_session_recording: true,
        disable_surveys: true,
      });
      posthog.register({ site: "forgetrainer.ai" });
    });
  }, []);

  return null;
};

export default PostHogAnalytics;

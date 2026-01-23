import React, { lazy, Suspense, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Lazy-load analytics to reduce initial bundle and main-thread work
const Analytics = lazy(() =>
  import("@vercel/analytics/react").then((m) => ({ default: m.Analytics }))
);
const SpeedInsights = lazy(() =>
  import("@vercel/speed-insights/react").then((m) => ({ default: m.SpeedInsights }))
);

// Deferred analytics wrapper - loads after browser is idle
const DeferredAnalytics = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Load analytics after browser is idle (non-blocking)
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(
        () => setShouldLoad(true),
        { timeout: 3000 } // Max 3 second delay
      );
      return () => window.cancelIdleCallback(id);
    } else {
      // Fallback for Safari
      const id = setTimeout(() => setShouldLoad(true), 2000);
      return () => clearTimeout(id);
    }
  }, []);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <Analytics />
      <SpeedInsights />
    </Suspense>
  );
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <DeferredAnalytics />
  </React.StrictMode>
);

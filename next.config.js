import { readFileSync } from "node:fs";

// Old exercise and comparison URLs from the exercise catalog cleanup (renamed or retired exercises).
const exerciseRedirects = JSON.parse(readFileSync(new URL("./src/data/exercise-redirects.json", import.meta.url), "utf8"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 90],
    // Allow images from current domains if needed
    remotePatterns: [],
  },

  // Optimize package imports for tree-shaking
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Rewrite markdown files for AI crawlers
  async rewrites() {
    return [];
  },

  async redirects() {
    return [
      { source: "/markdown/about.md", destination: "/markdown/home.md", permanent: true },
      ...exerciseRedirects.map((r) => ({ ...r, permanent: true })),
    ];
  },
};

export default nextConfig;

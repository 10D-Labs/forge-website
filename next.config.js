/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow images from current domains if needed
    remotePatterns: [],
  },

  // Optimize package imports for tree-shaking
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Redirect old exercise URLs that were split into time/distance variants
  async redirects() {
    const splitExercises = [
      "bear-crawl",
      "elliptical",
      "farmers-walk",
      "hands-bike",
      "run",
      "short-stride-run",
      "ski-ergometer",
      "stairmaster",
      "treadmill-run",
      "walking-on-incline-treadmill",
    ];

    return splitExercises.map((slug) => ({
      source: `/exercise/${slug}`,
      destination: `/exercise/${slug}-time`,
      permanent: true,
    }));
  },

  // Rewrite markdown files for AI crawlers
  async rewrites() {
    return [];
  },
};

export default nextConfig;

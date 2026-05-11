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

  // Rewrite markdown files for AI crawlers
  async rewrites() {
    return [];
  },
};

export default nextConfig;

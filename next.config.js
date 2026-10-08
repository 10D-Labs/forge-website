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
    return [{ source: "/markdown/about.md", destination: "/markdown/home.md", permanent: true }];
  },
};

export default nextConfig;

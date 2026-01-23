/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow images from current domains if needed
    remotePatterns: [],
  },

  // Preserve existing redirects
  async redirects() {
    return [];
  },

  // Rewrite markdown files for AI crawlers
  async rewrites() {
    return [];
  },
};

export default nextConfig;

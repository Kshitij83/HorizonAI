import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['react-markdown'],
  typescript: {
    // Temporarily ignore build errors for deployment
    ignoreBuildErrors: false,
  },
  eslint: {
    // Temporarily ignore ESLint errors during builds
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import { buildRedirects } from "./src/i18n/redirects";

const nextConfig: NextConfig = {
  images: {
    // Only local images are allowed
    domains: [],
  },
  reactStrictMode: true,
  // Suppress instrumentation errors in development
  experimental: {
    turbo: {},
  },
  // Legacy URLs and renamed case studies (rules live in src/i18n/redirects.ts)
  async redirects() {
    return buildRedirects();
  },
};

export default nextConfig;

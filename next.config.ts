import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "my-portfolio-cms-production.up.railway.app",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;

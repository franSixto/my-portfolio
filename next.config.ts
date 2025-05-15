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
        hostname: "res.cloudinary.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;

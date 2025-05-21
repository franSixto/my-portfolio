import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Solo permitimos imágenes locales
    domains: [],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Solo permitimos imágenes locales
    domains: [],
  },
  // Suprimir errores de instrumentación en desarrollo
  reactStrictMode: true,
  // Configuración experimental para mejorar Fast Refresh
  experimental: {
    turbo: {},
  },
};

export default nextConfig;

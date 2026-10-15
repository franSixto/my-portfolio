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
  // Legacy URLs (served in whichever language the IP chose) -> Spanish canonical URLs
  async redirects() {
    return [
      { source: "/about", destination: "/sobre-mi", permanent: true },
      { source: "/projects", destination: "/proyectos", permanent: true },
      // Slugs never contain a dot: this keeps /projects/*.webp (public assets) out of the redirect.
      { source: "/projects/:slug([^./]+)", destination: "/proyectos/:slug", permanent: true },
      { source: "/contact", destination: "/contacto", permanent: true },
      // Blog has no posts yet; temporary so it can come back
      { source: "/blog", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;

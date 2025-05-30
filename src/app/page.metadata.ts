import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Francisco Sixto",
  description: "Welcome to Francisco Sixto's portfolio. Discover projects, articles, and web design and development services.",
  keywords: [
    "Home",
    "Francisco Sixto",
    "Portfolio",
    "Design",
    "Web development",
    "Services"
  ],
  openGraph: {
    title: "Home | Francisco Sixto",
    description: "Welcome to Francisco Sixto's portfolio. Discover projects, articles, and web design and development services.",
    url: "https://www.fransixto.com.ar/",
    siteName: "Francisco Sixto Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/meta-image.jpg",
        width: 1200,
        height: 630,
        alt: "Francisco Sixto Portfolio"
      }
    ]
  },
  alternates: {
    canonical: "https://www.fransixto.com.ar/"
  }
};

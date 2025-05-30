import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Francisco Sixto",
  description: "Articles, news, and resources about design, web development, and technology by Francisco Sixto. More content coming soon.",
  keywords: [
    "Blog",
    "Francisco Sixto",
    "Articles",
    "Design",
    "Web development",
    "Technology"
  ],
  openGraph: {
    title: "Blog | Francisco Sixto",
    description: "Articles, news, and resources about design, web development, and technology by Francisco Sixto. More content coming soon.",
    url: "https://www.fransixto.com.ar/blog",
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
    canonical: "https://www.fransixto.com.ar/blog"
  }
};

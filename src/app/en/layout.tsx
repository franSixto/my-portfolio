import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import { buildRootMetadata } from "@/i18n/seo";

export const metadata: Metadata = buildRootMetadata("en");

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}

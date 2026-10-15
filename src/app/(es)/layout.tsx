import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import { buildRootMetadata } from "@/i18n/seo";

export const metadata: Metadata = buildRootMetadata("es");

export default function SpanishRootLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="es">{children}</SiteShell>;
}

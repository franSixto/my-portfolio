import type { Metadata } from "next";
import AboutScreen from "@/screens/AboutScreen";
import { getStaticPageMetadata } from "@/i18n/seo";

export const metadata: Metadata = getStaticPageMetadata("about", "es");

export default function Page() {
  return <AboutScreen />;
}

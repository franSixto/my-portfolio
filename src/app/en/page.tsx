import type { Metadata } from "next";
import HomeScreen from "@/screens/HomeScreen";
import { getStaticPageMetadata } from "@/i18n/seo";

export const metadata: Metadata = getStaticPageMetadata("home", "en");

export default function Page() {
  return <HomeScreen locale="en" />;
}

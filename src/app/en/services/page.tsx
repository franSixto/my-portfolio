import type { Metadata } from "next";
import ServicesHubScreen from "@/screens/ServicesHubScreen";
import { getStaticPageMetadata } from "@/i18n/seo";

export const metadata: Metadata = getStaticPageMetadata("services", "en");

export default function Page() {
  return <ServicesHubScreen locale="en" />;
}

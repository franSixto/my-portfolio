import type { Metadata } from "next";
import ServicesHubScreen from "@/screens/ServicesHubScreen";
import { getStaticPageMetadata } from "@/i18n/seo";

export const metadata: Metadata = getStaticPageMetadata("services", "es");

export default function Page() {
  return <ServicesHubScreen locale="es" />;
}

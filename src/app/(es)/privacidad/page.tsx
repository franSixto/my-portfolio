import type { Metadata } from "next";
import PrivacyScreen from "@/screens/PrivacyScreen";
import { getStaticPageMetadata } from "@/i18n/seo";

export const metadata: Metadata = getStaticPageMetadata("privacy", "es");

export default function Page() {
  return <PrivacyScreen locale="es" />;
}

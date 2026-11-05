import type { Metadata } from "next";
import PrivacyScreen from "@/screens/PrivacyScreen";
import { getStaticPageMetadata } from "@/i18n/seo";

export const metadata: Metadata = getStaticPageMetadata("privacy", "en");

export default function Page() {
  return <PrivacyScreen locale="en" />;
}

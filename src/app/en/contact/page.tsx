import type { Metadata } from "next";
import ContactScreen from "@/screens/ContactScreen";
import { getStaticPageMetadata } from "@/i18n/seo";

export const metadata: Metadata = getStaticPageMetadata("contact", "en");

export default function Page() {
  return <ContactScreen locale="en" />;
}

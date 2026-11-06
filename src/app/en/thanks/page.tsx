import type { Metadata } from "next";
import ThanksScreen from "@/screens/ThanksScreen";
import { getStaticPageMetadata } from "@/i18n/seo";

export const metadata: Metadata = getStaticPageMetadata("thanks", "en");

export default function Page() {
  return <ThanksScreen locale="en" />;
}

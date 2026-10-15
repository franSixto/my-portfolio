import type { Metadata } from "next";
import ProjectsScreen from "@/screens/ProjectsScreen";
import { getStaticPageMetadata } from "@/i18n/seo";

export const metadata: Metadata = getStaticPageMetadata("projects", "en");

export default function Page() {
  return <ProjectsScreen locale="en" />;
}

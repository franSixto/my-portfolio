import type { Metadata } from "next";
import ProjectsScreen from "@/screens/ProjectsScreen";
import { getStaticPageMetadata } from "@/i18n/seo";

export const metadata: Metadata = getStaticPageMetadata("projects", "es");

export default function Page() {
  return <ProjectsScreen locale="es" />;
}

import type { Metadata } from "next";

import ProjectScreen from "@/screens/ProjectScreen";
import { getProject, getProjectSlugs } from "@/i18n/dictionary";
import { buildPageMetadata } from "@/i18n/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug, "es");
  // Do not throw notFound() here: a metadata-phase 404 bypasses the layout and
  // yields the bare error shell. The page itself calls notFound() instead.
  if (!project) return { robots: { index: false } };
  return buildPageMetadata({
    locale: "es",
    route: "project",
    params: { slug },
    title: project.title,
    description: project.description,
    type: "article",
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ProjectScreen locale="es" slug={slug} />;
}

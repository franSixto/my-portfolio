import type { Metadata } from "next";

import ProjectScreen from "@/screens/ProjectScreen";
import { getCaseCopy, getCaseSlugs, getCaseStudy } from "@/content/projects";
import { buildPageMetadata } from "@/i18n/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const copy = getCaseCopy(slug, "es");
  // Do not throw notFound() here: a metadata-phase 404 bypasses the layout and
  // yields the bare error shell. The page itself calls notFound() instead.
  if (!study || !copy) return { robots: { index: false } };
  return buildPageMetadata({
    locale: "es",
    route: "project",
    params: { slug },
    title: copy.seoTitle,
    description: copy.seoDescription,
    type: "article",
    image: {
      url: study.cover.src,
      width: study.cover.width,
      height: study.cover.height,
      alt: copy.coverAlt,
    },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ProjectScreen locale="es" slug={slug} />;
}

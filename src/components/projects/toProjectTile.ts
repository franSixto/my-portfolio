import type { ProjectTileData } from "@/components/ui/ProjectTile";
import type { CaseStudy } from "@/content/projects/types";
import { localizedPath, type Locale } from "@/i18n/routes";

/** Maps a case study to the tile props; the role becomes the meta line. */
export function toProjectTile(study: CaseStudy, locale: Locale): ProjectTileData {
  const copy = study[locale];
  return {
    href: localizedPath("project", locale, { slug: study.slug }),
    title: copy.cardTitle,
    description: copy.cardSummary,
    meta: copy.meta.role,
    image: { src: study.hero.src, alt: copy.heroAlt },
  };
}

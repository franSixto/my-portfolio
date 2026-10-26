import type { ProjectTileData } from "@/components/ui/ProjectTile";
import type { CaseStudy } from "@/content/projects/types";
import { PROJECTS_LABELS } from "@/content/projects/labels";
import { localizedPath, type Locale } from "@/i18n/routes";

/** Maps a case study to the tile props; the role (plus the status, when it is not a live site) becomes the meta line. */
export function toProjectTile(study: CaseStudy, locale: Locale): ProjectTileData {
  const copy = study[locale];
  const showStatus = study.status && study.status !== "live";
  return {
    href: localizedPath("project", locale, { slug: study.slug }),
    title: copy.cardTitle,
    description: copy.cardSummary,
    meta: showStatus ? `${copy.meta.role} · ${PROJECTS_LABELS[locale].status[study.status!]}` : copy.meta.role,
    image: { src: study.hero.src, alt: copy.heroAlt },
  };
}

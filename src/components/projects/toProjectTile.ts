import type { ProjectTileData } from "@/components/ui/ProjectTile";
import { splitProjectMeta } from "@/lib/projectMeta";
import { localizedPath, type Locale } from "@/i18n/routes";
import type { Project } from "@/types/project";

/** Maps project data to the tile props; the role (if any) becomes the meta line. */
export function toProjectTile(project: Project, locale: Locale): ProjectTileData {
  const markdown = typeof project.longDescription === "string" ? project.longDescription : "";
  const { meta } = splitProjectMeta(markdown);
  return {
    href: localizedPath("project", locale, { slug: project.slug ?? project.id }),
    title: project.title,
    description: project.description,
    meta: meta[0]?.value,
    image: project.imageUrl ? { src: project.imageUrl, alt: project.imageAlt || project.title } : undefined,
  };
}

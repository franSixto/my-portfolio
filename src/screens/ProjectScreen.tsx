import { notFound } from "next/navigation";
import ProjectContent from "@/components/projects/ProjectContent";
import { getProject, getTranslator } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/routes";

export default function ProjectScreen({ locale, slug }: { locale: Locale; slug: string }) {
  const project = getProject(slug, locale);
  if (!project) notFound();
  const t = getTranslator(locale);

  return (
    <ProjectContent
      project={project}
      noDetailedContentLabel={t("pages.projects.noDetailedContent")}
      liveProjectLabel={t("pages.projects.liveProject")}
    />
  );
}

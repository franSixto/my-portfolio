import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProjectContent from "@/components/projects/ProjectContent";
import { getProject, getTranslator } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/routes";

export default function ProjectScreen({ locale, slug }: { locale: Locale; slug: string }) {
  const project = getProject(slug, locale);
  if (!project) notFound();
  const t = getTranslator(locale);

  return (
    <div className="dark:bg-gray-950">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col items-center justify-center">
          <Breadcrumbs currentLabel={project.title} />
        </div>
      </div>
      <ProjectContent
        project={project}
        noDetailedContentLabel={t("pages.projects.noDetailedContent")}
      />
    </div>
  );
}

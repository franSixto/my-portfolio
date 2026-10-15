import ProjectList from "@/components/projects/ProjectList";
import { TitleH1 } from "@/components/common/TitleH1";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getProjects, getTranslator } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/routes";

export default function ProjectsScreen({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const projects = getProjects(locale);

  return (
    <div
      className="dark:bg-gray-950 pt-10 px-6"
      style={{
        backgroundImage: 'url("/fondo.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="relative overflow-hidden flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Breadcrumbs />
        </div>
        <TitleH1
          title={t("pages.projects.title")}
          description={t("pages.projects.description")}
        />
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}

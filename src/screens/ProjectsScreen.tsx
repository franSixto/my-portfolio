import ProjectList from "@/components/projects/ProjectList";
import { toProjectTile } from "@/components/projects/toProjectTile";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { getProjects, getTranslator } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/routes";

export default function ProjectsScreen({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const projects = getProjects(locale).map((project) => toProjectTile(project, locale));

  return (
    <>
      <PageHeader title={t("pages.projects.title")} lead={t("pages.projects.description")} />
      <Container className="pb-20 md:pb-28">
        <ProjectList projects={projects} emptyLabel={t("pages.projects.noDetailedContent")} />
      </Container>
    </>
  );
}

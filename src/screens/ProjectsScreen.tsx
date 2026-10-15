import ProjectList from "@/components/projects/ProjectList";
import { toProjectTile } from "@/components/projects/toProjectTile";
import Container from "@/components/ui/Container";
import CtaBand from "@/components/ui/CtaBand";
import PageHeader from "@/components/ui/PageHeader";
import { CASE_STUDIES } from "@/content/projects";
import { projectsContent } from "@/content/pages/projects";
import { localizedPath, type Locale } from "@/i18n/routes";

export default function ProjectsScreen({ locale }: { locale: Locale }) {
  const c = projectsContent[locale];
  const projects = CASE_STUDIES.map((study) => toProjectTile(study, locale));

  return (
    <>
      <PageHeader title={c.h1} lead={c.intro} />
      <Container className="pb-8 md:pb-12">
        <ProjectList projects={projects} emptyLabel={c.empty} />
      </Container>
      <CtaBand
        id="projects-cta"
        heading={c.cta.heading}
        action={{ href: localizedPath("contact", locale), label: c.cta.button }}
      />
    </>
  );
}

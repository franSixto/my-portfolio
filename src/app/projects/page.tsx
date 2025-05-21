// app/projects/page.tsx
import ProjectList from "@/components/projects/ProjectList";
import { TitleH1 } from "@/components/common/TitleH1";
import { fetchProjects } from "@/app/api/projects/projectsService";

async function Projects() {
  const { projects } = await fetchProjects();
  return (
    <div
      className="dark:bg-gray-950 pt-15 px-6"
      style={{
        backgroundImage: 'url("/fondo.webp")',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="relative overflow-hidden flex flex-col items-center justify-center">
        <TitleH1
          title="Projects"
          description="Here you can find some of the projects I have worked on."
        />
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}

export default Projects;
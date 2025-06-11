// app/projects/page.tsx
import ProjectList from "@/components/projects/ProjectList";
import { TitleH1 } from "@/components/common/TitleH1";
import { fetchProjects } from "@/app/api/projects/projectsService";
import Breadcrumbs from "@/components/common/Breadcrumbs";

async function Projects() {
  const { projects } = await fetchProjects();
  return (
    <div
      className="dark:bg-gray-950 pt-15 px-6"
      style={{
        backgroundImage: 'url("/fondo.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        
      }}
    >
      <div className="relative overflow-hidden flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Breadcrumbs />
        </div>
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
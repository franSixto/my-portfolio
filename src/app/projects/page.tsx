// app/projects/page.tsx
import ProjectList from "@/components/projects/ProjectList";
import { TitleH1 } from "@/components/common/TitleH1";
import { fetchProjects } from "@/app/api/projects/projectsService";

async function load() {
    return await fetchProjects();
}

async function Projects() {
    const projects = await load();
    console.log("Projects data:", projects); // Console log adicional si lo necesitas
    return (
        <div className="dark:bg-gray-950 pt-15 px-6">
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
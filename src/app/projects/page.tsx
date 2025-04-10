// app/projects/page.tsx
import ProjectList from "@/components/ProjectList";
import { TitleH1 } from '@/components/TitleH1';


async function load() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate=*`);
    const data = await res.json();
    console.log("Data fetched:", data); // Console log para verificar la data
    return data;
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
                <ProjectList projects={projects.data} />
            </div>
        </div>
    );
}

export default Projects;
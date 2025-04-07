// app/projects/page.tsx
import ProjectList from "@/components/ProjectList";
import { TitleSubPages } from "@/components/TitleSubPages";


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
        <div className="dark:bg-gray-950">
            <TitleSubPages
                title="Projects"
                description="Here you can find some of the projects I have worked on."
            />
            <ProjectList projects={projects.data} />
        </div>
    );
}

export default Projects;
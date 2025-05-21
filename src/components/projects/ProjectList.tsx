import ProjectCard from "@/components/projects/ProjectCard";
import type { Project } from "@/app/api/projects/projectsService";

export default function ProjectsPageWithComponents({ projects }: { projects: Project[] }) {
  const safeProjects = projects || [];
  return (
    <div className="container mx-auto px-4 py-12 z-2">
      {safeProjects.length === 0 ? (
        <p className="text-center text-gray-600">No hay proyectos disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safeProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title || "Untitled Project"}
              description={project.description || "No description available."}
              imageUrl={project.imageUrl || null}
              imageAlt={project.title || "Default image"}
              logoUrl={project.logoUrl || null}
              logoAlt={project.title || "Default logo"}
              slug={project.slug || project.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
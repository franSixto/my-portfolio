import ProjectCard from "@/components/projects/ProjectCard";
import { Project } from "@/app/api/projects/projectsService";

export default async function ProjectsPageWithComponents({ projects }: { projects: Project[] }) {
    const safeProjects = projects || [];   
    return (
      <div className="container mx-auto px-4 py-12 z-2">
        {safeProjects.length === 0 ? (
          <p className="text-center text-gray-600">No hay proyectos disponibles en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeProjects.map((project) => {
  
              const imageUrl = project.Image?.url
                ? `${process.env.CLOUDINARY_URL}${project.Image.url}`
                : null;
  
              const logoUrl = project.Logo?.url
                ? `${process.env.CLOUDINARY_URL}${project.Logo.url}`
                : null;
  
              return (
                <ProjectCard
                  key={project.id}
                  title={project.Title || "Untitled Project"}
                  description={project.Description || "No description available."}
                  imageUrl={imageUrl}
                  imageAlt={project.Image?.alternativeText || "Default image"}
                  logoUrl={logoUrl}
                  logoAlt={project.Logo?.alternativeText || "Default logo"}
                  slug={project.slug || "no-slug"}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
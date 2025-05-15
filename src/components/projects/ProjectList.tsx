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
  
              const getImageUrl = (imgObj?: { url?: string | null }) => {
                if (!imgObj?.url) return null;
                return imgObj.url.startsWith("http")
                  ? imgObj.url
                  : `${process.env.NEXT_PUBLIC_STRAPI_URL}${imgObj.url}`;
              };

              const imageUrl = getImageUrl(project.Image ?? undefined);
              const logoUrl = getImageUrl(project.Logo ?? undefined);
  
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
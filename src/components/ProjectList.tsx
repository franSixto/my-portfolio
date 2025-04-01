import ProjectCard from "@/components/ProjectCard";

// Tipo para los proyectos basado en el esquema proporcionado
type Project = {
    id: number;

    Title: string;
    Description: string;
    LongDescription: any;
    slug: string;
    Image: {
        url: string;
        alternativeText?: string;
    } | null;
    Logo: {
        url: string;
        alternativeText?: string;
    } | null;
    publishedAt: string;

};

export default async function ProjectsPageWithComponents({ projects }: { projects: Project[] }) {
    const safeProjects = projects || []; // Asegúrate de que `projects` sea un array
  
    console.log("Safe Projects:", safeProjects); // Inspecciona los datos aquí
  
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Nuestros Proyectos</h1>
  
        {safeProjects.length === 0 ? (
          <p className="text-center text-gray-600">No hay proyectos disponibles en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeProjects.map((project) => {
              console.log("Project:", project); // Inspecciona cada proyecto
  
              const imageUrl = project.Image?.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${project.Image.url}`
                : null;
  
              const logoUrl = project.Logo?.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${project.Logo.url}`
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
                  slug={project.slug || "no-slug"} // Asegúrate de que el slug se pase correctamente
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
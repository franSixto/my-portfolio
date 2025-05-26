import { Metadata } from "next";
import Image from "next/image";
import { fetchProjectBySlug } from "@/app/api/projects/projectsService";
import type { Child } from "@/app/api/projects/projectsService";
import ReactMarkdown from "react-markdown";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { TitleH1Project } from "@/components/common/TitleH1Project";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await fetchProjectBySlug(slug);
  if (!project) {
    return {
      title: "Proyecto no encontrado",
      description: "El proyecto que estás buscando no existe o ha sido eliminado.",
    };
  }
  return {
    title: project.title || "Untitled Project",
    description: project.description || "No description available.",
  };
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const project = await fetchProjectBySlug(slug);
  if (!project) {
    return (
      <div className="container mx-auto px-6 py-12 text-center dark:bg-gray-950">
        <div className="flex flex-col items-center justify-center">
          <Breadcrumbs />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project not found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          The project you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }
  const {
    title = "Untitled Project",
    description = "No description available.",
    longDescription = "",
    imageUrl = "/default-image.png",
    imageAlt = "Imagen del proyecto",
    logoUrl = "/default-logo.png",
    logoAlt = "Logo del proyecto",
  } = project;
  return (
    <article className="dark:bg-gray-950">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center">
          <Breadcrumbs />
        </div>
        <TitleH1Project title={title} description={description} />
        {logoUrl && (
          <div className="flex flex-row items-center justify-between max-w-2xl mx-auto my-6 p-3 ps-5 bg-gray-100 dark:bg-gray-900 rounded-xl">
            <div className="relative text-gray-700 dark:text-gray-300 pe-2">
              <span className="text-lg font-medium">Made for</span>
            </div>
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={80}
              height={80}
              className="object-contain bg-white rounded-lg shadow-lg p-2 w-40 h-15"
            />
          </div>
        )}
        {imageUrl && (
          <div className="relative max-w-2xl mx-auto mb-16">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={1366}
              height={792}
              className="rounded-2xl object-cover bg-gray-100 dark:bg-gray-900"
            />
          </div>
        )}
        <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {Array.isArray(longDescription) ? (
            longDescription.length > 0 ? (
              longDescription.map((block, index) => {
                if (block.type === 'paragraph') {
                  return (
                    <p key={index} className="text-gray-600 dark:text-gray-300 mb-5">
                      {block.children.map((child: Child) => child.text)}
                    </p>
                  );
                }
                return null;
              })
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No hay contenido detallado disponible.</p>
            )
          ) : (
            longDescription ? (
              <ReactMarkdown>{longDescription}</ReactMarkdown>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No hay contenido detallado disponible.</p>
            )
          )}
        </div>
      </div>
    </article>
  );
}
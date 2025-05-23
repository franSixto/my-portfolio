import { Metadata } from "next";
import Image from "next/image";
import { fetchProjectBySlug } from "@/app/api/projects/projectsService";
import type { Child } from "@/app/api/projects/projectsService";
import ReactMarkdown from "react-markdown";

export async function generateMetadata(props: { params: { slug: string } }): Promise<Metadata> {
  const { params } = props;
  const { slug } = await params;
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

export default async function ProjectPage(props: { params: { slug: string } }) {
  const { params } = props;
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) {
    return (
      <div className="container mx-auto px-6 py-12 text-center dark:bg-gray-950">
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
    logoUrl = "/default-logo.png",
  } = project;
  return (
    <article className="dark:bg-gray-950">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl max-w-2xl mx-auto lg:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text uppercase mb-2">
          {title}
        </h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed dark:text-gray-400">
          {description}
        </p>
        {logoUrl && (
          <div className="flex flex-row items-center justify-between max-w-2xl mx-auto my-6 p-3 ps-5 bg-gray-100 dark:bg-gray-900 rounded-xl">
            <div className="relative text-gray-700 dark:text-gray-300 pe-2">
              <span className="text-lg font-medium">Made for</span>
            </div>
            <Image
              src={logoUrl}
              alt={title}
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
              alt={title}
              width={1366}
              height={792}
              className="rounded-2xl object-cover shadow-lg"
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
                      {block.children.map((child: Child, childIndex: number) => child.text)}
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
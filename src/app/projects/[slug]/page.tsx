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
              <ReactMarkdown
                components={{
                  p: (props) => <p className="mb-5 leading-relaxed text-gray-700 dark:text-gray-200" {...props} />,
                  h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
                  h2: (props) => <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white" {...props} />,
                  h3: (props) => <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white" {...props} />,
                  ul: (props) => <ul className="list-disc pl-6 mb-5 space-y-2" {...props} />,
                  ol: (props) => <ol className="list-decimal pl-6 mb-5 space-y-2" {...props} />,
                  li: (props) => <li className="mb-1" {...props} />,
                  a: (props) => <a className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                  strong: (props) => <strong className="font-semibold text-gray-900 dark:text-white" {...props} />,
                  em: (props) => <em className="italic text-gray-700 dark:text-gray-200" {...props} />,
                  hr: () => <hr className="my-8 border-gray-300 dark:border-gray-700" />,
                  blockquote: (props) => <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-700 dark:text-gray-300 my-6" {...props} />,
                  code: (props) => <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm font-mono" {...props} />,
                }}
              >{longDescription}</ReactMarkdown>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No hay contenido detallado disponible.</p>
            )
          )}
        </div>
      </div>
    </article>
  );
}
import { Metadata } from "next";
import Image from "next/image";
import { TitleH1 } from "@/components/common/TitleH1";
import { fetchProjectBySlug } from "@/app/api/projects/projectsService";

// Genera metadatos para la página del proyecto
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; // Espera a que se resuelva el Promise
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
      description: "El proyecto que estás buscando no existe o ha sido eliminado.",
    };
  }

  const { Title: title = "Untitled Project", Description: description = "No description available." } = project;

  return {
    title,
    description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Espera a que se resuelva el Promise
  const project = await fetchProjectBySlug(slug);

  console.log("pruebaaaa", project);

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
    Title: title = "Untitled Project",
    Description: description = "No description available.",
    LongDescription: longDescription = "",
    Image: image = null,
    Logo: logo = null,
  } = project;

  const imageUrl = image?.url || "/default-image.png"; // Imagen por defecto
  const imageAlt = image?.alternativeText || "Imagen por defecto";
  const logoUrl = logo?.url || "/default-logo.png"; // Logo por defecto
  const logoAlt = logo?.alternativeText || "Logo por defecto";

  return (
    <article className="dark:bg-gray-950">
    <div className="container mx-auto px-6 py-12">
      {/* Título y descripción */}
      <TitleH1 title={title} description={description} />

      {/* Logo */}
      {logoUrl && (
        <div className="flex justify-center mb-6">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${logoUrl}`}
            alt={logoAlt || title}
            width={100}
            height={100}
            className="object-contain bg-white rounded-full shadow-lg p-5 w-50 h-20"
          />
        </div>
      )}

      {/* Imagen principal */}
      {imageUrl ? (
        <div className="relative w-full mx-auto mb-6">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
            alt={imageAlt || title}
            width={1920}
            height={1080}
            className="rounded-4xl object-cover shadow-lg"
          />
        </div>
      ) : (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">{imageAlt}</span>
        </div>
      )}

      {/* Descripción larga */}
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        {Array.isArray(longDescription) && longDescription.length > 0 ? (
          longDescription.map((block, index) => {
            if (block.type === 'paragraph') {
              return (
                <p key={index} className="text-gray-600 dark:text-gray-300 mb-5 text-xl">
                  {block.children.map((child: { bold?: boolean; italic?: boolean; strikethrough?: boolean; code?: boolean; type?: string; text: string; url?: string; children?: { text: string }[] }, childIndex: number) => {
                    if (child.bold) {
                      return <b key={childIndex}>{child.text}</b>;
                    }
                    if (child.italic) {
                      return <i key={childIndex}>{child.text}</i>;
                    }
                    if (child.strikethrough) {
                      return <s key={childIndex}>{child.text}</s>;
                    }
                    if (child.code) {
                      return <code key={childIndex}>{child.text}</code>;
                    }
                    if (child.type === 'link' && child.children && child.children.length > 0) {
                      return (
                        <a key={childIndex} href={child.url} className="text-blue-500 underline">
                          {child.children[0].text}
                        </a>
                      );
                    }
                    return child.text;
                  })}
                </p>
              );
            }
            if (block.type === 'heading') {
              const HeadingTag = block.level === 1 ? 'h2' : block.level === 2 ? 'h3' : 'h4';
              return (
                <HeadingTag
                key={index}
                className={`${
                  block.level === 1
                  ? 'text-4xl font-bold text-gray-900 dark:text-gray-300 mb-5'
                  : block.level === 2
                  ? 'text-3xl font-semibold text-gray-900 dark:text-gray-300 mb-5 border-t-2 border-gray-300 dark:border-gray-600 pt-5'
                  : 'text-2xl font-medium text-gray-900 dark:text-gray-300 mb-5 border-t-2 border-gray-300 dark:border-gray-600 pt-5'
                }`}
                >
                {block.children[0].text}
                </HeadingTag>
              );
            }
            if (block.type === 'list') {
              const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
              return (
                <ListTag
                  key={index}
                  className={block.format === 'ordered' ? 'list-decimal list-inside' : 'list-disc list-inside'}
                >
                  {block.children.map((item: { children: { text: string }[] }, itemIndex: number) => (
                  <li key={itemIndex} className="text-gray-600 dark:text-gray-300">
                    {item.children[0].text}
                  </li>
                  ))}
                </ListTag>
              );
            }
            return null;
          })
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No hay contenido detallado disponible.</p>
        )}
      </div>
    </div>
    </article>
  );
}
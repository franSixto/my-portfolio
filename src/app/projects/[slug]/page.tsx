import { Metadata } from "next";
import Image from "next/image";
import { fetchProjectBySlug } from "@/app/api/projects/projectsService";
import type { Child } from "@/app/api/projects/projectsService";

// Ajuste en el manejo de `params` para evitar el uso de `Promise` innecesario
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params; // Espera a que se resuelva la promesa
  const { slug } = resolvedParams;
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
  const resolvedParams = await params; // Espera a que se resuelva la promesa
  const { slug } = resolvedParams;
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
    Title: title = "Untitled Project",
    Description: description = "No description available.",
    LongDescription: longDescription = [],
    Image: image = null,
    Logo: logo = null,
  } = project;

  const imageUrl = image?.url || "/default-image.png";
  const imageAlt = image?.alternativeText || "Default image of the project";
  const logoUrl = logo?.url || "/default-logo.png";
  const logoAlt = logo?.alternativeText || "Default Logo of the project";

  return (
    <article className="dark:bg-gray-950">
      <div className="container mx-auto px-6 py-12">
      <h1
        className="text-4xl max-w-2xl mx-auto lg:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text uppercase mb-2"
        // initial={{ scale: 0.8 }}
        // whileInView={inView ? { scale: 1 } : {}}
        // transition={{ duration: 0.5 }}
      >
        {title}
      </h1>
      <p
        className="text-xl max-w-2xl mx-auto leading-relaxed dark:text-gray-400"
        // initial={{ opacity: 0 }}
        // whileInView={inView ? { opacity: 1 } : {}}
        // transition={{ delay: 0.3, duration: 0.8 }}
      >
        {description}
      </p>

        {logoUrl && (
          <div className="flex flex-row items-center justify-between max-w-2xl mx-auto my-6 p-3 ps-5 bg-gray-100 rounded-full">
            <div className="relative text-gray-700 pe-2">
            <span className="text-lg font-medium">This project was made for</span>
            </div>
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${logoUrl}`}
              alt={logoAlt}
              width={80}
              height={80}
              className="object-contain bg-white rounded-full shadow-lg p-5 w-70 h-15"
            />
          </div>
        )}

        {imageUrl && (
          <div className="relative w-full mx-auto mb-16">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
              alt={imageAlt}
              width={1366}
              height={792}
              className="rounded-3xl object-cover shadow-lg"
            />
          </div>
        )}

        <div className="prose dark:prose-invert max-w-2xl mx-auto">
          {Array.isArray(longDescription) && longDescription.length > 0 ? (
            longDescription.map((block, index) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={index} className="text-gray-600 dark:text-gray-300 mb-5 text-xl">
                    {block.children.map((child: Child, childIndex: number) => {
                      if (child.bold) return <b key={childIndex}>{child.text}</b>;
                      if (child.italic) return <i key={childIndex}>{child.text}</i>;
                      if (child.strikethrough) return <s key={childIndex}>{child.text}</s>;
                      if (child.code) return <code key={childIndex}>{child.text}</code>;
                      if (child.type === 'link' && child.children?.length) {
                        return (
                          <a key={childIndex} href={child.url} target="blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            {child.children.map((nestedChild: Child, nestedIndex: number) => (
                              <span key={nestedIndex}>{nestedChild.text}</span>
                            ))}
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
                    {block.children[0]?.text || ''}
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
                    {block.children?.map((item: { children?: { text: string }[] }, itemIndex: number) => (
                      <li key={itemIndex} className="text-gray-600 dark:text-gray-300">
                        {item.children && item.children.length > 0 ? item.children[0].text : 'Elemento vacío'}
                      </li>
                    )) || null}
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
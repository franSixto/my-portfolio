import { Metadata } from "next";
import Image from "next/image";
import { TitleSubPages } from "@/components/TitleSubPages";

const fetchProjectBySlug = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`
  );
  const data = await res.json();
  console.log("Fetched project data:", data); // Inspecciona los datos del proyecto
  return data.data[0]; // Strapi devuelve un array, tomamos el primer elemento
};

// Genera metadatos para la página del proyecto
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await fetchProjectBySlug(params.slug);

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

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await fetchProjectBySlug(params.slug);

  if (!project) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Proyecto no encontrado</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          El proyecto que estás buscando no existe o ha sido eliminado.
        </p>
      </div>
    );
  }

  const {
    Title: title = "Untitled Project",
    Description: description = "No description available.",
    LongDescription: longDescription = "",
    Image: { url: imageUrl = null, alternativeText: imageAlt = "" } = {},
    Logo: { url: logoUrl = null, alternativeText: logoAlt = "" } = {},
  } = project;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Título y descripción */}
      <TitleSubPages title={title} description={description} />

      {/* Logo */}
      {logoUrl && (
        <div className="flex justify-center mb-6">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${logoUrl}`}
            alt={logoAlt || title}
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
      )}

      {/* Imagen principal */}
      {imageUrl ? (
        <div className="relative w-full max-w-4xl h-96 mx-auto mb-6">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
            alt={imageAlt || title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      ) : (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500">Sin imagen</span>
        </div>
      )}

      {/* Descripción larga */}
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        {typeof longDescription === "string" ? (
          <div dangerouslySetInnerHTML={{ __html: longDescription }} />
        ) : (
          <p>No hay contenido disponible.</p>
        )}
      </div>
    </div>
  );
}
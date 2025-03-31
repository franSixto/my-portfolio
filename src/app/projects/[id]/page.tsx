import Image from "next/image";

const fetchProject = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects/${id}?populate=*`);
  const data = await res.json();
  console.log("Fetched project data:", data); // Inspecciona los datos del proyecto
  return data.data;
};

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await fetchProject(params.id);

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

  const attributes = project.attributes || {};
  const title = attributes.Title || "Untitled Project";
  const description = attributes.Description || "No description available.";
  const longDescription = attributes.LongDescription || [];
  const imageUrl = attributes.Image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attributes.Image.data.attributes.url}`
    : null;
  const logoUrl = attributes.Logo?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attributes.Logo.data.attributes.url}`
    : null;
  const projectUrl = attributes.ProjectURL || "#";

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col items-center">
        {/* Logo del proyecto */}
        {logoUrl && (
          <div className="relative h-24 w-24 mb-6">
            <Image
              src={logoUrl}
              alt={`Logo de ${title}`}
              fill
              className="object-contain"
            />
          </div>
        )}

        {/* Título del proyecto */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>

        {/* Descripción corta */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{description}</p>

        {/* Imagen principal */}
        {imageUrl && (
          <div className="relative w-full max-w-4xl h-96 mb-6">
            <Image
              src={imageUrl}
              alt={`Imagen de ${title}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {/* Descripción larga */}
        <div className="prose dark:prose-invert max-w-4xl">
          {longDescription.map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        
      </div>
    </div>
  );
}
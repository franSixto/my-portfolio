import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string | null;
  imageAlt?: string;
  logoUrl: string | null;
  logoAlt?: string;
  slug: string; // Cambiamos projectUrl por slug
};

export default function ProjectCard({
  title,
  description,
  imageUrl,
  imageAlt = "",
  logoUrl,
  logoAlt = "",
  slug,
}: ProjectCardProps) {
  console.log("ProjectCard props:", {
    title,
    description,
    imageUrl,
    imageAlt,
    logoUrl,
    logoAlt,
    slug,
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
      {/* Imagen principal del proyecto */}
      <div className="relative h-48 w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">Sin imagen</span>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Logo y título */}
        <div className="flex items-center mb-4">
          {logoUrl && (
            <div className="relative h-12 w-12 mr-4">
              <Image
                src={logoUrl}
                alt={logoAlt || `Logo de ${title}`}
                fill
                className="object-contain"
              />
            </div>
          )}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        </div>

        {/* Descripción */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>

        {/* Enlace al proyecto */}
        <div className="mt-auto">
          <Link
            href={`/projects/${slug}`} // Usamos el slug para construir la URL
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
          >
            Ver proyecto
          </Link>
        </div>
      </div>
    </div>
  );
}
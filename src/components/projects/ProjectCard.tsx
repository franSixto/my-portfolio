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


  return (
    <Link
      href={`/projects/${slug}`} // Usamos el slug para construir la URL
      className="block"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 h-full flex flex-col">
      {/* Imagen principal del proyecto */}
      <div className="relative h-48 w-full">
        {logoUrl && (
        <div className="absolute right-3 top-3 z-1 h-12 w-30">
          <Image
          src={logoUrl}
          alt={logoAlt || `Logo de ${title}`}
          fill
          className="object-contain bg-white rounded-xl p-2 shadow"
          />
        </div>
        )}
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

      <div className="p-6 flex-grow">
        {/* Logo y título */}
        <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        </div>

        {/* Descripción */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
        {description}
        </p>
      </div>
      </div>
    </Link>
  );
}
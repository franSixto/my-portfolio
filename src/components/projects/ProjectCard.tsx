"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string | null;
  imageAlt?: string;
  logoUrl: string | null;
  logoAlt?: string;
  slug: string;
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}

    >

      <div className="
          bg-gradient-to-t h-full flex flex-col p-[1px] rounded-lg overflow-hidden shadow-lg transition duration-300
          hover:shadow-xl hover:-translate-y-2
        from-white/10 via-white/10 to-gray-500/20
        hover:from-white hover:via-white hover:to-red-500 
        dark:from-gray-950 dark:via-gray-900/80 dark:to-gray-500/80
        hover:dark:via-gray-600 hover:dark:from-gray-600 hover:dark:to-red-600 
       ">
        <div className="bg-gradient-to-t from-white/10 via-white to-white dark:from-gray-800/80 dark:via-gray-900/80 dark:to-gray-800/80 rounded-lg transition duration-300 hover:dark:to-gray-950 overflow-hidden shadow-lg h-full flex flex-col p-2">
          <Link
            className="flex flex-col h-full"
            href={`/projects/${slug}`}
          >
            {/* Imagen principal del proyecto */}
            <div className="relative h-48 w-full rounded-md overflow-hidden">
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
              <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 m-0">
                {description}
              </p>
            </div>
          </Link>
        </div>
      </div>

    </motion.div>
  );
}
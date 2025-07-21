"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useColorContext, COLOR_TEXT_CLASS_MAP } from '@/components/theme/ColorContext';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { mainColor } = useColorContext();
  const { t } = useLanguage();
  const textColor = COLOR_TEXT_CLASS_MAP[mainColor] || 'text-red-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1}}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}

    >

      <div className="
          bg-gradient-to-tr h-full flex flex-col p-[1px] rounded-lg overflow-hidden shadow-lg transition duration-300
          hover:shadow-xl hover:-translate-y-2
        from-white/10 via-gray-300/10 to-gray-500/20
        hover:from-white hover:via-white hover:to-white 
        dark:from-gray-950 dark:via-gray-900/80 dark:to-gray-500/80
        hover:dark:via-gray-600 hover:dark:from-gray-600 hover:dark:to-white
       ">
        <div className="bg-gradient-to-tr rounded-lg transition duration-300 overflow-hidden shadow-lg h-full flex flex-col p-2
        from-white/10 via-white to-white
        dark:from-gray-800/50 dark:via-gray-900/50 dark:to-gray-800/90 
        hover:dark:from-gray-900/50  hover:dark:via-gray-900 hover:dark:to-gray-950/90">
          <Link
            className="flex flex-col h-full"
            href={`/projects/${slug}`}
          >
            {/* Imagen principal del proyecto */}
            <div className="relative w-full rounded-md overflow-hidden">
              {logoUrl && (
                <div className="absolute right-3 top-3 z-1 h-10 w-25">
                  <Image
                    src={logoUrl}
                    alt={logoAlt || `Logo de ${title}`}
                    fill
                    className="object-contain bg-white rounded-md p-2 shadow"
                  />
                </div>
              )}
              <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={imageAlt || title}
                    fill
                    className="object-contain object-bottom"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500">{t('projects.noImage')}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-5 p-1 flex-grow">
              {/* Logo y título */}
              <div className="flex items-center mb-4">
                <h2 className={`text-2xl font-semibold ${textColor}`}>
                  {title}
                </h2>
              </div>

              {/* Descripción */}
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3 m-0">
                {description}
              </p>
            </div>
          </Link>
        </div>
      </div>

    </motion.div>
  );
}
"use client";

import { motion } from "framer-motion";

interface ProjectCardSkeletonProps {
  titleWidth?: string;
}

export default function ProjectCardSkeleton({ titleWidth = 'w-3/4' }: ProjectCardSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col"
    >
      <div className="
          bg-gradient-to-tr h-full flex flex-col p-[1px] rounded-lg overflow-hidden shadow-lg
        from-white/10 via-gray-300/10 to-gray-500/20
        dark:from-gray-950 dark:via-gray-900/80 dark:to-gray-500/80
       ">
        <div className="bg-gradient-to-tr rounded-lg overflow-hidden shadow-lg h-full flex flex-col p-2
        from-white/10 via-white to-white
        dark:from-gray-800/50 dark:via-gray-900/50 dark:to-gray-800/90">
          
          {/* Imagen skeleton */}
          <div className="relative w-full rounded-md overflow-hidden">
            {/* Logo skeleton en la esquina */}
            <div className="absolute right-3 top-3 z-1 h-10 w-25">
              <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
            </div>
            
            {/* Imagen principal skeleton */}
            <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden">
              <div className="w-full h-full bg-gray-300 dark:bg-gray-600 animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Contenido skeleton */}
          <div className="pt-5 p-1 flex-grow">
            {/* Título skeleton */}
            <div className="flex items-center mb-4">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-3/4"></div>
            </div>

            {/* Descripción skeleton - 3 líneas con longitudes variadas */}
                      <div className="space-y-3">
            {/* Título del proyecto */}
            <div className={`h-6 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-md animate-pulse ${titleWidth}`} />
            
            {/* Líneas de descripción */}
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-md animate-pulse w-full" />
              <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-md animate-pulse w-5/6" />
              <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-md animate-pulse w-2/3" />
            </div>
            
            {/* Tags/tecnologías */}
            <div className="flex space-x-2 pt-2">
              <div className="h-6 w-16 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-700 rounded-full animate-pulse" />
              <div className="h-6 w-20 bg-gradient-to-r from-green-200 to-green-100 dark:from-green-800 dark:to-green-700 rounded-full animate-pulse" />
              <div className="h-6 w-14 bg-gradient-to-r from-purple-200 to-purple-100 dark:from-purple-800 dark:to-purple-700 rounded-full animate-pulse" />
            </div>
          </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

export default function ProjectsHeaderSkeleton() {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center">
      {/* Breadcrumbs skeleton */}
      <div className="flex flex-col items-center justify-center mb-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-2 mb-4"
        >
          <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
        </motion.div>
      </div>

      {/* Title skeleton */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="h-12 w-64 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mx-auto mb-4"></div>
        <div className="h-6 w-96 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mx-auto"></div>
      </motion.div>
    </div>
  );
}

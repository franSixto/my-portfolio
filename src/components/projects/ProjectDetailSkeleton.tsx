"use client";

import { motion } from "framer-motion";

export default function ProjectDetailSkeleton() {
  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="dark:bg-gray-950"
    >
      <div className="container mx-auto px-6 py-12">
        {/* Title and description skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse w-3/4 mx-auto mb-6" />
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-md animate-pulse w-full" />
            <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-md animate-pulse w-5/6 mx-auto" />
          </div>
        </div>

        {/* Logo banner skeleton */}
        <div className="flex justify-center mb-12">
          <div className="h-20 w-48 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse" />
        </div>

        {/* Main image skeleton */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <div className="w-full aspect-[16/9] bg-gradient-to-br from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl animate-pulse flex items-center justify-center">
            <div className="w-24 h-24 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Live project button skeleton */}
        <div className="flex justify-center mb-12">
          <div className="h-12 w-40 bg-gradient-to-r from-blue-300 to-blue-200 dark:from-blue-700 dark:to-blue-600 rounded-lg animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Paragraph 1 */}
          <div className="space-y-3">
            <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse w-full" />
            <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse w-11/12" />
            <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse w-10/12" />
            <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse w-9/12" />
          </div>

          {/* Subtitle skeleton */}
          <div className="h-8 bg-gradient-to-r from-gray-400 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-md animate-pulse w-2/3" />

          {/* Paragraph 2 */}
          <div className="space-y-3">
            <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse w-full" />
            <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse w-10/12" />
            <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse w-11/12" />
          </div>

          {/* List skeleton */}
          <div className="space-y-2 pl-6">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" />
              <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse w-4/5" />
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" />
              <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse w-3/4" />
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" />
              <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse w-5/6" />
            </div>
          </div>

          {/* Final paragraph */}
          <div className="space-y-3">
            <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse w-full" />
            <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse w-4/5" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

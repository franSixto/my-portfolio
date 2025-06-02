"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface ProjectLogoBannerProps {
  logoUrl: string;
  logoAlt: string;
}

const ProjectLogoBanner: React.FC<ProjectLogoBannerProps> = ({ logoUrl, logoAlt }) => {
  return (
    <motion.div
      className="flex flex-row items-center justify-between max-w-2xl mx-auto my-6 p-3 ps-5 bg-gray-100 dark:bg-gray-900 rounded-xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative text-gray-700 dark:text-gray-300 pe-2">
        <span className="text-lg font-medium">Made for</span>
      </div>
      <Image
        src={logoUrl}
        alt={logoAlt}
        width={80}
        height={80}
        className="object-contain bg-white rounded-lg shadow-lg p-2 w-40 h-15"
      />
    </motion.div>
  );
};

export default ProjectLogoBanner;

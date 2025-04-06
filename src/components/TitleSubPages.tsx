"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

type TitleSubPagesProps = {
  title: string;
  description: string;
};

export const TitleSubPages: React.FC<TitleSubPagesProps> = ({ title, description }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      className="mb-12 text-center"
      initial={{ opacity: 0, y: -10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      ref={ref}
    >
      <motion.h1
        className="text-5xl font-extrabold text-red-600 dark:text-red-500 uppercase mb-2 pt-10"
        initial={{ scale: 0.8 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-xl max-w-2xl mx-auto leading-relaxed dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
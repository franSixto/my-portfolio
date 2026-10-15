"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

type TitleH1PagesProps = {
  title: string;
  description: string;
};

export const TitleH1Project: React.FC<TitleH1PagesProps> = ({ title, description }) => {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <motion.div
      className="mb-12 text-center px-4"
      initial={{ opacity: 0, y: -10 }}
      whileInView={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      ref={ref}
    >
      <motion.h1
        className={`text-2xl max-w-6xl mx-auto lg:text-4xl font-extrabold text-accent uppercase mb-2`}
        initial={{ y: -10 }}
        whileInView={inView ? { y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-md max-w-4xl mx-auto leading-relaxed dark:text-gray-400"
        initial={{ y: -10 }}
        whileInView={inView ? { y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
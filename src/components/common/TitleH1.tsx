"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";
import { useColorContext, COLOR_GRADIENT_MAP } from '../theme/ColorContext';

type TitleH1PagesProps = {
  title: string;
  description: string;
};

export const TitleH1: React.FC<TitleH1PagesProps> = ({ title, description }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { mainColor } = useColorContext();
  const gradient = COLOR_GRADIENT_MAP[mainColor] || COLOR_GRADIENT_MAP.red;

  return (
    <motion.div
      className="mb-12 text-center"
      initial={{ opacity: 0, y: -10 }}
      whileInView={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.8 }}
      ref={ref}
    >
      <motion.h1
        className={`text-4xl lg:text-6xl xl:text-8xl font-extrabold bg-gradient-to-r ${gradient.from} ${gradient.to} text-transparent bg-clip-text uppercase mb-2 leading-8 lg:leading-11 xl:leading-20 transition-colors duration-300`}
        initial={{ scale: 0.8 }}
        whileInView={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-xl max-w-2xl mx-auto leading-relaxed dark:text-gray-400"
        initial={{ opacity: 0 }}
        whileInView={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
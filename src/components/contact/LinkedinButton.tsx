"use client";

import Link from "next/link";
import { SiLinkedin } from "react-icons/si";
import { motion } from "framer-motion";

export default function LinkedinButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <Link
        href="https://www.linkedin.com/in/sixtofrancisco/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 mb-4 px-4 py-2 rounded-2xl bg-neutral-100 dark:bg-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md transition-shadow text-md z-2"
      >
        <SiLinkedin className="text-blue-500" /> Connect with me on LinkedIn
      </Link>
    </motion.div>
  );
}

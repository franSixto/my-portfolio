'use client'
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { motion } from 'framer-motion';

export default function ThemeSelect() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Evitar problemas de hidratación

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}>
      <button
        onClick={() => {
          const newTheme = resolvedTheme === "light" ? "dark" : "light";
          setTheme(newTheme);
          localStorage.setItem('theme', newTheme); // Guardar el tema seleccionado
        }}
        className="p-2 w-[50px] h-[50px] flex justify-center items-center rounded-full bg-red-100 dark:bg-red-500/10"
        title="theme switcher"
      >
        {resolvedTheme === "light" ? (
          <span className="text-gray-800">
            <RiMoonLine className='text-2xl' />
          </span>
        ) : (
          <span className="text-gray-200">
            <RiSunLine className='text-2xl' />
          </span>
        )}
      </button>
    </motion.div>
  );
}
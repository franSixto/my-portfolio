'use client'
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { motion } from 'framer-motion';
import { useColorContext, COLOR_CLASS_MAP } from './ColorContext';

export default function ThemeSelect() {
  const { resolvedTheme, setTheme } = useTheme();
  const { mainColor } = useColorContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Reservar espacio mientras se monta para evitar Layout Shift
    return (
      <div className={`p-2 w-[45px] h-[45px] flex justify-center items-center rounded-full backdrop-blur-sm ${COLOR_CLASS_MAP[mainColor]}`}>
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}>
      <button
        onClick={() => {
          const newTheme = resolvedTheme === "light" ? "dark" : "light";
          setTheme(newTheme);
          localStorage.setItem('theme', newTheme); // Guardar el tema seleccionado
        }}
        className={`p-2 w-[45px] h-[45px] flex justify-center items-center rounded-full backdrop-blur-sm ${COLOR_CLASS_MAP[mainColor]} cursor-pointer`}
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
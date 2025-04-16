'use client'
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { RiSunLine, RiMoonLine } from "react-icons/ri";

export default function ThemeSelect() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Evitar problemas de hidratación

  return (
    <div className="w-[50px] h-[50px]">
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
    </div>
  );
}
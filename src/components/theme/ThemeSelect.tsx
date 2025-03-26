'use client'
import { useTheme } from 'next-themes'
import { RiSunLine, RiMoonLine } from "react-icons/ri";

export default function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 w-[50px] h-[50px] flex justify-center items-center rounded-full bg-gray-50 dark:bg-gray-800"
      title="theme switcher"
    >
      {theme === "light" ? (
        <span className="text-red-500">
          <RiSunLine className='text-2xl'/>
        </span>
      ) : (
        <span className="text-red-500">
          <RiMoonLine className='text-2xl' />
        </span>
      )}
    </button>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useColorContext, TAILWIND_COLORS } from '@/components/theme/ColorContext';
import { motion } from "framer-motion";

const colorHexMap: Record<string, string> = {
  red: '#ef4444', rose: '#f43f5e', pink: '#ec4899', fuchsia: '#d946ef',
  purple: '#a21caf', violet: '#8b5cf6', indigo: '#6366f1', blue: '#3b82f6',
  sky: '#0ea5e9', cyan: '#06b6d4', teal: '#14b8a6', emerald: '#10b981',
  green: '#22c55e', lime: '#84cc16', yellow: '#eab308', amber: '#f59e42',
  orange: '#f59e42', stone: '#78716c', slate: '#64748b',
};

// Componente que simula una minilotería de color y lo setea la primera vez
export default function ColorLottery({ showText = false }: { showText?: boolean }) {
  const { mainColor, setMainColor } = useColorContext();
  const [isDone, setIsDone] = useState(false);
  const [currentColor, setCurrentColor] = useState(mainColor);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Siempre mostrar la lotería al entrar
    setShow(true);
    let i = 0;
    const interval = setInterval(() => {
      setCurrentColor(TAILWIND_COLORS[i % TAILWIND_COLORS.length]);
      i++;
    }, 60);
    setTimeout(() => {
      clearInterval(interval);
      const randomColor = TAILWIND_COLORS[Math.floor(Math.random() * TAILWIND_COLORS.length)];
      setCurrentColor(randomColor);
      setMainColor(randomColor);
      localStorage.setItem('mainColor', randomColor);
      setTimeout(() => {
        setIsDone(true);
      }, 600);
    }, 1200);
  }, [setMainColor]);

  if (isDone) return null;
  if (!show) return null;

  return (
    <motion.div
      className="flex flex-col items-center gap-4 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {showText && (
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Choosing your color...</span>
      )}
      <div style={{ background: colorHexMap[currentColor] || '#ef4444' }} className="w-16 h-16 rounded-full border-4 border-gray-300 shadow-lg transition-colors duration-200" />
      <span className="text-base font-medium mt-2 capitalize text-gray-700 dark:text-gray-200">{currentColor}</span>
    </motion.div>
  );
}

'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Lista de colores tailwind principales ordenada por escala cromática
export const TAILWIND_COLORS = [
  'red', 'rose', 'pink', 'fuchsia', 'purple', 'violet', 'indigo', 'blue', 'sky', 'cyan', 'teal', 'emerald', 'green', 'lime', 'yellow', 'amber', 'orange', 'stone', 'slate'
];

export type MainColor = typeof TAILWIND_COLORS[number];

interface ColorContextProps {
  mainColor: MainColor;
  setMainColor: (color: MainColor) => void;
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

export const useColorContext = () => {
  const ctx = useContext(ColorContext);
  if (!ctx) throw new Error('useColorContext debe usarse dentro de ColorProvider');
  return ctx;
};

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [mainColor, setMainColor] = useState<MainColor>('red');
  return (
    <ColorContext.Provider value={{ mainColor, setMainColor }}>
      {children}
    </ColorContext.Provider>
  );
};

// Mapeo explícito de clases tailwind para cada color principal
export const COLOR_CLASS_MAP: Record<MainColor, string> = {
  red: 'bg-red-100 hover:bg-red-200 dark:bg-red-500/10 dark:hover:bg-red-500/30',
  blue: 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-500/10 dark:hover:bg-blue-500/30',
  green: 'bg-green-100 hover:bg-green-200 dark:bg-green-500/10 dark:hover:bg-green-500/30',
  yellow: 'bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-500/10 dark:hover:bg-yellow-500/30',
  purple: 'bg-purple-100 hover:bg-purple-200 dark:bg-purple-500/10 dark:hover:bg-purple-500/30',
  pink: 'bg-pink-100 hover:bg-pink-200 dark:bg-pink-500/10 dark:hover:bg-pink-500/30',
  indigo: 'bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/30',
  teal: 'bg-teal-100 hover:bg-teal-200 dark:bg-teal-500/10 dark:hover:bg-teal-500/30',
  orange: 'bg-orange-100 hover:bg-orange-200 dark:bg-orange-500/10 dark:hover:bg-orange-500/30',
  cyan: 'bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/30',
  emerald: 'bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/30',
  lime: 'bg-lime-100 hover:bg-lime-200 dark:bg-lime-500/10 dark:hover:bg-lime-500/30',
  amber: 'bg-amber-100 hover:bg-amber-200 dark:bg-amber-500/10 dark:hover:bg-amber-500/30',
  violet: 'bg-violet-100 hover:bg-violet-200 dark:bg-violet-500/10 dark:hover:bg-violet-500/30',
  fuchsia: 'bg-fuchsia-100 hover:bg-fuchsia-200 dark:bg-fuchsia-500/10 dark:hover:bg-fuchsia-500/30',
  rose: 'bg-rose-100 hover:bg-rose-200 dark:bg-rose-500/10 dark:hover:bg-rose-500/30',
  sky: 'bg-sky-100 hover:bg-sky-200 dark:bg-sky-500/10 dark:hover:bg-sky-500/30',
  slate: 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-500/10 dark:hover:bg-slate-500/30',
  stone: 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-500/10 dark:hover:bg-stone-500/30',
};

// Mapeo explícito de clases tailwind para bordes
export const COLOR_BORDER_CLASS_MAP: Record<MainColor, string> = {
  red: 'border-red-500', 
  blue: 'border-blue-500', 
  green: 'border-green-500', 
  yellow: 'border-yellow-500',
  purple: 'border-purple-500', 
  pink: 'border-pink-500', 
  indigo: 'border-indigo-500', 
  teal: 'border-teal-500',
  orange: 'border-orange-500', 
  cyan: 'border-cyan-500', 
  emerald: 'border-emerald-500', 
  lime: 'border-lime-500',
  amber: 'border-amber-500', 
  violet: 'border-violet-500', 
  fuchsia: 'border-fuchsia-500', 
  rose: 'border-rose-500',
  sky: 'border-sky-500', 
  slate: 'border-slate-500', 
  stone: 'border-stone-500',
};

// Mapeo explícito de clases tailwind para sombras
export const COLOR_SHADOW_CLASS_MAP: Record<MainColor, string> = {
  red: 'shadow-red-400', 
  blue: 'shadow-blue-400', 
  green: 'shadow-green-400', 
  yellow: 'shadow-yellow-400',
  purple: 'shadow-purple-400', 
  pink: 'shadow-pink-400', 
  indigo: 'shadow-indigo-400', 
  teal: 'shadow-teal-400',
  orange: 'shadow-orange-400', 
  cyan: 'shadow-cyan-400', 
  emerald: 'shadow-emerald-400', 
  lime: 'shadow-lime-400',
  amber: 'shadow-amber-400', 
  violet: 'shadow-violet-400', 
  fuchsia: 'shadow-fuchsia-400', 
  rose: 'shadow-rose-400',
  sky: 'shadow-sky-400', 
  slate: 'shadow-slate-400', 
  stone: 'shadow-stone-400',
};

// Mapeo explícito de clases tailwind para texto
export const COLOR_TEXT_CLASS_MAP: Record<MainColor, string> = {
  red: 'text-red-500', 
  blue: 'text-blue-500', 
  green: 'text-green-500', 
  yellow: 'text-yellow-500',
  purple: 'text-purple-500', 
  pink: 'text-pink-500', 
  indigo: 'text-indigo-500', 
  teal: 'text-teal-500',
  orange: 'text-orange-500', 
  cyan: 'text-cyan-500', 
  emerald: 'text-emerald-500', 
  lime: 'text-lime-500',
  amber: 'text-amber-500', 
  violet: 'text-violet-500', 
  fuchsia: 'text-fuchsia-500', 
  rose: 'text-rose-500',
  sky: 'text-sky-500', 
  slate: 'text-slate-500', 
  stone: 'text-stone-500',
};

// Mapeo explícito de gradientes para títulos
export const COLOR_GRADIENT_MAP: Record<MainColor, { from: string; to: string }> = {
  red: { from: 'from-red-300', to: 'to-red-700' },
  blue: { from: 'from-blue-300', to: 'to-blue-700' },
  green: { from: 'from-green-300', to: 'to-green-700' },
  yellow: { from: 'from-yellow-300', to: 'to-yellow-700' },
  purple: { from: 'from-purple-300', to: 'to-purple-700' },
  pink: { from: 'from-pink-300', to: 'to-pink-700' },
  indigo: { from: 'from-indigo-300', to: 'to-indigo-700' },
  teal: { from: 'from-teal-300', to: 'to-teal-700' },
  orange: { from: 'from-orange-300', to: 'to-orange-700' },
  cyan: { from: 'from-cyan-300', to: 'to-cyan-700' },
  emerald: { from: 'from-emerald-300', to: 'to-emerald-700' },
  lime: { from: 'from-lime-300', to: 'to-lime-700' },
  amber: { from: 'from-amber-300', to: 'to-amber-700' },
  violet: { from: 'from-violet-300', to: 'to-violet-700' },
  fuchsia: { from: 'from-fuchsia-300', to: 'to-fuchsia-700' },
  rose: { from: 'from-rose-300', to: 'to-rose-700' },
  sky: { from: 'from-sky-300', to: 'to-sky-700' },
  slate: { from: 'from-slate-300', to: 'to-slate-700' },
  stone: { from: 'from-stone-300', to: 'to-stone-700' },
};

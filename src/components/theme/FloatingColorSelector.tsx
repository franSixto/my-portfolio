'use client';

import React, { useRef, useState } from 'react';
import { FaPalette } from 'react-icons/fa';
import { useColorContext, TAILWIND_COLORS, COLOR_BORDER_CLASS_MAP, MainColor } from './ColorContext';
import { motion } from 'framer-motion';
import { COLOR_CLASS_MAP } from './ColorContext';
const colorMap: Record<MainColor, string> = {
    red: 'bg-red-500', rose: 'bg-rose-500', pink: 'bg-pink-500', fuchsia: 'bg-fuchsia-500',
    purple: 'bg-purple-500', violet: 'bg-violet-500', indigo: 'bg-indigo-500', blue: 'bg-blue-500',
    sky: 'bg-sky-500', cyan: 'bg-cyan-500', teal: 'bg-teal-500', emerald: 'bg-emerald-500',
    green: 'bg-green-500', lime: 'bg-lime-500', yellow: 'bg-yellow-400', amber: 'bg-amber-400',
    orange: 'bg-orange-500', stone: 'bg-stone-500', slate: 'bg-slate-500',
};

export default function FloatingColorSelector() {
    const { mainColor, setMainColor } = useColorContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const [open, setOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);

    // Persistencia del color en localStorage
    React.useEffect(() => {
        // Al montar, intenta cargar el color guardado
        const savedColor = typeof window !== 'undefined' ? localStorage.getItem('mainColor') : null;
        if (savedColor && TAILWIND_COLORS.includes(savedColor as MainColor)) {
            setMainColor(savedColor as MainColor);
        }
    }, [setMainColor]);

    React.useEffect(() => {
        // Cada vez que cambia el color, lo guarda
        if (mainColor) {
            localStorage.setItem('mainColor', mainColor);
        }
    }, [mainColor]);

    // Detectar el color según la posición del mouse/touch
    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        let x = clientX - rect.left;
        // Clamp x to [0, rect.width]
        x = Math.max(0, Math.min(rect.width, x));
        const percent = x / rect.width;
        const idx = Math.floor(percent * TAILWIND_COLORS.length);
        setMainColor(TAILWIND_COLORS[Math.min(idx, TAILWIND_COLORS.length - 1)]);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        handleMove(e.clientX);
    };
    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging.current) handleMove(e.clientX);
    };
    const handleMouseUp = () => {
        isDragging.current = false;
    };
    const handleTouchStart = (e: React.TouchEvent) => {
        isDragging.current = true;
        handleMove(e.touches[0].clientX);
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging.current) handleMove(e.touches[0].clientX);
    };
    const handleTouchEnd = () => {
        isDragging.current = false;
    };

    // Manejo de animación de entrada/salida
    const handleToggle = () => {
        if (!open) {
            setOpen(true);
            setShowContent(true);
        } else {
            setOpen(false);
            setTimeout(() => setShowContent(false), 500); // 500ms igual a duration-500
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 select-none">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 w-[50px] h-[50px] flex justify-center items-center rounded-full ${COLOR_CLASS_MAP[mainColor]} cursor-pointer`}
                onClick={handleToggle}
                aria-expanded={open}
            >
                <FaPalette />
            </motion.button>
            <div className="absolute top-30 z-50 d-flex flex-col items-center justify-center">
                <div
                    className={`p-4 border bg-white dark:bg-gray-950 ${COLOR_BORDER_CLASS_MAP[mainColor]} rounded transition-all duration-500 overflow-hidden w-full ${open ? 'max-h-[200px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'}`}
                >
                    {showContent && (
                        <>
                            {/* Botón de cierre (cruz) */}
                            <button
                                className="absolute right-1 top-1 z-50 p-1 cursor-pointer rounded-full bg-white/80 hover:bg-white dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 transition"
                                aria-label="Cerrar selector de color"
                                onClick={handleToggle}
                                type="button"
                            >
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                    <path d="M6 6L14 14M14 6L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                            
                            <span className="text-xs text-neutral-500 mt-1">Drag the circle to select a color</span>
                            <div
                                ref={containerRef}
                                className="relative w-[320px] h-5 bg-white dark:bg-neutral-900 shadow-lg rounded-full flex items-center border border-neutral-200 dark:border-neutral-700 cursor-pointer mt-2"
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                {/* Indicador dragueable */}
                                <div
                                    className={`absolute top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border-4 border-black bg-gray-950 dark:border-white dark:bg-gray-100 pointer-events-none transition-transform duration-200`}
                                    style={{
                                        left: `calc(${(TAILWIND_COLORS.indexOf(mainColor) / (TAILWIND_COLORS.length - 1)) * 100}% - 12px )`,
                                    }}
                                />
                            </div>
                            <div className="relative gap-1 w-[320px] h-10 flex items-center justify-between my-1">
                                {TAILWIND_COLORS.map((color, i) => (
                                    <div
                                        key={color}
                                        className={`h-3 w-3 rounded-full ${colorMap[color]} border-2 ${mainColor === color ? 'border-black dark:border-white scale-110 z-10' : 'border-transparent'} transition-transform duration-200`}
                                    />
                                ))}
                            </div>
                            <span className={`p-2 rounded bg-${mainColor}-100 text-xs text-${mainColor}-500 mt-1`}>Current color: <b>{mainColor}</b></span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

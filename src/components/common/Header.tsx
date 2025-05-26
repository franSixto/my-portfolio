"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ThemeSelect from "@/components/theme/ThemeSelect";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavMobile from "@/components/common/NavMobile";
import { RiMenuLine } from "react-icons/ri";
import { useColorContext, COLOR_CLASS_MAP, TAILWIND_COLORS } from '@/components/theme/ColorContext';
import FloatingColorSelector from "@/components/theme/FloatingColorSelector";
import React, { useRef } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [partyMode, setPartyMode] = useState(false);
    const [showPartyWarning, setShowPartyWarning] = useState(false);
    const partyInterval = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const pathname = usePathname();
    const { mainColor, setMainColor } = useColorContext();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path: string) => pathname === path;

    // Party mode effect
    React.useEffect(() => {
        if (partyMode) {
            partyInterval.current = setInterval(() => {
                const randomColor = TAILWIND_COLORS[Math.floor(Math.random() * TAILWIND_COLORS.length)];
                setMainColor(randomColor);
            }, 300);
            // Reproducir audio
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } else {
            if (partyInterval.current) {
                clearInterval(partyInterval.current);
                partyInterval.current = null;
            }
            // Pausar audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
        return () => {
            if (partyInterval.current) {
                clearInterval(partyInterval.current);
                partyInterval.current = null;
            }
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [partyMode, setMainColor]);

    return (
        <>
            <header className="bg-gray-50 text-black dark:bg-gray-950 dark:text-white transition-colors duration-300 py-4">
                <nav className="container mx-auto flex justify-between items-center px-6">
                    <Link href="/">
                        <Image
                            className="dark:invert rotate-350"
                            src="/logo.svg"
                            alt="Fran Sixto"
                            width={180}
                            height={89}
                            priority
                        />
                    </Link>
                    <ul className="hidden lg:flex space-x-6">
                        <li className="menu-item">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link
                                    href="/"
                                    className={`hover:text-gray-500 dark:hover:text-gray-300 ${isActive("/") ? "font-bold" : ""
                                        }`}
                                >
                                    Home
                                </Link>
                            </motion.div>
                        </li>
                        <li className="menu-item">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link
                                    href="/about"
                                    className={`hover:text-gray-500 dark:hover:text-gray-300 ${isActive("/about") ? "font-bold" : ""
                                        }`}
                                >
                                    About
                                </Link>
                            </motion.div>
                        </li>
                        <li className="menu-item">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link
                                    href="/projects"
                                    className={`hover:text-gray-500 dark:hover:text-gray-300 ${isActive("/projects") ? "font-bold" : ""
                                        }`}
                                >
                                    Projects
                                </Link>
                            </motion.div>
                        </li>
                        <li>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link
                                    href="/contact"
                                    className={`hover:text-gray-500 dark:hover:text-gray-300 ${isActive("/contact") ? "font-bold" : ""
                                        }`}
                                >
                                    Contact
                                </Link>
                            </motion.div>
                        </li>
                    </ul>
                    <div className="flex items-center justify-end space-x-4 w-[180px]">
                        <FloatingColorSelector />
                        {/* Party Mode Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-pressed={partyMode}
                            title={partyMode ? 'Desactivar Party Mode' : 'Activar Party Mode'}
                            className={`p-2 w-[50px] h-[50px] flex justify-center items-center rounded-full border transition-colors duration-200 ${partyMode ? 'bg-yellow-200 border-yellow-500 animate-pulse' : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700'}`}
                            onClick={() => {
                                if (!partyMode) {
                                    setShowPartyWarning(true);
                                } else {
                                    setPartyMode(false);
                                }
                            }}
                        >
                            <span className="text-2xl">🎉</span>
                        </motion.button>
                        <audio ref={audioRef} src="/brazil-funk-1.mp3" loop style={{ display: 'none' }} />
                        {/* Modal de advertencia Party Mode */}
                        {showPartyWarning && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl max-w-xs text-center">
                                    <h2 className="text-lg font-bold mb-2 text-red-600">¡Atención!</h2>
                                    <p className="mb-4 text-sm">Este modo es realmente molesto, la peor experiencia de usuario pero es divertido, muy divertido. Por favor pruébalo si no tienes inconvenientes con colores flasheando.</p>
                                    <div className="flex gap-3 justify-center">
                                        <button
                                            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                                            onClick={() => { setShowPartyWarning(false); setPartyMode(true); }}
                                        >¡Activar Party Mode!</button>
                                        <button
                                            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                                            onClick={() => setShowPartyWarning(false)}
                                        >Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className="w-[50px] h-[50px] block">
                                <ThemeSelect />
                            </div>
                        </motion.div>
                        <div className="lg:hidden">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleMenu}
                                className={`p-2 w-[50px] h-[50px] flex justify-center items-center rounded-full ${COLOR_CLASS_MAP[mainColor]}`}
                            >
                                <RiMenuLine />
                            </motion.button>
                        </div>

                    </div>
                </nav>

                {isMenuOpen && <NavMobile isMenuOpen={isMenuOpen} isActive={isActive} toggleMenu={toggleMenu} />}
            </header>
        </>
    );
}
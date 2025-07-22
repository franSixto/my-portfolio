"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ThemeSelect from "@/components/theme/ThemeSelect";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavMobile from "@/components/common/NavMobile";
import { RiMenuLine } from "react-icons/ri";
import { useColorContext, COLOR_CLASS_MAP } from '@/components/theme/ColorContext';
import FloatingColorSelector from "@/components/theme/FloatingColorSelector";
// import PartyModeButton from "@/components/common/PartyModeButton";
import LanguageSelector from "@/components/common/LanguageSelector";
import { useTranslation } from '@/contexts/LanguageContext';
import { useRTL } from '@/hooks/useRTL';

export default function Header() {
    const { t } = useTranslation();
    const { rtlClass } = useRTL();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { mainColor } = useColorContext();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path: string) => pathname === path;

    return (
        <>
            <div className="flex justify-center bg-gray-50 dark:bg-gray-950 px-10 mx-10">
                <header className="max-header z-50 mt-4 fixed w-full text-black dark:text-white transition-colors duration-300 py-4 rounded-full">
                    {/* Liquid Glass Effect Layers */}
                    <div className="liquidGlass-effect rounded-full"></div>
                    <div className="liquidGlass-tint rounded-full"></div>
                    <div className="liquidGlass-shine rounded-full"></div>
                    
                    <nav className="w-full mx-auto flex justify-between items-center px-4 lg:px-2 z-50 relative">
                        <Link className="flex flex-row items-center rounded-full backdrop-blur-sm py-4 px-4 lg:px-6" href="/">
                            <Image
                                className="dark:invert"
                                src="/logo2.svg"
                                alt="Fran Sixto"
                                width={45}
                                height={45}
                                priority
                            />
                            <span className="hidden lg:inline-block">
                            Francisco Sixto
                            </span>
                        </Link>
                        <ul className={rtlClass("hidden backdrop-blur-sm p-6 rounded-full lg:flex space-x-6")}>
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
                                        {t('navigation.home')}
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
                                        {t('navigation.about')}
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
                                        {t('navigation.projects')}
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
                                        {t('navigation.contact')}
                                    </Link>
                                </motion.div>
                            </li>
                        </ul>
                        <div className={rtlClass("flex items-center justify-end space-x-2")}>
                            <LanguageSelector />
                            <FloatingColorSelector />
                            {/* Party Mode Button extraído a componente */}
                            {/* <PartyModeButton /> */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div className="block">
                                    <ThemeSelect />
                                </div>
                            </motion.div>
                            <div className="lg:hidden">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={toggleMenu}
                                    className={`p-2 w-[45px] h-[45px] flex justify-center items-center backdrop-blur-sm rounded-full ${COLOR_CLASS_MAP[mainColor]}`}
                                >
                                    <RiMenuLine />
                                </motion.button>
                            </div>

                        </div>
                    </nav>

                    {isMenuOpen && <NavMobile isMenuOpen={isMenuOpen} isActive={isActive} toggleMenu={toggleMenu} />}
                </header>
            </div>
        </>
    );
}
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
import PartyModeButton from "@/components/common/PartyModeButton";
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
            <header className="bg-gray-50 text-black dark:bg-gray-950 dark:text-white transition-colors duration-300 py-4">
                <nav className="container mx-auto flex justify-between items-center px-6 z-50">
                    <Link href="/">
                        <Image
                            className="dark:invert"
                            src="/logo2.svg"
                            alt="Fran Sixto"
                            width={60}
                            height={60}
                            priority
                        />
                    </Link>
                    <ul className={rtlClass("hidden lg:flex space-x-6")}>
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
                    <div className={rtlClass("flex items-center justify-end space-x-4 w-[180px]")}>
                        <LanguageSelector />
                        <FloatingColorSelector />
                        {/* Party Mode Button extraído a componente */}
                        <PartyModeButton />
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
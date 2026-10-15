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
import PartyModeManager from "@/components/common/PartyModeButton";
import LanguageSelector from "@/components/common/LanguageSelector";
import { useLanguage } from '@/contexts/LanguageContext';
import { matchRoute, type RouteKey } from '@/i18n/routes';

const NAV_ITEMS: ReadonlyArray<{ route: RouteKey; labelKey: string; hash?: string }> = [
    { route: "home", labelKey: "navigation.home" },
    // Anchor to the home services section, which links to the four service pages
    { route: "home", labelKey: "navigation.services", hash: "#services" },
    { route: "about", labelKey: "navigation.about" },
    { route: "projects", labelKey: "navigation.projects" },
    { route: "contact", labelKey: "navigation.contact" },
] as const;

// Desktop navigation: hrefs come from the central route map
function NavigationLinks({ isActive }: { isActive: (route: RouteKey) => boolean }) {
    const { t, localePath } = useLanguage();

    return (
        <ul className="hidden backdrop-blur-sm p-6 py-2 rounded-xl lg:flex space-x-6">
            {NAV_ITEMS.map(({ route, labelKey, hash }) => (
                <li key={labelKey} className="menu-item">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Link
                            href={`${localePath(route)}${hash ?? ""}`}
                            className={`hover:text-gray-500 dark:hover:text-gray-300 ${!hash && isActive(route) ? "font-bold" : ""
                                }`}
                        >
                            {t(labelKey)}
                        </Link>
                    </motion.div>
                </li>
            ))}
        </ul>
    );
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { mainColor } = useColorContext();
    const { localePath } = useLanguage();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const currentRoute = matchRoute(pathname)?.key;
    const isActive = (route: RouteKey) => currentRoute === route;

    return (
        <>
            <div className="flex justify-center bg-gray-50 dark:bg-gray-950 px-4 md:px-10 mx-4 md:mx-10 overflow-x-hidden">
                <header className="max-header z-50 mt-4 fixed w-full text-black dark:text-white transition-colors duration-300 py-1 rounded-full">
                    {/* Liquid Glass Effect Layers */}
                    <div className="liquidGlass-effect rounded-2xl"></div>
                    <div className="liquidGlass-tint rounded-2xl"></div>
                    <div className="liquidGlass-shine rounded-2xl"></div>

                    <nav className="w-full mx-auto flex justify-between items-center px-4 lg:px-2 z-50 relative">
                        <Link className="flex flex-row items-center rounded-xl lg:backdrop-blur-sm p-2 lg:px-6" href={localePath('home')}>
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
                        
                        <NavigationLinks isActive={isActive} />
                        
                        <div className="flex items-center justify-end space-x-2">
                            <LanguageSelector />
                            <FloatingColorSelector />
                            <PartyModeManager />
                            <div className="block">
                                <ThemeSelect />
                            </div>
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
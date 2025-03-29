"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ThemeSelect from "./theme/ThemeSelect";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavMobile from "./NavMobile";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path: string) => pathname === path;

    return (
        <>
            <header className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 py-4">
                <nav className="container mx-auto flex justify-between items-center px-6">
                    <Image
                        className="dark:invert"
                        src="/logo.svg"
                        alt="Fran Sixto"
                        width={234}
                        height={24}
                        priority
                    />
                    <div className="lg:hidden">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleMenu}
                            className="text-black dark:text-white focus:outline-none"
                        >
                            <span>{isMenuOpen ? "✖" : "☰"}</span>
                        </motion.button>
                    </div>
                    <ul className="hidden lg:flex space-x-6">
                        <li className="menu-item">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link
                                    href="/"
                                    className={`hover:text-gray-500 dark:hover:text-gray-300 ${
                                        isActive("/") ? "font-bold" : ""
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
                                    className={`hover:text-gray-500 dark:hover:text-gray-300 ${
                                        isActive("/about") ? "font-bold" : ""
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
                                    className={`hover:text-gray-500 dark:hover:text-gray-300 ${
                                        isActive("/projects") ? "font-bold" : ""
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
                                    className={`hover:text-gray-500 dark:hover:text-gray-300 ${
                                        isActive("/contact") ? "font-bold" : ""
                                    }`}
                                >
                                    Contact
                                </Link>
                            </motion.div>
                        </li>
                    </ul>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ThemeSelect />
                    </motion.div>
                </nav>
                {isMenuOpen && <NavMobile isMenuOpen={isMenuOpen} isActive={isActive} toggleMenu={toggleMenu} />}
            </header>
        </>
    );
}
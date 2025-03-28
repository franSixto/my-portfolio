"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ThemeSelect from "./theme/ThemeSelect";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
                        <li className="menu-item">
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
                {isMenuOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="relative w-64 h-64 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center"
                        >
                            <button
                                onClick={toggleMenu}
                                className="absolute top-2 right-2 text-black dark:text-white focus:outline-none z-60"
                            >
                                ✖
                            </button>
                            <ul className="relative w-full h-full">
                                <li className="absolute top-4 left-1/2 transform -translate-x-1/2">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Link
                                            href="/"
                                            className={`hover:text-gray-500 dark:hover:text-gray-300 ${
                                                isActive("/") ? "font-bold text-red-600" : ""
                                            }`}
                                            onClick={toggleMenu}
                                        >
                                            Home
                                        </Link>
                                    </motion.div>
                                </li>
                                <li className="absolute top-1/2 left-4 transform -translate-y-1/2">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Link
                                            href="/about"
                                            className={`hover:text-gray-500 dark:hover:text-gray-300 ${
                                                isActive("/about") ? "font-bold text-red-600" : ""
                                            }`}
                                            onClick={toggleMenu}
                                        >
                                            About
                                        </Link>
                                    </motion.div>
                                </li>
                                <li className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Link
                                            href="/projects"
                                            className={`hover:text-gray-500 dark:hover:text-gray-300 ${
                                                isActive("/projects") ? "font-bold text-red-600-600" : ""
                                            }`}
                                            onClick={toggleMenu}
                                        >
                                            Projects
                                        </Link>
                                    </motion.div>
                                </li>
                                <li className="absolute top-1/2 right-4 transform -translate-y-1/2">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Link
                                            href="/contact"
                                            className={`hover:text-gray-500 dark:hover:text-gray-300 ${
                                                isActive("/contact") ? "font-bold text-red-600" : ""
                                            }`}
                                            onClick={toggleMenu}
                                        >
                                            Contact
                                        </Link>
                                    </motion.div>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                )}
            </header>
        </>
    );
}
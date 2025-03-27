"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ThemeSelect from "./theme/ThemeSelect";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
                        <button
                            onClick={toggleMenu}
                            className="text-black dark:text-white focus:outline-none"
                        >
                            {isMenuOpen ? "✖" : "☰"}
                        </button>
                    </div>
                    <ul className="hidden lg:flex space-x-6">
                        <li className="menu-item"><Link href="/" className="hover:text-gray-500 dark:hover:text-gray-300">Home</Link></li>
                        <li className="menu-item"><Link href="/about" className="hover:text-gray-500 dark:hover:text-gray-300">About</Link></li>
                        <li className="menu-item"><Link href="/projects" className="hover:text-gray-500 dark:hover:text-gray-300">Projects</Link></li>
                        <li className="menu-item"><Link href="/contact" className="hover:text-gray-500 dark:hover:text-gray-300">Contact</Link></li>
                    </ul>
                    <ThemeSelect />
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
                                className="absolute top-2 right-2 text-black dark:text-white focus:outline-none"
                            >
                                ✖
                            </button>
                            <ul className="relative w-full h-full">
                                <li className="absolute top-4 left-1/2 transform -translate-x-1/2">
                                    <Link href="/" className="hover:text-gray-500 dark:hover:text-gray-300" onClick={toggleMenu}>Home</Link>
                                </li>
                                <li className="absolute top-1/2 left-4 transform -translate-y-1/2">
                                    <Link href="/about" className="hover:text-gray-500 dark:hover:text-gray-300" onClick={toggleMenu}>About</Link>
                                </li>
                                <li className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                    <Link href="/projects" className="hover:text-gray-500 dark:hover:text-gray-300" onClick={toggleMenu}>Projects</Link>
                                </li>
                                <li className="absolute top-1/2 right-4 transform -translate-y-1/2">
                                    <Link href="/contact" className="hover:text-gray-500 dark:hover:text-gray-300" onClick={toggleMenu}>Contact</Link>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                )}
            </header>
        </>
    );
}
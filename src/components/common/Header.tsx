"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ThemeSelect from "@/components/theme/ThemeSelect";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavMobile from "@/components/common/NavMobile";
import { RiMenuLine } from "react-icons/ri";

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
                    <Link href="/">
                        <Image
                            className="dark:invert rotate-350"
                            src="/logo.svg"
                            alt="Fran Sixto"
                            width={180}
                            height={24}
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
                    <div className="flex items-center space-x-4">
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
                                className="p-2 w-[50px] h-[50px] flex justify-center items-center rounded-full bg-red-100 dark:bg-red-500/10"
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
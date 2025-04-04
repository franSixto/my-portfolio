"use client";

import { RiArrowRightLine, RiDownloadLine } from "react-icons/ri";
import ThreeHero from "@/components/ThreeHero"; // Ensure ThreeHero is a default export in its file
import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense } from "react";

const Hero: React.FC = () => {
    return (
        <section className="py-10 lg:py-20 w-full">
            <div className="container mx-auto px-0 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
                <div className="px-6 lg:px-0">
                    <motion.h1
                        className="text-center lg:text-start text-4xl lg:text-6xl xl:text-8xl uppercase bg-gradient-to-r from-red-400 to-red-600 inline-block text-transparent bg-clip-text font-bold lg:leading-11 xl:leading-17"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.42, 0, 0.58, 1] }} // Use a custom cubic-bezier easing for smoother animation
                    >
                        Building Impactful Digital Experiences
                    </motion.h1>
                    <motion.p
                        className="text-center lg:text-start mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 green:text-green-400"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.42, 0, 0.58, 1], delay: 0.3 }} // Match easing and slightly increase duration
                    >
                        UX/UI specialist and frontend developer crafting intuitive, accessible, and visually engaging digital products.
                    </motion.p>
                    <motion.div
                        className="mt-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.42, 0, 0.58, 1], delay: 0.6 }} // Consistent easing and duration
                    >
                        <div className="flex flex-row lg:justify-start justify-center items-center gap-4">
                            <Link
                                href="/projects"
                                className="flex items-center px-6 py-3 text-white bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg shadow-md transition transform duration-300 hover:scale-105 ease-in-out"
                            >
                                My Work
                                <span className="ml-2">
                                    <RiArrowRightLine className="w-5 h-5" />
                                </span>
                            </Link>
                            <Link
                                href="/cv-fran-sixto.pdf"
                                download
                                className="flex items-center px-6 py-3 text-gray-600 border border-gray-600 hover:text-gray-700 hover:bg-gray-200 dark:text-gray-400 dark:border-gray-400 dark:hover:text-white dark:hover:bg-gray-500 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Resume
                                <span className="ml-2">
                                    <RiDownloadLine className="w-5 h-5" />
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <div className="w-[100%] relative flex items-center justify-center lg:justify-end">
                    <Suspense>
                        <motion.div
                            className="absolute h-100 w-[85%] shadow-2xl shadow-red-100 dark:shadow-gray-950 flex items-center justify-center rounded-4xl border-2 border-gray-950"
                            style={{
                                backgroundImage: "url('/xenomorphBackground.webp')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                willChange: "transform, opacity", // Hint to the browser for smoother animations
                            }}
                            initial={{ scale: 0.8, opacity: 0 }} // Start closer to the final state for smoother transition
                            animate={{ scale: [0.8, 1.1, 1], opacity: [0, 1] }}
                            transition={{ duration: 1.2, ease: "easeOut" }} // Slightly faster animation
                        >
                        </motion.div>
                    </Suspense>
                    <motion.div className="w-[100%] h-100 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}

                    >
                        <motion.span
                            className="absolute top-10 left-15 lg:left-50 bg-red-100 dark:bg-gray-950 text-gray-900 dark:text-gray-400 p-2 text-xl font-semibold shadow-lg transform rotate-3 rounded-md"
                            animate={{
                                y: [10, -10, 10], // Subtle float up and down
                                rotate: [0, 2, -1, 0], // Subtle rotation
                            }}
                            transition={{
                                duration: 4, // Duration of one float cycle
                                repeat: Infinity, // Repeat indefinitely
                                ease: "easeInOut", // Smooth easing
                                delay: 1, // Delay before animation starts
                            }}
                        >
                            Hello Human,
                        </motion.span>

                        <ThreeHero />

                        <motion.span
                            className="absolute bg-red-100 right-15 dark:bg-gray-950 text-gray-900 dark:text-gray-400 p-2 bottom-25 text-xl font-bold shadow-lg transform -rotate-6 rounded-md"
                            animate={{
                                y: [0, -20, 0], // Float up and down
                                rotate: [0, 5, -5, 0], // Slight rotation
                            }}
                            transition={{
                                duration: 4, // Duration of one float cycle
                                repeat: Infinity, // Repeat indefinitely
                                ease: "easeInOut", // Smooth easing
                                delay: 1, // Delay before animation starts
                            }}
                        >
                            Just pet the dog! 🐶✨
                        </motion.span>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
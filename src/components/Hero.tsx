"use client";

import { RiArrowRightLine, RiDownloadLine } from "react-icons/ri";
import ThreeHero from "@/components/ThreeHero"; // Ensure ThreeHero is a default export in its file
import { motion } from "framer-motion";


const Hero: React.FC = () => {
    return (
        <section className="py-20 w-full">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
                <div>
                    <h1 className="text-6xl bg-gradient-to-r from-red-400 to-red-600 inline-block text-transparent bg-clip-text font-bold">
                        Building Impactful Digital Experiences
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 green:text-green-400">
                        UX/UI specialist and frontend developer crafting intuitive, accessible, and visually engaging digital products.
                    </p>
                    <div className="mt-6">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <a
                                href="/projects"
                                className="flex items-center px-6 py-3 text-white bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg shadow-md transition transform duration-300 hover:scale-105 ease-in-out"
                            >
                                View My Work
                                <span className="ml-2">
                                    <RiArrowRightLine className="w-5 h-5" />
                                </span>
                            </a>
                            <a
                                href="/path-to-resume.pdf"
                                download
                                className="flex items-center px-6 py-3 text-gray-600 border border-gray-600 hover:text-gray-700 hover:bg-gray-200 dark:text-gray-400 dark:border-gray-400 dark:hover:text-white dark:hover:bg-gray-500 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Download Resume
                                <span className="ml-2">
                                    <RiDownloadLine className="w-5 h-5" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-[100%] relative flex items-center justify-center">
                    <motion.div
                        className="absolute h-100 w-[80%] shadow-2xl shadow-red-100 dark:shadow-gray-950 flex items-center justify-center rounded-4xl"
                        style={{
                            backgroundImage: "url('/xenomorphBackground.webp')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.2, 1], opacity: [0, 1] }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                    </motion.div>

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
ƒ
                        <motion.span
                            className="absolute bg-red-100 right-20 dark:bg-gray-950 text-gray-900 dark:text-gray-400 p-2 bottom-25 text-xl font-bold shadow-lg transform -rotate-6 rounded-md"
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
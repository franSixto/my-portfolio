"use client";

import { RiArrowRightLine, RiDownloadLine } from "react-icons/ri";
import ThreeHero from "@/components/three/ThreeHero"; // Ensure ThreeHero is a default export in its file
import { motion } from "framer-motion";
import Button from "@/components/theme/Button"; // Adjust the import path as necessary
import { Suspense } from "react";

const Hero: React.FC = () => {
    return (
        <section
            className="flex justify-center items-center w-full pt-15 lg:pt-0"
            style={{
            height: "100%",
            minHeight: "calc(100vh - 93px)",
            }}
        >
            <div className="container mx-auto px-0 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
            <motion.div
            initial={{ scale: 0.8, y: -30, opacity: 0 }} // Start with a scale and opacity for smoother animation
            whileInView={ { scale: 1, y: 0, opacity:1 } }
            transition={{ duration: 1 }} // Use a custom cubic-bezier easing for smoother animation
            className="px-6 lg:px-0">
                <h1
                className="text-center lg:text-start text-4xl lg:text-6xl xl:text-8xl font-extrabold uppercase bg-gradient-to-r from-red-400 to-red-600 inline-block text-transparent bg-clip-text leading-8 lg:leading-11 xl:leading-20"
                
                >
                Building Impactful Digital Experiences
                </h1>
                <p
                className="text-center lg:text-start mt-4 text-lg ps-1 md:text-xl text-gray-600 dark:text-gray-400 green:text-green-400"
                
                >
                I&apos;m a UX/UI specialist and frontend developer crafting intuitive, accessible, and visually engaging digital products.
                </p>
                <div
                className="mt-6"                
                >
                <div className="flex flex-row lg:justify-start justify-center items-center gap-4">
                    <Button
                    to="/projects"
                    >
                    My Work
                    <span className="ml-1">
                        <RiArrowRightLine className="w-5 h-5" />
                    </span>
                    </Button>
                    <Button
                    to="/cv-fran-sixto.pdf"
                    variant="outlined"
                    target="_blank"
                    >
                    Resume
                    <span className="ml-1">
                        <RiDownloadLine className="w-5 h-5" />
                    </span>
                    </Button>
                </div>
                </div>
            </motion.div>
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
                    initial={{ scale: 0.8, y: -20, opacity: 0 }} // Start with a scale and opacity for smoother animation
                    whileInView={ { scale: 1, y: 0, opacity:1 } }
                    transition={{ duration: 1 }}
                >
                </motion.div>
                </Suspense>
                <motion.div className="w-[100%] h-100 flex justify-center items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
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
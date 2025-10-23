"use client";

import { RiArrowRightLine, RiDownloadLine } from "react-icons/ri";
import ThreeHero from "@/components/three/ThreeHero"; // Ensure ThreeHero is a default export in its file
import { motion } from "framer-motion";
import Button from "@/components/theme/Button"; // Adjust the import path as necessary
import { Suspense } from "react";
import { useColorContext, COLOR_GRADIENT_MAP } from '@/components/theme/ColorContext';
import { useTranslation } from '@/contexts/LanguageContext';
import HeroSkeleton from "@/components/home/HeroSkeleton";

const Hero: React.FC = () => {
    const { t, loading } = useTranslation();
    const { mainColor } = useColorContext();
    const gradient = COLOR_GRADIENT_MAP[mainColor] || COLOR_GRADIENT_MAP.red;

    // Mostrar skeleton mientras cargan las traducciones
    if (loading) {
        return <HeroSkeleton />;
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center w-full"
            style={{
                height: "100%",
                minHeight: "calc(100vh - 120px)",
            }}
        >
            <div className="container mx-auto px-0 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }} // Reducido para evitar overflow en mobile
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }} // Más rápido para mejor UX
                    className="px-6 lg:px-0">
                    <p className="text-center lg:text-start text-sm md:text-base text-gray-500 dark:text-gray-400 mb-2 font-medium tracking-wide">
                        {t('home.hero.tagline')}
                    </p>
                    <h1
                        className={`text-center lg:text-start text-4xl lg:text-6xl font-extrabold uppercase bg-gradient-to-r ${gradient.from} ${gradient.to} text-transparent bg-clip-text leading-[1.1] lg:leading-[1.1] xl:leading-[1.1] transition-colors duration-300 anti-zapateo`}
                        style={{
                            WebkitFontSmoothing: 'antialiased',
                            WebkitBackfaceVisibility: 'hidden',
                            backfaceVisibility: 'hidden',
                            willChange: 'opacity, transform',
                        }}
                    >
                        {t('home.hero.title')}
                    </h1>
                    <p
                        className="text-center lg:text-start mt-4 text-lg ps-1 md:text-xl text-gray-600 dark:text-gray-400 green:text-green-400"

                    >
                        {t('home.hero.description')}
                    </p>
                    <div
                        className="mt-6"
                    >
                        <div className="flex flex-row lg:justify-start justify-center items-center gap-4">
                            <Button
                                to="/projects"
                            >
                                {t('home.hero.myWork')}
                                <span className="ml-1">
                                    <RiArrowRightLine className="w-5 h-5" />
                                </span>
                            </Button>
                            <Button
                                to="/cv-fran-sixto.pdf"
                                variant="outlined"
                                target="_blank"
                            >
                                {t('home.hero.resume')}
                                <span className="ml-1">
                                    <RiDownloadLine className="w-5 h-5" />
                                </span>
                            </Button>
                        </div>
                    </div>
                </motion.div>
                <div className="w-full relative flex items-center justify-center overflow-hidden">
                    <Suspense>
                        <motion.div
                            className="absolute shadow-2xl shadow-red-100 dark:shadow-gray-950 flex items-center justify-center border-2 border-gray-950"
                            style={{
                                backgroundColor: "black",
                                width: "min(400px, 90vw)", // Responsive: máximo 400px o 90% del viewport
                                height: "min(400px, 90vw)",
                                borderRadius: "100%",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                willChange: "transform, opacity",
                            }}
                            initial={{ scale: 0.9, opacity: 0 }} // Reducido para evitar overflow
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                        </motion.div>
                    </Suspense>
                    <motion.div className="w-full h-100 flex justify-center items-center relative"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        <motion.span
                            className={`absolute top-10 left-2 lg:left-50 bg-${mainColor}-100 text-${mainColor}-500 p-2 text-sm lg:text-xl font-semibold shadow-lg transform rotate-3 rounded-md transition-colors duration-300 max-w-[40%] lg:max-w-none text-center`}
                            animate={{
                                y: [10, -10, 10],
                                rotate: [0, 2, -1, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1,
                            }}
                        >
                            {t('home.hero.helloHuman')}
                        </motion.span>

                        <ThreeHero />

                        <motion.span
                            className={`absolute right-2 lg:right-15 bg-${mainColor}-100 text-${mainColor}-500 p-2 bottom-25 text-sm lg:text-xl font-bold shadow-lg transform -rotate-6 rounded-md transition-colors duration-300 max-w-[40%] lg:max-w-none text-center`}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1,
                            }}
                        >
                            {t('home.hero.petDog')}
                        </motion.span>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default Hero;
"use client";

import { motion } from "framer-motion";
import { Suspense } from "react";
import { useColorContext, COLOR_GRADIENT_MAP } from '@/components/theme/ColorContext';

const HeroSkeleton: React.FC = () => {
    const { mainColor } = useColorContext();
    const gradient = COLOR_GRADIENT_MAP[mainColor] || COLOR_GRADIENT_MAP.red;

    return (
        <section
            className="flex justify-center items-center w-full"
            style={{
                height: "100%",
                minHeight: "calc(100vh - 120px)",
            }}
        >
            <div className="container mx-auto px-0 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="px-6 lg:px-0"
                >
                    {/* Tagline skeleton */}
                    <div className="text-center lg:text-start mb-2">
                        <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-md animate-pulse w-2/3 mx-auto lg:mx-0" />
                    </div>
                    
                    {/* Title skeleton - dos líneas para simular el texto real */}
                    <div className="text-center lg:text-start mb-4 space-y-2">
                        <div className={`h-12 lg:h-16 bg-gradient-to-r ${gradient.from} ${gradient.to} rounded-lg animate-pulse w-full opacity-20`} />
                        <div className={`h-12 lg:h-16 bg-gradient-to-r ${gradient.from} ${gradient.to} rounded-lg animate-pulse w-4/5 mx-auto lg:mx-0 opacity-20`} />
                    </div>
                    
                    {/* Description skeleton - tres líneas con anchos variados */}
                    <div className="text-center lg:text-start mt-4 space-y-2">
                        <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-md animate-pulse w-full" />
                        <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-md animate-pulse w-11/12 mx-auto lg:mx-0" />
                        <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-md animate-pulse w-4/5 mx-auto lg:mx-0" />
                    </div>
                    
                    {/* Buttons skeleton */}
                    <div className="mt-6">
                        <div className="flex flex-row lg:justify-start justify-center items-center gap-4">
                            {/* Primary button skeleton */}
                            <div className={`h-12 w-32 bg-gradient-to-r ${gradient.from} ${gradient.to} rounded-lg animate-pulse opacity-30 flex items-center justify-center`}>
                                <div className="flex items-center space-x-2">
                                    <div className="w-16 h-4 bg-white/20 rounded animate-pulse" />
                                    <div className="w-4 h-4 bg-white/20 rounded animate-pulse" />
                                </div>
                            </div>
                            {/* Secondary button skeleton */}
                            <div className="h-12 w-28 bg-transparent rounded-lg animate-pulse border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                                <div className="flex items-center space-x-2">
                                    <div className="w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                
                {/* Right side - 3D area */}
                <div className="w-full relative flex items-center justify-center overflow-hidden">
                    <Suspense>
                        <motion.div
                            className="absolute shadow-2xl shadow-red-100 dark:shadow-gray-950 flex items-center justify-center border-2 border-gray-950"
                            style={{
                                backgroundColor: "black",
                                width: "min(400px, 90vw)",
                                height: "min(400px, 90vw)",
                                borderRadius: "100%",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                willChange: "transform, opacity",
                            }}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* 3D placeholder */}
                            <div className="w-24 h-24 bg-gray-600 dark:bg-gray-400 rounded-full animate-pulse" />
                        </motion.div>
                    </Suspense>
                    
                    <motion.div 
                        className="w-full h-100 flex justify-center items-center relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        {/* Hello Human skeleton */}
                        <motion.div
                            className={`absolute top-10 left-2 lg:left-50 bg-${mainColor}-100 p-2 shadow-lg transform rotate-3 rounded-md h-8 w-24 lg:h-10 lg:w-32 animate-pulse opacity-60`}
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
                        />

                        {/* Pet Dog skeleton */}
                        <motion.div
                            className={`absolute right-2 lg:right-15 bg-${mainColor}-100 p-2 bottom-25 shadow-lg transform -rotate-6 rounded-md h-8 w-28 lg:h-10 lg:w-36 animate-pulse opacity-60`}
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
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSkeleton;
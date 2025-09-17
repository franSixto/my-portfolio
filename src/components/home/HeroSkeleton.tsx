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
            <div className="container mx-auto px-0 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, y: -30, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
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
                <div className="w-[100%] relative flex items-center justify-center">
                    <Suspense>
                        <motion.div
                            className="absolute h-100 w-[100%] shadow-2xl shadow-red-100 dark:shadow-gray-950 flex items-center justify-center rounded-4xl border-2 border-gray-950"
                            style={{
                                backgroundColor: "black",
                                width: "400px",
                                height: "400px",
                                borderRadius: "100%",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                willChange: "transform, opacity",
                            }}
                            initial={{ scale: 0.8, y: -20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            {/* 3D placeholder */}
                            <div className="w-24 h-24 bg-gray-600 dark:bg-gray-400 rounded-full animate-pulse" />
                        </motion.div>
                    </Suspense>
                    
                    <motion.div 
                        className="w-[100%] h-100 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        {/* Hello Human skeleton */}
                        <motion.div
                            className={`absolute top-10 left-15 lg:left-50 bg-${mainColor}-100 p-2 shadow-lg transform rotate-3 rounded-md h-10 w-32 animate-pulse opacity-60`}
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
                            className={`absolute right-15 bg-${mainColor}-100 p-2 bottom-25 shadow-lg transform -rotate-6 rounded-md h-10 w-36 animate-pulse opacity-60`}
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
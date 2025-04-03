"use client";

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { RiArrowDownSLine } from 'react-icons/ri';
import ThreeSolarSystem from './ThreeSolarSystem'; // Asegúrate de que la ruta sea correcta

const HomeTitle: React.FC = () => {
    const { ref, inView } = useInView({
        threshold: 0.2, // Porcentaje visible para activar la animación
        triggerOnce: true, // Solo activa la animación una vez
    });

    return (
        <div className="relative container mx-auto px-6">
            <motion.div
                ref={ref}
                id="home-title"
                className="relative px-6 py-30 flex flex-col items-center justify-center text-center rounded-4xl shadow-red-100 dark:shadow-gray-950 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                    border: '2px solid #000000',
                    background: 'linear-gradient(45deg, #000000d2, #000000f5, #000000f2, #000000d1), url("/sky.webp")',
                    backgroundSize: '200% cover', // Ajusta el fondo sin distorsión
                    backgroundPosition: 'center',
                    animation: 'gradientAnimation 15s ease infinite',
                }}
            >

                {/* Contenido */}
                <h2 className="text-5xl font-bold text-gray-100">
                    Welcome to My Portfolio
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                Explore my projects and get to know me better.
                </p>

                {/* Flecha animada */}
                <motion.div
                    className="flex text-3xl justify-center items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                >
                    <RiArrowDownSLine className='text-red-600' />
                </motion.div>
                {/* Animación de fondo */}
                <style>
                    {`
                @keyframes gradientAnimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                `}
                </style>
                <ThreeSolarSystem />
            </motion.div>
             
            <motion.span
                    className="absolute -top-3 left-15 lg:left-20 bg-red-100 dark:bg-gray-950 text-gray-900 dark:text-gray-400 p-2 text-xl font-bold shadow-lg transform -rotate-2 rounded-md"
                    animate={{
                        y: [0, -20, 0], // Float up and down
                        rotate: [0, 3, -1, 0], // Slight rotation
                        opacity: inView ? 1 : 0, // Adjust opacity based on inView
                    }}
                    transition={{
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, // Float animation
                        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }, // Rotation animation
                        opacity: { duration: 0.3 }, // Opacity animation for inView
                        delay: 1, // Delay before animation starts
                    }}
                    initial={{ opacity: 0, y: 50 }}
                >
                    I hope you enjoy your visit! 😊
                </motion.span>
        </div>

    );
};

export default HomeTitle;
"use client";

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ThreeSolarSystem from "@/components/three/ThreeSolarSystem";
import Subscribe from '../contact/Subscribe';
import { useColorContext, COLOR_CLASS_MAP } from '@/components/theme/ColorContext';
import { useLanguage } from '@/contexts/LanguageContext';

const HomeSubscribe: React.FC = () => {
    const { ref, inView } = useInView({
        threshold: 0.2, // Porcentaje visible para activar la animación
        triggerOnce: true, // Solo activa la animación una vez
    });

    const { mainColor } = useColorContext();
    const { t } = useLanguage();

    return (
        <div className="relative container mx-auto px-6 mb-5">
            <motion.div
                ref={ref}
                id="home-title"
                className="relative px-6 h-100 flex flex-col items-center justify-center text-center rounded-4xl shadow-red-100 dark:shadow-gray-950 overflow-hidden"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{
                    border: '2px solid #000000',
                    background: 'linear-gradient(190deg, #00000000, #000000f5, #000000f2, #00000000), url("/sky2.webp")',
                    backgroundSize: '200% cover', // Ajusta el fondo sin distorsión
                    backgroundPosition: 'center',
                    animation: 'gradientAnimation 15s ease infinite',
                }}
            >

                {/* Contenido */}
                <h2 className="text-4xl lg:text-6xl xl:text-8xl font-bold text-gray-100 uppercase">
                    {t('subscribe.homeTitle')}
                </h2>
                
                <motion.p
                className=" mt-4 text-lg text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                    {t('subscribe.homeDescription')}
                    </motion.p>
                <motion.p
                className=" text-sm text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                {t('subscribe.homeDisclaimer')}
                </motion.p>
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
            <Subscribe />
            {/* Subscribe Form */}
            <motion.span
                className={`absolute -top-3 left-15 lg:left-20 ${COLOR_CLASS_MAP[mainColor]} dark:bg-gray-950 text-gray-900 dark:text-gray-400 p-2 text-xl font-bold shadow-lg transform -rotate-2 rounded-md transition-colors duration-300`}
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
                {t('subscribe.homeWelcome')}
            </motion.span>
            
        </div>

    );
};

export default HomeSubscribe;
"use client";

import { motion } from "framer-motion";
import ThreeSpaceship from "@/components/three/ThreeSpaceship";
import { FiPenTool, FiCode, FiUsers, FiTrendingUp } from "react-icons/fi";
import { TitleH2 } from "@/components/common/TitleH2";
import { useColorContext } from '@/components/theme/ColorContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Services() {
    const { mainColor } = useColorContext();
    const { t } = useLanguage();

    const services = [
        {
            title: t('home.services.uxui.title'),
            description: t('home.services.uxui.description'),
            icon: <FiPenTool />,
        },
        {
            title: t('home.services.frontend.title'),
            description: t('home.services.frontend.description'),
            icon: <FiCode />,
        },
        {
            title: t('home.services.teamLeadership.title'),
            description: t('home.services.teamLeadership.description'),
            icon: <FiUsers />,
        },
        {
            title: t('home.services.optimization.title'),
            description: t('home.services.optimization.description'),
            icon: <FiTrendingUp />,
        },
    ];

    return (
        <section id="services" className="container mx-auto px-6 grid items-center justify-center">
            <div className="mx-auto text-center">

                <motion.div
                    key="services"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="relative flex flex-col items-center justify-center mb-8"
                >
                    <TitleH2
                        title={t('home.services.title')}
                        description={t('home.services.description')}
                    />
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="absolute flex justify-center items-center h-full w-full">
                            
                            <ThreeSpaceship />
                            <motion.div
                                className={`absolute w-80 h-80 bg-gradient-to-r from-${mainColor}-500 to-${mainColor}-700 rounded-full z-0 overflow-hidden`}
                                animate={{
                                    opacity: [0.1, .9, 0.1],
                                    scale: [.8, 1, .8],
                                    filter: ["blur(10px)", "blur(0px)", "blur(10px)"],
                                }}
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            ></motion.div>
                        </div>

                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: -30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="dark:bg-gray-900/30 bg-white/30 backdrop-blur-xl rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow z-2"
                            >
                                <div className={`text-4xl flex justify-center mb-4 text-${mainColor}-500 dark:text-${mainColor}-500 transition-colors duration-300`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-md">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
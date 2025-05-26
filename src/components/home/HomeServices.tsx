"use client";

import { motion } from "framer-motion";
import ThreeSpaceship from "@/components/three/ThreeSpaceship";
import { FiPenTool, FiCode, FiUsers, FiTrendingUp } from "react-icons/fi";
import { TitleH2 } from "@/components/common/TitleH2";
import { useColorContext } from '@/components/theme/ColorContext';

const services = [
    {
        title: "UX/UI Design",
        description:
            "From early-stage wireframes to polished prototypes, I design user interfaces that are both intuitive and scalable. I combine design thinking with user research, accessibility standards, and usability testing to ensure every experience delivers real impact.",
        icon: <FiPenTool />,
    },
    {
        title: "Frontend Development",
        description:
            "I build high-performing, responsive, and accessible web apps using React, Next.js, Tailwind CSS, and TypeScript. My toolkit also includes WordPress, Bootstrap, and .NET Core for cases where flexibility or backend integration is key.",
        icon: <FiCode />,
    },
    {
        title: "Team Leadership",
        description:
            "I lead design and dev teams through planning, code reviews, mentoring, and task coordination. I bridge gaps between designers, developers, and stakeholders to align vision, timelines, and deliverables. Clear communication and a user-first mindset are always my priority.",
        icon: <FiUsers />,
    },
    {
        title: "Optimization & Deploy",
        description:
            "I handle SEO optimization, site performance enhancements, version control with Git, and streamlined CI/CD workflows. From semantic HTML to asset optimization and production deploys, I ensure that every project is fast, discoverable, and future-proof.",
        icon: <FiTrendingUp />,
    },
];

export default function Services() {
    const { mainColor } = useColorContext();

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
                        title="What I Do"
                        description="A combination of design thinking, solid development, and team experience."
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
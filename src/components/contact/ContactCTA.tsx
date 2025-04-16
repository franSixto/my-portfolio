"use client";

import { motion } from "framer-motion";
import Button from "@/components/theme/Button";
import { TitleH2 } from "@/components/common/TitleH2";
import { RiMailAiLine } from "react-icons/ri";

export default function ContactCTA() {
    return (
        <motion.section
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="w-full px-6 flex flex-col items-center justify-center text-center h-[100vh] relative">
            {/* Background blurred lights */}

            <motion.div
                className="absolute inset-0 z-0 overflow-hidden"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, ease: 'easeInOut' }}>
                <div className="absolute top-1/4 left-[-15%] w-100 h-100 rounded-full shadow-2xl border-red-500 shadow-red-400 bg-gray-50 dark:bg-gray-950 border-2"></div>
                <div className="absolute top-[10%] left-[50%] w-500 h-500 rounded-full shadow-xl border-red-500 shadow-red-400 bg-gray-50 dark:bg-gray-950  border-2"></div>
                <div className="absolute bottom-0 left-0 w-140 h-140 bg-red-500 rounded-full blur-3xl opacity-20 "></div>
            </motion.div>

            {/* Content with blurred background */}
            <div className="container relative z-10 dark:bg-gray-900/30 bg-white/30 backdrop-blur-xl py-10 rounded-4xl w-full mx-auto px-6 flex flex-col items-center shadow-2xl">
                <TitleH2
                    title="Let’s build something great together"
                    description="Whether you’re looking for a UX/UI designer, a frontend developer, or a team leader to bring your ideas to life — I’m ready to jump in. Feel free to reach out, I’d be happy to connect."
                />
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}>

                </motion.div>
                <Button
                    to="/contact"
                >
                    Contact Me
                    <span className="ml-3">
                        <RiMailAiLine className="w-5 h-5" />
                    </span>
                </Button>
            </div>
        </motion.section>
    );
}
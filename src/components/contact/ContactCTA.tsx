"use client";

import { motion } from "framer-motion";
import Button from "@/components/theme/Button";
import { TitleH2 } from "@/components/common/TitleH2";
import { RiMailSendLine } from "react-icons/ri";
import { useColorContext, COLOR_BORDER_CLASS_MAP, COLOR_SHADOW_CLASS_MAP } from '@/components/theme/ColorContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRTL } from '@/hooks/useRTL';

export default function ContactCTA() {
    const { mainColor } = useColorContext();
    const { t } = useLanguage();
    const { rtlClass } = useRTL();

    return (
        <motion.section
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className={`w-full px-6 flex flex-col items-center justify-center text-center h-[100vh] relative ${rtlClass('text-left')}`}>
            {/* Background blurred lights */}

            <motion.div
                className="absolute inset-0 z-0 overflow-hidden"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, ease: 'easeInOut' }}>
                <div className={`absolute top-1/4 left-[-15%] w-100 h-100 rounded-full shadow-2xl ${COLOR_BORDER_CLASS_MAP[mainColor]} ${COLOR_SHADOW_CLASS_MAP[mainColor]} bg-gray-50 dark:bg-gray-950 border-2 transition-colors duration-300`}></div>
                <div className={`absolute top-[10%] left-[50%] w-500 h-500 rounded-full shadow-xl ${COLOR_BORDER_CLASS_MAP[mainColor]} ${COLOR_SHADOW_CLASS_MAP[mainColor]} bg-gray-50 dark:bg-gray-950 border-2 transition-colors duration-300`}></div>
                <div className={`absolute bottom-0 left-0 w-140 h-140 bg-${mainColor}-500 rounded-full blur-3xl opacity-20 transition-colors duration-300`}></div>
            </motion.div>

            {/* Content with blurred background */}
            <div className="container relative z-10 dark:bg-gray-900/30 bg-white/30 backdrop-blur-xl py-10 rounded-4xl w-full mx-auto px-6 flex flex-col items-center shadow-2xl">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}>
                    <TitleH2 
                        title={t('pages.contact.cta.title')}
                        description={t('pages.contact.cta.description')}
                    />
                </motion.div>
                <Button
                    to="/contact"
                >
                    {t('pages.contact.cta.button')}
                    <span className="ml-3">
                        <RiMailSendLine className="w-5 h-5" />
                    </span>
                </Button>
            </div>
        </motion.section>
    );
}
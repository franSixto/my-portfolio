"use client";

import Link from "next/link";
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 h-15 text-gray-400 dark:text-gray-300 py-4">
            <div className="container mx-auto flex justify-center space-x-6">
            <Link href="/" className="hover:underline">
                {t('navigation.home')}
            </Link>
            <Link href="/about" className="hover:underline">
                {t('navigation.about')}
            </Link>
            <Link href="/projects" className="hover:underline">
                {t('navigation.projects')}
            </Link>
            <Link href="/contact" className="hover:underline">
                {t('navigation.contact')}
            </Link>
            </div>
        </footer>
    );
};

export default Footer;
"use client";

import Link from "next/link";
import { useLanguage } from '@/contexts/LanguageContext';
import { SERVICE_NAV_LABELS, SERVICE_ROUTE_KEYS } from '@/content/services/nav';

const Footer = () => {
    const { t, localePath, locale } = useLanguage();

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-4">
            <div className="container mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 px-6">
            <Link href={localePath('home')} className="hover:underline">
                {t('navigation.home')}
            </Link>
            <Link href={localePath('about')} className="hover:underline">
                {t('navigation.about')}
            </Link>
            <Link href={localePath('projects')} className="hover:underline">
                {t('navigation.projects')}
            </Link>
            <Link href={localePath('contact')} className="hover:underline">
                {t('navigation.contact')}
            </Link>
            </div>
            <nav aria-label={t('navigation.servicesAriaLabel')} className="container mx-auto mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 px-6 text-sm">
                {SERVICE_ROUTE_KEYS.map((key) => (
                    <Link key={key} href={localePath(key)} className="hover:underline">
                        {SERVICE_NAV_LABELS[locale][key]}
                    </Link>
                ))}
            </nav>
        </footer>
    );
};

export default Footer;

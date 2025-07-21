"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useColorContext } from "../theme/ColorContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const pathParts = pathname.split("/").filter(Boolean);
    const { mainColor } = useColorContext();
    const { t } = useLanguage();

    const getTranslatedPath = (path: string): string => {
        const translations: { [key: string]: string } = {
            'about': t('navigation.about'),
            'projects': t('navigation.projects'),
            'contact': t('navigation.contact'),
            'blog': t('navigation.blog'),
        };
        return translations[path] || decodeURIComponent(path);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}>
                <nav className="text-sm mb-6 bg-gray-300 dark:bg-gray-600 p-[1px] rounded-lg" aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded-lg">
                        <li className="flex items-center">
                            <Link href="/" className={`text-${mainColor}-500 hover:underline`}>{t('navigation.home')}</Link>
                        </li>
                        {pathParts.map((part, idx) => {
                            const href = "/" + pathParts.slice(0, idx + 1).join("/");
                            const isLast = idx === pathParts.length - 1;
                            const translatedPart = getTranslatedPath(part);
                            return (
                                <li key={href} className="flex items-center max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                                    <span className="mx-2 text-gray-400">/</span>
                                    {isLast ? (
                                        <span
                                            className={`text-${mainColor}-500 dark:text-${mainColor}-300 capitalize`}
                                            title={translatedPart}
                                        >
                                            {translatedPart}
                                        </span>
                                    ) : (
                                        <Link
                                            href={href}
                                            className={`text-${mainColor}-500 hover:underline capitalize`}
                                            title={translatedPart}
                                        >
                                            {translatedPart}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </motion.div>
        </>
    );
}

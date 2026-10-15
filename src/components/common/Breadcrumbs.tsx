"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useColorContext } from "../theme/ColorContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { absoluteUrl, localizedPath, matchRoute, type RouteKey } from "@/i18n/routes";
import { serializeJsonLd } from "@/i18n/seo";
import { SERVICE_NAV_LABELS, isServiceRoute } from "@/content/services/nav";
import { motion } from "framer-motion";

type Crumb = { label: string; href: string };

const LABEL_KEYS: Partial<Record<RouteKey, string>> = {
    about: 'navigation.about',
    projects: 'navigation.projects',
    contact: 'navigation.contact',
};

export default function Breadcrumbs({ currentLabel }: { currentLabel?: string }) {
    const pathname = usePathname();
    const { mainColor } = useColorContext();
    const { t, locale } = useLanguage();

    const match = matchRoute(pathname);

    const crumbs: Crumb[] = [{ label: t('navigation.home'), href: localizedPath('home', locale) }];
    if (match && match.key !== 'home') {
        if (match.key === 'project') {
            crumbs.push({ label: t('navigation.projects'), href: localizedPath('projects', locale) });
            crumbs.push({
                label: currentLabel || decodeURIComponent(match.params.slug),
                href: pathname,
            });
        } else {
            const labelKey = LABEL_KEYS[match.key];
            const label = isServiceRoute(match.key)
                ? SERVICE_NAV_LABELS[locale][match.key]
                : labelKey ? t(labelKey) : decodeURIComponent(match.key);
            crumbs.push({
                label,
                href: localizedPath(match.key, locale, match.params),
            });
        }
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.label,
            item: absoluteUrl(crumb.href),
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
            />
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}>
                <nav className="text-sm mb-6 bg-gray-300 dark:bg-gray-600 p-[1px] rounded-lg" aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded-lg">
                        {crumbs.map((crumb, idx) => {
                            const isFirst = idx === 0;
                            const isLast = idx === crumbs.length - 1 && !isFirst;
                            return (
                                <li key={crumb.href} className="flex items-center max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                                    {!isFirst && <span className="mx-2 text-gray-400">/</span>}
                                    {isLast ? (
                                        <span
                                            className={`text-${mainColor}-500 dark:text-${mainColor}-300 capitalize`}
                                            title={crumb.label}
                                        >
                                            {crumb.label}
                                        </span>
                                    ) : (
                                        <Link
                                            href={crumb.href}
                                            className={`text-${mainColor}-500 hover:underline ${isFirst ? '' : 'capitalize'}`}
                                            title={crumb.label}
                                        >
                                            {crumb.label}
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { absoluteUrl, localizedPath, matchRoute, type RouteKey } from "@/i18n/routes";
import { serializeJsonLd } from "@/i18n/seo";
import { SERVICE_NAV_LABELS, isServiceRoute } from "@/content/services/nav";
import cx from "classnames";

type Crumb = { label: string; href: string };

const LABEL_KEYS: Partial<Record<RouteKey, string>> = {
    about: 'navigation.about',
    projects: 'navigation.projects',
    contact: 'navigation.contact',
};

export default function Breadcrumbs({
    currentLabel,
    className,
}: {
    currentLabel?: string;
    className?: string;
}) {
    const pathname = usePathname();
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
            <nav aria-label="Breadcrumb" className={cx("text-meta text-muted", className)}>
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {crumbs.map((crumb, idx) => {
                        const isLast = idx === crumbs.length - 1 && idx !== 0;
                        return (
                            <li key={crumb.href} className="flex min-w-0 items-center gap-2">
                                {idx > 0 && (
                                    <span aria-hidden="true" className="text-rule-strong">
                                        /
                                    </span>
                                )}
                                {isLast ? (
                                    <span
                                        aria-current="page"
                                        className="max-w-[28ch] truncate text-ink md:max-w-[48ch]"
                                        title={crumb.label}
                                    >
                                        {crumb.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={crumb.href}
                                        className="underline-offset-[0.25em] decoration-accent hover:text-ink hover:underline"
                                    >
                                        {crumb.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}

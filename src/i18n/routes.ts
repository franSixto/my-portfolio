// Central route map and pure URL helpers. No React / Next imports so it can be
// used from server components, client components, sitemap and tests alike.

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const SITE_URL = "https://www.fransixto.com.ar";

export type RouteDef = {
  es: string;
  en: string;
  /** Route planned but not built yet: excluded from nav and sitemap. */
  pending?: true;
};

export const routes = {
  home: { es: "/", en: "/en" },
  about: { es: "/sobre-mi", en: "/en/about" },
  projects: { es: "/proyectos", en: "/en/projects" },
  project: { es: "/proyectos/[slug]", en: "/en/projects/[slug]" },
  contact: { es: "/contacto", en: "/en/contact" },
  // Service landing pages
  serviceUxUi: {
    es: "/diseno-ux-ui-product-design",
    en: "/en/ux-ui-product-design",
  },
  serviceWebDevelopment: {
    es: "/desarrollo-web",
    en: "/en/web-development",
  },
  serviceWebDesign: { es: "/diseno-web", en: "/en/web-design" },
  serviceAiMvp: {
    es: "/desarrollo-mvp-ia",
    en: "/en/ai-mvp-development",
  },
} as const satisfies Record<string, RouteDef>;

export type RouteKey = keyof typeof routes;
export type RouteParams = Record<string, string>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

/** Route keys that are built and should be linked / indexed. */
export function liveRouteKeys(): RouteKey[] {
  return (Object.keys(routes) as RouteKey[]).filter(
    (key) => !(routes[key] as RouteDef).pending
  );
}

export function localizedPath(
  key: RouteKey,
  locale: Locale,
  params: RouteParams = {}
): string {
  return (routes[key] as RouteDef)[locale].replace(/\[(\w+)\]/g, (_, name) => {
    const value = params[name];
    if (value === undefined) {
      throw new Error(`Missing param "${name}" for route "${key}"`);
    }
    return encodeURIComponent(value);
  });
}

function normalize(pathname: string): string {
  const withoutQuery = pathname.split(/[?#]/)[0] || "/";
  return withoutQuery.length > 1 ? withoutQuery.replace(/\/+$/, "") : "/";
}

export type RouteMatch = {
  key: RouteKey;
  locale: Locale;
  params: RouteParams;
};

export function matchRoute(pathname: string): RouteMatch | null {
  const path = normalize(pathname);
  const segments = path.split("/").filter(Boolean);

  for (const key of Object.keys(routes) as RouteKey[]) {
    for (const locale of locales) {
      const pattern = (routes[key] as RouteDef)[locale]
        .split("/")
        .filter(Boolean);
      if (pattern.length !== segments.length) continue;
      const params: RouteParams = {};
      const ok = pattern.every((part, i) => {
        const dyn = /^\[(\w+)\]$/.exec(part);
        if (dyn) {
          params[dyn[1]] = decodeURIComponent(segments[i]);
          return true;
        }
        return part === segments[i];
      });
      if (ok) return { key, locale, params };
    }
  }
  return null;
}

export function localeFromPathname(pathname: string): Locale {
  const first = normalize(pathname).split("/")[1];
  return first === "en" ? "en" : "es";
}

/** Equivalent URL in another language. Unknown paths fall back to that home. */
export function alternatePath(
  currentPathname: string,
  targetLocale: Locale
): string {
  const match = matchRoute(currentPathname);
  if (!match) return localizedPath("home", targetLocale);
  return localizedPath(match.key, targetLocale, match.params);
}

export type Alternates = {
  canonical: string;
  languages: Record<Locale | "x-default", string>;
};

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function buildAlternates(
  key: RouteKey,
  locale: Locale,
  params: RouteParams = {}
): Alternates {
  const es = absoluteUrl(localizedPath(key, "es", params));
  const en = absoluteUrl(localizedPath(key, "en", params));
  return {
    canonical: locale === "es" ? es : en,
    languages: { es, en, "x-default": es },
  };
}

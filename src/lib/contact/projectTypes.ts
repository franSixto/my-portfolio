import { localizedPath, type Locale } from "@/i18n/routes";
import { SOLUTION_PARENT, type ServiceRouteKey, type SolutionRouteKey } from "@/content/services/nav";

/** Stable keys sent to the API; labels come from the page copy. */
export const PROJECT_TYPE_KEYS = ["ux-ui", "web-design", "web-development", "ai-mvp", "graphic-design", "other"] as const;
export type ProjectTypeKey = (typeof PROJECT_TYPE_KEYS)[number];

export function isProjectTypeKey(value: unknown): value is ProjectTypeKey {
  return typeof value === "string" && (PROJECT_TYPE_KEYS as readonly string[]).includes(value);
}

/** Query param name per locale: /contacto?tipo=... and /en/contact?type=... */
export const PROJECT_TYPE_PARAM: Record<Locale, string> = { es: "tipo", en: "type" };

/** Value used in the query string, per locale. */
const QUERY_VALUE: Record<Locale, Record<ProjectTypeKey, string>> = {
  es: {
    "ux-ui": "ux-ui",
    "web-design": "diseno-web",
    "web-development": "desarrollo-web",
    "ai-mvp": "mvp-ia",
    "graphic-design": "diseno-grafico",
    other: "otro",
  },
  en: {
    "ux-ui": "ux-ui",
    "web-design": "web-design",
    "web-development": "web-development",
    "ai-mvp": "ai-mvp",
    "graphic-design": "graphic-design",
    other: "other",
  },
};

// Either locale's value is accepted on either page (a shared link keeps working).
const FROM_QUERY = new Map<string, ProjectTypeKey>(
  (["es", "en"] as const).flatMap((locale) =>
    PROJECT_TYPE_KEYS.map((key) => [QUERY_VALUE[locale][key], key] as const)
  )
);

/** Maps a `?tipo=` / `?type=` value to a project type key. Unknown values yield undefined. */
export function projectTypeFromQuery(value: string | null | undefined): ProjectTypeKey | undefined {
  if (!value) return undefined;
  return FROM_QUERY.get(value.trim().toLowerCase());
}

const SERVICE_PROJECT_TYPE: Record<ServiceRouteKey, ProjectTypeKey> = {
  serviceUxUi: "ux-ui",
  serviceWebDesign: "web-design",
  serviceWebDevelopment: "web-development",
  serviceAiMvp: "ai-mvp",
  serviceGraphicDesign: "graphic-design",
};

/** Contact URL with the project type preselected, for a service page CTA. */
export function contactHrefForService(service: ServiceRouteKey, locale: Locale): string {
  const value = QUERY_VALUE[locale][SERVICE_PROJECT_TYPE[service]];
  return `${localizedPath("contact", locale)}?${PROJECT_TYPE_PARAM[locale]}=${value}`;
}

/** Solution pages preselect the project type of their parent service. */
export function contactHrefForSolution(solution: SolutionRouteKey, locale: Locale): string {
  return contactHrefForService(SOLUTION_PARENT[solution], locale);
}

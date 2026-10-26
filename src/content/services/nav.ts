// Short labels for the service pages. Kept separate from the long-form copy so
// client components (footer, home, breadcrumbs) can import them cheaply.
import type { Locale, RouteKey } from "@/i18n/routes";

export const SERVICE_ROUTE_KEYS = [
  "serviceUxUi",
  "serviceWebDesign",
  "serviceWebDevelopment",
  "serviceAiMvp",
  "serviceGraphicDesign",
] as const satisfies readonly RouteKey[];

export type ServiceRouteKey = (typeof SERVICE_ROUTE_KEYS)[number];

export const SERVICE_NAV_LABELS: Record<Locale, Record<ServiceRouteKey, string>> = {
  es: {
    serviceUxUi: "Diseño UX/UI",
    serviceWebDesign: "Diseño web",
    serviceWebDevelopment: "Desarrollo web",
    serviceAiMvp: "MVP con IA",
    serviceGraphicDesign: "Diseño gráfico y de marca",
  },
  en: {
    serviceUxUi: "UX/UI design",
    serviceWebDesign: "Web design",
    serviceWebDevelopment: "Web development",
    serviceAiMvp: "AI-assisted MVP",
    serviceGraphicDesign: "Graphic and brand design",
  },
};

export function isServiceRoute(key: RouteKey): key is ServiceRouteKey {
  return (SERVICE_ROUTE_KEYS as readonly string[]).includes(key);
}

// Solution pages: landing pages for one concrete project type (an online
// store, a SaaS dashboard...). Each hangs from one parent service.
export const SOLUTION_ROUTE_KEYS = [
  "solutionEcommerce",
  "solutionSaas",
  "solutionDesignSystem",
  "solutionLanding",
  "solutionRedesign",
  "solutionBrandIdentity",
  "solutionSocialCampaigns",
] as const satisfies readonly RouteKey[];

export type SolutionRouteKey = (typeof SOLUTION_ROUTE_KEYS)[number];

/** Any page rendered by ServiceScreen. */
export type LandingRouteKey = ServiceRouteKey | SolutionRouteKey;

export const SOLUTION_NAV_LABELS: Record<Locale, Record<SolutionRouteKey, string>> = {
  es: {
    solutionEcommerce: "Diseño de e-commerce",
    solutionSaas: "SaaS y dashboards",
    solutionDesignSystem: "Design system",
    solutionLanding: "Landing page y sitio web",
    solutionRedesign: "Rediseño de sitio web",
    solutionBrandIdentity: "Identidad visual y logo",
    solutionSocialCampaigns: "Piezas para redes y campañas",
  },
  en: {
    solutionEcommerce: "E-commerce design",
    solutionSaas: "SaaS and dashboard design",
    solutionDesignSystem: "Design system",
    solutionLanding: "Landing page and business website",
    solutionRedesign: "Website redesign",
    solutionBrandIdentity: "Visual identity and logo",
    solutionSocialCampaigns: "Social media and campaign pieces",
  },
};

export const SOLUTION_PARENT: Record<SolutionRouteKey, ServiceRouteKey> = {
  solutionEcommerce: "serviceUxUi",
  solutionSaas: "serviceUxUi",
  solutionDesignSystem: "serviceUxUi",
  solutionLanding: "serviceWebDesign",
  solutionRedesign: "serviceWebDesign",
  solutionBrandIdentity: "serviceGraphicDesign",
  solutionSocialCampaigns: "serviceGraphicDesign",
};

export function isSolutionRoute(key: RouteKey): key is SolutionRouteKey {
  return (SOLUTION_ROUTE_KEYS as readonly string[]).includes(key);
}

export function solutionsForService(service: ServiceRouteKey): SolutionRouteKey[] {
  return SOLUTION_ROUTE_KEYS.filter((key) => SOLUTION_PARENT[key] === service);
}

export function landingNavLabel(key: LandingRouteKey, locale: Locale): string {
  return isSolutionRoute(key) ? SOLUTION_NAV_LABELS[locale][key] : SERVICE_NAV_LABELS[locale][key];
}

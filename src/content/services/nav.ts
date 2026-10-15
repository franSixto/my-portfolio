// Short labels for the service pages. Kept separate from the long-form copy so
// client components (footer, home, breadcrumbs) can import them cheaply.
import type { Locale, RouteKey } from "@/i18n/routes";

export const SERVICE_ROUTE_KEYS = [
  "serviceUxUi",
  "serviceWebDesign",
  "serviceWebDevelopment",
  "serviceAiMvp",
] as const satisfies readonly RouteKey[];

export type ServiceRouteKey = (typeof SERVICE_ROUTE_KEYS)[number];

export const SERVICE_NAV_LABELS: Record<Locale, Record<ServiceRouteKey, string>> = {
  es: {
    serviceUxUi: "Diseño UX/UI",
    serviceWebDesign: "Diseño web",
    serviceWebDevelopment: "Desarrollo web",
    serviceAiMvp: "MVP con IA",
  },
  en: {
    serviceUxUi: "UX/UI design",
    serviceWebDesign: "Web design",
    serviceWebDevelopment: "Web development",
    serviceAiMvp: "AI-assisted MVP",
  },
};

export function isServiceRoute(key: RouteKey): key is ServiceRouteKey {
  return (SERVICE_ROUTE_KEYS as readonly string[]).includes(key);
}

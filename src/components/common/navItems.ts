import { localizedPath, type Locale, type RouteKey } from "@/i18n/routes";
import { CHROME_LABELS } from "@/components/common/chromeLabels";
import {
  SERVICE_NAV_LABELS,
  SERVICE_ROUTE_KEYS,
  isServiceRoute,
  isSolutionRoute,
} from "@/content/services/nav";

export type NavItem = { id: string; route: RouteKey; labelKey: string; hash?: string };

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "home", route: "home", labelKey: "navigation.home" },
  { id: "services", route: "services", labelKey: "navigation.services" },
  { id: "projects", route: "projects", labelKey: "navigation.projects" },
  { id: "about", route: "about", labelKey: "navigation.about" },
];

/** Which nav item is current for a matched route key. */
export function isNavItemActive(item: NavItem, current: RouteKey | undefined): boolean {
  if (!current) return false;
  if (item.id === "services") return current === "services" || isServiceRoute(current) || isSolutionRoute(current);
  if (item.id === "projects") return current === "projects" || current === "project";
  return !item.hash && item.route === current;
}

export type ServicesMenuLink = { route: RouteKey; href: string; label: string };

/** Links shown under "Services": the five service pages plus the hub. */
export function servicesMenu(locale: Locale): { services: ServicesMenuLink[]; hub: ServicesMenuLink } {
  return {
    services: SERVICE_ROUTE_KEYS.map((route) => ({
      route,
      href: localizedPath(route, locale),
      label: SERVICE_NAV_LABELS[locale][route],
    })),
    hub: {
      route: "services",
      href: localizedPath("services", locale),
      label: CHROME_LABELS[locale].servicesMenu.allServices,
    },
  };
}

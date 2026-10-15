import type { RouteKey } from "@/i18n/routes";
import { isServiceRoute } from "@/content/services/nav";

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
  if (item.id === "services") return current === "services" || isServiceRoute(current);
  if (item.id === "projects") return current === "projects" || current === "project";
  return !item.hash && item.route === current;
}

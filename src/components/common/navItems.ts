import type { RouteKey } from "@/i18n/routes";
import { isServiceRoute } from "@/content/services/nav";

export type NavItem = { id: string; route: RouteKey; labelKey: string; hash?: string };

// "services" points at the home section for now; a /servicios hub can replace
// the target later without touching the header layout.
export const NAV_ITEMS: readonly NavItem[] = [
  { id: "home", route: "home", labelKey: "navigation.home" },
  { id: "services", route: "home", labelKey: "navigation.services", hash: "#services" },
  { id: "about", route: "about", labelKey: "navigation.about" },
  { id: "projects", route: "projects", labelKey: "navigation.projects" },
];

/** Which nav item is current for a matched route key. */
export function isNavItemActive(item: NavItem, current: RouteKey | undefined): boolean {
  if (!current) return false;
  if (item.id === "services") return isServiceRoute(current);
  if (item.id === "projects") return current === "projects" || current === "project";
  return !item.hash && item.route === current;
}

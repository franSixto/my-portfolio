import { describe, expect, it } from "vitest";
import { SERVICE_NAV_LABELS, SERVICE_ROUTE_KEYS } from "@/content/services/nav";
import { liveRouteKeys, localizedPath, locales } from "@/i18n/routes";
import { servicesMenu } from "./navItems";

describe("servicesMenu", () => {
  it.each(locales)("lists the five services in order, then the hub (%s)", (locale) => {
    const menu = servicesMenu(locale);
    expect(menu.services.map((s) => s.route)).toEqual([...SERVICE_ROUTE_KEYS]);
    expect(menu.hub.route).toBe("services");
  });

  it.each(locales)("uses the service nav labels and localized hrefs (%s)", (locale) => {
    const menu = servicesMenu(locale);
    for (const item of menu.services) {
      expect(item.label).toBe(SERVICE_NAV_LABELS[locale][item.route as (typeof SERVICE_ROUTE_KEYS)[number]]);
      expect(item.href).toBe(localizedPath(item.route, locale));
    }
    expect(menu.hub.href).toBe(localizedPath("services", locale));
  });

  it("has distinct es/en hub labels and hrefs that resolve to live routes", () => {
    expect(servicesMenu("es").hub.label).toBe("Ver todos los servicios");
    expect(servicesMenu("en").hub.label).toBe("All services");
    const live = new Set(liveRouteKeys());
    for (const locale of locales) {
      const m = servicesMenu(locale);
      for (const item of [...m.services, m.hub]) {
        expect(live.has(item.route)).toBe(true);
        expect(item.href.startsWith(locale === "en" ? "/en" : "/")).toBe(true);
      }
    }
  });
});

import type { MetadataRoute } from "next";
import { getCaseSlugs } from "@/content/projects";
import {
  absoluteUrl,
  liveRouteKeys,
  localizedPath,
  locales,
  type RouteKey,
  type RouteParams,
} from "@/i18n/routes";

type Entry = { key: RouteKey; params?: RouteParams };

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = liveRouteKeys()
    .filter((key) => key !== "project")
    .map((key) => ({ key }));
  for (const slug of getCaseSlugs()) {
    entries.push({ key: "project", params: { slug } });
  }

  return entries.flatMap(({ key, params }) => {
    const languages = {
      ...Object.fromEntries(
        locales.map((l) => [l, absoluteUrl(localizedPath(key, l, params))])
      ),
      "x-default": absoluteUrl(localizedPath(key, "es", params)),
    };
    return locales.map((locale) => ({
      url: absoluteUrl(localizedPath(key, locale, params)),
      changeFrequency: key === "home" ? ("monthly" as const) : ("yearly" as const),
      priority: key === "home" ? 1 : key === "project" ? 0.6 : 0.8,
      alternates: { languages },
    }));
  });
}

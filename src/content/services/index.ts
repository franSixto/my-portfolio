import type { Locale } from "@/i18n/routes";
import { uxUiProductDesign } from "./uxUiProductDesign";
import { webDesign } from "./webDesign";
import { webDevelopment } from "./webDevelopment";
import { aiMvp } from "./aiMvp";
import type { ServiceRouteKey } from "./nav";
import type { LocalizedServiceContent, ServicePageContent } from "./types";

export const serviceContent: Record<ServiceRouteKey, LocalizedServiceContent> = {
  serviceUxUi: uxUiProductDesign,
  serviceWebDesign: webDesign,
  serviceWebDevelopment: webDevelopment,
  serviceAiMvp: aiMvp,
};

export function getServiceContent(
  key: ServiceRouteKey,
  locale: Locale
): ServicePageContent {
  return serviceContent[key][locale];
}

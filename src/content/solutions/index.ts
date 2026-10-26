import type { Locale } from "@/i18n/routes";
import { getServiceContent } from "@/content/services";
import type { LandingRouteKey, ServiceRouteKey, SolutionRouteKey } from "@/content/services/nav";
import { isSolutionRoute } from "@/content/services/nav";
import type { LocalizedSolutionContent, ServicePageContent, SolutionPageContent } from "@/content/services/types";
import { ecommerce } from "./ecommerce";
import { saas } from "./saas";
import { designSystem } from "./designSystem";
import { landing } from "./landing";
import { redesign } from "./redesign";
import { brandIdentity } from "./brandIdentity";
import { socialCampaigns } from "./socialCampaigns";

export const solutionContent: Record<SolutionRouteKey, LocalizedSolutionContent> = {
  solutionEcommerce: ecommerce,
  solutionSaas: saas,
  solutionDesignSystem: designSystem,
  solutionLanding: landing,
  solutionRedesign: redesign,
  solutionBrandIdentity: brandIdentity,
  solutionSocialCampaigns: socialCampaigns,
};

export function getSolutionContent(key: SolutionRouteKey, locale: Locale): SolutionPageContent {
  return solutionContent[key][locale];
}

/** Content of any page rendered by ServiceScreen (a service or a solution). */
export function getLandingContent(key: LandingRouteKey, locale: Locale): ServicePageContent {
  return isSolutionRoute(key)
    ? getSolutionContent(key, locale)
    : getServiceContent(key as ServiceRouteKey, locale);
}

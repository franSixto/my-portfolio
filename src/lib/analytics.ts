import { track } from "@vercel/analytics";

/**
 * Privacy-respecting events: only an event name plus a few coarse, non-personal
 * properties. Never pass names, emails or message text.
 */
export type AnalyticsEvent = "contact_submit" | "contact_link_click";

const ALLOWED_PROPS = ["project_type", "locale", "channel"] as const;
type AllowedProp = (typeof ALLOWED_PROPS)[number];
export type EventProps = Partial<Record<AllowedProp, string>>;

/** Whitelist + drop empties, so a caller can never leak extra fields by accident. */
export function sanitizeEventProps(props: Record<string, string | undefined>): EventProps {
  const clean: EventProps = {};
  for (const key of ALLOWED_PROPS) {
    const value = props[key];
    if (typeof value === "string" && value !== "") clean[key] = value;
  }
  return clean;
}

type GtagWindow = Window & { gtag?: (command: "event", name: string, params: EventProps) => void };

const GA_ENABLED = Boolean(process.env.NEXT_PUBLIC_GA_ID);

/** Fire-and-forget. Vercel Analytics always; GA only when NEXT_PUBLIC_GA_ID is set. */
export function trackEvent(name: AnalyticsEvent, props: EventProps = {}): void {
  if (typeof window === "undefined") return;
  const clean = sanitizeEventProps(props);
  try {
    track(name, clean);
  } catch {
    // Analytics must never break the page.
  }
  try {
    const gtag = (window as GtagWindow).gtag;
    if (GA_ENABLED && typeof gtag === "function") gtag("event", name, clean);
  } catch {
    // ignore
  }
}

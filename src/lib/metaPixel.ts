import type { AnalyticsEvent, EventProps } from "./analytics";

/** The id is interpolated into an inline script, so accept digits only. */
export function parsePixelId(raw: string | undefined): string {
  const value = (raw ?? "").trim();
  return /^\d+$/.test(value) ? value : "";
}

export const META_PIXEL_ID = parsePixelId(process.env.NEXT_PUBLIC_META_PIXEL_ID);

/** Standard Meta event for an internal analytics event, or null if none applies. */
export function metaCall(name: AnalyticsEvent, props: EventProps): "Lead" | "Contact" | null {
  if (name === "contact_submit") return "Lead";
  if (name === "contact_link_click" && (props.channel === "whatsapp" || props.channel === "email")) {
    return "Contact";
  }
  return null;
}

type FbqWindow = Window & { fbq?: (command: "track", event: string) => void };

/** Fire-and-forget. Sends the event name only: never parameters or personal data. */
export function sendMetaEvent(enabled: boolean, name: AnalyticsEvent, props: EventProps): void {
  if (!enabled || typeof window === "undefined") return;
  try {
    const event = metaCall(name, props);
    const fbq = (window as FbqWindow).fbq;
    if (event && typeof fbq === "function") fbq("track", event);
  } catch {
    // Analytics must never break the page.
  }
}

/** The base code fires the first PageView; only later pathname changes count. */
export function shouldTrackPageView(previous: string | null, current: string): boolean {
  return previous !== null && previous !== current;
}

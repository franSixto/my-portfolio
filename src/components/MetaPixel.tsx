"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { META_PIXEL_ID, shouldTrackPageView } from "@/lib/metaPixel";

type FbqWindow = Window & { fbq?: (command: "track", event: string) => void };

/** Fires PageView on client-side navigation. The initial load is counted by the base code. */
export default function MetaPixelPageViews() {
  const pathname = usePathname();
  const previous = useRef<string | null>(null);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    try {
      if (shouldTrackPageView(previous.current, pathname)) {
        const fbq = (window as FbqWindow).fbq;
        if (typeof fbq === "function") fbq("track", "PageView");
      }
    } catch {
      // Analytics must never break the page.
    }
    previous.current = pathname;
  }, [pathname]);

  return null;
}

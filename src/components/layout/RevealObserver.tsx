"use client";

import { useEffect } from "react";
import { createRevealer, primeMotion, type ObserverFactory } from "@/lib/motion/reveal";

/**
 * One IntersectionObserver for the whole site. Marks [data-reveal] elements
 * `data-revealed` once they enter the viewport. A MutationObserver on <main>
 * picks up the elements that client-side navigation renders afterwards.
 */
export default function RevealObserver() {
  useEffect(() => {
    // No observer support: never opt in, so everything stays visible.
    if (typeof IntersectionObserver === "undefined") return;
    if (!primeMotion(document, window)) return;
    const factory: ObserverFactory = (cb) =>
      new IntersectionObserver(
        (entries) => cb(entries.map((e) => ({ target: e.target, isIntersecting: e.isIntersecting }))),
        { rootMargin: "0px 0px -10% 0px" }
      );
    const revealer = createRevealer(factory);
    revealer.scan(document);

    const main = document.getElementById("main-content");
    let frame = 0;
    const mutations = new MutationObserver(() => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        revealer.scan(document);
      });
    });
    if (main) mutations.observe(main, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      revealer.disconnect();
    };
  }, []);

  return null;
}

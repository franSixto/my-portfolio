/**
 * Scroll-reveal logic, kept free of React and the DOM so it is unit-testable.
 *
 * Contract: content is visible by default. It is only hidden when <html> has
 * `js-motion` (added by primeMotion after hydration, and only if the user has
 * not asked for reduced motion) AND the element has not been marked
 * `data-revealed`.
 */

import type { CSSProperties } from "react";

export type RevealVariant = "up" | "fade" | "line" | "clip";

export const REVEAL_ATTR = "data-reveal";
export const REVEALED_ATTR = "data-revealed";
export const MAX_STAGGER = 3;

/** Stagger step multiplier: integer in 0..MAX_STAGGER. */
export function staggerIndex(index?: number): number {
  if (index === undefined || !Number.isFinite(index)) return 0;
  return Math.min(Math.max(Math.trunc(index), 0), MAX_STAGGER);
}

/** Props a server component spreads on its element. No client JS involved. */
export function revealProps(variant: RevealVariant, index?: number) {
  return {
    "data-reveal": variant,
    style: { "--i": staggerIndex(index) } as CSSProperties,
  };
}

type PrimeTarget = RevealTarget & { getBoundingClientRect(): { top: number; bottom: number } };
type PrimeDocument = {
  documentElement: { classList: { add(name: string): void } };
  querySelectorAll(selector: string): ArrayLike<PrimeTarget>;
};
type PrimeWindow = {
  innerHeight: number;
  matchMedia?: (query: string) => { matches: boolean };
};

/**
 * Runs after hydration (never as an inline script: touching server HTML before
 * React hydrates causes attribute mismatches). Elements already in the first
 * viewport are marked revealed without a transition first, and only then does
 * <html> opt in to the hidden state, so nothing on screen ever disappears.
 * Returns whether motion was enabled.
 */
export function primeMotion(doc: PrimeDocument, win: PrimeWindow): boolean {
  try {
    if (!win.matchMedia?.("(prefers-reduced-motion: no-preference)").matches) return false;
    const vh = win.innerHeight;
    const nodes = doc.querySelectorAll(`[${REVEAL_ATTR}]:not([${REVEALED_ATTR}])`);
    for (let i = 0; i < nodes.length; i++) {
      const rect = nodes[i].getBoundingClientRect();
      if (rect.top < vh * 0.9 && rect.bottom > 0) nodes[i].setAttribute(REVEALED_ATTR, "instant");
    }
    doc.documentElement.classList.add("js-motion");
    return true;
  } catch {
    return false;
  }
}

export type RevealTarget = {
  hasAttribute(name: string): boolean;
  setAttribute(name: string, value: string): void;
};
export type RevealEntry = { target: RevealTarget; isIntersecting: boolean };
export type ObserverLike = {
  observe(el: RevealTarget): void;
  unobserve(el: RevealTarget): void;
  disconnect(): void;
};
export type ObserverFactory = (cb: (entries: RevealEntry[]) => void) => ObserverLike;
export type RevealRoot = { querySelectorAll(selector: string): ArrayLike<RevealTarget> };

/** One observer for the whole page; each element is revealed once, then released. */
export function createRevealer(factory: ObserverFactory) {
  const tracked = new WeakSet<RevealTarget>();
  const observer = factory((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.setAttribute(REVEALED_ATTR, "");
      observer.unobserve(entry.target);
    }
  });

  return {
    scan(root: RevealRoot) {
      const nodes = root.querySelectorAll(`[${REVEAL_ATTR}]:not([${REVEALED_ATTR}])`);
      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i];
        if (tracked.has(el) || el.hasAttribute(REVEALED_ATTR)) continue;
        tracked.add(el);
        observer.observe(el);
      }
    },
    disconnect() {
      observer.disconnect();
    },
  };
}

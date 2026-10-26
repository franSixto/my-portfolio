import { describe, expect, it } from "vitest";
import {
  MAX_STAGGER,
  createRevealer,
  primeMotion,
  revealProps,
  staggerIndex,
  type ObserverLike,
  type RevealEntry,
  type RevealTarget,
} from "./reveal";

class FakeEl implements RevealTarget {
  attrs = new Map<string, string>();
  constructor(public top = 2000, public bottom = 2100, revealed?: string) {
    if (revealed !== undefined) this.attrs.set("data-revealed", revealed);
  }
  hasAttribute(name: string) {
    return this.attrs.has(name);
  }
  setAttribute(name: string, value: string) {
    this.attrs.set(name, value);
  }
  getBoundingClientRect() {
    return { top: this.top, bottom: this.bottom };
  }
}

function fakeRoot(els: FakeEl[]) {
  return { querySelectorAll: () => els };
}

function fakeObserverFactory() {
  const observed: RevealTarget[] = [];
  const unobserved: RevealTarget[] = [];
  let callback: (entries: RevealEntry[]) => void = () => {};
  const factory = (cb: (entries: RevealEntry[]) => void): ObserverLike => {
    callback = cb;
    return {
      observe: (el) => void observed.push(el),
      unobserve: (el) => void unobserved.push(el),
      disconnect: () => {},
    };
  };
  return { factory, observed, unobserved, fire: (entries: RevealEntry[]) => callback(entries) };
}

describe("staggerIndex", () => {
  it("clamps to the 0..MAX_STAGGER range and tolerates junk", () => {
    expect(MAX_STAGGER).toBe(3);
    expect(staggerIndex(0)).toBe(0);
    expect(staggerIndex(2)).toBe(2);
    expect(staggerIndex(9)).toBe(MAX_STAGGER);
    expect(staggerIndex(-4)).toBe(0);
    expect(staggerIndex(Number.NaN)).toBe(0);
    expect(staggerIndex(undefined)).toBe(0);
    expect(staggerIndex(1.7)).toBe(1);
  });
});

describe("revealProps", () => {
  it("emits only the data attribute and the capped --i variable", () => {
    expect(revealProps("up", 7)).toEqual({ "data-reveal": "up", style: { "--i": 3 } });
    expect(revealProps("fade")).toEqual({ "data-reveal": "fade", style: { "--i": 0 } });
  });
});

describe("createRevealer", () => {
  it("observes unrevealed targets once, even when scanned repeatedly", () => {
    const a = new FakeEl();
    const b = new FakeEl();
    const done = new FakeEl(0, 10, "");
    const obs = fakeObserverFactory();
    const revealer = createRevealer(obs.factory);
    revealer.scan(fakeRoot([a, b, done]));
    revealer.scan(fakeRoot([a, b, done]));
    expect(obs.observed).toEqual([a, b]);
  });

  it("marks intersecting targets revealed once and stops observing them", () => {
    const a = new FakeEl();
    const b = new FakeEl();
    const obs = fakeObserverFactory();
    const revealer = createRevealer(obs.factory);
    revealer.scan(fakeRoot([a, b]));
    obs.fire([
      { target: a, isIntersecting: true },
      { target: b, isIntersecting: false },
    ]);
    expect(a.hasAttribute("data-revealed")).toBe(true);
    expect(b.hasAttribute("data-revealed")).toBe(false);
    expect(obs.unobserved).toEqual([a]);
  });

  it("observes elements added later (client-side navigation)", () => {
    const a = new FakeEl();
    const next = new FakeEl();
    const obs = fakeObserverFactory();
    const revealer = createRevealer(obs.factory);
    revealer.scan(fakeRoot([a]));
    revealer.scan(fakeRoot([a, next]));
    expect(obs.observed).toEqual([a, next]);
  });
});

function runPrime(opts: { reduce: boolean; nodes?: FakeEl[]; vh?: number; noMatchMedia?: boolean }) {
  const classes = new Set<string>();
  const order: string[] = [];
  const nodes = opts.nodes ?? [];
  for (const n of nodes) {
    const set = n.setAttribute.bind(n);
    n.setAttribute = (name, value) => {
      order.push("mark");
      set(name, value);
    };
  }
  const doc = {
    documentElement: {
      classList: {
        add: (c: string) => {
          order.push(c);
          classes.add(c);
        },
      },
    },
    querySelectorAll: () => nodes,
  };
  const win = {
    innerHeight: opts.vh ?? 800,
    matchMedia: opts.noMatchMedia
      ? undefined
      : (q: string) => ({ matches: q.includes("no-preference") ? !opts.reduce : opts.reduce }),
  };
  const enabled = primeMotion(doc, win);
  return { enabled, classes, order };
}

describe("no-JS / reduced-motion contract", () => {
  it("adds js-motion only when the user has not asked for reduced motion", () => {
    expect(runPrime({ reduce: false }).classes.has("js-motion")).toBe(true);
    expect(runPrime({ reduce: true }).classes.has("js-motion")).toBe(false);
  });

  it("never throws if matchMedia is unavailable (content stays visible)", () => {
    const result = runPrime({ reduce: false, noMatchMedia: true });
    expect(result.enabled).toBe(false);
    expect(result.classes.size).toBe(0);
  });

  it("pre-reveals elements already inside the first viewport, leaves the rest", () => {
    const inView = new FakeEl(100, 300);
    const below = new FakeEl(1500, 1700);
    runPrime({ reduce: false, nodes: [inView, below], vh: 800 });
    expect(inView.attrs.get("data-revealed")).toBe("instant");
    expect(below.hasAttribute("data-revealed")).toBe(false);
  });

  it("marks in-view elements before opting in, so nothing visible is ever hidden", () => {
    const inView = new FakeEl(100, 300);
    expect(runPrime({ reduce: false, nodes: [inView] }).order).toEqual(["mark", "js-motion"]);
  });

  it("does not pre-reveal elements when reduced motion is on (nothing is hidden anyway)", () => {
    const inView = new FakeEl(100, 300);
    runPrime({ reduce: true, nodes: [inView] });
    expect(inView.hasAttribute("data-revealed")).toBe(false);
  });
});

describe("hydration safety", () => {
  it("ships no inline script that mutates server HTML before hydration", async () => {
    const mod = await import("./reveal");
    expect(mod).not.toHaveProperty("MOTION_BOOT_SCRIPT");
    expect(mod).not.toHaveProperty("MOTION_PRIME_SCRIPT");
  });
});

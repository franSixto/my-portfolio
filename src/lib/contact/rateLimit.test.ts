import { describe, expect, it } from "vitest";
import { createRateLimiter, getClientIp } from "./rateLimit";

describe("createRateLimiter", () => {
  it("allows up to the limit inside the window, then blocks", () => {
    const now = 0;
    const limiter = createRateLimiter({ limit: 3, windowMs: 1000, now: () => now });
    expect(limiter.check("ip").allowed).toBe(true);
    expect(limiter.check("ip").allowed).toBe(true);
    expect(limiter.check("ip").allowed).toBe(true);
    const blocked = limiter.check("ip");
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBeGreaterThan(0);
    expect(blocked.retryAfterMs).toBeLessThanOrEqual(1000);
  });

  it("tracks keys independently", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000, now: () => 0 });
    expect(limiter.check("a").allowed).toBe(true);
    expect(limiter.check("b").allowed).toBe(true);
    expect(limiter.check("a").allowed).toBe(false);
  });

  it("frees slots as the window slides", () => {
    let now = 0;
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000, now: () => now });
    limiter.check("ip");
    now = 500;
    limiter.check("ip");
    expect(limiter.check("ip").allowed).toBe(false);
    now = 1001; // first hit expired, second still counts
    expect(limiter.check("ip").allowed).toBe(true);
    expect(limiter.check("ip").allowed).toBe(false);
  });

  it("does not count blocked attempts against the window", () => {
    let now = 0;
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000, now: () => now });
    limiter.check("ip");
    for (let i = 0; i < 10; i++) limiter.check("ip");
    now = 1001;
    expect(limiter.check("ip").allowed).toBe(true);
  });

  it("evicts stale keys so memory stays bounded", () => {
    let now = 0;
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000, now: () => now, maxKeys: 3 });
    for (const k of ["a", "b", "c"]) limiter.check(k);
    now = 2000;
    limiter.check("d");
    expect(limiter.size()).toBeLessThanOrEqual(3);
  });
});

describe("getClientIp", () => {
  it("uses the first x-forwarded-for entry", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.5, 10.0.0.1" });
    expect(getClientIp(headers)).toBe("203.0.113.5");
  });
  it("falls back to x-real-ip and then to unknown", () => {
    expect(getClientIp(new Headers({ "x-real-ip": "198.51.100.7" }))).toBe("198.51.100.7");
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});

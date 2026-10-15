/**
 * Sliding-window rate limiter kept in process memory.
 *
 * Best-effort only: on serverless platforms each instance has its own memory
 * and instances are recycled, so this slows down casual abuse but is not a
 * hard guarantee. reCAPTCHA is the real gate.
 */
export type RateLimiterOptions = {
  limit: number;
  windowMs: number;
  /** Injectable clock for tests. */
  now?: () => number;
  /** Upper bound of tracked keys; stale ones are evicted first. */
  maxKeys?: number;
};

export type RateLimitResult = { allowed: boolean; retryAfterMs: number };

export function createRateLimiter({ limit, windowMs, now = Date.now, maxKeys = 5000 }: RateLimiterOptions) {
  const hits = new Map<string, number[]>();

  function prune(timestamp: number) {
    for (const [key, times] of hits) {
      const fresh = times.filter((t) => timestamp - t < windowMs);
      if (fresh.length === 0) hits.delete(key);
      else if (fresh.length !== times.length) hits.set(key, fresh);
    }
  }

  return {
    check(key: string): RateLimitResult {
      const timestamp = now();
      const times = (hits.get(key) ?? []).filter((t) => timestamp - t < windowMs);

      if (times.length >= limit) {
        hits.set(key, times);
        return { allowed: false, retryAfterMs: Math.max(1, windowMs - (timestamp - times[0])) };
      }

      if (!hits.has(key) && hits.size >= maxKeys) prune(timestamp);
      times.push(timestamp);
      hits.set(key, times);
      return { allowed: true, retryAfterMs: 0 };
    },
    size: () => hits.size,
  };
}

/** Caller IP behind a proxy (Vercel sets x-forwarded-for). */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}

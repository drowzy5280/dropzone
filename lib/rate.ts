// lib/rate.ts
// Simple in-memory token bucket per IP (ok for single-region beta)
const buckets = new Map<string, { tokens: number; reset: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_TOKENS = 60;    // 60 req/min per IP

export function rateLimit(ip: string | null | undefined) {
  const now = Date.now();
  const key = ip || "unknown";
  let b = buckets.get(key);
  if (!b || now > b.reset) {
    b = { tokens: MAX_TOKENS, reset: now + WINDOW_MS };
    buckets.set(key, b);
  }
  if (b.tokens <= 0) {
    const retry = Math.ceil((b.reset - now) / 1000);
    return { ok: false, retryAfter: retry };
  }
  b.tokens -= 1;
  return { ok: true, retryAfter: 0 };
}

export function getIP(req: Request) {
  // Next.js runtime headers
  // @ts-ignore
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || null;
}

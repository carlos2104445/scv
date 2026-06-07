/**
 * Simple in-memory rate limiter for server actions.
 * Suitable for single-instance deployments (PM2 with standalone output).
 * For multi-instance, replace with Redis/Upstash.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now > entry.resetTime) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

interface RateLimitOptions {
  /** Maximum number of requests allowed within the window */
  maxRequests?: number;
  /** Time window in milliseconds */
  windowMs?: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}

/**
 * Check if a given identifier (usually IP) is within rate limits.
 * @param identifier - Unique key (e.g., IP address, user ID)
 * @param options - Rate limit configuration
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const { maxRequests = 5, windowMs = 15 * 60 * 1000 } = options;
  const now = Date.now();
  const entry = store.get(identifier);

  // No existing entry or window expired — start fresh
  if (!entry || now > entry.resetTime) {
    store.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, retryAfterMs: 0 };
  }

  // Within window — check count
  if (entry.count < maxRequests) {
    entry.count++;
    return { allowed: true, remaining: maxRequests - entry.count, retryAfterMs: 0 };
  }

  // Rate limited
  return {
    allowed: false,
    remaining: 0,
    retryAfterMs: entry.resetTime - now,
  };
}

/**
 * Check if a honeypot field was filled (indicates bot submission).
 * The field should be hidden via CSS and left empty by real users.
 */
export function isHoneypotFilled(value: string | undefined | null): boolean {
  return !!value && value.trim().length > 0;
}

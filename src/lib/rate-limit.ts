type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

function pruneExpired(key: string, now: number) {
  const b = store.get(key);
  if (b && now > b.resetAt) store.delete(key);
}

export function checkRateLimit(
  key: string,
  max: number,
  windowMs: number,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  pruneExpired(key, now);

  let bucket = store.get(key);
  if (!bucket || now > bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
    store.set(key, bucket);
  }

  if (bucket.count >= max) {
    const retryAfterSec = Math.ceil((bucket.resetAt - now) / 1000);
    return { ok: false, retryAfterSec: Math.max(1, retryAfterSec) };
  }

  bucket.count += 1;
  return { ok: true };
}

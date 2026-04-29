import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "rose_admin_session";

function sha256Hex(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function getExpectedSessionToken(): string | null {
  const password = process.env.ADMIN_PANEL_PASSWORD;
  const secret = process.env.ADMIN_PANEL_SECRET;
  if (!password || !secret) return null;
  return sha256Hex(`${password}:${secret}`);
}

function safeEqualHex(a: string, b: string): boolean {
  const left = Buffer.from(a, "hex");
  const right = Buffer.from(b, "hex");
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function isAdminEnvConfigured(): boolean {
  return Boolean(process.env.ADMIN_PANEL_PASSWORD && process.env.ADMIN_PANEL_SECRET);
}

export function createAdminSessionCookieValue(): string | null {
  return getExpectedSessionToken();
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = getExpectedSessionToken();
  if (!expected) return false;
  const store = await cookies();
  const current = store.get(ADMIN_COOKIE)?.value;
  if (!current) return false;
  if (!/^[a-f0-9]{64}$/i.test(current)) return false;
  return safeEqualHex(current.toLowerCase(), expected);
}

export async function setAdminSessionCookie(value: string): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearAdminSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}


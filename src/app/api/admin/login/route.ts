import { NextResponse } from "next/server";
import {
  clearAdminSessionCookie,
  createAdminSessionCookieValue,
  isAdminEnvConfigured,
  setAdminSessionCookie,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminEnvConfigured()) {
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url));
  }

  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const expectedPassword = process.env.ADMIN_PANEL_PASSWORD ?? "";

  if (!password || password !== expectedPassword) {
    await clearAdminSessionCookie();
    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url));
  }

  const cookieValue = createAdminSessionCookieValue();
  if (!cookieValue) {
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url));
  }

  await setAdminSessionCookie(cookieValue);
  return NextResponse.redirect(new URL("/admin/temoignages", request.url));
}


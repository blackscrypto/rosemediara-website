import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseService } from "@/lib/supabase";

const ALLOWED_STATUS = new Set(["approved", "rejected"]);

export async function POST(request: Request) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.redirect(new URL("/admin/login?error=session", request.url));
  }

  const form = await request.formData();
  const id = String(form.get("id") ?? "").trim();
  const status = String(form.get("status") ?? "").trim();

  if (!id || !ALLOWED_STATUS.has(status)) {
    return NextResponse.redirect(new URL("/admin/temoignages?error=invalid", request.url));
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    return NextResponse.redirect(new URL("/admin/temoignages?error=config", request.url));
  }

  const { error } = await supabase
    .from("testimonials")
    .update({
      status,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return NextResponse.redirect(new URL("/admin/temoignages?error=save", request.url));
  }

  return NextResponse.redirect(new URL("/admin/temoignages?ok=1", request.url));
}


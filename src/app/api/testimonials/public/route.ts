import { NextResponse } from "next/server";
import { fetchApprovedTestimonialsPage } from "@/lib/testimonials-query";
import { getMockTestimonialsPage } from "@/lib/mock-testimonials";

const MAX_LIMIT = 12;
const MAX_OFFSET = 400;

function parseIntParam(v: string | null, fallback: number, min: number, max: number) {
  const n = Number.parseInt(String(v ?? ""), 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

/** Liste publique des témoignages approuvés (pagination). Sans Supabase : données de démo. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseIntParam(searchParams.get("limit"), 3, 1, MAX_LIMIT);
  const offset = parseIntParam(searchParams.get("offset"), 0, 0, MAX_OFFSET);

  const fromDb = await fetchApprovedTestimonialsPage(limit, offset);
  if (fromDb) {
    return NextResponse.json({
      items: fromDb.items,
      hasMore: fromDb.hasMore,
    });
  }

  const mock = getMockTestimonialsPage(offset, limit);
  return NextResponse.json({
    items: mock.items,
    hasMore: mock.hasMore,
  });
}

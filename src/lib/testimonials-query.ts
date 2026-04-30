import type { TestimonialPublic } from "@/types";
import { getSupabaseAnon } from "@/lib/supabase";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchApprovedTestimonials(
  limit?: number,
): Promise<TestimonialPublic[] | null> {
  noStore();
  const supabase = getSupabaseAnon();
  if (!supabase) return null;

  let query = supabase
    .from("testimonials")
    .select("id, first_name, rating, content, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (limit != null) query = query.limit(limit);

  const { data, error } = await query;
  if (error || !data) return null;
  return data as TestimonialPublic[];
}

/** Page d’avis approuvés : `hasMore` si un témoignage supplémentaire existe après cette page. */
export async function fetchApprovedTestimonialsPage(
  limit: number,
  offset: number,
): Promise<{ items: TestimonialPublic[]; hasMore: boolean } | null> {
  noStore();
  const supabase = getSupabaseAnon();
  if (!supabase) return null;

  const fetchCount = limit + 1;
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, first_name, rating, content, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .range(offset, offset + fetchCount - 1);

  if (error || !data) return null;
  const hasMore = data.length > limit;
  const items = (hasMore ? data.slice(0, limit) : data) as TestimonialPublic[];
  return { items, hasMore };
}

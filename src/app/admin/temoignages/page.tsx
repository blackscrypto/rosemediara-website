import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseService } from "@/lib/supabase";
import type { TestimonialRow } from "@/types";

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type PendingItem = Pick<
  TestimonialRow,
  "id" | "first_name" | "email" | "rating" | "content" | "created_at"
>;

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
): string | null {
  const value = params[key];
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value[0]) return value[0];
  return null;
}

export default async function AdminTestimonialsPage({ searchParams }: Props) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const params = searchParams ? await searchParams : {};
  const ok = getParam(params, "ok");
  const error = getParam(params, "error");

  const supabase = getSupabaseService();
  const pending: PendingItem[] = [];
  let loadError: string | null = null;

  if (!supabase) {
    loadError = "Supabase non configuré (clé service manquante).";
  } else {
    const { data, error: queryError } = await supabase
      .from("testimonials")
      .select("id, first_name, email, rating, content, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(100);

    if (queryError) {
      loadError = "Impossible de charger les témoignages en attente.";
    } else if (data) {
      pending.push(...(data as PendingItem[]));
    }
  }

  return (
    <div className="py-10 sm:py-12">
      <Container className="max-w-4xl">
        <div className="mb-4 flex justify-end">
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="inline-flex min-h-10 items-center justify-center rounded-[12px] border border-border bg-cream/55 px-4 py-2 text-sm font-semibold text-text-secondary transition hover:text-text"
            >
              Déconnexion
            </button>
          </form>
        </div>

        <SectionTitle
          title="Modération des témoignages"
          subtitle="Validez les avis avant publication sur le site."
          align="center"
        />

        {ok ? (
          <p className="mb-4 rounded-[10px] border border-sage/35 bg-sage/10 px-4 py-3 text-sm font-medium text-text">
            Action enregistrée.
          </p>
        ) : null}

        {error ? (
          <p className="mb-4 rounded-[10px] border border-accent-rose/35 bg-accent-rose/10 px-4 py-3 text-sm font-medium text-text">
            {error === "invalid" && "Action invalide."}
            {error === "config" && "Configuration Supabase incomplète."}
            {error === "save" && "Enregistrement impossible. Réessayez."}
          </p>
        ) : null}

        {loadError ? (
          <p className="rounded-[14px] border border-accent-rose/35 bg-accent-rose/10 px-5 py-4 text-sm font-medium text-text">
            {loadError}
          </p>
        ) : null}

        {!loadError && pending.length === 0 ? (
          <p className="rounded-[14px] border border-border bg-gradient-card px-5 py-5 text-sm font-medium text-text-secondary">
            Aucun témoignage en attente pour le moment.
          </p>
        ) : null}

        <div className="space-y-4">
          {pending.map((t) => (
            <article
              key={t.id}
              className="rounded-[14px] border border-border bg-gradient-card p-5 shadow-soft"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-lg font-semibold text-text">{t.first_name}</p>
                  <p className="text-sm font-medium text-text-secondary">{t.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-sage-ink">Note : {t.rating}/5</p>
                  <p className="text-xs font-medium text-text-muted">{formatDate(t.created_at)}</p>
                </div>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm font-medium leading-relaxed text-text-secondary">
                {t.content}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <form action="/api/admin/testimonials/moderate" method="post">
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="status" value="approved" />
                  <button
                    type="submit"
                    className="inline-flex min-h-10 items-center justify-center rounded-[12px] bg-accent-rose px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-rose-hover"
                  >
                    Approuver
                  </button>
                </form>
                <form action="/api/admin/testimonials/moderate" method="post">
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="status" value="rejected" />
                  <button
                    type="submit"
                    className="inline-flex min-h-10 items-center justify-center rounded-[12px] border border-border bg-cream/55 px-4 py-2 text-sm font-semibold text-text-secondary transition hover:text-text"
                  >
                    Refuser
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}


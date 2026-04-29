import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { isAdminAuthenticated, isAdminEnvConfigured } from "@/lib/admin-auth";

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
): string | null {
  const value = params[key];
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value[0]) return value[0];
  return null;
}

export default async function AdminLoginPage({ searchParams }: Props) {
  if (await isAdminAuthenticated()) {
    redirect("/admin/temoignages");
  }

  const params = searchParams ? await searchParams : {};
  const error = getParam(params, "error");
  const configured = isAdminEnvConfigured();

  return (
    <div className="py-10 sm:py-12">
      <Container className="max-w-xl">
        <SectionTitle
          title="Connexion admin"
          subtitle="Espace privé pour valider ou refuser les témoignages."
          align="center"
        />

        <div className="rounded-[14px] border border-border bg-gradient-card p-6 shadow-soft sm:p-8">
          {!configured ? (
            <p className="rounded-[10px] border border-accent-rose/30 bg-accent-rose/10 px-4 py-3 text-sm font-medium text-text">
              Configuration manquante : ajoutez `ADMIN_PANEL_PASSWORD` et `ADMIN_PANEL_SECRET`
              dans `.env.local`, puis redémarrez `npm run dev`.
            </p>
          ) : null}

          {error ? (
            <p className="mb-4 rounded-[10px] border border-accent-rose/35 bg-accent-rose/10 px-4 py-3 text-sm font-medium text-text">
              {error === "invalid" && "Mot de passe incorrect."}
              {error === "config" && "Configuration admin incomplète."}
              {error === "session" && "Session expirée. Reconnectez-vous."}
            </p>
          ) : null}

          <form action="/api/admin/login" method="post" className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-text">Mot de passe admin</span>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="mt-2 w-full rounded-[10px] border border-border bg-cream/60 px-3 py-2.5 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/20"
              />
            </label>
            <button
              type="submit"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-[14px] bg-accent-rose px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-rose-hover disabled:pointer-events-none disabled:opacity-50"
              disabled={!configured}
            >
              Se connecter
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}


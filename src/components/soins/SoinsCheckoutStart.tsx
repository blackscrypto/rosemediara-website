"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

export function SoinsCheckoutStart() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "cancelled") {
      setGlobalError("Paiement annulé. Vous pouvez réessayer quand vous le souhaitez.");
      params.delete("payment");
      const next = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
      window.history.replaceState({}, "", next);
    }
  }, []);

  function validate() {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Le prénom est requis.";
    if (!lastName.trim()) e.lastName = "Le nom est requis.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Adresse email invalide.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setGlobalError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/soins/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        checkoutUrl?: string;
      };
      if (!res.ok || !data.checkoutUrl) {
        setGlobalError(
          data.error ?? "Impossible de démarrer le paiement. Réessayez plus tard.",
        );
        return;
      }
      window.location.href = data.checkoutUrl;
    } catch {
      setGlobalError("Erreur réseau. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-[14px] border border-border bg-gradient-card p-6 shadow-soft sm:p-8"
      noValidate
    >
      <p className="text-sm font-medium leading-relaxed text-text-secondary">
        Après paiement sécurisé (145&nbsp;€), vous serez redirigé·e vers la page pour
        compléter votre demande et joindre vos photos.
      </p>

      {globalError ? (
        <p className="rounded-[12px] bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {globalError}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          id="commander-firstName"
          label="Prénom"
          required
          error={errors.firstName}
        >
          <input
            id="commander-firstName"
            name="firstName"
            autoComplete="given-name"
            className="w-full rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            aria-invalid={errors.firstName ? true : undefined}
          />
        </FormField>
        <FormField
          id="commander-lastName"
          label="Nom"
          required
          error={errors.lastName}
        >
          <input
            id="commander-lastName"
            name="lastName"
            autoComplete="family-name"
            className="w-full rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            aria-invalid={errors.lastName ? true : undefined}
          />
        </FormField>
      </div>

      <FormField id="commander-email" label="Email" required error={errors.email}>
        <input
          id="commander-email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
        />
      </FormField>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <Button type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
          {loading ? "Redirection vers Stripe…" : "Payer 145 € — continuer"}
        </Button>
        <Link
          href="/soins"
          className="text-center text-sm font-semibold text-accent-rose underline-offset-4 hover:underline sm:text-left"
        >
          ← Retour à la présentation des soins
        </Link>
      </div>
    </form>
  );
}

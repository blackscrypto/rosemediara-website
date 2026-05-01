"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { FileUpload } from "@/components/ui/FileUpload";

const initial = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: "",
  message: "",
  acceptTerms: false,
};

export function SoinsForm() {
  const [mounted, setMounted] = useState(false);
  const [values, setValues] = useState(initial);
  const [files, setFiles] = useState<File[]>([]);
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!values.firstName.trim()) e.firstName = "Le prénom est requis.";
    if (!values.lastName.trim()) e.lastName = "Le nom est requis.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      e.email = "Adresse email invalide.";
    if (!values.birthDate) e.birthDate = "La date de naissance est requise.";
    if (values.message.trim().length < 20)
      e.message = "Veuillez détailler votre demande (20 caractères minimum).";
    if (!values.acceptTerms)
      e.acceptTerms = "Vous devez accepter les conditions et la confidentialité.";
    if (files.length === 0) e.photos = "Au moins une photo est requise.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      setPaymentSessionId(sessionId);
      params.delete("session_id");
      const next = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
      window.history.replaceState({}, "", next);

      let cancelled = false;
      fetch(`/api/soins/checkout-session?id=${encodeURIComponent(sessionId)}`)
        .then((res) => res.json().catch(() => ({})))
        .then((data: { firstName?: string; lastName?: string; email?: string; error?: string }) => {
          if (cancelled || data.error) return;
          setValues((prev) => ({
            ...prev,
            firstName: data.firstName?.trim() || prev.firstName,
            lastName: data.lastName?.trim() || prev.lastName,
            email: data.email?.trim() || prev.email,
          }));
          setInfoMessage(
            "Paiement bien enregistré. Vérifiez vos coordonnées, ajoutez vos photos puis envoyez votre demande.",
          );
        })
        .catch(() => {});

      setMounted(true);

      return () => {
        cancelled = true;
      };
    }

    setMounted(true);
  }, []);

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setGlobalError(null);
    setInfoMessage(null);

    if (!paymentSessionId) {
      setGlobalError("Session de paiement introuvable.");
      return;
    }

    if (!validate()) return;

    setStatus("loading");
    const fd = new FormData();
    fd.append("firstName", values.firstName.trim());
    fd.append("lastName", values.lastName.trim());
    fd.append("email", values.email.trim());
    fd.append("phone", values.phone.trim());
    fd.append("birthDate", values.birthDate);
    fd.append("message", values.message.trim());
    fd.append("acceptTerms", values.acceptTerms ? "true" : "false");
    fd.append("paymentSessionId", paymentSessionId);
    files.forEach((f) => fd.append("photos", f));

    try {
      const res = await fetch("/api/soins", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        retryAfterSec?: number;
      };

      if (!res.ok) {
        if (res.status === 429 && data.retryAfterSec) {
          setGlobalError(
            `Trop de demandes. Réessayez dans environ ${data.retryAfterSec} secondes.`,
          );
        } else {
          setGlobalError(
            data.error ??
              "L’envoi a échoué. Réessayez plus tard ou contactez-moi par email.",
          );
        }
        setStatus("error");
        return;
      }

      setPaymentSessionId(null);
      setStatus("success");
      setValues(initial);
      setFiles([]);
      setErrors({});
    } catch {
      setGlobalError("Erreur réseau. Vérifiez votre connexion.");
      setStatus("error");
    }
  }

  if (!mounted) {
    return (
      <div
        className="rounded-[14px] border border-border bg-gradient-card px-8 py-12 text-center text-sm font-medium text-text-muted shadow-soft"
        aria-busy="true"
      >
        Chargement…
      </div>
    );
  }

  if (!paymentSessionId && status !== "success") {
    return (
      <div className="rounded-[14px] border border-border bg-gradient-card p-8 text-center shadow-soft">
        <p className="font-serif text-lg font-semibold text-text">
          Paiement requis avant le formulaire
        </p>
        <p className="mt-3 text-sm font-medium leading-relaxed text-text-secondary">
          Pour éviter les demandes sans règlement, le formulaire détaillé s’ouvre
          uniquement après paiement sécurisé (1&nbsp;€).
        </p>
        <Button href="/soins/commander" variant="primary" className="mt-8">
          Continuer vers le paiement
        </Button>
        <p className="mt-6 text-xs font-medium text-text-muted">
          <Link href="/soins" className="text-accent-rose underline-offset-4 hover:underline">
            ← Retour à la présentation des soins
          </Link>
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div
        className="rounded-[14px] border border-sage/40 bg-sage/10 px-6 py-8 text-center"
        role="status"
      >
        <p className="font-serif text-lg font-semibold text-text">
          Demande bien reçue
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Merci. Votre paiement et votre demande sont bien enregistrés. Je
          reviendrai vers vous après étude de votre dossier.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-[14px] border border-border bg-gradient-card p-6 shadow-soft sm:p-8"
      noValidate
    >
      {globalError ? (
        <p className="rounded-[12px] bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {globalError}
        </p>
      ) : null}
      {infoMessage ? (
        <p
          className="rounded-[12px] border border-sage/30 bg-sage/10 px-4 py-3 text-sm text-text"
          role="status"
        >
          {infoMessage}
        </p>
      ) : null}

      <div
        className="flex flex-wrap gap-2 text-xs font-semibold text-sage-ink"
        role="status"
        aria-label="Progression du formulaire"
      >
        <span className="rounded-full bg-accent-rose/15 px-3 py-1.5 text-accent-rose">
          Paiement validé
        </span>
        <span className="rounded-full bg-black/[0.06] px-3 py-1.5 text-text-secondary">
          Demande détaillée
        </span>
      </div>

      <div>
        <h3 className="border-b border-border pb-2 font-serif text-base font-semibold text-text">
          Vos coordonnées
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          id="soins-firstName"
          label="Prénom"
          required
          error={errors.firstName}
        >
          <input
            id="soins-firstName"
            name="firstName"
            autoComplete="given-name"
            className="w-full rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
            value={values.firstName}
            onChange={(e) =>
              setValues((v) => ({ ...v, firstName: e.target.value }))
            }
            aria-invalid={errors.firstName ? true : undefined}
          />
        </FormField>
        <FormField
          id="soins-lastName"
          label="Nom"
          required
          error={errors.lastName}
        >
          <input
            id="soins-lastName"
            name="lastName"
            autoComplete="family-name"
            className="w-full rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
            value={values.lastName}
            onChange={(e) =>
              setValues((v) => ({ ...v, lastName: e.target.value }))
            }
            aria-invalid={errors.lastName ? true : undefined}
          />
        </FormField>
      </div>

      <FormField id="soins-email" label="Email" required error={errors.email}>
        <input
          id="soins-email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          aria-invalid={errors.email ? true : undefined}
        />
      </FormField>

      <FormField id="soins-phone" label="Téléphone (optionnel)">
        <input
          id="soins-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
          value={values.phone}
          onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
        />
      </FormField>

      <FormField
        id="soins-birthDate"
        label="Date de naissance"
        required
        error={errors.birthDate}
      >
        <input
          id="soins-birthDate"
          name="birthDate"
          type="date"
          className="w-full rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
          value={values.birthDate}
          onChange={(e) =>
            setValues((v) => ({ ...v, birthDate: e.target.value }))
          }
          aria-invalid={errors.birthDate ? true : undefined}
        />
      </FormField>

      <div className="pt-2">
        <h3 className="border-b border-border pb-2 font-serif text-base font-semibold text-text">
          Votre demande et photos
        </h3>
      </div>

      <FormField
        id="soins-photos"
        label="Photos"
        required
        error={errors.photos}
        hint="Une à trois photos récentes (visage de préférence). Elles restent strictement confidentielles et ne servent qu’à me connecter à votre énergie pour le soin."
      >
        <FileUpload
          id="soins-photos"
          value={files}
          onChange={setFiles}
          describedBy="soins-photos-hint"
        />
      </FormField>

      <FormField
        id="soins-message"
        label="Votre demande"
        required
        error={errors.message}
      >
        <textarea
          id="soins-message"
          name="message"
          rows={5}
          minLength={20}
          className="w-full resize-y rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
          value={values.message}
          onChange={(e) =>
            setValues((v) => ({ ...v, message: e.target.value }))
          }
          aria-invalid={errors.message ? true : undefined}
        />
      </FormField>

      <div className="flex items-start gap-3">
        <input
          id="soins-terms"
          name="acceptTerms"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-border text-accent-rose focus:ring-accent-rose"
          checked={values.acceptTerms}
          onChange={(e) =>
            setValues((v) => ({ ...v, acceptTerms: e.target.checked }))
          }
          aria-invalid={errors.acceptTerms ? true : undefined}
        />
        <label htmlFor="soins-terms" className="text-sm text-text-muted">
          J’accepte les conditions générales de vente et la politique de
          confidentialité.
        </label>
      </div>
      {errors.acceptTerms ? (
        <p className="text-sm text-red-700" role="alert">
          {errors.acceptTerms}
        </p>
      ) : null}

      <Button type="submit" variant="primary" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Envoi en cours…" : "Envoyer ma demande"}
      </Button>
    </form>
  );
}

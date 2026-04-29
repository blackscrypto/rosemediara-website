"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { StarRating } from "@/components/ui/StarRating";

export function TestimonialSubmitForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [globalError, setGlobalError] = useState<string | null>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Le prénom est requis.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Email invalide.";
    if (content.trim().length < 20 || content.trim().length > 1000)
      e.content = "Entre 20 et 1000 caractères.";
    if (!consent) e.consent = "Le consentement est requis pour publication.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setGlobalError(null);
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          rating,
          content: content.trim(),
          consent,
          website: honeypot,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        retryAfterSec?: number;
      };

      if (!res.ok) {
        if (res.status === 429 && data.retryAfterSec) {
          setGlobalError(
            `Limite atteinte. Réessayez dans environ ${data.retryAfterSec} secondes.`,
          );
        } else {
          setGlobalError(data.error ?? "Envoi impossible pour le moment.");
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      setFirstName("");
      setEmail("");
      setRating(5);
      setContent("");
      setConsent(false);
      setErrors({});
    } catch {
      setGlobalError("Erreur réseau.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-[14px] border border-sage/40 bg-sage/10 px-6 py-8 text-center"
        role="status"
      >
        <p className="font-serif text-lg font-semibold text-text">
          Merci !
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Votre témoignage sera publié après vérification.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative space-y-6 rounded-[14px] border border-border bg-gradient-card p-6 shadow-soft sm:p-8"
      noValidate
    >
      {/* Honeypot — leave hidden from users */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="testimonial-website">Site web</label>
        <input
          id="testimonial-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {globalError ? (
        <p className="rounded-[12px] bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {globalError}
        </p>
      ) : null}

      <FormField
        id="testimonial-firstName"
        label="Prénom"
        required
        error={errors.firstName}
      >
        <input
          id="testimonial-firstName"
          name="firstName"
          autoComplete="given-name"
          className="w-full rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          aria-invalid={errors.firstName ? true : undefined}
        />
      </FormField>

      <FormField
        id="testimonial-email"
        label="Email (non affiché publiquement)"
        required
        error={errors.email}
      >
        <input
          id="testimonial-email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
        />
      </FormField>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text">
          Note <span className="text-accent-rose">*</span>
        </span>
        <StarRating value={rating} onChange={setRating} label="Note sur 5" />
      </div>

      <FormField
        id="testimonial-content"
        label="Votre témoignage"
        required
        error={errors.content}
      >
        <textarea
          id="testimonial-content"
          name="content"
          rows={5}
          minLength={20}
          maxLength={1000}
          className="w-full resize-y rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          aria-invalid={errors.content ? true : undefined}
        />
        <p className="text-xs text-text-muted">{content.length}/1000</p>
      </FormField>

      <div className="flex items-start gap-3">
        <input
          id="testimonial-consent"
          name="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-border text-accent-rose focus:ring-accent-rose"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          aria-invalid={errors.consent ? true : undefined}
        />
        <label htmlFor="testimonial-consent" className="text-sm text-text-muted">
          J’accepte que mon prénom et mon témoignage soient publiés sur ce site
          après vérification.
        </label>
      </div>
      {errors.consent ? (
        <p className="text-sm text-red-700" role="alert">
          {errors.consent}
        </p>
      ) : null}

      <Button type="submit" variant="primary" disabled={status === "loading"}>
        {status === "loading" ? "Envoi…" : "Envoyer mon témoignage"}
      </Button>
    </form>
  );
}

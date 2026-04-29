"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

const subjects = [
  { value: "general", label: "Question générale" },
  { value: "info", label: "Demande d’information" },
  { value: "other", label: "Autre" },
];

export function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [globalError, setGlobalError] = useState<string | null>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Prénom requis.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Email invalide.";
    if (message.trim().length < 10) e.message = "Message trop court.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setGlobalError(null);
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          subject,
          message: message.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        retryAfterSec?: number;
      };

      if (!res.ok) {
        if (res.status === 429 && data.retryAfterSec) {
          setGlobalError(
            `Trop de messages. Réessayez dans environ ${data.retryAfterSec} secondes.`,
          );
        } else {
          setGlobalError(data.error ?? "Envoi impossible.");
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      setFirstName("");
      setEmail("");
      setSubject("general");
      setMessage("");
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
          Message envoyé
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Merci, je vous répondrai dès que possible.
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

      <FormField
        id="contact-firstName"
        label="Prénom"
        required
        error={errors.firstName}
      >
        <input
          id="contact-firstName"
          name="firstName"
          autoComplete="given-name"
          className="w-full rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          aria-invalid={errors.firstName ? true : undefined}
        />
      </FormField>

      <FormField id="contact-email" label="Email" required error={errors.email}>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
        />
      </FormField>

      <FormField id="contact-subject" label="Objet" required>
        <select
          id="contact-subject"
          name="subject"
          className="w-full rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="contact-message"
        label="Message"
        required
        error={errors.message}
      >
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className="w-full resize-y rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={errors.message ? true : undefined}
        />
      </FormField>

      <Button type="submit" variant="primary" disabled={status === "loading"}>
        {status === "loading" ? "Envoi…" : "Envoyer"}
      </Button>
    </form>
  );
}

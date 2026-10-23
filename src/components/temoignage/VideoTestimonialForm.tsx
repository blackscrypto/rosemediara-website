"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import {
  appearanceOptions,
  consentDuration,
  displayNameOptions,
  giftValidity,
  usageOptions,
  type Appearance,
  type DisplayName,
  type Usage,
} from "@/lib/temoignage-video";

const inputClass =
  "w-full rounded-[12px] border border-border bg-cream/50 px-4 py-3 text-text outline-none transition focus:border-accent-rose focus:ring-2 focus:ring-accent-rose/25";

function ChoiceGroup<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  error,
}: {
  name: string;
  legend: string;
  options: readonly { value: T; label: string }[];
  value: T | "";
  onChange: (v: T) => void;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-text">
        {legend}
        <span className="text-accent-rose" aria-hidden>
          {" "}
          *
        </span>
      </legend>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <label
              key={o.value}
              className={`flex cursor-pointer items-center gap-2 rounded-[12px] border-2 px-3 py-2.5 text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-accent-rose/40 ${
                active
                  ? "border-accent-rose bg-accent-rose/10 text-text"
                  : "border-border bg-cream/60 text-text-secondary hover:border-accent-rose/50"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={active}
                onChange={() => onChange(o.value)}
                className="h-4 w-4 accent-[#7d3f5c]"
              />
              {o.label}
            </label>
          );
        })}
      </div>
      {error ? (
        <p className="mt-1.5 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function VideoTestimonialForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [appearance, setAppearance] = useState<Appearance | "">("");
  const [displayName, setDisplayName] = useState<DisplayName | "">("");
  const [usages, setUsages] = useState<Usage[]>(["site"]);
  const [signature, setSignature] = useState("");
  const [acceptConsent, setAcceptConsent] = useState(false);
  const [acceptAdult, setAcceptAdult] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function toggleUsage(u: Usage) {
    setUsages((prev) => (prev.includes(u) ? prev.filter((x) => x !== u) : [...prev, u]));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Le prénom est requis.";
    if (!lastName.trim()) e.lastName = "Le nom est requis.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Adresse email invalide.";
    if (!appearance) e.appearance = "Choisissez comment apparaître.";
    if (!displayName) e.displayName = "Choisissez le nom affiché.";
    if (usages.length === 0) e.usages = "Choisissez au moins un usage.";
    if (signature.trim().length < 3) e.signature = "Tapez votre nom complet pour signer.";
    if (!acceptConsent) e.acceptConsent = "Votre accord est nécessaire.";
    if (!acceptAdult) e.acceptAdult = "Cette case est nécessaire.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setGlobalError(null);
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/temoignage-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          appearance,
          displayName,
          usages,
          signature: signature.trim(),
          acceptConsent,
          acceptAdult,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; retryAfterSec?: number };
      if (!res.ok) {
        setGlobalError(
          res.status === 429 && data.retryAfterSec
            ? `Trop d’envois. Réessayez dans environ ${Math.ceil(data.retryAfterSec / 60)} minutes.`
            : (data.error ?? "L’envoi a échoué. Réessayez plus tard."),
        );
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setGlobalError("Erreur réseau. Vérifiez votre connexion.");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[14px] border border-sage/40 bg-sage/10 px-6 py-8 text-center" role="status">
        <p className="font-serif text-xl font-semibold text-text">Merci, votre accord est bien enregistré</p>
        <p className="mx-auto mt-3 max-w-md text-sm font-medium leading-relaxed text-text-secondary">
          Vous en recevez une copie par email. Dernière étape : envoyez votre vidéo à Rose sur WhatsApp,
          en réponse à son message. Elle vous enverra ensuite le lien pour réserver vos 30 minutes
          offertes.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-6 rounded-[18px] border border-border bg-gradient-card p-6 shadow-soft sm:p-8"
    >
      {globalError ? (
        <p className="rounded-[12px] bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {globalError}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="tv-firstName" label="Prénom" required error={errors.firstName}>
          <input
            id="tv-firstName"
            autoComplete="given-name"
            className={inputClass}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            aria-invalid={errors.firstName ? true : undefined}
          />
        </FormField>
        <FormField id="tv-lastName" label="Nom" required error={errors.lastName}>
          <input
            id="tv-lastName"
            autoComplete="family-name"
            className={inputClass}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            aria-invalid={errors.lastName ? true : undefined}
          />
        </FormField>
        <FormField id="tv-email" label="Email" required error={errors.email}>
          <input
            id="tv-email"
            type="email"
            autoComplete="email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
          />
        </FormField>
        <FormField id="tv-phone" label="Numéro WhatsApp (optionnel)">
          <input
            id="tv-phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormField>
      </div>

      <ChoiceGroup
        name="appearance"
        legend="Comment souhaitez-vous apparaître ?"
        options={appearanceOptions}
        value={appearance}
        onChange={setAppearance}
        error={errors.appearance}
      />

      <ChoiceGroup
        name="displayName"
        legend="Quel nom afficher sous la vidéo ?"
        options={displayNameOptions}
        value={displayName}
        onChange={setDisplayName}
        error={errors.displayName}
      />

      <fieldset>
        <legend className="text-sm font-medium text-text">
          Où la vidéo peut-elle être utilisée ?
          <span className="text-accent-rose" aria-hidden>
            {" "}
            *
          </span>
        </legend>
        <div className="mt-2 space-y-2">
          {usageOptions.map((o) => (
            <label key={o.value} className="flex cursor-pointer items-center gap-3 text-sm font-medium text-text-secondary">
              <input
                type="checkbox"
                checked={usages.includes(o.value)}
                onChange={() => toggleUsage(o.value)}
                className="h-4 w-4 rounded border-border accent-[#7d3f5c]"
              />
              {o.label}
            </label>
          ))}
        </div>
        {errors.usages ? (
          <p className="mt-1.5 text-sm text-red-700" role="alert">
            {errors.usages}
          </p>
        ) : null}
      </fieldset>

      <div className="rounded-[14px] border border-border bg-cream/60 p-4 text-sm font-medium leading-relaxed text-text-secondary">
        <p className="font-semibold text-text">Votre accord</p>
        <p className="mt-2">
          J’autorise Affoua Rose Kaba (Rose Mediara) à diffuser la vidéo de mon témoignage, avec
          l’apparence, le nom et les usages choisis ci-dessus, pendant {consentDuration} à compter
          d’aujourd’hui, sans rémunération. Je peux demander son retrait à tout moment en écrivant à
          rosemediara@gmail.com : elle sera retirée du site et des publications sous 7 jours.
        </p>
        <p className="mt-2">
          Je reçois en remerciement une consultation de 30 minutes offerte, valable {giftValidity},
          quel que soit le contenu de mon témoignage. Les vidéos publiées indiqueront qu’elles ont été
          recueillies contre une consultation offerte.
        </p>
      </div>

      <div className="space-y-3">
        <label className="flex items-start gap-3 text-sm font-medium text-text-secondary">
          <input
            type="checkbox"
            checked={acceptConsent}
            onChange={(e) => setAcceptConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border accent-[#7d3f5c]"
            aria-invalid={errors.acceptConsent ? true : undefined}
          />
          <span>
            J’ai lu et j’accepte cet accord, ainsi que la{" "}
            <Link href="/politique-confidentialite" className="text-accent-rose underline-offset-4 hover:underline">
              politique de confidentialité
            </Link>
            .
          </span>
        </label>
        {errors.acceptConsent ? (
          <p className="text-sm text-red-700" role="alert">
            {errors.acceptConsent}
          </p>
        ) : null}
        <label className="flex items-start gap-3 text-sm font-medium text-text-secondary">
          <input
            type="checkbox"
            checked={acceptAdult}
            onChange={(e) => setAcceptAdult(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border accent-[#7d3f5c]"
            aria-invalid={errors.acceptAdult ? true : undefined}
          />
          <span>J’ai 18 ans ou plus, et je suis la personne qui apparaît dans la vidéo.</span>
        </label>
        {errors.acceptAdult ? (
          <p className="text-sm text-red-700" role="alert">
            {errors.acceptAdult}
          </p>
        ) : null}
      </div>

      <FormField
        id="tv-signature"
        label="Signature"
        required
        error={errors.signature}
        hint="Tapez votre prénom et votre nom : ils valent signature, avec la date et l’heure d’envoi."
      >
        <input
          id="tv-signature"
          className={`${inputClass} font-serif text-lg`}
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          aria-invalid={errors.signature ? true : undefined}
        />
      </FormField>

      <Button type="submit" variant="primary" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Envoi en cours…" : "Valider mon accord"}
      </Button>
    </form>
  );
}

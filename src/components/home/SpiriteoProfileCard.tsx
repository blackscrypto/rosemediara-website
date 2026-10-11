import Image from "next/image";
import { BadgeCheck, Star } from "lucide-react";
import { spiriteo } from "@/lib/spiriteo";

/**
 * Capture de la fiche Spiriteo de Rose (recadrée : sans barre d'état ni bouton fermer),
 * en carte inclinée en 3D : plaques d'épaisseur derrière, pastilles qui ressortent devant,
 * lévitation douce. La carte se redresse au survol.
 *
 * Pas de backdrop-filter sur les éléments 3D : il aplatirait le rendu (preserve-3d).
 */
export function SpiriteoProfileCard({ className = "" }: { className?: string }) {
  return (
    <figure className={`group relative mx-auto w-[15.5rem] [perspective:1000px] sm:w-[17rem] lg:w-[18.5rem] ${className}`}>
      {/* Halo coloré derrière la carte */}
      <div
        className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(125,63,92,0.42),rgba(99,71,160,0.2)_55%,transparent)] blur-2xl"
        aria-hidden
      />

      <div className="relative animate-float-soft [transform-style:preserve-3d] motion-reduce:animate-none">
        <div className="relative [transform-style:preserve-3d] transition-transform duration-700 ease-out [transform:rotateY(-24deg)_rotateX(11deg)_rotateZ(-3deg)] group-hover:[transform:rotateY(-8deg)_rotateX(4deg)_rotateZ(-1deg)] motion-reduce:transition-none">
          {/* Épaisseur de la carte */}
          <div
            className="absolute inset-0 rounded-[1.6rem] bg-[#3f2f72] [transform:translateZ(-22px)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 rounded-[1.6rem] bg-[#5a438f] [transform:translateZ(-11px)]"
            aria-hidden
          />

          {/* Face avant */}
          <div className="relative rounded-[1.6rem] border border-white/80 bg-[#fbf7f4] p-2 shadow-[0_50px_80px_-30px_rgba(40,20,45,0.7)]">
            <div className="relative overflow-hidden rounded-[1.15rem]">
              <Image
                src="/images/spiriteo-profil.webp"
                width={640}
                height={614}
                sizes="(min-width: 1024px) 18.5rem, (min-width: 640px) 17rem, 15.5rem"
                alt="Profil de Rose (Kaba Rose) sur Spiriteo : code expert 4820, note 5.0 sur 637 avis, 10 237 consultations."
                className="block h-auto w-full"
              />
              {/* Reflet de verre */}
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.1)_30%,rgba(255,255,255,0)_55%,rgba(255,255,255,0.25)_100%)] transition-opacity duration-700 group-hover:opacity-60"
                aria-hidden
              />
            </div>
          </div>

          {/* Pastilles en avant de la carte */}
          <span
            className="absolute -left-5 -top-4 inline-flex items-center gap-1 rounded-full border border-gold-bright/40 bg-white px-2.5 py-1 text-xs font-bold text-text shadow-[0_12px_24px_-10px_rgba(40,20,45,0.55)] [transform:translateZ(60px)]"
            aria-hidden
          >
            <Star className="h-3.5 w-3.5 fill-gold-bright text-gold-bright" strokeWidth={1.5} />
            5.0
          </span>
          <figcaption className="absolute inset-x-0 -bottom-5 mx-auto inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-accent-rose/25 bg-white px-3.5 py-1.5 text-xs font-semibold text-text shadow-[0_14px_28px_-12px_rgba(40,20,45,0.6)] [transform:translateZ(45px)] sm:text-sm">
            <BadgeCheck className="h-4 w-4 shrink-0 text-accent-rose" strokeWidth={2} aria-hidden />
            Médium validée par Spiriteo
          </figcaption>
        </div>
      </div>

      {/* Ombre portée au sol, qui respire avec la lévitation */}
      <div
        className="mx-auto mt-12 h-4 w-2/3 animate-float-shadow rounded-full bg-[rgba(40,20,45,0.4)] blur-xl motion-reduce:animate-none"
        aria-hidden
      />
    </figure>
  );
}

/** Version compacte pour mobile et tablette : vignette inclinée + note, dans le bloc d'accueil. */
export function SpiriteoProfileMini({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-3.5 rounded-2xl border border-accent-rose/20 bg-white/75 py-2.5 pl-3.5 pr-3 shadow-soft ${className}`}
    >
      <div className="shrink-0 [perspective:500px]">
        <div className="w-16 overflow-hidden rounded-[0.55rem] border border-white/80 shadow-[4px_5px_0_0_#5a438f,0_14px_22px_-10px_rgba(40,20,45,0.6)] [transform:rotateY(-22deg)_rotateX(8deg)_rotateZ(-3deg)]">
          <Image
            src="/images/spiriteo-profil.webp"
            width={640}
            height={614}
            sizes="64px"
            alt="Profil de Rose (Kaba Rose) sur Spiriteo, code expert 4820."
            className="block h-auto w-full"
          />
        </div>
      </div>
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-sm font-semibold leading-tight text-text">
          <BadgeCheck className="h-4 w-4 shrink-0 text-accent-rose" strokeWidth={2} aria-hidden />
          Médium validée par Spiriteo
        </p>
        <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs font-semibold text-text-secondary">
          <span className="inline-flex items-center gap-0.5" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="h-3 w-3 fill-gold-bright text-gold-bright" strokeWidth={1.5} />
            ))}
          </span>
          <span className="tabular-nums">
            {spiriteo.rating} · {spiriteo.reviewsLabel}
          </span>
        </p>
        <p className="mt-0.5 text-xs font-medium text-text-muted">
          {spiriteo.consultations} consultations
        </p>
      </div>
    </div>
  );
}

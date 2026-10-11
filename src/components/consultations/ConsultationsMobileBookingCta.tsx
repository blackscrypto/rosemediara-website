"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";

/** Raccourci mobile vers le calendrier, masqué dès que le calendrier est à l'écran. */
export function ConsultationsMobileBookingCta() {
  const [bookingVisible, setBookingVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("reservation-cal");
    if (!target) return;
    const obs = new IntersectionObserver(([entry]) => setBookingVisible(Boolean(entry?.isIntersecting)), {
      threshold: 0.05,
    });
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-gradient-header/95 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_32px_rgba(22,22,22,0.08)] backdrop-blur-md transition-transform duration-300 md:hidden ${
        bookingVisible ? "pointer-events-none translate-y-full" : "translate-y-0"
      }`}
      role="region"
      aria-label="Raccourci réservation"
      aria-hidden={bookingVisible || undefined}
    >
      <div className="mx-auto max-w-6xl px-4">
        <Link
          href="#reservation-cal"
          tabIndex={bookingVisible ? -1 : undefined}
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[14px] bg-accent-rose px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-accent-rose-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-rose"
        >
          <CalendarClock className="h-5 w-5 shrink-0" aria-hidden />
          Réserver un créneau
        </Link>
      </div>
    </div>
  );
}

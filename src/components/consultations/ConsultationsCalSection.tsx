import { CalBooking } from "@/components/CalBooking";
import { CalendlyBooking } from "@/components/CalendlyBooking";
import { getCalendlyOptions } from "@/lib/calendly";

/**
 * Calendly dès qu’au moins un lien NEXT_PUBLIC_CALENDLY_URL_* est défini,
 * sinon Cal.com (transition sans coupure : il suffit de changer les variables Netlify).
 */
export function ConsultationsCalSection() {
  const calendlyOptions = getCalendlyOptions();
  if (calendlyOptions.length > 0) {
    return <CalendlyBooking options={calendlyOptions} />;
  }
  return <CalBooking />;
}

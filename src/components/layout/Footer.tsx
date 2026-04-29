import Link from "next/link";
import { Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS } from "@/lib/nav-links";

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/politique-confidentialite", label: "Confidentialité" },
  { href: "/politique-cookies", label: "Cookies" },
  { href: "/deontologie", label: "Déontologie" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-gradient-footer">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-xl font-semibold text-accent-rose">
              Rose Mediara
            </p>
            <p className="mt-3 max-w-xs text-sm font-medium text-text-secondary">
              Guidance spirituelle et soins énergétiques avec bienveillance.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[12px] p-2 text-text-muted hover:bg-accent-rose/10 hover:text-accent-rose"
                aria-label="Instagram (lien à remplacer)"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[12px] p-2 text-text-muted hover:bg-accent-rose/10 hover:text-accent-rose"
                aria-label="Facebook (lien à remplacer)"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Navigation</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm font-medium text-text-secondary">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-accent-rose hover:underline underline-offset-4"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Informations</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm font-medium text-text-secondary">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden />
                <a
                  href="mailto:contact@rosemediara.com"
                  className="hover:text-accent-rose"
                >
                  contact@rosemediara.com
                </a>
              </li>
              <li>Horaires : lun.–ven., 14h–18h (à confirmer)</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 text-xs font-medium text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Rose Mediara. Tous droits réservés.</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-accent-rose hover:underline underline-offset-4"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

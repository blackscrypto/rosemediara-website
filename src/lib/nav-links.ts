export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/consultations", label: "Consultations" },
  { href: "/soins", label: "Soins" },
  { href: "/temoignages", label: "Témoignages" },
  { href: "/contact", label: "Contact" },
] as const;

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

import type { MetadataRoute } from "next";
import { defaultMetadataBase } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = defaultMetadataBase.toString().replace(/\/$/, "");
  const paths = [
    "/",
    "/a-propos",
    "/consultations",
    "/soins",
    "/temoignages",
    "/deontologie",
    "/contact",
    "/mentions-legales",
    "/cgv",
    "/politique-confidentialite",
    "/politique-cookies",
  ];
  const now = new Date();
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

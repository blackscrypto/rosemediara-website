import type { MetadataRoute } from "next";
import { defaultMetadataBase } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = defaultMetadataBase.toString().replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
    host: new URL(defaultMetadataBase).host,
  };
}

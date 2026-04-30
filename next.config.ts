import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Les navigateurs demandent souvent /favicon.ico en premier ; on sert la même image que app/icon.png.
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon.png" }];
  },
};

export default nextConfig;

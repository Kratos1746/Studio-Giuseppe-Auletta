import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ➔ AGGIUNGI QUESTA RIGA
  },
};

export default nextConfig;

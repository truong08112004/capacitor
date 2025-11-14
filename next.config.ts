import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build as a fully static export compatible with Capacitor.
  // Next 16 removed `next export`; use `output: 'export'` so `next build` writes `out/`.
  output: "export",
};

export default nextConfig;

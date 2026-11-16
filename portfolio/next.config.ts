import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The HUD's reset button lives bottom-left.
  devIndicators: { position: "bottom-right" },
};

export default nextConfig;

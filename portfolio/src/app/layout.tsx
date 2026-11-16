import type { Metadata, Viewport } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";

/** Blocky display face for headings and HUD text; body copy stays in a plain sans. */
const pixel = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-pixel-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tushar Dhar",
  description:
    "The portfolio of Tushar Dhar, AI Lead at EaseMyTrip building agentic assistants, voice AI and retrieval systems, presented as an interactive 3D room.",
};

export const viewport: Viewport = {
  themeColor: "#17181c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={pixel.variable}>
      <body>{children}</body>
    </html>
  );
}

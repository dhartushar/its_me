import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tushar Dhar · Software Developer",
  description:
    "The portfolio of Tushar Dhar, a full stack developer building web and AI applications, presented as an interactive 3D room.",
};

export const viewport: Viewport = {
  themeColor: "#17181c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

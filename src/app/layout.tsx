import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { MotionConfigProvider } from "@/components/motion-config-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Headings (h1–h4, featured numbers) — industrial/technical geometric sans.
// Space Grotesk has no italic style on Google Fonts; emphasis is done via
// accent color + weight instead (see components using the former "kicker
// italic" pattern).
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
});

// Body copy, nav, buttons — neutral, highly legible at small sizes.
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "NFT Group",
  description: "NFT Group — Gemi İnşa ve Mühendislik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionConfigProvider>{children}</MotionConfigProvider>
        <Toaster theme="dark" />
      </body>
    </html>
  );
}

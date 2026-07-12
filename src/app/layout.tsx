import type { Metadata } from "next";
import { Albert_Sans, Unbounded } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const albertSans = Albert_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const unbounded = Unbounded({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${albertSans.variable} ${unbounded.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster theme="dark" />
      </body>
    </html>
  );
}

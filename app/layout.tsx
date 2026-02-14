import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cupidon - Edition 24H",
  description: "Envoie tes fleches de Cupidon ! Site temporaire Saint-Valentin.",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`min-h-screen ${inter.className}`}>
        <div className="floating-hearts">
          <span>💕</span>
          <span>💗</span>
          <span>💘</span>
          <span>💖</span>
          <span>💕</span>
          <span>💗</span>
          <span>💘</span>
          <span>💖</span>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

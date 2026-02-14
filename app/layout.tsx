import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}

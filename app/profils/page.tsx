"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import ProfilCard from "@/components/ProfilCard";
import Link from "next/link";

interface Profil {
  id: string;
  prenom: string;
  genre: string | null;
  photo: string | null;
  demandes_recues: number;
  limite: number;
}

export default function Profils() {
  const [profils, setProfils] = useState<Profil[]>([]);
  const [fleches, setFleches] = useState(2);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(async () => {
    try {
      const [tokenRes, profilsRes] = await Promise.all([
        fetch("/api/token"),
        fetch("/api/profils"),
      ]);

      const tokenData = await tokenRes.json();
      const profilsData = await profilsRes.json();

      setFleches(tokenData.fleches_restantes ?? 2);
      setProfils(profilsData.profils ?? []);
    } catch {
      console.error("Erreur de chargement");
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await refreshData();
      setLoading(false);
    };
    init();
  }, [refreshData]);

  // Auto-refresh when user comes back from WhatsApp
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refreshData]);

  return (
    <div className="min-h-screen">
      <Header fleches={fleches} />

      <main className="max-w-2xl mx-auto px-4 py-8">
        {fleches === 0 && (
          <div className="glass p-5 mb-6 text-center animate-scale-in" style={{ borderColor: "rgba(230, 57, 116, 0.3)" }}>
            <p className="text-lg font-semibold mb-1">
              Tu n&apos;as plus de fleches !
              <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)" className="inline-block ml-2 opacity-60" style={{ verticalAlign: "text-bottom" }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                <line x1="4" y1="4" x2="20" y2="20" stroke="var(--text-primary)" strokeWidth="2" />
              </svg>
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Tu as utilise tes 2 fleches. Reviens l&apos;annee prochaine !
            </p>
          </div>
        )}

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="glass p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="skeleton w-11 h-11 rounded-full" />
                  <div className="flex-1">
                    <div className="skeleton h-5 w-24 mb-2" />
                    <div className="skeleton h-3 w-16" />
                  </div>
                </div>
                <div className="skeleton h-2 w-full mb-4 rounded-full" />
                <div className="skeleton h-11 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : profils.length === 0 ? (
          <div className="text-center py-12 animate-scale-in">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="inline-block mb-4 opacity-50">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="var(--accent)" opacity="0.4" />
              <path d="M15 9l-6 6M9 9l6 6" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="font-serif text-lg font-semibold mb-2">
              Aucun profil pour le moment
            </p>
            <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
              Sois le premier a t&apos;inscrire !
            </p>
            <Link href="/inscription" className="btn-primary no-underline">
              S&apos;inscrire
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {profils.map((profil, index) => (
              <div key={profil.id} className={`stagger-${Math.min(index + 1, 5)}`}>
                <ProfilCard
                  profil={profil}
                  fleches={fleches}
                  onFlecheEnvoyee={(remaining) => setFleches(remaining)}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

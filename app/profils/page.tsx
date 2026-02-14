"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import ProfilCard from "@/components/ProfilCard";
import Link from "next/link";

interface Profil {
  id: string;
  prenom: string;
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
          <div
            className="rounded-2xl p-5 mb-6 text-center animate-fade-in"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--accent)",
            }}
          >
            <p className="text-lg font-semibold mb-1">
              Tu n&apos;as plus de fleches ! 💔
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Tu as utilise tes 2 fleches. Reviens l&apos;annee prochaine !
            </p>
          </div>
        )}

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl p-5"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="skeleton h-5 w-24" />
                  <div className="skeleton h-4 w-12" />
                </div>
                <div className="skeleton h-1.5 w-full mb-4" />
                <div className="skeleton h-10 w-full" />
              </div>
            ))}
          </div>
        ) : profils.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-4xl mb-4">😢</div>
            <p className="text-lg font-semibold mb-2">
              Aucun profil pour le moment
            </p>
            <p
              className="mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
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

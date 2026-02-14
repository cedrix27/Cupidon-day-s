"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const init = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

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
          <div className="text-center py-12">
            <div className="text-4xl mb-4 animate-pulse-heart">💘</div>
            <p style={{ color: "var(--text-secondary)" }}>
              Chargement des profils...
            </p>
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
            {profils.map((profil) => (
              <ProfilCard
                key={profil.id}
                profil={profil}
                fleches={fleches}
                onFlecheEnvoyee={(remaining) => setFleches(remaining)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

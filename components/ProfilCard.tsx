"use client";

import { useState } from "react";

interface Profil {
  id: string;
  prenom: string;
  demandes_recues: number;
  limite: number;
}

interface ProfilCardProps {
  profil: Profil;
  fleches: number;
  onFlecheEnvoyee: (fleches: number) => void;
}

export default function ProfilCard({ profil, fleches, onFlecheEnvoyee }: ProfilCardProps) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const isFull = profil.demandes_recues >= profil.limite;
  const canSend = fleches > 0 && !isFull && !sent;

  const handleSendFleche = async () => {
    if (!canSend) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/fleche", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profilId: profil.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setSent(true);
      onFlecheEnvoyee(data.fleches_restantes);

      setTimeout(() => {
        window.open(data.whatsappUrl, "_blank");
      }, 800);
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  const gaugePercent = (profil.demandes_recues / profil.limite) * 100;

  return (
    <div
      className={`rounded-2xl p-5 card-hover ${isFull ? "opacity-50" : ""}`}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">{profil.prenom}</h3>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {isFull ? "💔" : "❤️"} {profil.demandes_recues}/{profil.limite}
        </span>
      </div>

      <div className="gauge-bar mb-4">
        <div
          className="gauge-fill"
          style={{ width: `${gaugePercent}%` }}
        />
      </div>

      {sent ? (
        <div className="text-center py-2">
          <span className="animate-arrow inline-block text-2xl">🏹</span>
          <p className="text-sm mt-2" style={{ color: "var(--accent-light)" }}>
            Fleche envoyee ! Redirection WhatsApp...
          </p>
        </div>
      ) : isFull ? (
        <p className="text-sm text-center py-2" style={{ color: "var(--text-secondary)" }}>
          Ce profil a recu trop de fleches 💔
        </p>
      ) : (
        <>
          <button
            onClick={handleSendFleche}
            disabled={!canSend || loading}
            className="btn-primary w-full text-sm"
          >
            {loading ? "Envoi..." : "Envoyer une fleche 🏹"}
          </button>
          {error && (
            <p className="text-xs text-red-400 mt-2 text-center">{error}</p>
          )}
        </>
      )}
    </div>
  );
}

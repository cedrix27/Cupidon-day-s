"use client";

import { useState, useMemo } from "react";

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

function getAvatarColor(name: string): [string, string] {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return [
    `hsl(${hue}, 70%, 45%)`,
    `hsl(${(hue + 40) % 360}, 80%, 60%)`,
  ];
}

export default function ProfilCard({ profil, fleches, onFlecheEnvoyee }: ProfilCardProps) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const isFull = profil.demandes_recues >= profil.limite;
  const canSend = fleches > 0 && !isFull && !sent;
  const gaugePercent = (profil.demandes_recues / profil.limite) * 100;
  const isAlmostFull = profil.demandes_recues >= 4;

  const [colorFrom, colorTo] = useMemo(() => getAvatarColor(profil.prenom), [profil.prenom]);
  const initial = profil.prenom.charAt(0).toUpperCase();

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
      setShowConfetti(true);
      onFlecheEnvoyee(data.fleches_restantes);

      setTimeout(() => setShowConfetti(false), 1200);

      setTimeout(() => {
        window.open(data.whatsappUrl, "_blank");
      }, 800);
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`glass p-5 card-hover relative overflow-hidden ${isFull ? "opacity-50" : ""}`}
    >
      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="confetti-heart"
              style={{
                animationDelay: `${i * 0.08}s`,
                left: `${5 + i * 9}%`,
                top: "40%",
                fontSize: `${14 + (i % 3) * 4}px`,
              }}
            >
              {["💕", "💗", "💖", "💘", "❤️", "✨", "💕", "💗", "💖", "✨"][i]}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        {/* Colored avatar */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg"
          style={{
            background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
            boxShadow: `0 2px 10px ${colorFrom}40`,
          }}
        >
          {initial}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate">{profil.prenom}</h3>
          <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
            {Array.from({ length: profil.limite }).map((_, i) => (
              <svg
                key={i}
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill={i < profil.demandes_recues ? "var(--accent)" : "var(--glass-border)"}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ))}
            <span className="ml-1">{profil.demandes_recues}/{profil.limite}</span>
          </span>
        </div>
      </div>

      <div className="gauge-bar mb-4">
        <div
          className={`gauge-fill ${isAlmostFull ? "gauge-fill-pulse" : ""}`}
          style={{ width: `${gaugePercent}%` }}
        />
      </div>

      {sent ? (
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-arrow">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          <p className="text-sm mt-2" style={{ color: "var(--accent-light)" }}>
            Fleche envoyee ! Redirection WhatsApp...
          </p>
        </div>
      ) : isFull ? (
        <p className="text-sm text-center py-2 flex items-center justify-center gap-1" style={{ color: "var(--text-secondary)" }}>
          Ce profil a recu trop de fleches
          <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" opacity="0.5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </p>
      ) : (
        <>
          <button
            onClick={handleSendFleche}
            disabled={!canSend || loading}
            className="btn-primary w-full text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              "Envoi..."
            ) : (
              <>
                Envoyer une fleche
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
          {error && (
            <p className="text-xs text-red-400 mt-2 text-center">{error}</p>
          )}
        </>
      )}
    </div>
  );
}

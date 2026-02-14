"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Inscription() {
  const router = useRouter();
  const [prenom, setPrenom] = useState("");
  const [numero, setNumero] = useState("");
  const [consentAffichage, setConsentAffichage] = useState(false);
  const [consentContact, setConsentContact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom,
          numero,
          consentement_affichage: consentAffichage,
          consentement_contact: consentContact,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/profils"), 2000);
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <div className="text-6xl mb-4 animate-heart-glow inline-block">💘</div>
          <h2 className="text-2xl font-bold mb-2">Inscription reussie !</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Redirection vers les profils...
          </p>
          <div className="flex justify-center gap-2 mt-4">
            {["💕", "💗", "💖", "💘", "💕"].map((h, i) => (
              <span
                key={i}
                className="confetti-heart"
                style={{ animationDelay: `${i * 0.15}s`, left: `${30 + i * 10}%` }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full animate-fade-in">
        <Link
          href="/"
          className="inline-block mb-6 text-sm no-underline"
          style={{ color: "var(--text-secondary)" }}
        >
          &larr; Retour
        </Link>

        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--accent-light)" }}
        >
          Inscription
        </h1>
        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
          Rejoins la liste des profils Cupidon
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Prenom</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: "var(--text-secondary)" }}>
                👤
              </span>
              <input
                type="text"
                required
                maxLength={30}
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Ton prenom"
                className="w-full pl-11 pr-4 py-3 rounded-xl outline-none transition-all input-glow"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Numero WhatsApp
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: "var(--text-secondary)" }}>
                📱
              </span>
              <input
                type="tel"
                required
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="+33612345678"
                className="w-full pl-11 pr-4 py-3 rounded-xl outline-none transition-all input-glow"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
              Ton numero ne sera jamais affiche publiquement.
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consentAffichage}
                onChange={(e) => setConsentAffichage(e.target.checked)}
                className="mt-1 accent-pink-500"
              />
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                J&apos;accepte que mon prenom soit affiche sur le site pendant 24h.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consentContact}
                onChange={(e) => setConsentContact(e.target.checked)}
                className="mt-1 accent-pink-500"
              />
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                J&apos;accepte d&apos;etre contacte(e) via WhatsApp par les utilisateurs du site.
              </span>
            </label>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 px-4 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !consentAffichage || !consentContact}
            className="btn-primary w-full"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>

          <p
            className="text-xs text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            Site temporaire 24h. Toutes les donnees seront supprimees apres cette periode.
          </p>
        </form>
      </div>
    </main>
  );
}

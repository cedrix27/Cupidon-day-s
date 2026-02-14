"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Inscription() {
  const router = useRouter();
  const [prenom, setPrenom] = useState("");
  const [numero, setNumero] = useState("");
  const [genre, setGenre] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [consentAffichage, setConsentAffichage] = useState(false);
  const [consentContact, setConsentContact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("La photo ne doit pas depasser 2 Mo.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPhotoPreview(result);
      setPhotoBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setPhotoBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!genre) {
      setError("Choisis ton genre.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom,
          numero,
          genre,
          photo: photoBase64 || null,
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
        <div className="text-center animate-scale-in">
          <div className="inline-block mb-4 animate-heartbeat">
            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="animate-heart-glow">
              <defs>
                <linearGradient id="successHeart" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e63974" />
                  <stop offset="50%" stopColor="#ff6b9d" />
                  <stop offset="100%" stopColor="#f0c27f" />
                </linearGradient>
              </defs>
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="url(#successHeart)"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="font-serif text-2xl font-bold mb-2">Inscription reussie !</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Redirection vers les profils...
          </p>
          <div className="relative h-32 mt-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="confetti-heart absolute"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  left: `${15 + (i % 6) * 12}%`,
                  top: "60%",
                  fontSize: `${14 + (i % 3) * 4}px`,
                }}
              >
                {["💕", "💗", "💖", "💘", "❤️", "✨"][i % 6]}
              </span>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full animate-slide-up">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 text-sm no-underline transition-colors"
          style={{ color: "var(--text-secondary)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour
        </Link>

        <div className="glass p-8">
          <h1 className="font-serif text-3xl font-bold mb-2 gradient-text">
            Inscription
          </h1>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
            Rejoins la liste des profils Cupidon
          </p>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Photo upload */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Photo <span className="font-normal" style={{ color: "var(--text-secondary)" }}>(optionnel)</span>
              </label>
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer transition-all hover:scale-105"
                  style={{
                    background: photoPreview ? "transparent" : "linear-gradient(135deg, var(--accent), var(--accent-light))",
                    border: "2px dashed var(--glass-border)",
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    style={{
                      background: "rgba(230, 57, 116, 0.1)",
                      color: "var(--accent-light)",
                      border: "1px solid rgba(230, 57, 116, 0.2)",
                    }}
                  >
                    Choisir une photo
                  </button>
                  {photoPreview && (
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="text-xs ml-3 transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Supprimer
                    </button>
                  )}
                  <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                    JPG, PNG. 2 Mo max.
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Prenom */}
            <div>
              <label className="block text-sm font-medium mb-2">Prenom</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text"
                  required
                  maxLength={30}
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Ton prenom"
                  className="w-full pl-11 pr-4 py-3 rounded-xl outline-none input-glass"
                />
              </div>
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-medium mb-3">Genre</label>
              <div className="flex gap-3">
                {[
                  { value: "homme", label: "Homme", icon: "M10 2a2 2 0 012 0v3h3a1 1 0 010 2h-3v3a1 1 0 01-2 0V7H7a1 1 0 010-2h3V2z" },
                  { value: "femme", label: "Femme", icon: "M12 2a2 2 0 012 0v3h3a1 1 0 010 2h-3v3a1 1 0 01-2 0V7H7a1 1 0 010-2h3V2z" },
                  { value: "autre", label: "Autre" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setGenre(option.value)}
                    className="flex-1 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: genre === option.value
                        ? "rgba(230, 57, 116, 0.2)"
                        : "var(--glass-bg)",
                      border: genre === option.value
                        ? "1px solid var(--accent)"
                        : "1px solid var(--glass-border)",
                      color: genre === option.value
                        ? "var(--accent-light)"
                        : "var(--text-secondary)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Numero WhatsApp */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Numero WhatsApp
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </span>
                <input
                  type="tel"
                  required
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="+33612345678"
                  className="w-full pl-11 pr-4 py-3 rounded-xl outline-none input-glass"
                />
              </div>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                Ton numero ne sera jamais affiche publiquement.
              </p>
            </div>

            {/* Consentements */}
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
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ animation: "spinHeart 1s linear infinite" }}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Inscription...
                </>
              ) : (
                "S'inscrire"
              )}
            </button>

            <p
              className="text-xs text-center"
              style={{ color: "var(--text-secondary)" }}
            >
              Site temporaire 24h. Toutes les donnees seront supprimees apres cette periode.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

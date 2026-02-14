import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center animate-slide-up flex flex-col items-center">
        {/* Hero illustration */}
        <div className="mb-10 animate-float">
          <Image
            src="/image2.webp"
            alt="Cupidon couple"
            width={280}
            height={200}
            className="rounded-2xl mx-auto"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Title */}
        <h1 className="font-serif text-5xl font-bold mb-5 gradient-text">
          Cupidon
        </h1>

        {/* Pill badge */}
        <div className="mb-14">
          <span className="pill-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Edition 24H - Saint-Valentin
          </span>
        </div>

        {/* How it works — Glass card */}
        <div className="glass p-8 mb-12 text-left space-y-6 w-full">
          <h2 className="font-serif text-xl font-semibold mb-5 text-center" style={{ color: "var(--accent-light)" }}>
            Comment ca marche ?
          </h2>

          <div className="flex items-start gap-4 stagger-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(230, 57, 116, 0.15)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <p style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Inscris-toi</strong> avec ton prenom et ton numero WhatsApp
            </p>
          </div>

          <div className="flex items-start gap-4 stagger-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(168, 85, 247, 0.15)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" />
              </svg>
            </div>
            <p style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Tu as 2 fleches</strong> a envoyer aux profils qui te plaisent
            </p>
          </div>

          <div className="flex items-start gap-4 stagger-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(240, 194, 127, 0.15)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0c27f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
            </div>
            <p style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Envoie un message</strong> via WhatsApp a la personne choisie
            </p>
          </div>

          <div className="flex items-start gap-4 stagger-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(230, 57, 116, 0.15)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <p style={{ color: "var(--text-secondary)" }}>
              Chaque profil ne peut recevoir que <strong style={{ color: "var(--text-primary)" }}>5 fleches max</strong>
            </p>
          </div>
        </div>

        <p className="text-sm mb-12" style={{ color: "var(--text-secondary)" }}>
          Ce site est temporaire et sera supprime apres 24h. Tes donnees seront effacees.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center w-full">
          <Link href="/inscription" className="btn-primary text-center no-underline animate-subtle-pulse">
            S&apos;inscrire
          </Link>
          <Link href="/profils" className="btn-secondary text-center no-underline">
            Voir les profils
          </Link>
        </div>
      </div>
    </main>
  );
}

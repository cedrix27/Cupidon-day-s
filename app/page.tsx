import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center animate-fade-in">
        <div className="text-6xl mb-6">💘</div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--accent-light)" }}>
          Cupidon
        </h1>
        <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
          Edition 24H - Saint-Valentin
        </p>

        <div
          className="rounded-2xl p-6 mb-8 text-left space-y-3"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <h2 className="text-xl font-semibold mb-4 text-center">Comment ca marche ?</h2>
          <div className="flex items-start gap-3">
            <span className="text-xl">1.</span>
            <p style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Inscris-toi</strong> avec ton prenom et ton numero WhatsApp
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">2.</span>
            <p style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Tu as 2 fleches</strong> a envoyer aux profils qui te plaisent
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">3.</span>
            <p style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Envoie un message</strong> via WhatsApp a la personne choisie
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">4.</span>
            <p style={{ color: "var(--text-secondary)" }}>
              Chaque profil ne peut recevoir que <strong style={{ color: "var(--text-primary)" }}>5 fleches max</strong>
            </p>
          </div>
        </div>

        <p
          className="text-sm mb-8"
          style={{ color: "var(--text-secondary)" }}
        >
          Ce site est temporaire et sera supprime apres 24h. Tes donnees seront effacees.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/inscription" className="btn-primary text-center no-underline">
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

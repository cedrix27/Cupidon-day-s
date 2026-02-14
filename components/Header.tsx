"use client";

import Link from "next/link";
import FlecheCounter from "./FlecheCounter";

interface HeaderProps {
  fleches: number;
}

export default function Header({ fleches }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 px-4 py-3"
      style={{
        background: "rgba(5, 3, 5, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--glass-border)",
      }}
    >
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 no-underline"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="logoHeart" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e63974" />
                <stop offset="100%" stopColor="#ff6b9d" />
              </linearGradient>
            </defs>
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="url(#logoHeart)"
            />
          </svg>
          <span className="font-serif text-xl font-bold gradient-text">
            Cupidon
          </span>
        </Link>
        <FlecheCounter fleches={fleches} />
      </div>
    </header>
  );
}

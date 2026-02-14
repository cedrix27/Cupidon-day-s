"use client";

import Link from "next/link";
import FlecheCounter from "./FlecheCounter";

interface HeaderProps {
  fleches: number;
}

export default function Header({ fleches }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md px-4 py-3"
      style={{
        background: "rgba(13, 10, 14, 0.85)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold no-underline"
          style={{ color: "var(--accent-light)" }}
        >
          💘 Cupidon
        </Link>
        <FlecheCounter fleches={fleches} />
      </div>
    </header>
  );
}

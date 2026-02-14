"use client";

import Link from "next/link";
import Image from "next/image";
import FlecheCounter from "./FlecheCounter";

interface HeaderProps {
  fleches: number;
}

export default function Header({ fleches }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 px-6 py-4"
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
          className="flex items-center gap-3 no-underline"
        >
          <Image
            src="/image1.webp"
            alt="Cupidon"
            width={36}
            height={36}
            className="rounded-full"
            style={{ objectFit: "cover" }}
          />
          <span className="font-serif text-xl font-bold gradient-text">
            Cupidon
          </span>
        </Link>
        <FlecheCounter fleches={fleches} />
      </div>
    </header>
  );
}

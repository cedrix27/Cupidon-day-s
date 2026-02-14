"use client";

import { useEffect, useRef } from "react";

interface FlecheCounterProps {
  fleches: number;
}

export default function FlecheCounter({ fleches }: FlecheCounterProps) {
  const prevFleches = useRef(fleches);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevFleches.current !== fleches && containerRef.current) {
      containerRef.current.classList.remove("animate-bounce-in");
      // Force reflow
      void containerRef.current.offsetWidth;
      containerRef.current.classList.add("animate-bounce-in");
    }
    prevFleches.current = fleches;
  }, [fleches]);

  return (
    <div className="pill-badge" ref={containerRef}>
      <div className="flex gap-1.5 items-center">
        {[0, 1].map((i) => (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={i < fleches ? "var(--accent-light)" : "var(--text-secondary)"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-opacity duration-300 ${i < fleches ? "opacity-100" : "opacity-30"}`}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        ))}
      </div>
      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
        {fleches} restante{fleches !== 1 ? "s" : ""}
      </span>
    </div>
  );
}

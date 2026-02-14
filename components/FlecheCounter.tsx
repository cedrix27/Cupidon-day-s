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
    <div className="flex items-center gap-2" ref={containerRef}>
      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
        Fleches restantes :
      </span>
      <div className="flex gap-1">
        {[0, 1].map((i) => (
          <span
            key={i}
            className={`text-lg transition-opacity duration-300 ${i < fleches ? "" : "opacity-30"}`}
          >
            🏹
          </span>
        ))}
      </div>
    </div>
  );
}

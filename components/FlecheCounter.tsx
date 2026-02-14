"use client";

interface FlecheCounterProps {
  fleches: number;
}

export default function FlecheCounter({ fleches }: FlecheCounterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
        Fleches restantes :
      </span>
      <div className="flex gap-1">
        {[0, 1].map((i) => (
          <span
            key={i}
            className={`text-lg ${i < fleches ? "" : "opacity-30"}`}
          >
            🏹
          </span>
        ))}
      </div>
    </div>
  );
}

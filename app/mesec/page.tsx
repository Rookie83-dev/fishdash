"use client";

import { useEffect, useState, useMemo } from "react";
import BackButton from "@/app/components/BackButton";

type MesecData = {
  date: string;
  illumination: number;
  phaseDeg: number;
  phase: { name: string; emoji: string };
};

export default function MesecPage() {
  const [mesec, setMesec] = useState<MesecData | null>(null);

  useEffect(() => {
    fetch("/api/mesec")
      .then(res => res.json())
      .then(d => d.ok && setMesec(d));
  }, []);

  const formattedDate = useMemo(() => {
    if (!mesec?.date) return "";
    const [y, m, d] = mesec.date.split("-");
    return `${d}-${m}-${y}`;
  }, [mesec?.date]);

  return (
    <main className="min-h-screen p-4">

      <BackButton fallback="/" />

      <h1 className="text-2xl font-bold mb-4">Mesec</h1>

      {!mesec && <p className="opacity-70">Učitavanje...</p>}

      {mesec && (
        <>
          <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800 flex items-center gap-3">
            <div className="text-5xl">{mesec.phase.emoji}</div>
            <div>
              <p className="text-xl font-semibold">{mesec.phase.name}</p>
              <p className="text-sm opacity-80">
                Osvetljenost: {Math.round(mesec.illumination)}% · Ugao: {Math.round(mesec.phaseDeg)}°
              </p>
              <p className="text-xs opacity-60">Datum: {formattedDate}</p>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
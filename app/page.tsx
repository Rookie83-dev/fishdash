"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [vreme, setVreme] = useState<any>(null);
  const [mesec, setMesec] = useState<any>(null);

  useEffect(() => {
    fetch("/api/vreme")
      .then(res => res.json())
      .then(d => d.ok && setVreme(d.data));

    fetch("/api/mesec")
      .then(res => res.json())
      .then(d => d.ok && setMesec(d));
  }, []);

  return (
    <main className="min-h-screen">

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">FishDash</h1>
        <p className="text-sm opacity-70">Tvoj ribolovački mini-dashboard</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <Link href="/reke">
          <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 
            border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md cursor-pointer">
            <span className="text-4xl mb-3">🌊</span>
            <h2 className="text-xl font-semibold">Vodostaj reka</h2>
            <p className="text-sm opacity-70">Drina, Lim, Gradac…</p>
          </div>
        </Link>

        <Link href="/vreme">
          <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 
            border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md cursor-pointer">
            <span className="text-4xl mb-3">☁️</span>
            <h2 className="text-xl font-semibold">Vremenski uslovi</h2>
            {vreme ? (
              <p className="text-sm opacity-80">
                {vreme.temperature_2m}°C · Vetar {vreme.wind_speed_10m} km/h
              </p>
            ) : (
              <p className="text-sm opacity-50">Učitavanje...</p>
            )}
          </div>
        </Link>

        <Link href="/mesec">
          <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 
            border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md cursor-pointer">
            <span className="text-4xl mb-3">
              {mesec?.phase?.emoji ?? "🌙"}
            </span>
            <h2 className="text-xl font-semibold">Mesec</h2>
            {mesec ? (
              <p className="text-sm opacity-80">
                {mesec.phase.name} · {mesec.illumination}% osvetljenost
              </p>
            ) : (
              <p className="text-sm opacity-50">Učitavanje...</p>
            )}
          </div>
        </Link>

        <Link href="/ai">
          <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 
            border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md cursor-pointer">
            <span className="text-4xl mb-3">🎣</span>
            <h2 className="text-xl font-semibold">Najbolji sati</h2>
            <p className="text-sm opacity-70">AI predikcija aktivnosti ribe</p>
          </div>
        </Link>

      </section>
    </main>
  );
}
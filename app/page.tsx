"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [vreme, setVreme] = useState<any>(null);
  const [mesec, setMesec] = useState<any>(null);

  useEffect(() => {
    fetch("/api/vreme")
      .then((res) => res.json())
      .then((d) => d.ok && setVreme(d.data));

    fetch("/api/mesec")
      .then((res) => res.json())
      .then((d) => d.ok && setMesec(d));
  }, []);

  const cardClass =
    "p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md cursor-pointer transition-shadow";

  return (
    <main className="min-h-screen px-4 py-8 sm:py-10">
      <header className="mb-8 text-center">
        <div className="mx-auto w-[clamp(240px,40vw,480px)] logoFadeUp">
          <Image
            src="/brand/fishdash-logo-cropped.webp" // ili .png ako si stavio png
            alt="Fishdash"
            width={1378}
            height={397}
            priority
            sizes="(max-width: 480px) 260px, (max-width: 768px) 340px, 480px"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.25))",
            }}
          />
        </div>

        <p className="mt-4 text-sm opacity-70">Tvoj ribolovački mini-dashboard</p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/reke" className="block">
          <div className={cardClass}>
            <span className="text-4xl mb-3 block">🌊</span>
            <h2 className="text-xl font-semibold">Vodostaj reka</h2>
            <p className="text-sm opacity-70">Drina, Lim, Gradac…</p>
          </div>
        </Link>

        <Link href="/vreme" className="block">
          <div className={cardClass}>
            <span className="text-4xl mb-3 block">☁️</span>
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

        <Link href="/mesec" className="block">
          <div className={cardClass}>
            <span className="text-4xl mb-3 block">{mesec?.phase?.emoji ?? "🌙"}</span>
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

        <Link href="/ai" className="block">
          <div className={cardClass}>
            <span className="text-4xl mb-3 block">🎣</span>
            <h2 className="text-xl font-semibold">Najbolji sati</h2>
            <p className="text-sm opacity-70">AI predikcija aktivnosti ribe</p>
          </div>
        </Link>
      </section>

      <style jsx global>{`
        .logoFadeUp {
          animation: fishdashFadeUp 600ms ease-out both;
        }
        @keyframes fishdashFadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .logoFadeUp {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
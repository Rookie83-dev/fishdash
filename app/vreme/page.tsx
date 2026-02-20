"use client";

import { useEffect, useState } from "react";
import BackButton from "@/app/components/BackButton";

type Vreme = {
  temperature_2m: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
  cloud_cover: number;
};

export default function VremePage() {
  const [vreme, setVreme] = useState<Vreme | null>(null);

  useEffect(() => {
    fetch("/api/vreme")
      .then((res) => res.json())
      .then((d) => d.ok && setVreme(d.data));
  }, []);

  return (
    <main className="min-h-screen p-4">
      <BackButton fallback="/" />

      <h1 className="text-2xl font-bold mb-4">Vreme</h1>

      {!vreme && <p className="opacity-70">Učitavanje...</p>}

      {vreme && (
        <div className="space-y-4">

          <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
            <span className="text-2xl">🌡️</span>
            <p className="text-xl font-semibold">{vreme.temperature_2m}°C</p>
            <p className="text-sm opacity-70">Temperatura</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
            <span className="text-2xl">💨</span>
            <p className="text-xl font-semibold">{vreme.wind_speed_10m} km/h</p>
            <p className="text-sm opacity-70">Vetar</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
            <span className="text-2xl">☁️</span>
            <p className="text-xl font-semibold">{vreme.cloud_cover}%</p>
            <p className="text-sm opacity-70">Oblačnost</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
            <span className="text-2xl">💧</span>
            <p className="text-xl font-semibold">{vreme.relative_humidity_2m}%</p>
            <p className="text-sm opacity-70">Vlažnost</p>
          </div>

        </div>
      )}
    </main>
  );
}
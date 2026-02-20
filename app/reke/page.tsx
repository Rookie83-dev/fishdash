"use client";

import Link from "next/link";
import BackButton from "@/app/components/BackButton";
import { rivers } from "./data";

export default function RekePage() {
  return (
    <main className="min-h-screen p-4">
      {/* Uvek idi na početnu */}
      <BackButton href="/" />

      <h1 className="text-2xl font-bold mb-4">Reke</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rivers.map((r) => (
          <Link key={r.id} href={`/reke/${r.id}`}>
            <div className="p-4 rounded-xl cursor-pointer bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition">
              <h2 className="text-lg font-semibold mb-1">{r.name}</h2>

              <p className="text-sm opacity-80">
                Vodostaj: <b>{r.level} cm</b>
              </p>

              <p className="text-xs opacity-60">Ažurirano: {r.lastUpdate}</p>

              <div className="mt-3 h-20 flex items-end gap-1 overflow-hidden">
                {r.history.map((v, i) => (
                  <div
                    key={i}
                    className="w-2 bg-blue-500/80 dark:bg-blue-400/80 rounded"
                    style={{ height: `${Math.min(70, Math.max(6, v / 2))}px` }}
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
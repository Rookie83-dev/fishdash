"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { rivers } from "../data";
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function last5DayLabels(fromISO: string) {
  const base = new Date(fromISO.replace(" ", "T"));
  const labels: string[] = [];
  for (let i = 4; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(base.getDate() - i);
    labels.push(i === 0 ? "danas" : `-${i}d`);
  }
  return labels;
}

export default function RiverDetails() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const river = useMemo(() => rivers.find((r) => r.id === id), [id]);

  if (!river) {
    return (
      <main className="min-h-screen p-4">
        <Link href="/reke" className="text-blue-500">← Nazad</Link>
        <h1 className="text-2xl font-bold mt-4">Reka nije pronađena.</h1>
      </main>
    );
  }

  const xLabels = last5DayLabels(river.lastUpdate);
  const chartData = river.history.map((level, idx) => ({
    x: xLabels[idx] ?? `${idx + 1}`,
    level,
  }));

  return (
    <main className="min-h-screen p-4 space-y-6">
      <Link href="/reke" className="text-blue-500">← Nazad</Link>

      <h1 className="text-3xl font-bold">{river.name}</h1>

      {/* Info blok */}
      <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
        <p className="text-lg"><b>Vodostaj:</b> {river.level} cm</p>
        <p className="text-lg">
          <b>Trend:</b>{" "}
          {river.trend === "up" && <span className="text-green-500">↑ Raste</span>}
          {river.trend === "down" && <span className="text-red-500">↓ Opada</span>}
          {river.trend === "stable" && <span className="text-yellow-400">→ Stabilno</span>}
        </p>
        <p className="opacity-70 text-sm">Ažurirano: {river.lastUpdate}</p>
      </div>

      {/* Graf sa jasnim oznakama osа */}
      <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
        <h2 className="text-xl font-semibold mb-3">Istorija vodostaja</h2>
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ left: 12, right: 12, top: 8, bottom: 8 }}>
              <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                stroke="#aaa"
                tick={{ fill: "#aaa" }}
                label={{ value: "poslednjih 5 dana", position: "insideBottom", offset: -2, fill: "#aaa" }}
              />
              <YAxis
                stroke="#aaa"
                tick={{ fill: "#aaa" }}
                label={{ value: "cm", angle: -90, position: "insideLeft", fill: "#aaa" }}
                domain={["auto", "auto"]}
              />
              <Tooltip
                formatter={(v: any) => [`${v} cm`, "Vodostaj"]}
                labelFormatter={(label) => `Dan: ${label}`}
              />
              <Line type="monotone" dataKey="level" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs opacity-60 mt-2">
          Napomena: X osa prikazuje relativne dane (−4d do danas) na osnovu vremena poslednjeg ažuriranja.
        </p>
      </div>

      {/* Opis */}
      <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
        <h2 className="text-xl font-semibold mb-2">Opis</h2>
        <p className="opacity-80 text-sm leading-relaxed">{river.description}</p>
      </div>

      {/* Ribolovne zone */}
      <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
        <h2 className="text-xl font-semibold mb-2">Ribolovne zone (duž toka)</h2>
        <ul className="list-disc ml-6 space-y-1 text-sm opacity-80">
          {river.zones.map((z, i) => <li key={i}>{z}</li>)}
        </ul>
      </div>

      {/* Ribe i tehnike */}
      {river.species && (
        <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800 space-y-3">
          <h2 className="text-xl font-semibold">Ribe i preporučene tehnike</h2>

          <div>
            <h3 className="font-semibold">Plovak / Feeder</h3>
            <ul className="list-disc ml-6 space-y-1 text-sm opacity-80">
              {river.species.plovak.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Varalica</h3>
            <ul className="list-disc ml-6 space-y-1 text-sm opacity-80">
              {river.species.varalica.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Mušičarenje</h3>
            <ul className="list-disc ml-6 space-y-1 text-sm opacity-80">
              {river.species.musica.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          {river.species.napomene?.length ? (
            <div className="text-sm opacity-75">
              <p className="font-semibold mb-1">Napomene:</p>
              <ul className="list-disc ml-6 space-y-1">
                {river.species.napomene.map((n, i) => <li key={i}>{n}</li>)}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      {/* Preporuke po vodostaju */}
      {river.guidanceByLevel && (
        <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800 space-y-2">
          <h2 className="text-xl font-semibold">Preporuke po vodostaju</h2>
          <div className="space-y-2 text-sm opacity-85">
            <p><b>Nizak:</b> {river.guidanceByLevel.low}</p>
            <p><b>Srednji:</b> {river.guidanceByLevel.normal}</p>
            <p><b>Visok:</b> {river.guidanceByLevel.high}</p>
          </div>
        </div>
      )}

      {/* Dozvole i zabrane */}
      <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
        <h2 className="text-xl font-semibold mb-2">Dozvole i zabrane</h2>
        <ul className="list-disc ml-6 space-y-1 text-sm opacity-80">
          {river.regulations.map((rr, i) => <li key={i}>{rr}</li>)}
        </ul>
      </div>
    </main>
  );
}
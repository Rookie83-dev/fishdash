"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/app/components/BackButton";
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

// Etikete za poslednjih 5 dana: −4d, −3d, −2d, −1d, danas
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
        {/* Uvek idi na listu reka */}
        <BackButton href="/reke" />
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
      {/* Uvek idi na listu reka */}
      <BackButton href="/reke" />

      <h1 className="text-3xl font-bold">{river.name}</h1>

      <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
        <p className="text-lg"><b>Vodostaj:</b> {river.level} cm</p>
        <p className="text-lg">
          <b>Trend:</b>{" "}
          {river.trend === "up" && <span className="text-green-500">↑ Raste</span>}
          {river.trend === "down" && <span className="text-red-500">↓ Opada</span>}
          {river.trend === "stable" && <span className="text-yellow-400">→ Stabilno</span>}
        </p>
        <p className="text-sm opacity-70">Ažurirano: {river.lastUpdate}</p>
      </div>

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
      </div>

      <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
        <h2 className="text-xl font-semibold mb-2">Opis</h2>
        <p className="opacity-80 text-sm leading-relaxed">{river.description}</p>
      </div>

      <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
        <h2 className="text-xl font-semibold mb-2">Ribolovne zone (duž toka)</h2>
        <ul className="list-disc ml-6 space-y-1 text-sm opacity-80">
          {river.zones.map((z, i) => <li key={i}>{z}</li>)}
        </ul>
      </div>

      {/* … (ostale sekcije koje već imaš) */}
    </main>
  );
}
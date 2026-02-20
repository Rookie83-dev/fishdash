"use client";

import BackButton from "@/app/components/BackButton";

export default function AIPage() {
  return (
    <main className="min-h-screen p-4">
      <BackButton fallback="/" />

      <h1 className="text-2xl font-bold mb-4">AI Saveti</h1>

      <p className="opacity-70">Ovde će biti AI analiza najboljih sati za pecanje.</p>
    </main>
  );
}
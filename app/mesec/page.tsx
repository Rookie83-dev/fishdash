"use client";

import { useEffect, useMemo, useState } from "react";
import BackButton from "@/app/components/BackButton";

type Mesec = {
  date: string;
  illumination: number;
  phaseDeg: number;
  phase: { name: string; emoji: string };
};

export default function MesecPage() {
  const [mesec, setMesec] = useState<Mesec | null>(null);

  useEffect(() => {
    fetch("/api/mesec")
      .then((res) => res.json())
      .then((d) => d.ok && setMesec(d));
  }, []);

  const formattedDate = useMemo(() => {
    if (!mesec?.date) return "";
    const [y, m, d] = mesec.date.split("-");
    return `${d}-${m}-${y}`;
  }, [mesec?.date]);

  const phaseName = mesec?.phase?.name?.toLowerCase() ?? "";

  /** UTICAJ NA RIBOLOV – OPŠTI PROFIL ZA TU FAZU */
  const phaseFishingTips = useMemo(() => {
    if (!phaseName) return null;

    if (phaseName.includes("mlad mesec")) {
      return {
        title: "Uticaj na ribolov – slabija aktivnost, prednost danju",
        desc: [
          "Zbog minimalne mesečine, ribe noću slabije patroliraju i koriste manje vizuelne indikatore.",
          "Danju je aktivnost stabilnija, ali ribe mogu biti opreznije u bistroj vodi.",
          "Predatori slabije love noću, što daje prednost feederu i plovku u prepodnevnim satima.",
        ],
        plovak: [
          "Skobalj i deverika dobro rade u jutarnjim satima uz prirodne mamce.",
          "Klen u plićacima reaguje na hleb i gliste.",
        ],
        varalica: [
          "Jako su efikasne prirodne, nenametljive boje.",
          "Loviti kroz prelaze i slabije struje.",
        ],
        musica: [
          "Nimfe veličina #14–18, suve mušice kada ima rojenja.",
          "Lipljan i klen bolje reaguju u kasnom popodnevu.",
        ],
      };
    }

    if (phaseName.includes("rastući srp")) {
      return {
        title: "Ribe se bude – odlični sumrak i rano jutro",
        desc: [
          "Rastuća mesečina daje dovoljno svetla predatorima da aktivnije love.",
          "Ciprinidi se drže stabilnijih struja i pojačano se hrane predveče.",
          "Generalno povećana aktivnost u svim disciplinama.",
        ],
        plovak: [
          "Skobalj i deverika postaju aktivniji pred sumrak.",
          "Šaran bolje uzima na prelazima dana i noći.",
        ],
        varalica: [
          "Bucov, klen i smuđ rade bolje u dim svetla.",
          "Odlični trenuci za male voblere i spoon varalice.",
        ],
        musica: [
          "Emergeri i suve mušice u zoru i sumrak daju najbolje rezultate.",
        ],
      };
    }

    if (phaseName.includes("prva četvrt")) {
      return {
        title: "Stabilna i predvidljiva aktivnost",
        desc: [
          "Ribe imaju pouzdane pikove: jutro i veče.",
          "Dnevni ribolov je produktivan na bistrim rekama.",
        ],
        plovak: [
          "Najbolje rade deverika, skobalj i crnooka u stabilnim sektorima.",
        ],
        varalica: [
          "Odličan period za smuđa i bucova – miks agresivnog i prirodnog rada.",
        ],
        musica: [
          "Lipljan i pastrmka vrlo aktivni oko ručka i predveče.",
        ],
      };
    }

    if (phaseName.includes("rastuća izbočina")) {
      return {
        title: "Sve življe – idealan period za predatore",
        desc: [
          "Kako Mesec raste ka punom, predatori postaju aktivniji.",
          "Ciprinidi imaju stabilne pikove hranjenja tokom dana.",
        ],
        plovak: [
          "Prelivi i tiše uvale su odlični za skobalja i deveriku.",
        ],
        varalica: [
          "Odlično vreme za bucova (jutro) i smuđa (sumrak).",
          "Som počinje ranije noću da patrolira.",
        ],
        musica: [
          "Strimeri u sumrak, suve mušice u zoru.",
        ],
      };
    }

    if (phaseName.includes("pun mesec")) {
      return {
        title: "Ribe aktivne noću – dan može biti sporiji",
        desc: [
          "Pod jakom mesečinom predatori intenzivno love noću.",
          "Dnevni ribolov je nepredvidljiv – pikovi kratki.",
          "Som, bucov i smuđ imaju povećanu aktivnost.",
        ],
        plovak: [
          "Šaran i amur se hrane tokom noći i zore.",
        ],
        varalica: [
          "Noћni ribolov smuđa je odličan, silikonci i vib varalice.",
          "Som udara velike varalice i prirodne mamce u plićim uvalama.",
        ],
        musica: [
          "Ribolov mušicom slab danju, dobar pred zoru.",
        ],
      };
    }

    if (phaseName.includes("opadajuća izbočina")) {
      return {
        title: "Posle punog – i dalje dobro, ali pada aktivnost",
        desc: [
          "Kako Mesec počinje da opada, aktivnost predatora se smanjuje, ali kratki udari su česti.",
        ],
        plovak: [
          "Skobalj i deverika dobro reaguju tokom jutra.",
        ],
        varalica: [
          "Bucov i smuđ aktivni u prvim satima dana.",
        ],
        musica: [
          "Nimfe stabilne, suve variraju.",
        ],
      };
    }

    if (phaseName.includes("treća četvrt")) {
      return {
        title: "Selektivnost – morate birati mesta",
        desc: [
          "Mesec slab – ribe opreznije.",
          "Treba više preciznosti i prirodnije prezentacije.",
        ],
        plovak: [
          "Skobalj i sitna bela riba u tišim sektorima.",
        ],
        varalica: [
          "Klen i smuđ ali samo rano i kasno.",
        ],
        musica: [
          "Suve mušice male (#16–20), nimfe diskretne.",
        ],
      };
    }

    if (phaseName.includes("opadajući srp")) {
      return {
        title: "Aktivnost bledi – fokus na jutro",
        desc: [
          "Uslovi slični mladom mesecu; ribe manje koriste vizuelne indikatore.",
        ],
        plovak: [
          "Feeder radi bolje nego plovak.",
        ],
        varalica: [
          "Najbolje rade prirodne boje i spori rad.",
        ],
        musica: [
          "Nimfe bolje od suvih; lipljan aktivniji nego klen.",
        ],
      };
    }

    return null;
  }, [phaseName]);

  if (!mesec) {
    return (
      <main className="min-h-screen p-4">
        <BackButton fallback="/" />
        <p>Učitavanje...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 space-y-6">
      <BackButton fallback="/" />

      <h1 className="text-2xl font-bold mb-4">Mesec</h1>

      {/* Glavna kartica */}
      <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800 flex items-center gap-4">
        <div className="text-5xl">{mesec.phase.emoji}</div>
        <div>
          <p className="text-xl font-semibold">{mesec.phase.name}</p>
          <p className="text-sm opacity-80">
            Osvetljenost: {Math.round(mesec.illumination)}% · Ugao: {Math.round(mesec.phaseDeg)}°
          </p>
          <p className="text-xs opacity-60">Datum: {formattedDate}</p>
        </div>
      </div>

      {/* Ribolovni saveti */}
      {phaseFishingTips && (
        <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800 space-y-4">
          <h2 className="text-xl font-semibold">{phaseFishingTips.title}</h2>

          <div className="text-sm opacity-80 space-y-1">
            {phaseFishingTips.desc.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold">Plovak / Feeder</h3>
              <ul className="list-disc ml-6 text-sm opacity-80">
                {phaseFishingTips.plovak.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Varalica</h3>
              <ul className="list-disc ml-6 text-sm opacity-80">
                {phaseFishingTips.varalica.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Mušičarenje</h3>
              <ul className="list-disc ml-6 text-sm opacity-80">
                {phaseFishingTips.musica.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Napomena */}
      <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
        <p className="text-sm opacity-75">
          *Napomena:* faza Meseca je samo jedan deo slike.  
          Barometar, vodostaj, zamućenost i temperatura vode često imaju veći uticaj na ribolov.
        </p>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";

type Mesec = {
  date: string; // ISO "YYYY-MM-DD"
  illumination: number; // %
  phaseDeg: number; // približno
  phase: { name: string; emoji: string };
};

export default function MesecPage() {
  const [mesec, setMesec] = useState<Mesec | null>(null);

  useEffect(() => {
    fetch("/api/mesec")
      .then((res) => res.json())
      .then((d) => d.ok && setMesec(d));
  }, []);

  // Formatiranje datuma u dd-mm-yyyy
  const formattedDate = useMemo(() => {
    if (!mesec?.date) return "";
    // očekujemo ISO "YYYY-MM-DD"
    const [y, m, d] = mesec.date.split("-");
    if (!y || !m || !d) return mesec.date;
    return `${d}-${m}-${y}`;
  }, [mesec?.date]);

  // Objašnjenje uticaja na ribolov po fazi (heuristički vodič)
  const phaseInfo = useMemo(() => {
    const name = mesec?.phase?.name || "";
    const n = name.toLowerCase();

    // Možeš slobodno menjati tekstove po želji – ovo su praktična pravila/heuristike.
    if (n.includes("mlad")) {
      return {
        title: "Mlad mesec – tiše vode, aktivnost često slabija",
        body:
          "Tokom mladog meseca noću je vrlo mračno, pa je noćna aktivnost ribe često niža. " +
          "Preporuka je pecanje po danu, fokus na prirodne prezentacije i finije sisteme. " +
          "Na mušicu: ninfanje i lagane prezentacije; na varalicu: prirodne boje, sporiji rad.",
      };
    }
    if (n.includes("rastući srp")) {
      return {
        title: "Rastući srp – postepeno bolje",
        body:
          "Kako mesec raste, ribe često postaju aktivnije, naročito u sumrak. " +
          "Dobar momenat za kraće popodnevne/večernje sesije. " +
          "Mušica: emergeri i suve mušice predveče; varaličarenje: blagi twitch, svetlije nijanse.",
      };
    }
    if (n.includes("prva četvrt")) {
      return {
        title: "Prva četvrt – opšta solidna aktivnost",
        body:
          "Stabilna aktivnost – dobar balans dnevnog i večernjeg pecanja. " +
          "Iskoristi blage promene pritiska i oblačnost za pikove. " +
          "Mušica: suve i ninfanje; varalica: srednji tempo, natural + subtle flash.",
      };
    }
    if (n.includes("rastuća izbočina")) {
      return {
        title: "Rastuća izbočina – sve živahnije ka punom mesecu",
        body:
          "Uoči punog meseca česti su kratki pikovi aktivnosti. " +
          "Večeri i rano jutro mogu biti sjajni, naročito na čistim rekama. " +
          "Mušica: suve/streameri pri sumraku; varalica: nešto agresivniji rad.",
      };
    }
    if (n.includes("pun mesec")) {
      return {
        title: "Pun mesec – noćna aktivnost jača, dnevna varira",
        body:
          "Ribe umeju da se hrane noću pod jakom mesečinom. Dnevna aktivnost može biti neujednačena. " +
          "Probaj vrlo rano ujutru ili kasno uveče – ili čak noćni ribolov tamo gde je dozvoljen.",
      };
    }
    if (n.includes("opadajuća izbočina")) {
      return {
        title: "Opadajuća izbočina – i dalje dobro, ali smirivanje",
        body:
          "Posle punog meseca aktivnost se postepeno smiruje, ali i dalje postoje dobri prozori, " +
          "posebno uz promenu vremena ili pad pritiska. Fino doziraj prezentaciju.",
      };
    }
    if (n.includes("treća četvrt")) {
      return {
        title: "Treća četvrt – solidno, ali selektivno",
        body:
          "Riba može biti opreznija. Važna je lokacija i tišina na vodi. " +
          "Mušica: precizno ninfanje i male suve; varalica: prirodne boje, sporije vođenje.",
      };
    }
    if (n.includes("opadajući srp")) {
      return {
        title: "Opadajući srp – gasne aktivnost, biraj pravo vreme",
        body:
          "Kratki pikovi su mogući, najčešće u ranim jutarnjim satima i predveče. " +
          "Uspeh zavisi više od lokalnih uslova (pritisak, vodostaj, zamućenje) nego od faze.",
      };
    }
    return {
      title: "Mesec i ribolov – pomoćni signal",
      body:
        "Faza Meseca je koristan signal, ali lokalni uslovi (pritisak, temperatura, oblačnost, vodostaj, zamućenost) " +
        "često imaju veći uticaj. Koristi informaciju o Mesečevim menama uz meteo i stanje vode.",
    };
  }, [mesec?.phase?.name]);

  return (
    <main className="min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Mesec</h1>

      {!mesec && <p className="opacity-70">Učitavanje...</p>}

      {mesec && (
        <div className="space-y-4">
          {/* Glavna kartica */}
          <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800 flex items-center gap-4">
            <div className="text-5xl">{mesec.phase.emoji}</div>
            <div>
              <p className="text-xl font-semibold">{mesec.phase.name}</p>
              <p className="text-sm opacity-80">
                Osvetljenost: {Math.round(mesec.illumination)}% · Ugao faze: {Math.round(mesec.phaseDeg)}°
              </p>
              <p className="text-xs opacity-60">Datum: {formattedDate}</p>
            </div>
          </div>

          {/* Objašnjenje uticaja na ribolov */}
          <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
            <p className="text-base font-semibold mb-1">{phaseInfo.title}</p>
            <p className="text-sm opacity-80">{phaseInfo.body}</p>
          </div>

          {/* Napomena */}
          <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800">
            <p className="text-sm opacity-75">
              *Napomena:* Ovi saveti su heuristički. Uvek posmatraj i lokalne uslove: barometar (stabilan/blagi pad često prija),
              oblačnost (difuzno svetlo), vetar (smer i jačina), vodostaj (rast/opadanje), zamućenost i temperaturu vode.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
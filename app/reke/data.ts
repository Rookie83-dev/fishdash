export type Trend = "up" | "down" | "stable";
export type Country = "RS" | "BA" | "HR";

export type River = {
  id: number;
  name: string;
  country: Country;
  lat: number;
  lon: number;
  level: number;          // cm
  trend: Trend;           // up | down | stable
  lastUpdate: string;     // "YYYY-MM-DD HH:mm"
  history: number[];      // 5 tačaka: -4d ... danas
  description: string;
  zones: string[];
  regulations: string[];
  species?: {
    plovak: string[];
    varalica: string[];
    musica: string[];
    napomene?: string[];
  };
  guidanceByLevel?: {
    low: string;
    normal: string;
    high: string;
  };
};

export const rivers: River[] = [
  {
    id: 1,
    name: "Drina (Zvornik)",
    country: "RS",
    lat: 44.386,
    lon: 19.101,
    level: 148,
    trend: "down",
    lastUpdate: "2026-02-19 13:40",
    history: [160, 156, 153, 150, 148],

    description:
      "Drina je jedna od najpoznatijih i najlepših reka Balkana. Hladna, bistrа i snažna, sa dubokim virovima i dugačkim plićacima. U gornjem toku dominira salmonidna fauna; nizvodno ka Malom Zvorniku više je ciprinidnih vrsta.",

    zones: [
      "Gornji tok (Perućac – Bajina Bašta): salmonidna zona; mušičarenje i varaličarenje (barbless preporučeno).",
      "Srednji tok (Bajina Bašta – Ljubovija – Mali Zvornik): mešovita zona (pastrmka/lipljan + skobalj/klen/som).",
      "Donji tok (Mali Zvornik – nizvodno): pretežno ciprinidno – som, bucov, smuđ, šaran.",
      "Zabrana: 150 m uzvodno i nizvodno od brana."
    ],

    regulations: [
      "Lipljan: lovostaj 01.03 – 31.05",
      "Pastrmka: lovostaj 01.10 – 01.03",
      "Mladica: lovostaj 01.03 – 31.08",
      "Zabranjen lov mrežama i ostima",
      "Barbless udice preporučene u salmonidnim zonama"
    ],

    species: {
      plovak: [
        "Skobalj – crvi, sir/kačkavalj, hleb; klizeći plovak ili feeder u umerenoj struji.",
        "Šaran – kukuruz/boile; feeder ili dno u mirnijim delovima i uvalama.",
        "Deverika/crnooka – crvi i miksmame; duži predvezi, osrednja struja.",
        "Som – gujavice, pijavice, jetra/pelete (noću, duboki virovi i rupe)."
      ],
      varalica: [
        "Bucov – brze varalice (spoon, pencil, vobleri) u brzacima, jutro/veče.",
        "Smuđ – silikonci u polumraku i dubljim prelazima.",
        "Som – velike meke varalice, sporo i duboko vođenje po virovima."
      ],
      musica: [
        "Pastrmka – nimfe #14–18, strimeri #6–10; suve kad je rojenje.",
        "Lipljan – suve (CDC), nimfe (pheasant tail, hare's ear), emergeri.",
        "Klen – suve (mrav, caddis), male nimfe i micro-streameri uz obalu."
      ],
      napomene: [
        "Na visokom vodostaju izbegavati jake maticе; loviti prelaze i ulive pritoka.",
        "U bistroj vodi koristiti tanje predveze i prirodnije prezentacije."
      ]
    },

    guidanceByLevel: {
      low:
        "Nizak vodostaj: bistrija voda, ribe oprezne. Fino vođenje, tanki predvezi. Mušičarenje i lagane varalice rade odlično; som pretežno noću i dublje.",
      normal:
        "Srednji vodostaj: najstabilniji uslovi. Prelivi, džepovi i ivice struje daju rezultate. Feeder i varaličarenje konzistentni; mušica tokom dana i sumraka.",
      high:
        "Visok vodostaj: jaka matica i zamućenje. Tražiti mirnije krakove i priobalje. Teže glave/olova, veće siluete. Som i bucov znaju da budu aktivniji."
    }
  }
];
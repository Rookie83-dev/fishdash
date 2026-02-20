export type Trend = "up" | "down" | "stable";
export type Country = "RS";

export type Sector = {
  name: string;
  /** režimi */
  flyOnly?: boolean;
  lureOnly?: boolean;
  catchAndRelease?: boolean;
  /** dodatne info */
  notes?: string[];
  /** ciljne vrste + preporuke */
  fish: {
    species: string;
    baits?: string[];   // prirodne mamke / feeder/plovak
    lures?: string[];   // varalice
    flies?: string[];   // mušice
  }[];
};

export type River = {
  id: number;
  name: string;
  country: Country;
  lat: number;
  lon: number;
  level: number;          // cm
  trend: Trend;
  lastUpdate: string;     // "YYYY-MM-DD HH:mm"
  history: number[];      // poslednjih 5 merenja (npr. -4d..danas)
  description: string;
  zones: string[];        // širi opis zona (informativno)
  regulations: string[];  // lovostaji / zabrane / pravila
  /** sektori sa eksplicitnim režimima i preporukama */
  sectors: Sector[];
  /** orijentiri po vodostaju */
  guidanceByLevel?: {
    low: string;
    normal: string;
    high: string;
  };
};

export const rivers: River[] = [
  /* 1) DRINA (ZVORNIK) */
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
      "Hladna, bistra i snažna reka sa dubokim virovima i brzacima. Gornji tok salmonidan (pastrmka, lipljan, mladica), srednji mešovit, donji ciprinidan (som, smuđ, šaran, bucov).",
    zones: [
      "Gornji tok (Perućac – Bajina Bašta): salmonidna zona; barbless preporučen.",
      "Srednji (Bajina Bašta – Ljubovija – Mali Zvornik): mešovito.",
      "Donji (Mali Zvornik – nizvodno): ciprinidno.",
      "Zabrana: 150 m od brana."
    ],
    regulations: [
      "Pastrmka: 01.10 – 01.03 lovostaj",
      "Lipljan: 01.03 – 31.05 lovostaj",
      "Mladica: 01.03 – 31.08 lovostaj",
      "Zabranjene mreže/osti; barbless u salmonidnim zonama"
    ],
    sectors: [
      {
        name: "Kanjon / brza struja (gornji tok)",
        flyOnly: true,
        catchAndRelease: true,
        notes: ["Kristalno bistro; ribolov tiho i precizno."],
        fish: [
          {
            species: "Pastrmka",
            flies: ["nimfe #14–18 (PT, Hares Ear)", "strimeri #6–10", "suve (CDC) po rojenju"]
          },
          {
            species: "Lipljan",
            flies: ["CDC suve #16–20", "nimfe #16–18", "emergeri"]
          }
        ]
      },
      {
        name: "Prelivi i ivice struje (srednji tok)",
        lureOnly: false,
        fish: [
          {
            species: "Klen",
            lures: ["mali vobleri 3–5 cm", "meps #1–2", "spoon 5–7 g"],
            baits: ["hleb, gliste uz obalu"]
          },
          {
            species: "Skobalj",
            baits: ["crvi, sir/kačkavalj, testo (feeder/plovak)"]
          }
        ]
      },
      {
        name: "Duboki virovi / rupe (donji tok)",
        lureOnly: true,
        notes: ["Noćni ribolov soma zahteva oprez."],
        fish: [
          { species: "Som", lures: ["velike meke varalice 12–20 cm", "glave 20–50 g"], baits: ["guzavice, pijavice, jetra"] },
          { species: "Smuđ", lures: ["silikonci 7–12 cm (texas/jig)", "vib"] }
        ]
      }
    ],
    guidanceByLevel: {
      low: "Nizak: bistro, oprezne ribe, tanji predvezi i prirodne prezentacije.",
      normal: "Srednji: idealno za većinu tehnika; pikovi jutro/veče.",
      high: "Visok: jaka matica; loviti priobalje, uvale, ulive pritoka."
    }
  },

  /* 2) DUNAV (BEOGRAD) */
  {
    id: 2,
    name: "Dunav (Beograd)",
    country: "RS",
    lat: 44.817,
    lon: 20.457,
    level: 380,
    trend: "up",
    lastUpdate: "2026-02-19 13:30",
    history: [360, 365, 370, 375, 380],
    description:
      "Širok i moćan tok sa bogatim fondom: som, smuđ, bucovi, šaran, deverika, kečiga. Vodostaji variraju prema evropskim hidrološkim uslovima.",
    zones: [
      "Ušće Save: bucov/smuđ",
      "Dorćol: dubine sa somom i smuđem",
      "Višnjica: feeder za šarana/deveriku"
    ],
    regulations: [
      "Kečiga: 01.03 – 31.05",
      "Smuđ: 01.03 – 30.04",
      "Som: 01.03 – 31.05"
    ],
    sectors: [
      {
        name: "Ušće Save",
        lureOnly: true,
        fish: [
          { species: "Bucov", lures: ["pencil, metal jig 15–25 g, brzi vobleri"] },
          { species: "Smuđ", lures: ["silikonci 7–12 cm, drop-shot"] }
        ]
      },
      {
        name: "Duboki prelazi (Višnjica)",
        fish: [
          { species: "Šaran", baits: ["kukuruz, boile (hranilica/dno)"] },
          { species: "Deverika", baits: ["feeder, crvi + miks primame"] }
        ]
      },
      {
        name: "Virovi Dorćol",
        lureOnly: true,
        fish: [
          { species: "Som", lures: ["silicone 15–25 cm, duboko vođenje"], baits: ["pelete, jetra, pijavice"] }
        ]
      }
    ],
    guidanceByLevel: {
      low: "Nizak: lakše čitanje terena; odličan spinning.",
      normal: "Srednji: stabilno; smuđ/bucov aktivni.",
      high: "Visok: feeder i dno; tražiti tiše krakove."
    }
  },

  /* 3) SAVA (ŠABAC) */
  {
    id: 3,
    name: "Sava (Šabac)",
    country: "RS",
    lat: 44.756,
    lon: 19.695,
    level: 220,
    trend: "up",
    lastUpdate: "2026-02-19 13:55",
    history: [205, 210, 214, 218, 220],
    description:
      "Široka, duboka reka sa odličnim feeder potencijalom i noćnim somom; smuđ i bucovi aktivni na prelazima.",
    zones: ["Most u Šapcu (spinning)", "Pocerina prelazi (šaran)", "Nizvodni virovi (som/deverika)"],
    regulations: ["Smuđ: 01.03 – 30.04", "Som: 01.03 – 31.05"],
    sectors: [
      {
        name: "Prelazi kod mosta",
        lureOnly: true,
        fish: [
          { species: "Smuđ", lures: ["silikonci, vobleri 'suspend'"] },
          { species: "Bucov", lures: ["spoon, pencil, brzi twitch"] }
        ]
      },
      {
        name: "Dubine nizvodno",
        fish: [
          { species: "Som", baits: ["pijavice, gujavice, pelet"], lures: ["velike silikone"] },
          { species: "Deverika", baits: ["feeder, crvi + primama"] }
        ]
      }
    ],
    guidanceByLevel: {
      low: "Usporenija voda – feeder radi odlično.",
      normal: "Spinning uslovi odlični.",
      high: "Tiši rukavci i uvale."
    }
  },

  /* 4) LIM (PRIJEPOLJE) */
  {
    id: 4,
    name: "Lim (Prijepolje)",
    country: "RS",
    lat: 43.384,
    lon: 19.651,
    level: 120,
    trend: "down",
    lastUpdate: "2026-02-19 13:12",
    history: [130, 128, 125, 122, 120],
    description:
      "Brza planinska voda: pastrmka, lipljan, mladica, klen. Raznolik reljef, idealan za mušicu i light spinning.",
    zones: ["Gornji: pastrmka/lipljan", "Srednji: klen/skobalj", "Donji: som/smuđ u dubinama"],
    regulations: ["Pastrmka: 01.10 – 01.03", "Lipljan: 01.03 – 31.05"],
    sectors: [
      {
        name: "Brzaci i skokovi",
        flyOnly: true,
        fish: [
          { species: "Pastrmka", flies: ["nimfe #14–18, strimeri #6–10"] },
          { species: "Lipljan", flies: ["CDC suve, emergeri"] }
        ]
      },
      {
        name: "Šire deonice / prelivi",
        fish: [
          { species: "Klen", lures: ["mini vobleri 3–5 cm"], baits: ["hleb, glista"] }
        ]
      }
    ],
    guidanceByLevel: {
      low: "Idealno za mušicu.",
      normal: "Sve tehnike dobre.",
      high: "Mutno/jako – teže glave i krupniji profili."
    }
  },

  /* 5) IBAR (KRALJEVO) */
  {
    id: 5,
    name: "Ibar (Kraljevo)",
    country: "RS",
    lat: 43.724,
    lon: 20.689,
    level: 95,
    trend: "up",
    lastUpdate: "2026-02-19 13:30",
    history: [88, 90, 92, 94, 95],
    description:
      "Brza i duboka reka; gornji tok salmonidan, srednji mešovit, kod Kraljeva mogu som i smuđ.",
    zones: ["Gornji: pastrmka/lipljan", "Srednji: klen/skobalj", "Donji: som/smuđ"],
    regulations: ["Pastrmka: 01.10 – 01.03"],
    sectors: [
      {
        name: "Gornji brzac",
        flyOnly: true,
        fish: [
          { species: "Pastrmka", flies: ["nimfe, male suve"] },
          { species: "Lipljan", flies: ["CDC, emergeri"] }
        ]
      },
      {
        name: "Prelazi i ivice",
        fish: [
          { species: "Klen", lures: ["meps #1–2, mali vobleri"], baits: ["hleb, crvi"] },
          { species: "Skobalj", baits: ["sir/testo, crvi (plovak/feeder)"] }
        ]
      }
    ],
    guidanceByLevel: {
      low: "Bistro – oprezne ribe.",
      normal: "Odlični uslovi.",
      high: "Koristiti jače varalice i loviti krajeve maticе."
    }
  },

  /* 6) GRADAC (VALJEVO) */
  {
    id: 6,
    name: "Gradac (Valjevo)",
    country: "RS",
    lat: 44.265,
    lon: 19.912,
    level: 35,
    trend: "stable",
    lastUpdate: "2026-02-19 13:50",
    history: [34, 35, 35, 35, 35],
    description:
      "Jedna od najčistijih reka; mušičarski raj sa pastrmkom i lipljanom. U donjem toku klen.",
    zones: ["Kanjon (C&R, fly)", "Donji tok (klen/skobalj)"],
    regulations: ["C&R sektori; barbless obavezan na više deonica"],
    sectors: [
      {
        name: "Kanjon – mušičarski revir",
        flyOnly: true,
        catchAndRelease: true,
        fish: [
          { species: "Pastrmka", flies: ["suve (caddis), nimfe #16–18"] },
          { species: "Lipljan", flies: ["CDC, mrav"] }
        ]
      },
      {
        name: "Donji tok",
        fish: [
          { species: "Klen", lures: ["micro crank 3 cm"], baits: ["hleb/gliste uz obalu"] }
        ]
      }
    ],
    guidanceByLevel: {
      low: "Kristalno; sitnije prezentacije.",
      normal: "Idealno za mušicu.",
      high: "Retko; oprez zbog zamućenja."
    }
  },

  /* 7) VELIKA MORAVA */
  {
    id: 7,
    name: "Velika Morava",
    country: "RS",
    lat: 43.963,
    lon: 21.262,
    level: 180,
    trend: "up",
    lastUpdate: "2026-02-19 13:45",
    history: [168, 172, 176, 178, 180],
    description:
      "Glavni moravski tok; tipično ciprinidan sa somom, smuđem, šaranom, bukovom i bogatom belom ribom.",
    zones: [
      "Meandri i stari tokovi – šaran i bela riba.",
      "Glavna matica – som, smuđ, bucov.",
      "Ulivi pritoka – ‘hot spotovi’ pri promenama vodostaja."
    ],
    regulations: ["Smuđ i som imaju sezonske lovostaje prema propisima SRB."],
    sectors: [
      {
        name: "Meandri / stare bare",
        fish: [
          { species: "Šaran", baits: ["kukuruz, boile"], lures: [] },
          { species: "Deverika/Crnooka", baits: ["feeder + crvi/primama"] }
        ]
      },
      {
        name: "Glavna matica",
        lureOnly: true,
        fish: [
          { species: "Som", lures: ["velike silikone 15–20 cm"], baits: ["pelet, jetra"] },
          { species: "Smuđ", lures: ["silikonci 8–12 cm"], baits: [] },
          { species: "Bucov", lures: ["metal jig 20 g, spoon 18 g, pencil"] }
        ]
      }
    ],
    guidanceByLevel: {
      low: "Čitljiv teren; feeder + varalice.",
      normal: "Stabilno; rade i predatori i bela riba.",
      high: "Tiši krakovi i ulivi pritoka."
    }
  },

  /* 8) JUŽNA MORAVA */
  {
    id: 8,
    name: "Južna Morava",
    country: "RS",
    lat: 43.319,
    lon: 21.896,
    level: 140,
    trend: "up",
    lastUpdate: "2026-02-19 13:58",
    history: [130, 133, 136, 138, 140],
    description:
      "Brža i uža od Velike; klen, skobalj, bucovi, ponegde smuđ i som u dubljim sektorima.",
    zones: ["Prelazi i šljunkare – klen/skobalj", "Dublji lukovi – som/smuđ"],
    regulations: [],
    sectors: [
      {
        name: "Šljunkare i prelivi",
        fish: [
          { species: "Klen", lures: ["meps #1–2, mini vobleri"], baits: ["hleb, crvi"] },
          { species: "Skobalj", baits: ["sir/testo, crvi (plovak/feeder)"] }
        ]
      },
      {
        name: "Duboki lukovi",
        lureOnly: true,
        fish: [
          { species: "Smuđ", lures: ["silikonci 7–10 cm"] },
          { species: "Som", lures: ["krupnije gume"] }
        ]
      }
    ],
    guidanceByLevel: {
      low: "Bistra; lagane prezentacije.",
      normal: "Raznovrsno; miks tehnika.",
      high: "Tražiti tiša polja i prelaze."
    }
  },

  /* 9) ZAPADNA MORAVA */
  {
    id: 9,
    name: "Zapadna Morava",
    country: "RS",
    lat: 43.720,
    lon: 20.434,
    level: 110,
    trend: "stable",
    lastUpdate: "2026-02-19 13:20",
    history: [110, 110, 110, 110, 110],
    description:
      "Tipična šira moravska voda; prelivne zone i okuke daju smuđa i soma; feeder za belu ribu ujednačen.",
    zones: ["Okuke i prelivi – predatori", "Ravni tokovi – bela riba"],
    regulations: [],
    sectors: [
      {
        name: "Okuke / prelivi",
        lureOnly: true,
        fish: [
          { species: "Smuđ", lures: ["vobleri 'suspend', shad 7–9 cm", "silikonci 8–10 cm"] },
          { species: "Som", lures: ["krupne gume 15–20 cm"] }
        ]
      },
      {
        name: "Ravni sektori",
        fish: [
          { species: "Deverika/Crnooka", baits: ["feeder + crvi"] },
          { species: "Šaran", baits: ["kukuruz, boile (dublje taloženje)"] }
        ]
      }
    ],
    guidanceByLevel: {
      low: "Feeder konstantan; spinning precizan.",
      normal: "Najbolji balans spinning/feeder.",
      high: "Lov u tišim krakovima."
    }
  },

  /* 10) KOLUBARA */
  {
    id: 10,
    name: "Kolubara (Valjevo)",
    country: "RS",
    lat: 44.270,
    lon: 19.890,
    level: 65,
    trend: "down",
    lastUpdate: "2026-02-19 13:15",
    history: [70, 69, 68, 66, 65],
    description:
      "Niža planinsko-nizijska reka; klen, skobalj, bucovi, povremeno smuđ i som na dubljim lokacijama.",
    zones: ["Prelivi i mostovi – klen/skobalj", "Dublje rupe – som"],
    regulations: [],
    sectors: [
      {
        name: "Mostovi / prelivi",
        fish: [
          { species: "Klen", lures: ["meps #1–2, mini vobleri"], baits: ["hleb/gliste"] },
          { species: "Skobalj", baits: ["sir/testo, crvi"] }
        ]
      },
      {
        name: "Dublje rupe",
        lureOnly: true,
        fish: [{ species: "Som", lures: ["gume 12–18 cm"], baits: ["jetra, gliste, pijavice"] }]
      }
    ],
    guidanceByLevel: {
      low: "Bistro; prirodne prezentacije.",
      normal: "Sve tehnike rade.",
      high: "Tiša polja i ulivi pritoka."
    }
  },

  /* 11) NIŠAVA (Niš) */
  {
    id: 11,
    name: "Nišava (Niš)",
    country: "RS",
    lat: 43.319,
    lon: 21.896,
    level: 72,
    trend: "stable",
    lastUpdate: "2026-02-19 13:50",
    history: [72, 72, 72, 72, 72],
    description:
      "Brža niža planinska voda u gradskom delu; dominantan klen, skobalj, ponegde pastrmka u uzvodnim sektorima, smuđ/bolen retko.",
    zones: ["Gradske deonice – klen/skobalj", "Uzvodno – pastrmka (lokalno)"],
    regulations: [],
    sectors: [
      {
        name: "Gradske deonice",
        fish: [
          { species: "Klen", lures: ["ultralight vobleri 2–4 cm"], baits: ["hleb, crvi"] },
          { species: "Skobalj", baits: ["sir/testo (plovak)"] }
        ]
      },
      {
        name: "Uzvodniji hladniji sektori",
        flyOnly: false,
        fish: [{ species: "Pastrmka", flies: ["nimfe #16–18"], lures: ["meps #1–2"] }]
      }
    ],
    guidanceByLevel: {
      low: "UL spinning i fin plovak.",
      normal: "Miks tehnika.",
      high: "Tražiti smirenije delove."
    }
  },

  /* 12) TIMOK (Zaječar) */
  {
    id: 12,
    name: "Timok (Zaječar)",
    country: "RS",
    lat: 43.903,
    lon: 22.264,
    level: 68,
    trend: "down",
    lastUpdate: "2026-02-19 13:25",
    history: [75, 73, 72, 70, 68],
    description:
      "Reka sa mešovitim karakterom; klen i skobalj vode glavnu reč, uz mogućnost soma u dubljim deonicama i smuđa nizvodnije.",
    zones: ["Šljunkare / zavoji – klen/skobalj", "Dublji delovi – som/smuđ"],
    regulations: [],
    sectors: [
      {
        name: "Šljunkare i zavoji",
        fish: [
          { species: "Klen", lures: ["meps #1–2, mini crank"], baits: ["hleb, crvi"] },
          { species: "Skobalj", baits: ["sir/testo, crvi"] }
        ]
      },
      {
        name: "Dublji sektori",
        lureOnly: true,
        fish: [
          { species: "Som", lures: ["gume 12–18 cm"], baits: ["jetra, pijavice"] },
          { species: "Smuđ", lures: ["silikonci 7–10 cm"] }
        ]
      }
    ],
    guidanceByLevel: {
      low: "UL i feeder su stabilni.",
      normal: "Miks pristupa radi.",
      high: "Priobalja i ulivi pritoka."
    }
  }
];
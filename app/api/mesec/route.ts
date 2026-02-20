export async function GET() {
  try {
    const now = new Date();

    // Referentni mlad mesec (astronomski standard)
    const newMoonRef = new Date("2000-01-06T18:14:00Z");

    // Razlika vremena u ms
    const diff = now.getTime() - newMoonRef.getTime();

    // Trajanje lunarnog ciklusa
    const lunarCycle = 29.530588853;

    // Trenutni položaj u ciklusu (0–29.53)
    const cycle = (diff / (1000 * 3600 * 24)) % lunarCycle;

    const illumination = getIllumination(cycle);
    const phaseName = getPhaseName(cycle);
    const emoji = getPhaseEmoji(cycle);

    return Response.json({
      ok: true,
      date: now.toISOString().split("T")[0],
      illumination,
      phaseDeg: Math.round((cycle / lunarCycle) * 360),
      phase: { name: phaseName, emoji },
    });
  } catch (e) {
    return Response.json({ ok: false, error: "Moon calculation error" });
  }
}

function getIllumination(day: number) {
  return Math.round((1 - Math.cos((2 * Math.PI * day) / 29.53)) * 50);
}

function getPhaseName(day: number) {
  if (day < 1) return "Mlad mesec";
  if (day < 6.382) return "Rastući srp";
  if (day < 9.382) return "Prva četvrt";
  if (day < 13.765) return "Rastuća izbočina";
  if (day < 16) return "Pun mesec";
  if (day < 20.382) return "Opadajuća izbočina";
  if (day < 23.382) return "Treća četvrt";
  if (day < 27.382) return "Opadajući srp";
  return "Mlad mesec";
}

function getPhaseEmoji(day: number) {
  if (day < 1) return "🌑";
  if (day < 6.382) return "🌒";
  if (day < 9.382) return "🌓";
  if (day < 13.765) return "🌔";
  if (day < 16) return "🌕";
  if (day < 20.382) return "🌖";
  if (day < 23.382) return "🌗";
  if (day < 27.382) return "🌘";
  return "🌑";
}
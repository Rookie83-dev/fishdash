export async function GET() {
  try {
    // Geolokacija Beograda (kasnije ćemo automatizovati)
    const lat = 44.787197;
    const lon = 20.457273;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,cloud_cover&timezone=auto`;

    const res = await fetch(url);
    const data = await res.json();

    return Response.json({
      ok: true,
      data: data.current,
    });
  } catch (error) {
    return Response.json({
      ok: false,
      error: "Greška pri učitavanju podataka.",
    });
  }
}
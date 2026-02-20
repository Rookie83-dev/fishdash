"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Učitamo default ikone za marker (da rade u Next/Vercel okruženju)
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: (iconRetinaUrl as unknown as string),
  iconUrl: (iconUrl as unknown as string),
  shadowUrl: (shadowUrl as unknown as string),
});

type Props = {
  lat: number;
  lon: number;
  name: string;
  showUserLocation?: boolean; // default: true
  height?: number;            // px
};

export default function RiverMap({
  lat,
  lon,
  name,
  showUserLocation = true,
  height = 280,
}: Props) {
  const [userPos, setUserPos] = useState<{ lat: number; lon: number } | null>(null);

  // Učitamo lokaciju korisnika (ako dozvoljena)
  useEffect(() => {
    if (!showUserLocation) return;
    if (!("geolocation" in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      (p) => setUserPos({ lat: p.coords.latitude, lon: p.coords.longitude }),
      () => { /* korisnik odbio ili greška — samo preskoči */ },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [showUserLocation]);

  // Ako imamo i reku i korisnika — izračunaj granice za fitBounds
  const bounds = useMemo<L.LatLngBoundsExpression | null>(() => {
    if (userPos) {
      return L.latLngBounds([lat, lon], [userPos.lat, userPos.lon]);
    }
    return null;
  }, [lat, lon, userPos]);

  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
      style={{ height }}
    >
      <MapContainer
        center={[lat, lon]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker reke */}
        <Marker position={[lat, lon]}>
          <Popup>
            <b>{name}</b>
            <br />
            {lat.toFixed(5)}, {lon.toFixed(5)}
          </Popup>
        </Marker>

        {/* Marker korisnika (ako postoji) */}
        {userPos && (
          <Marker position={[userPos.lat, userPos.lon]}>
            <Popup>Vaša lokacija</Popup>
          </Marker>
        )}

        {/* Fit bounds (ako imamo i reku i korisnika) */}
        {bounds && <FitBounds bounds={bounds} />}
      </MapContainer>
    </div>
  );
}

/** Pomoćna komponenta za fitBounds */
function FitBounds({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, bounds]);
  return null;
}
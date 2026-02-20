"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Fix za default marker ikone (da se učitaju iz node_modules)
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import marker1x from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: (marker2x as any).src ?? marker2x,
  iconUrl: (marker1x as any).src ?? marker1x,
  shadowUrl: (markerShadow as any).src ?? markerShadow,
});

type Props = {
  lat: number;
  lon: number;
  name: string;
  showUserLocation?: boolean; // default: true
  height?: number; // px, default 280
};

export default function RiverMap({
  lat,
  lon,
  name,
  showUserLocation = true,
  height = 280,
}: Props) {
  const [userPos, setUserPos] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    if (!showUserLocation) return;
    if (!("geolocation" in navigator)) return;

    const id = navigator.geolocation.getCurrentPosition(
      (p) => {
        setUserPos({ lat: p.coords.latitude, lon: p.coords.longitude });
      },
      () => {
        // korisnik odbio / nema lokacije – nije greška, samo preskačemo
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );

    return () => {
      // nothing
    };
  }, [showUserLocation]);

  const bounds = useMemo(() => {
    if (userPos) {
      return L.latLngBounds(
        [lat, lon],
        [userPos.lat, userPos.lon]
      );
    }
    return null;
  }, [lat, lon, userPos]);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
         style={{ height }}>
      <MapContainer
        center={[lat, lon]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          // OpenStreetMap tile-ovi + obavezna atribucija
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
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

        {/* Fit bounds ako imamo i reku i korisnika */}
        {bounds && <FitBounds bounds={bounds} />}
      </MapContainer>
    </div>
  );
}

/** Pomoćna komponenta da mapu uokviri u zadate granice */
function FitBounds({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, bounds]);
  return null;
}
"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons (Leaflet + bundlers issue)
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ── Configure here ──────────────────────────────────────────
const LAT = 40.71135;
const LNG = -73.99036;
const ZOOM = 16;
const POPUP_TEXT = "Portale Doors SRL.";
// ────────────────────────────────────────────────────────────

export function LeafletMap() {
  useEffect(() => {
    // Remove default icon prototype overrides that can cause blank icons
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
  }, []);

  return (
    <MapContainer
      center={[LAT, LNG]}
      zoom={ZOOM}
      scrollWheelZoom={false}
      className="size-full rounded-lg">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[LAT, LNG]} icon={icon}>
        <Popup>{POPUP_TEXT}</Popup>
      </Marker>
    </MapContainer>
  );
}

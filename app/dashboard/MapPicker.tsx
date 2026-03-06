"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

type Props = {
  onPickupSelect: (val: string) => void;
  onDropSelect: (val: string) => void;
};

export default function MapPicker({ onPickupSelect, onDropSelect }: Props) {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true;

    (async () => {
      const L = (await import("leaflet")).default;

      // ✅ IMPORTANT FIX
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      if (!isMounted) return;

      const map = L.map("map").setView([19.076, 72.8777], 12);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      let pickupMarker: any = null;
      let dropMarker: any = null;

      map.on("click", async (e: any) => {
        const { lat, lng } = e.latlng;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        const address = data.display_name;

        if (!pickupMarker) {
          pickupMarker = L.marker([lat, lng]).addTo(map);
          pickupMarker.bindPopup("Pickup Location").openPopup();
          onPickupSelect(address);
        } else if (!dropMarker) {
          dropMarker = L.marker([lat, lng]).addTo(map);
          dropMarker.bindPopup("Drop Location").openPopup();
          onDropSelect(address);
        }
      });
    })();

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onPickupSelect, onDropSelect]);

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-2">Select Pickup & Drop Location</h2>
      <div id="map" className="h-[350px] w-full rounded border"></div>
    </div>
  );
}
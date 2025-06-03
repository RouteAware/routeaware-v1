// app/components/Map.tsx
"use client";

import { useEffect, useRef } from "react";

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
      zoom: 4,
    });
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] rounded-2xl shadow col-span-2"
    />
  );
};

export default Map;

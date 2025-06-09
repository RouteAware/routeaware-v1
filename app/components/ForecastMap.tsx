"use client";

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 39.8283,
  lng: -98.5795, // Center on continental US
};

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const OPENWEATHER_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ?? "";

export default function ForecastMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_API_KEY,
  });

  const [hourOffset, setHourOffset] = useState(0);
  const [tileTimestamp, setTileTimestamp] = useState<number>(
    Math.floor(Date.now() / 1000)
  );

  useEffect(() => {
    const newTimestamp = Math.floor(Date.now() / 1000) + hourOffset * 3600;
    setTileTimestamp(newTimestamp);
  }, [hourOffset]);

  const onLoad = (map: google.maps.Map) => {
    const getOverlayMapType = () => {
      return new window.google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
          return `https://tile.openweathermap.org/map/precipitation_new/${zoom}/${coord.x}/${coord.y}.png?appid=${OPENWEATHER_KEY}&tm=${tileTimestamp}`;
        },
        tileSize: new window.google.maps.Size(256, 256),
        name: "Precipitation Forecast",
        opacity: 0.6,
      });
    };

    map.overlayMapTypes.clear();
    map.overlayMapTypes.insertAt(0, getOverlayMapType());
  };

  useEffect(() => {
    if (!isLoaded) return;
    const mapEl = document.querySelector(".forecast-map") as HTMLElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gMap = (mapEl as any).__gm?.map;
    if (gMap) {
      const getOverlayMapType = () => {
        return new window.google.maps.ImageMapType({
          getTileUrl: function (coord, zoom) {
            return `https://tile.openweathermap.org/map/precipitation_new/${zoom}/${coord.x}/${coord.y}.png?appid=${OPENWEATHER_KEY}&tm=${tileTimestamp}`;
          },
          tileSize: new window.google.maps.Size(256, 256),
          name: "Precipitation Forecast",
          opacity: 0.6,
        });
      };

      gMap.overlayMapTypes.clear();
      gMap.overlayMapTypes.insertAt(0, getOverlayMapType());
    }
  }, [tileTimestamp, isLoaded]);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm font-medium text-center">
        Forecast: {hourOffset === 0
          ? "Now"
          : hourOffset > 0
          ? `+${hourOffset} hour${hourOffset > 1 ? "s" : ""}`
          : `${hourOffset} hour${hourOffset < -1 ? "s" : ""}`}
      </label>
      <input
        type="range"
        min={-6}
        max={6}
        value={hourOffset}
        onChange={(e) => setHourOffset(parseInt(e.target.value))}
        className="w-full"
      />
      <div className="forecast-map">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
          onLoad={onLoad}
        />
      </div>
    </div>
  );
}
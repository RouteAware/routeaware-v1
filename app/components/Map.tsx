// Map.tsx - Enhanced weather overlay and stable markers
'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  TrafficLayer,
  Marker,
} from '@react-google-maps/api';
import { fetchBoundingBoxAlerts, RouteWeatherAdvisory } from '../utils/fetchBoundingBoxAlerts';

interface MapProps {
  origin: string;
  destination: string;
  departureTime?: Date;
  showTraffic: boolean;
  showWeather: boolean;
  weatherLayer: string;
  weatherOpacity: number;
  onSummaryUpdate: (distance: string, duration: string, trafficDelay?: string) => void;
  onAlertsUpdate: (alerts: RouteWeatherAdvisory[]) => void;
}

// Fills parent tile height
const containerStyle = {
  width: '100%',
  height: '100%',
};
const defaultCenter = { lat: 39.5, lng: -98.35 };

const Map: React.FC<MapProps> = ({
  origin,
  destination,
  departureTime,
  showTraffic,
  showWeather,
  weatherLayer,
  weatherOpacity,
  onSummaryUpdate,
  onAlertsUpdate,
}) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [originLatLng, setOriginLatLng] = useState<google.maps.LatLngLiteral | null>(null);
  const [destLatLng, setDestLatLng] = useState<google.maps.LatLngLiteral | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const weatherOverlayRef = useRef<google.maps.ImageMapType | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  // Fetch directions when inputs change
  useEffect(() => {
    if (!isLoaded || !origin || !destination) return;
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: departureTime || new Date(),
          trafficModel: google.maps.TrafficModel.BEST_GUESS,
        },
        provideRouteAlternatives: false,
      }, async (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
          const leg = result.routes[0].legs[0];

          // Update markers once per successful route
          setOriginLatLng({
            lat: leg.start_location.lat(),
            lng: leg.start_location.lng(),
          });
          setDestLatLng({
            lat: leg.end_location.lat(),
            lng: leg.end_location.lng(),
          });

          const distanceText = leg.distance?.text || '';
          const durationText = leg.duration?.text || '';
          const trafficText = leg.duration_in_traffic?.text || '';
          onSummaryUpdate(distanceText, durationText, trafficText);

          // Fit bounds to route
          const bounds = new google.maps.LatLngBounds();
          result.routes[0].overview_path.forEach(pt => bounds.extend(pt));
          mapRef.current?.fitBounds(bounds);

          // Fetch weather alerts
          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();
          const alerts = await fetchBoundingBoxAlerts(sw.lat(), sw.lng(), ne.lat(), ne.lng());
          onAlertsUpdate(alerts);
        } else {
          setDirections(null);
          setOriginLatLng(null);
          setDestLatLng(null);
          onSummaryUpdate('', '', '');
          onAlertsUpdate([]);
        }
      }
    );
  }, [isLoaded, origin, destination, departureTime, onSummaryUpdate, onAlertsUpdate]);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  // Weather overlay toggle: only clear/add on toggle changes
  useEffect(() => {
    if (!mapRef.current) return;
    // Clear existing
    if (weatherOverlayRef.current) {
      mapRef.current.overlayMapTypes.clear();
      weatherOverlayRef.current = null;
    }
    // Add new when toggled on
    if (showWeather) {
      const tileUrl = `https://tile.openweathermap.org/map/${weatherLayer}/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OWM_KEY}`;
      const overlay = new google.maps.ImageMapType({
        getTileUrl: (coord, zoom) => tileUrl
          .replace('{x}', coord.x + '')
          .replace('{y}', coord.y + '')
          .replace('{z}', zoom + ''),
        tileSize: new google.maps.Size(256, 256),
        opacity: weatherOpacity,
        name: 'WeatherOverlay',
      });
      mapRef.current.overlayMapTypes.push(overlay);
      weatherOverlayRef.current = overlay;
    }
  }, [showWeather, weatherLayer, weatherOpacity]);

  if (loadError) return <div className="text-red-600 p-4">Error loading Google Maps</div>;
  if (!isLoaded) return <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center rounded-xl">Loading map…</div>;

  return (
    <div className="relative w-full h-[500px] bg-gray-200 rounded-xl overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={4}
        onLoad={handleMapLoad}
        options={{ disableDefaultUI: true, zoomControl: true }}
      >
        {showTraffic && <TrafficLayer />}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{ suppressMarkers: true }} // hide default markers
          />
        )}
        {originLatLng && <Marker position={originLatLng} />}
        {destLatLng && <Marker position={destLatLng} />}
      </GoogleMap>
    </div>
  );
};

export default Map;
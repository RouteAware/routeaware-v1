'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  GoogleMap,
  DirectionsRenderer,
  TrafficLayer,
  Marker,
} from '@react-google-maps/api';
import { useGoogleMapsLoader } from '../lib/googleMapsLoader';
import { fetchBoundingBoxAlerts, RouteWeatherAdvisory } from '../utils/fetchBoundingBoxAlerts';
import { fetchRouteAdvisories } from '../utils/fetchRouteAdvisories';

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
  onAdvisoriesUpdate: (advisories: string[]) => void;
  onCoordinatesUpdate?: (origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral) => void;
}

const containerStyle = { width: '100%', height: '100%' };
const defaultCenter = { lat: 39.5, lng: -98.35 };
const OPENWEATHER_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ?? '';

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
  onAdvisoriesUpdate,
  onCoordinatesUpdate,
}) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [originPos, setOriginPos] = useState<google.maps.LatLngLiteral | null>(null);
  const [destPos, setDestPos] = useState<google.maps.LatLngLiteral | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const weatherOverlayRef = useRef<google.maps.ImageMapType | null>(null);

  const { isLoaded, loadError } = useGoogleMapsLoader();

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
      },
      async (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
          const leg = result.routes[0].legs[0];

          const oPos = { lat: leg.start_location.lat(), lng: leg.start_location.lng() };
          const dPos = { lat: leg.end_location.lat(), lng: leg.end_location.lng() };
          setOriginPos(oPos);
          setDestPos(dPos);

          if (onCoordinatesUpdate) onCoordinatesUpdate(oPos, dPos);

          onSummaryUpdate(
            leg.distance?.text || '',
            leg.duration?.text || '',
            leg.duration_in_traffic?.text || ''
          );

          const bounds = new google.maps.LatLngBounds();
          result.routes[0].overview_path.forEach((pt) => bounds.extend(pt));
          mapRef.current?.fitBounds(bounds);

          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();
          const alerts = await fetchBoundingBoxAlerts(sw.lat(), sw.lng(), ne.lat(), ne.lng());
          onAlertsUpdate(alerts);

          const advisories = await fetchRouteAdvisories(sw.lat(), sw.lng(), ne.lat(), ne.lng());
          onAdvisoriesUpdate(advisories);
        } else {
          setDirections(null);
          setOriginPos(null);
          setDestPos(null);
          onSummaryUpdate('', '', '');
          onAlertsUpdate([]);
          onAdvisoriesUpdate([]);
        }
      }
    );
  }, [isLoaded, origin, destination, departureTime]);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  useEffect(() => {
    if (!mapRef.current) return;
    if (weatherOverlayRef.current) {
      mapRef.current.overlayMapTypes.clear();
      weatherOverlayRef.current = null;
    }
    if (showWeather) {
      const tileUrl = `https://tile.openweathermap.org/map/${weatherLayer}/{z}/{x}/{y}.png?appid=${OPENWEATHER_KEY}`;
      const overlay = new google.maps.ImageMapType({
        getTileUrl: (coord, zoom) =>
          tileUrl
            .replace('{x}', `${coord.x}`)
            .replace('{y}', `${coord.y}`)
            .replace('{z}', `${zoom}`),
        tileSize: new google.maps.Size(256, 256),
        opacity: weatherOpacity,
        name: 'WeatherOverlay',
      });
      mapRef.current.overlayMapTypes.insertAt(0, overlay);
      weatherOverlayRef.current = overlay;
    }
  }, [showWeather, weatherLayer, weatherOpacity]);

  if (loadError) return <div className="text-red-600 p-4">Error loading Google Maps</div>;
  if (!isLoaded)
    return (
      <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center rounded-xl">
        Loading map…
      </div>
    );

  return (
    <div className="relative w-full h-[500px] bg-gray-200 rounded-xl overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={4}
        onLoad={handleMapLoad}
        options={{ disableDefaultUI: false, zoomControl: true, draggable: true, scrollwheel: true, gestureHandling: 'greedy' }}
      >
        {showTraffic && <TrafficLayer />}
        {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}
        {originPos && <Marker position={originPos} />}
        {destPos && <Marker position={destPos} />}
      </GoogleMap>
    </div>
  );
};

export default Map;
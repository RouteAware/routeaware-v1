// lib/googleMapsLoader.ts
import { useJsApiLoader } from '@react-google-maps/api';

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

export function useGoogleMapsLoader() {
  return useJsApiLoader({
    id: 'script-loader',
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ['places', 'maps'], // ✅ Include all needed libraries
    language: 'en',
    region: 'US',
  });
}
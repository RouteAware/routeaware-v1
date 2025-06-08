// File: app/utils/fetchRouteAdvisories.ts

/**
 * Utility to fetch route advisories from our Next API.
 * Calls GET /api/advisories/route?sw=...&ne=...
 */
export async function fetchRouteAdvisories(
  swLat: number,
  swLng: number,
  neLat: number,
  neLng: number
): Promise<string[]> {
  const url = `/api/advisories/route?sw=${swLat},${swLng}&ne=${neLat},${neLng}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error('Failed to fetch route advisories', res.statusText);
    return [];
  }
  return (await res.json()) as string[];
}
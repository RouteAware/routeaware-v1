// app/utils/fetchRouteAdvisories.ts

/**
 * Fetches any active advisories within a bounding box.
 * You’ll pass sw and ne corners from your map bounds.
 * Returns an array of advisory descriptions.
 */
export async function fetchRouteAdvisories(
  swLat: number,
  swLng: number,
  neLat: number,
  neLng: number
): Promise<string[]> {
  const url = `/api/advisories?sw=${swLat},${swLng}&ne=${neLat},${neLng}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error('Failed to fetch route advisories', await res.text());
    return [];
  }
  // Expecting JSON array of strings:
  return (await res.json()) as string[];
}
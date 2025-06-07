export interface RouteWeatherAdvisory {
  id: string;
  event: string;
  headline: string;
  description: string;
  severity: string;
  link: string;
}

export async function fetchBoundingBoxAlerts(
  minLat: number,
  minLng: number,
  maxLat: number,
  maxLng: number
): Promise<RouteWeatherAdvisory[]> {
  const url = `https://api.weather.gov/alerts/active?status=actual&message_type=alert&point=${minLat},${minLng}`;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'RouteAwareApp (contact@berouteaware.com)', // NWS recommends custom UA
        'Accept': 'application/geo+json'
      }
    });

    if (!res.ok) {
      console.error('NWS API error:', res.status);
      return [];
    }

    const data = await res.json();

    if (!data.features || !Array.isArray(data.features)) return [];

    // Filter alerts within the bounding box
    const alerts = data.features
      .map((feature: any): RouteWeatherAdvisory | null => {
        const coords = feature.geometry?.coordinates;

        // Ensure it’s a point and within box
        if (
          coords &&
          feature.geometry.type === 'Point' &&
          coords[1] >= minLat &&
          coords[1] <= maxLat &&
          coords[0] >= minLng &&
          coords[0] <= maxLng
        ) {
          return {
            id: feature.id,
            event: feature.properties.event,
            headline: feature.properties.headline,
            description: feature.properties.description,
            severity: feature.properties.severity,
            link: feature.properties?.uri || ''
          };
        }

        return null;
      })
      .filter((a: RouteWeatherAdvisory | null) => a !== null) as RouteWeatherAdvisory[];

    return alerts;
  } catch (err) {
    console.error('Error fetching bounding box alerts:', err);
    return [];
  }
}
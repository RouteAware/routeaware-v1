export interface RouteWeatherAdvisory {
  id: string;
  event: string;
  headline: string;
  description: string;
  severity: string;
  link: string;
}

interface AlertFeature {
  id: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    event: string;
    headline: string;
    description: string;
    severity: string;
    uri: string;
  };
}

export async function fetchBoundingBoxAlerts(
  minLat: number,
  minLng: number,
  maxLat: number,
  maxLng: number
): Promise<RouteWeatherAdvisory[]> {
  const url = `https://api.weather.gov/alerts/active?status=actual&message_type=alert`;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'RouteAwareApp (contact@berouteaware.com)',
        'Accept': 'application/geo+json',
      },
    });

    if (!res.ok) {
      console.error('NWS API error:', res.status);
      return [];
    }

    const data = await res.json();

    if (!data.features || !Array.isArray(data.features)) return [];

    const alerts = data.features
      .map((feature: AlertFeature): RouteWeatherAdvisory | null => {
        const coords = feature.geometry?.coordinates;

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
            link: feature.properties.uri || '',
          };
        }

        return null;
      })
      .filter(
        (a: RouteWeatherAdvisory | null): a is RouteWeatherAdvisory => a !== null
      );

    return alerts;
  } catch (err) {
    console.error('Error fetching bounding box alerts:', err);
    return [];
  }
}
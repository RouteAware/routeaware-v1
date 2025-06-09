// app/utils/fetchCurrentWeather.ts

/**
 * Represents minimal current weather data for a location.
 */
export interface CurrentWeather {
  temp: number;            // Temperature in °F
  description: string;     // Weather condition description
}

/**
 * Fetches current weather for given latitude/longitude using OpenWeatherMap.
 * Requires NEXT_PUBLIC_OWM_KEY in env.
 */
export async function fetchCurrentWeather(
  lat: number,
  lon: number
): Promise<CurrentWeather> {
  const apiKey = process.env.NEXT_PUBLIC_OWM_KEY;
  if (!apiKey) {
    throw new Error('Missing OpenWeatherMap API key (NEXT_PUBLIC_OWM_KEY)');
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Weather fetch failed: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return {
    temp: data.main.temp as number,
    description: data.weather[0].description as string,
  };
}

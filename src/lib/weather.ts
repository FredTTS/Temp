import { WEATHER_LAT, WEATHER_LON } from "@/lib/constants";

interface WeatherData {
  dates: string[];
  temperatures: number[];
}

export async function fetchWeatherHistory(
  startDate: string,
  endDate: string
): Promise<WeatherData> {
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${WEATHER_LAT}&longitude=${WEATHER_LON}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean&timezone=Europe%2FHelsinki`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Kunde inte hämta väderdata");
  const data = await res.json();

  return {
    dates: data.daily?.time ?? [],
    temperatures: data.daily?.temperature_2m_mean ?? [],
  };
}

export async function fetchCurrentWeather(): Promise<{ temperature: number; date: string }> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_LAT}&longitude=${WEATHER_LON}&current=temperature_2m&timezone=Europe%2FHelsinki`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Kunde inte hämta aktuell temperatur");
  const data = await res.json();

  return {
    temperature: data.current?.temperature_2m ?? 0,
    date: data.current?.time?.split("T")[0] ?? new Date().toISOString().split("T")[0],
  };
}

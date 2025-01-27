/* This file contains utility functions that are used in multiple components. */

import { City, Location, WeatherData } from "./types";

/* This function takes a latitude and longitude and returns the weather data at that location. */
export const getWeatherData = async (
  location: Location | null,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>
) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  if (
    (location && location.latitude !== null) ||
    (location && location.longitude !== null)
  ) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === "400") {
      setError(data.message);
    }
    setWeatherData(data as WeatherData);
  }
};

/* This function  gets the user's location and sets it in the state. */
export const getLocation = (
  setLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number | null;
      longitude: number | null;
    } | null>
  >,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!navigator.geolocation) {
    setError("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      setError("");
    },
    (err) => {
      setError("Unable to retrieve location. " + err.message);
    }
  );
};

/* This function takes a timestamp and returns a formatted time string. */
export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* List of cities to choose from with location data */
//TODO: This can be change to use an API to get the cities locations (e.g. Google Maps API)
export const cities: City[] = [
  { name: "New York", location: { latitude: 40.7128, longitude: -74.006 } },
  {
    name: "Los Angeles",
    location: { latitude: 34.0522, longitude: -118.2437 },
  },
  { name: "Chicago", location: { latitude: 41.8781, longitude: -87.6298 } },
  { name: "Houston", location: { latitude: 29.7604, longitude: -95.3698 } },
  { name: "Phoenix", location: { latitude: 33.4484, longitude: -112.074 } },
  {
    name: "Philadelphia",
    location: { latitude: 39.9526, longitude: -75.1652 },
  },
  { name: "San Antonio", location: { latitude: 29.4241, longitude: -98.4936 } },
  { name: "San Diego", location: { latitude: 32.7157, longitude: -117.1611 } },
  { name: "Dallas", location: { latitude: 32.7767, longitude: -96.797 } },
];

/* This file contains utility functions that are used in multiple components. */

import { Location, WeatherData } from "./types";

/* This function takes a latitude and longitude and returns the weather data at that location. */
export const getWeatherData = async (
  location: Location,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>
) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  if (location.latitude !== null || location.longitude !== null) {
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
    React.SetStateAction<{ latitude: number | null; longitude: number | null }>
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

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

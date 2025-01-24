/* This file contains utility functions that are used in multiple components. */

import { Location } from "./types";

/* This function takes a latitude and longitude and returns the name of the city at that location. */
export const getCityName = async (latitude: number, longitude: number) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK") {
      const addressComponents = data.results[0].address_components;
      const cityObject = addressComponents.find(
        (component: { types: string | string[] }) =>
          component.types.includes("locality")
      );
      return cityObject.long_name;
    } else {
      throw new Error("Unable to retrieve city name");
    }
  } catch (err) {
    console.error(err);
  }
};

/* This function takes a latitude and longitude and returns the weather data at that location. */
export const getWeatherData = async (location: Location) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.cod === "400") {
    throw new Error(data.message);
  }
  return data;
};

/* This function  gets the user's location and sets it in the state. */
export const getLocation = (
  setLocation: React.Dispatch<
    React.SetStateAction<{ latitude: number | null; longitude: number | null }>
  >,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  console.log("Getting location...");
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by your browser.");
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
      console.error(err.message);
      setError("Unable to retrieve location. " + err.message);
    }
  );
};

/* This function gets the city name at the user's location and sets it in the state. */
export const getCity = async (
  location: { latitude: number | null; longitude: number | null },
  setCity: React.Dispatch<React.SetStateAction<string | null>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  if (location.latitude !== null && location.longitude !== null) {
    try {
      const city = (await getCityName(
        location.latitude,
        location.longitude
      )) as string;
      setCity(city);
    } catch (err) {
      console.error(err);
      setError("Unable to retrieve city name.");
    }
  } else {
    setCity(null);
    console.log("Location not found");
    setError("Location not found");
  }
};

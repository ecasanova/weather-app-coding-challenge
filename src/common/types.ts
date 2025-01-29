/// <reference types="@types/googlemaps" />

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  dt: number;
  id: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  name: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
}

export interface Location {
  latitude: number | null;
  longitude: number | null;
}

export interface City {
  name: string;
  location: Location;
}

export interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
export interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}

export interface PlaceType {
  place_id: string;
  description: string;
  structured_formatting: StructuredFormatting;
}

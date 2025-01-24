export interface WeatherData {
  city: string | null;
  temperature: number;
  description: string;
  icon: string;
  location: Location;
}

export interface Location {
  latitude: number | null;
  longitude: number | null;
}

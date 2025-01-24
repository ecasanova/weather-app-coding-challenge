export interface WeatherData {
  city: string | null;
  temperature: number;
  description: string;
  icon: string;
  latitude: number | null;
  longitude: number | null;
}

import React from "react";
import "./WeatherDisplay.css";

interface WeatherDisplayProps {
  city: string | null;
  temperature: number;
  description: string;
  icon: string;
  latitude: number | null;
  longitude: number | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  city,
  temperature,
  description,
  latitude,
  longitude,
  icon,
}) => {
  const cityName = city || "Unknown city";

  return (
    <div className="weather-card">
      {city && (
        <>
          <h2>{cityName}</h2>
          <img src={icon} alt={description} />
          <p>{description}</p>
          <h3>{temperature}°C</h3>
          <p>
            <b>Latitud:</b> {latitude} <br />
            <b>Longitud:</b> {longitude}
          </p>
        </>
      )}
    </div>
  );
};

export default WeatherDisplay;

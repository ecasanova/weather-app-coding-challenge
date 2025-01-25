/* react */
import React, { useEffect, useState } from "react";

/* styles */
import "./WeatherDisplay.css";

/* types */
import { WeatherData } from "../../common/types";
import { formatTime } from "../../common/utils";

/* icons */
import {
  Thermometer,
  ArrowUpDown,
  Droplet,
  Gauge,
  Wind,
  Eye,
  Sunrise,
  Sunset,
} from "lucide-react";

const WeatherDisplay: React.FC<{ data: WeatherData | null }> = ({ data }) => {
  const [wheatherData, setWeatherData] = useState<WeatherData | null>(data);

  useEffect(() => {
    setWeatherData(data);
  }, [data]);

  return (
    <>
      {wheatherData && (
        <div className="weather-card">
          <h2 className="city-name">
            {wheatherData.name}, {wheatherData.sys.country}
          </h2>
          <div className="weather-main">
            <div className="temperature">
              {Math.round(wheatherData.main.temp)}°C
            </div>
            <div className="weather-description">
              {wheatherData.weather[0].description}
            </div>
          </div>
          <div className="weather-details">
            <div className="detail-item">
              <Thermometer className="icon" />
              <span className="detail-label">Feels like:</span>
              {Math.round(wheatherData.main.feels_like)}°C
            </div>
            <div className="detail-item">
              <ArrowUpDown className="icon" />
              <span className="detail-label">Min/Max:</span>
              {Math.round(wheatherData.main.temp_min)}°C /{" "}
              {Math.round(wheatherData.main.temp_max)}°C
            </div>
            <div className="detail-item">
              <Droplet className="icon" />
              <span className="detail-label">Humidity:</span>
              {wheatherData.main.humidity}%
            </div>
            <div className="detail-item">
              <Gauge className="icon" />
              <span className="detail-label">Pressure:</span>
              {wheatherData.main.pressure} hPa
            </div>
            <div className="detail-item">
              <Wind className="icon" />
              <span className="detail-label">Wind:</span>
              {wheatherData.wind.speed} m/s, {wheatherData.wind.deg}°
            </div>
            <div className="detail-item">
              <Eye className="icon" />
              <span className="detail-label">Visibility:</span>
              {wheatherData.visibility / 1000} km
            </div>
            <div className="detail-item">
              <Sunrise className="icon" />
              <span className="detail-label">Sunrise:</span>
              {formatTime(wheatherData.sys.sunrise)}
            </div>
            <div className="detail-item">
              <Sunset className="icon" />
              <span className="detail-label">Sunset:</span>
              {formatTime(wheatherData.sys.sunset)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherDisplay;

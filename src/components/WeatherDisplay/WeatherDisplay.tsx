/* react */
import React, { useEffect, useState } from "react";

/* styles */
import "./WeatherDisplay.css";

/* types */
import { WeatherData } from "../../common/types";
import { formatTime } from "../../common/utils";

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
              <span className="detail-label">Feels like:</span>
              {Math.round(wheatherData.main.feels_like)}°C
            </div>
            <div className="detail-item">
              <span className="detail-label">Min/Max:</span>
              {Math.round(wheatherData.main.temp_min)}°C /{" "}
              {Math.round(wheatherData.main.temp_max)}
              °C
            </div>
            <div className="detail-item">
              <span className="detail-label">Humidity:</span>
              {wheatherData.main.humidity}%
            </div>
            <div className="detail-item">
              <span className="detail-label">Pressure:</span>
              {wheatherData.main.pressure} hPa
            </div>
            <div className="detail-item">
              <span className="detail-label">Wind:</span>
              {wheatherData.wind.speed} m/s, {wheatherData.wind.deg}°
            </div>
            <div className="detail-item">
              <span className="detail-label">Visibility:</span>
              {wheatherData.visibility / 1000} km
            </div>
            <div className="detail-item">
              <span className="detail-label">Sunrise:</span>
              {formatTime(wheatherData.sys.sunrise)}
            </div>
            <div className="detail-item">
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

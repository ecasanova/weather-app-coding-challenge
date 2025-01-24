/* react */
import React, { useEffect, useState } from "react";

/* styles */
import "./WeatherDisplay.css";

/* types */
import { WeatherData } from "../../common/types";

const WeatherDisplay: React.FC<{ data: WeatherData }> = ({ data }) => {
  const [wheatherData, setWeatherData] = useState<WeatherData>(data);

  useEffect(() => {
    setWeatherData(data);
  }, [data]);

  return (
    <div className="weather-card">
      {wheatherData.city ? (
        <>
          <h2>{wheatherData.city}</h2>
          <img src={wheatherData.icon} alt={wheatherData.description} />
          <p>{wheatherData.description}</p>
          <h3>{wheatherData.temperature}°C</h3>
          <p>
            <b>Latitud:</b> {wheatherData.location.latitude} <br />
            <b>Longitud:</b> {wheatherData.location.longitude}
          </p>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default WeatherDisplay;

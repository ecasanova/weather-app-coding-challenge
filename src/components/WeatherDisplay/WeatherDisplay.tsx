import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
import {
  Thermostat as Thermometer,
  SwapVert as ArrowUpDown,
  Opacity as Droplet,
  Speed as Gauge,
  Air as Wind,
  Visibility as Eye,
  WbSunny as Sunrise,
  NightsStay as Sunset,
} from "@mui/icons-material";
import { WeatherData } from "../../common/types";
import { formatTime } from "../../common/utils";

import RefreshIcon from "@mui/icons-material/Refresh";

const WeatherCard = styled(Card)`
  max-width: 25rem;
  margin: 1.25rem auto;
  padding: 1.25rem;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0.625rem 0;
`;

const DetailLabel = styled.span`
  margin-left: 0.625rem;
`;

interface WeatherDisplayProps {
  data: WeatherData | null;
  setLocation: (location: Location | null) => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  data,
  setLocation,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(data);

  useEffect(() => {
    setWeatherData(data);
  }, [data]);

  return (
    <>
      {weatherData && (
        <WeatherCard>
          <CardContent>
            <Typography variant="h5" component="div">
              {weatherData.name}, {weatherData.sys.country}
              <IconButton onClick={() => setLocation(null)}>
                <RefreshIcon />
              </IconButton>
            </Typography>
            <Typography variant="h2" component="div">
              {Math.round(weatherData.main.temp)}°C
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <Typography variant="body1">
                  {weatherData.weather[0].description}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailItem>
                  <IconButton>
                    <Thermometer />
                  </IconButton>
                  <DetailLabel>
                    Feels like: {Math.round(weatherData.main.feels_like)}°C
                  </DetailLabel>
                </DetailItem>
                <DetailItem>
                  <IconButton>
                    <ArrowUpDown />
                  </IconButton>
                  <DetailLabel>
                    Min/Max: {Math.round(weatherData.main.temp_min)}°C /{" "}
                    {Math.round(weatherData.main.temp_max)}°C
                  </DetailLabel>
                </DetailItem>
                <DetailItem>
                  <IconButton>
                    <Droplet />
                  </IconButton>
                  <DetailLabel>
                    Humidity: {weatherData.main.humidity}%
                  </DetailLabel>
                </DetailItem>
                <DetailItem>
                  <IconButton>
                    <Gauge />
                  </IconButton>
                  <DetailLabel>
                    Pressure: {weatherData.main.pressure} hPa
                  </DetailLabel>
                </DetailItem>
                <DetailItem>
                  <IconButton>
                    <Wind />
                  </IconButton>
                  <DetailLabel>
                    Wind: {weatherData.wind.speed} m/s, {weatherData.wind.deg}°
                  </DetailLabel>
                </DetailItem>
                <DetailItem>
                  <IconButton>
                    <Eye />
                  </IconButton>
                  <DetailLabel>
                    Visibility: {weatherData.visibility / 1000} km
                  </DetailLabel>
                </DetailItem>
                <DetailItem>
                  <IconButton>
                    <Sunrise />
                  </IconButton>
                  <DetailLabel>
                    Sunrise: {formatTime(weatherData.sys.sunrise)}
                  </DetailLabel>
                </DetailItem>
                <DetailItem>
                  <IconButton>
                    <Sunset />
                  </IconButton>
                  <DetailLabel>
                    Sunset: {formatTime(weatherData.sys.sunset)}
                  </DetailLabel>
                </DetailItem>
              </Grid>
            </Grid>
          </CardContent>
        </WeatherCard>
      )}
    </>
  );
};

export default WeatherDisplay;

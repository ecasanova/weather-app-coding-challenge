/* react */
import { useEffect, useState, useCallback } from "react";

/* styles */
import styled from "styled-components";
import { Button, CircularProgress, Container, Typography } from "@mui/material";

/* components */
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import CitySelector from "./components/CitySelector/CitySelector";

/* utils */
import { getLocation, getWeatherData } from "./common/utils";

/* types */
import { Location, WeatherData } from "./common/types";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  // State to store the user's location
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [, setCity] = useState<string | null>(null);

  const handleGetLocation = useCallback(() => {
    setLoading(true);
    getLocation(setLocation, setError);
  }, []);

  useEffect(() => {
    const getWeather = async () => {
      try {
        await getWeatherData(location, setError, setWeatherData);
        setLoading(false);
      } catch (err) {
        setError("Unable to retrieve weather data: " + err);
      }
    };

    getWeather();
  }, [location]);

  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <>
          {!location.latitude && !location.longitude && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGetLocation}
              >
                Get Weather on your current location
              </Button>
              <Typography variant="body1" align="center">
                -- or --
              </Typography>
              <CitySelector setCity={setCity} setLocation={setLocation} />
            </>
          )}

          {location.latitude && location.longitude && (
            <WeatherDisplay data={weatherData} />
          )}
          {error && <Typography color="error">{error}</Typography>}
        </>
      )}
    </Container>
  );
}

export default App;

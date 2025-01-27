/* react */
import { useEffect, useState, useCallback } from "react";

/* styles */
import styled from "styled-components";
import {
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";

/* components */
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import CitySelector from "./components/CitySelector/CitySelector";

/* utils */
import { getLocation, getWeatherData } from "./common/utils";

/* types */
import { Location, WeatherData } from "./common/types";

/* icons */
import { LocationOn } from "@mui/icons-material";

const AppContainer = styled(Container)`
  background-image: url("/path/to/your/background.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledButton = styled(Button)`
  margin: 1rem 0;
`;

const StyledTypography = styled(Typography)`
  margin: 1rem 0;
`;

function App() {
  // State to store the user's location
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [, setCity] = useState<string | null>(null);

  const handleGetLocation = useCallback(() => {
    setLoading(true);
    getLocation(setLocation, setError);
  }, []);

  const handleLocation = (location: Location | null): void => {
    setLoading(true);
    setLocation(location as Location);
  };

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
    <AppContainer>
      {loading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <>
          {!location && (
            <Card>
              <CardContent>
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={handleGetLocation}
                >
                  Get Weather on your current location <LocationOn />
                </StyledButton>
                <StyledTypography variant="body1" align="center">
                  <Divider>
                    <Chip label="OR" size="small" />
                  </Divider>
                </StyledTypography>
                <CitySelector setCity={setCity} setLocation={handleLocation} />
              </CardContent>
            </Card>
          )}

          {location && (
            <WeatherDisplay data={weatherData} setLocation={handleLocation} />
          )}
          {error && <StyledTypography color="error">{error}</StyledTypography>}
        </>
      )}
    </AppContainer>
  );
}

export default App;

/* react */
import { useEffect, useState } from "react";

/* types */
import { Location, WeatherData } from "./common/types";

/* utils */
import { getWeatherData } from "./common/utils";

/* styles */
import styled from "styled-components";
import { CircularProgress, Container, Typography } from "@mui/material";

/* components */
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import LocationSelector from "./components/LocationSelector/LocationSelector";

/* icons */

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

const StyledTypography = styled(Typography)`
  margin: 1rem 0;
`;

function App() {
  // State to store the user's location
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

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
            <LocationSelector
              setLocation={setLocation}
              setLoading={setLoading}
              setError={setError}
              handleLocation={handleLocation}
            />
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

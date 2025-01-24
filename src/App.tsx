/* react */
import { useEffect, useState, useCallback } from "react";

/* styles */
import "./App.css";

/* components */
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";

/* utils */
import { getLocation, getWeatherData } from "./common/utils";

/* types */
import { Location, WeatherData } from "./common/types";

function App() {
  // State to store the user's location
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleGetLocation = useCallback(() => {
    getLocation(setLocation, setError);
  }, []);

  useEffect(() => {
    const getWeather = async () => {
      try {
        await getWeatherData(location, setError, setWeatherData);
      } catch (err) {
        console.error(err);
        setError("Unable to retrieve weather data.");
      }
    };

    getWeather();
  }, [location]);

  return (
    <div>
      {!location && <button onClick={handleGetLocation}>Get Location</button>}
      {location && <WeatherDisplay data={weatherData} />}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;

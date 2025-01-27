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
import CitySelector from "./components/CitySelector/CitySelector";

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
    <div>
      {loading ? (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      ) : (
        <>
          {!location.latitude && !location.longitude && (
            <>
              <button onClick={handleGetLocation}>
                Get Weather on your current location
              </button>
              <p>-- or --</p>
              <CitySelector setCity={setCity} setLocation={setLocation} />
            </>
          )}

          {location.latitude && location.longitude && (
            <WeatherDisplay data={weatherData} />
          )}
          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
}

export default App;

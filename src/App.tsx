/* react */
import { useEffect, useState, useCallback } from "react";

/* styles */
import "./App.css";

/* components */
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";

/* utils */
import { getCity, getLocation, getWeatherData } from "./common/utils";

/* types */
import { Location } from "./common/types";

function App() {
  // State to store the user's location
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState("");
  const [city, setCity] = useState<string | null>(null);

  const handleGetLocation = useCallback(() => {
    getLocation(setLocation, setError);
  }, []);

  useEffect(() => {
    getCity(location, setCity, setError);

    const getWeather = async () => {
      try {
        const data = await getWeatherData(location);
        console.log(data);
      } catch (err) {
        console.error(err);
        setError("Unable to retrieve weather data.");
      }
    };

    getWeather();
  }, [location]);

  return (
    <div>
      <button onClick={handleGetLocation}>Get Location</button>
      {error && <p>{error}</p>}
      {city && (
        <WeatherDisplay
          data={{
            city: city,
            temperature: 0,
            description: "",
            icon: "",
            location,
          }}
        />
      )}
    </div>
  );
}

export default App;

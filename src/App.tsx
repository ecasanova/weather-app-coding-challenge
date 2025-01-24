import { useEffect, useState } from "react";
import "./App.css";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import { getCityName } from "./common/utils";

function App() {
  // State to store the user's location
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });
  const [error, setError] = useState("");
  const [city, setCity] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError("");
      },
      (err) => {
        setError("Unable to retrieve location. " + err.message);
      }
    );
  };

  useEffect(() => {
    const getCity = async () => {
      if (location.latitude && location.longitude) {
        const city = (await getCityName(
          location.latitude,
          location.longitude
        )) as string;
        setCity(city);
      }
    };
    getCity();
  }, [location]);

  return (
    <div>
      <button onClick={getLocation}>Get Location</button>
      {error && <p>{error}</p>}
      {city && (
        <WeatherDisplay
          city={city}
          temperature={0}
          description={""}
          icon={""}
          latitude={null}
          longitude={null}
        />
      )}
    </div>
  );
}

export default App;

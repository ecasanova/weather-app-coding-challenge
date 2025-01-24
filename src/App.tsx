import { useEffect, useState, useCallback } from "react";
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

  const getLocation = useCallback(() => {
    console.log("Getting location...");
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
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
        console.error(err.message);
        setError("Unable to retrieve location. " + err.message);
      }
    );
  }, []);

  useEffect(() => {
    const getCity = async () => {
      if (location.latitude !== null && location.longitude !== null) {
        try {
          const city = (await getCityName(
            location.latitude,
            location.longitude
          )) as string;
          setCity(city);
        } catch (err) {
          console.error(err);
          setError("Unable to retrieve city name.");
        }
      } else {
        setCity(null);
        console.log("Location not found");
        setError("Location not found");
      }
    };
    getCity();
  }, [location]);

  return (
    <div>
      {!location.latitude && !location.longitude ? (
        <button onClick={getLocation}>Get Location</button>
      ) : (
        <WeatherDisplay
          data={{
            city,
            temperature: 25,
            description: "Sunny",
            icon: "https://www.example.com/icon.png",
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;

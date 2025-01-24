import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // State to store the user's location
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });
  const [error, setError] = useState("");

  // Get the user's location when the component mounts
  useEffect(() => {
    console.log("useEffect");
    getLocation();
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("La geolocalización no está soportada por tu navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError("");
      },
      (err) => {
        setError("No se pudo obtener la ubicación. " + err.message);
      }
    );
  };
  return (
    <div>
      <h1>Geolocalización</h1>
      <button onClick={getLocation}>Obtener Ubicación</button>
      {location.latitude && location.longitude && (
        <p>
          <b>Latitud:</b> {location.latitude} <br />
          <b>Longitud:</b> {location.longitude}
        </p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;

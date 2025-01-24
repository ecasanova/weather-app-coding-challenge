export const getCityName = async (latitude: number, longitude: number) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK") {
      const addressComponents = data.results[0].address_components;
      const cityObject = addressComponents.find(
        (component: { types: string | string[] }) =>
          component.types.includes("locality")
      );
      return cityObject.long_name;
    }
  } catch (err) {
    console.error(err);
  }
};

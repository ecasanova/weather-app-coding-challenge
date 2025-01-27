import React, { useState } from "react";
import { cities } from "../../common/utils";
import { Location } from "../../common/types";

interface CitySelectorProps {
  setCity: (city: string) => void;
  setLocation: (location: Location) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  setCity,
  setLocation,
}) => {
  const [inputValue, setInputValue] = useState("");

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleCitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = cities.find((city) => city.name === e.target.value);
    if (selectedCity) {
      setInputValue(selectedCity.name);
      setCity(selectedCity.name);
      setLocation(selectedCity.location);
    }
  };

  return (
    <div>
      <select onChange={handleCitySelect} value={inputValue}>
        <option value="" disabled>
          Select a city
        </option>
        {filteredCities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;

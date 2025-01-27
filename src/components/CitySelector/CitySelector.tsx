import React, { useState } from "react";
import { cities } from "../../common/utils";
import { Location } from "../../common/types";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import styled from "@emotion/styled";

interface CitySelectorProps {
  setCity: (city: string) => void;
  setLocation: (location: Location) => void;
}

const StyledFormControl = styled(FormControl)`
  min-width: 200px;
`;

const CitySelector: React.FC<CitySelectorProps> = ({
  setCity,
  setLocation,
}) => {
  const [inputValue, setInputValue] = useState("");

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleCitySelect = (e: SelectChangeEvent<string>): void => {
    const selectedCity = cities.find((city) => city.name === e.target.value);
    if (selectedCity) {
      setInputValue(selectedCity.name);
      setCity(selectedCity.name);
      setLocation(selectedCity.location);
    }
  };

  return (
    <StyledFormControl variant="outlined">
      <InputLabel id="city-selector-label">Select a city</InputLabel>
      <Select
        labelId="city-selector-label"
        value={inputValue}
        onChange={handleCitySelect}
        label="Select a city"
      >
        <MenuItem value="" disabled>
          Select a city
        </MenuItem>
        {filteredCities.map((city) => (
          <MenuItem key={city.name} value={city.name}>
            {city.name}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default CitySelector;

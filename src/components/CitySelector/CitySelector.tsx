import React from "react";
import { cities } from "../../common/utils";
import { Location } from "../../common/types";
import { FormControl, Box, TextField, Autocomplete } from "@mui/material";
import styled from "@emotion/styled";

const StyledFormControl = styled(FormControl)`
  min-width: 200px;
  width: 100%;
`;

interface CitySelectorProps {
  setCity: (city: string) => void;
  setLocation: (location: Location) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  setCity,
  setLocation,
}) => {
  const citiesOptions = cities.map((city) => {
    return { label: city.name };
  });

  const handleCitySelect = (value: string): void => {
    const selectedCity = cities.find((city) => city.name === value);
    if (selectedCity) {
      setCity(selectedCity.name);
      setLocation(selectedCity.location);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <StyledFormControl variant="outlined">
        <Autocomplete
          disablePortal
          options={citiesOptions}
          onChange={(_e, value) => {
            if (value) {
              handleCitySelect(value.label);
            }
          }}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField label="Select a city" {...params} />
          )}
        />
      </StyledFormControl>
    </Box>
  );
};

export default CitySelector;

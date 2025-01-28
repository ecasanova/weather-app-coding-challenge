import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  FormControl,
  Box,
  TextField,
  Autocomplete,
  Grid,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import styled from "@emotion/styled";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import { Location, PlaceType } from "../../common/types";
import { autocompleteService, loadScript } from "../../common/utils";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
  const [value, setValue] = useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly PlaceType[]>([]);
  const loaded = useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetchPlaces = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          autocompleteService.current!.getPlacePredictions(request, callback);
        },
        400
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (
      !autocompleteService.current &&
      (window as typeof window & { google: typeof google }).google
    ) {
      autocompleteService.current = new (
        window as typeof window & { google: typeof google }
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetchPlaces({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handleCitySelect = (value: PlaceType | null): void => {
    if (value) {
      setCity(value.description);
      if (value.place_id) {
        fetchPlaceDetails(value.place_id); // Llamar a la API para obtener la ubicación
      }
    }
  };
  const fetchPlaceDetails = async (placeId: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      if (
        data.result &&
        data.result.geometry &&
        data.result.geometry.location
      ) {
        const { lat, lng } = data.result.geometry.location;
        setLocation({ latitude: lat, longitude: lng });
      } else {
        console.error("No se encontró la ubicación");
      }
    } catch (error) {
      console.error("Error al obtener detalles del lugar:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <StyledFormControl variant="outlined">
        <Autocomplete
          sx={{ width: 300 }}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.description
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          value={value}
          noOptionsText="No locations"
          onChange={(_event, newValue: PlaceType | null) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
            handleCitySelect(newValue);
          }}
          onInputChange={(_event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select a city" fullWidth />
          )}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            const matches =
              option.structured_formatting.main_text_matched_substrings || [];

            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match) => [
                match.offset,
                match.offset + match.length,
              ])
            );
            return (
              <li key={key} {...optionProps}>
                <Grid container sx={{ alignItems: "center" }}>
                  <Grid item sx={{ display: "flex", width: 44 }}>
                    <LocationOnIcon sx={{ color: "text.secondary" }} />
                  </Grid>
                  <Grid
                    item
                    sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                  >
                    {parts.map(
                      (
                        part: { text: string; highlight: boolean },
                        index: number
                      ) => (
                        <Box
                          key={index}
                          component="span"
                          sx={{
                            fontWeight: part.highlight ? "bold" : "regular",
                          }}
                        >
                          {part.text}
                        </Box>
                      )
                    )}
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              </li>
            );
          }}
        />
      </StyledFormControl>
    </Box>
  );
};

export default CitySelector;

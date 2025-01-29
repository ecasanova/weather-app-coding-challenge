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
import { AutocompletePrediction, PlacesServiceStatus } from "@types/googlemaps";
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
          callback: (
            results: AutocompletePrediction[] | null,
            status: PlacesServiceStatus
          ) => void
        ) => {
          return autocompleteService.current!.getPlacePredictions(
            request,
            callback
          );
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

    fetchPlaces(
      { input: inputValue },
      (
        results: AutocompletePrediction[] | null,
        status: PlacesServiceStatus
      ) => {
        if (active) {
          let newOptions: readonly PlaceType[] = [];

          if (value) {
            newOptions = [value];
          }

          if (
            results &&
            status === window.google.maps.places.PlacesServiceStatus.OK
          ) {
            newOptions = [
              ...newOptions,
              ...results.map((result) => ({
                description: result.description,
                place_id: result.place_id,
              })),
            ];
          }

          setOptions(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, fetchPlaces]);

  const handleCitySelect = (value: PlaceType | null): void => {
    if (value) {
      setCity(value.description);
      if (value.place_id) {
        fetchPlaceDetails(value.place_id); // Llamar a la API para obtener la ubicación
      }
    }
  };
  const fetchPlaceDetails = async (placeId: string) => {
    if (!window.google) {
      console.error("Google Maps JavaScript API no está cargada.");
      return;
    }

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      placeId: placeId,
      fields: ["geometry"],
    };

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        if (place && place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setLocation({ latitude: lat, longitude: lng });
        } else {
          console.error("No se encontró la ubicación");
        }
      } else {
        console.error("Error al obtener detalles del lugar:", status);
      }
    });
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

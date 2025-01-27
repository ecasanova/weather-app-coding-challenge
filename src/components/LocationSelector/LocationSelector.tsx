import React, { useCallback, useState } from "react";
import { getLocation } from "../../common/utils";
import { Box, Card, CardContent, Chip, Divider, Button } from "@mui/material";
import styled from "@emotion/styled";
import { LocationOn } from "@mui/icons-material";
import CitySelector from "../CitySelector/CitySelector";

interface LocationSelectorProps {
  setLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number | null;
      longitude: number | null;
    } | null>
  >;
  setLoading: (loading: boolean) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  handleLocation: (location: {
    latitude: number | null;
    longitude: number | null;
  }) => void;
}

const StyledButton = styled(Button)`
  margin: 1rem 0;
  width: 100%;
`;

const LocationIcon = styled(LocationOn)`
  margin-left: 0.5rem;
`;

const LocationSelector: React.FC<LocationSelectorProps> = ({
  setLoading,
  setLocation,
  setError,
  handleLocation,
}) => {
  const handleGetLocation = useCallback(() => {
    setLoading(true);
    getLocation(setLocation, setError);
  }, [setError, setLoading, setLocation]);

  const [, setCity] = useState<string | null>(null);

  return (
    <Box sx={{ p: 2 }}>
      <Card>
        <CardContent>
          <CitySelector setCity={setCity} setLocation={handleLocation} />
          <Divider>
            <Chip label="OR" size="small" />
          </Divider>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleGetLocation}
          >
            Get Weather on your location <LocationIcon />
          </StyledButton>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LocationSelector;

import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import {Divider, Tab, Tabs} from "@mui/material";
import {COUNTRIES, COUNTRY_CITIES} from "../constants";
import {UserInputProvider, useUserInput} from "./ContextProvider";
import RangeSpecifiedSuggestion from "./RangeSpecifiedSuggestion";
import DisplayWeatherData from "./WeatherDataApi";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    mt: 4,
  },
  inputBox: {
    width: "70%",
    minHeight: 500,
    p: 2,
    border: "1px solid black",
    borderRadius: 2,
  },
  city: {
    width: "100%",
    mt: 2
  },
  tabs: {
    mt: 2,
    ml: 6,
  },
}

function UserInputs() {
  const [country, setCountry] = React.useState("");
  const [cities, setCities] = React.useState<string[]>([]);
  const {city, setCity, yesOrNoValue, setYesOrNoValue} = useUserInput();

  const handleCountryChange = (event: SelectChangeEvent) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
    setCity("");
    const selectedCities = COUNTRY_CITIES[selectedCountry] || [];
    setCities(selectedCities);
  };

  const handleCityChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setYesOrNoValue(!newValue);
  };

  return <Box sx={styles.root}>
    <Box sx={styles.inputBox}>
      <Typography variant="body1" marginBottom={1}>
        Where do you plan to wash your car?
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="country">Choose a Country</InputLabel>
        <Select
          labelId="country"
          value={country}
          label="Choose a Country"
          onChange={handleCountryChange}
        >
          {COUNTRIES.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={styles.city}>
        <InputLabel id="city">Choose a City</InputLabel>
        <Select
          labelId="city"
          value={city}
          label="Choose a City"
          onChange={handleCityChange}
          disabled={country === ""}
        >
          {cities.map((cityName) => (
            <MenuItem key={cityName} value={cityName}>
              {cityName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider sx={{marginTop: 2}}/>
      <Typography variant="body1" marginTop={2} marginBottom={0.5}>
        Do you have a specific day in mind for your car wash?
      </Typography>
      <Tabs value={yesOrNoValue ? 0 : 1} onChange={handleTabChange} aria-label="yes/no tabs" sx={styles.tabs}>
        <Tab label="Yes" disableRipple/>
        <Tab label="No" disableRipple/>
      </Tabs>
      {yesOrNoValue &&
          <UserInputProvider>
              <RangeSpecifiedSuggestion
                  city={city}
                  yesOrNoValue={yesOrNoValue}
              />
          </UserInputProvider>
      }
      {!yesOrNoValue && <UserInputProvider>
          <DisplayWeatherData city={city} yesOrNoValue={yesOrNoValue} />
      </UserInputProvider>}
    </Box>
  </Box>
}

export default UserInputs;
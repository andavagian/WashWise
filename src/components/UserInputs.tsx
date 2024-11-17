import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import {Checkbox, Divider, Tab, Tabs} from "@mui/material";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {COUNTRIES, COUNTRY_CITIES} from "../constants";
import {useUserInput} from "./ContextProvider";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    mt: 4,
  },
  inputBox: {
    width: "70%",
    height: 500,
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
  datePickerContainer: {
    display: "flex",
    alignItems: "center",
    gap: 3
  },
  rangeOfDays: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    marginY: 1,
  }
}

interface UserInputsProps {
  response: JSX.Element;
}

function UserInputs({response}: UserInputsProps) {
  const [country, setCountry] = React.useState("");
  const [cities, setCities] = React.useState<string[]>([]);
  const {city, setCity, startDate, setStartDate, endDate, setEndDate, yesOrNoValue, setYesOrNoValue} = useUserInput();
  const [isRangeSelected, setIsRangeSelected] = React.useState(false);

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
    setYesOrNoValue(newValue);
  };

  const handleCheckboxChange = () => {
    setIsRangeSelected((prev) => {
      const newValue = !prev;
      if (!newValue) {
        setEndDate(null);
      }
      return newValue;
    });
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
      <Tabs value={yesOrNoValue} onChange={handleTabChange} aria-label="yes/no tabs" sx={styles.tabs}>
        <Tab label="Yes" disableRipple/>
        <Tab label="No" disableRipple/>
      </Tabs>
      {yesOrNoValue === 0 && (
        <Box>
          <Box sx={styles.rangeOfDays}>
            <Checkbox disableRipple checked={isRangeSelected} onChange={handleCheckboxChange}/>
            <Typography variant="body2" fontWeight="bold">Select a range of days</Typography>
          </Box>
          <Box sx={styles.datePickerContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={`Choose a ${isRangeSelected ? 'Start Date' : 'Date'}`}
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
            </LocalizationProvider>
            {isRangeSelected && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Choose an End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  minDate={startDate ? startDate : undefined}
                />
              </LocalizationProvider>
            )}
          </Box>
        </Box>
      )}
      {yesOrNoValue === 0 && <Box marginTop={2}>
        {response}
      </Box>}
      {yesOrNoValue === 1 && <Typography variant="body2" marginTop={10}>
          Coming soon.
      </Typography>}
    </Box>
  </Box>
}

export default UserInputs;
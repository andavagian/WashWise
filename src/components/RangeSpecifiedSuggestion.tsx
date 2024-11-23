import React, { useState } from 'react';
import Box from "@mui/material/Box";
import {Checkbox} from "@mui/material";
import Typography from "@mui/material/Typography";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useUserInput} from "./ContextProvider";
import DisplayWeatherData from "./WeatherDataApi";

const styles = {
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

interface RangeSpecifiedSuggestionProps {
  city: string,
  yesOrNoValue: boolean
}

function RangeSpecifiedSuggestion({ city, yesOrNoValue } : RangeSpecifiedSuggestionProps) {
  const [isRangeSelected, setIsRangeSelected] = useState<boolean>(false);
  const {startDate, setStartDate, endDate, setEndDate } = useUserInput();

  const handleCheckboxChange = () => {
    setIsRangeSelected((prev) => {
      const newValue = !prev;
      if (!newValue) {
        setEndDate(null);
      }
      return newValue;
    });
  };

  return <>
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
    <Box marginTop={2}>
      <DisplayWeatherData
        city={city}
        startDate={startDate}
        endDate={endDate}
        yesOrNoValue={yesOrNoValue}
      />
    </Box>
  </>
}

export default RangeSpecifiedSuggestion;
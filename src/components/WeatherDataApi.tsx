import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useUserInput } from './ContextProvider';
import dayjs from 'dayjs';
import { CITY_COORDINATES } from '../constants';
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

function DisplayWeatherData() {
  const { city, startDate, endDate, yesOrNoValue } = useUserInput();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [bestDayToWash, setBestDayToWash] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchWeatherData() {
      const { latitude, longitude } = CITY_COORDINATES[city] || {};

      if (!latitude || !longitude || !startDate) {
        console.error('Invalid city or start date.');
        return;
      }

      const end = endDate || startDate;

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${dayjs(startDate).format(
        'YYYY-MM-DD'
      )}&end_date=${dayjs(end).format('YYYY-MM-DD')}&daily=temperature_2m_max,precipitation_sum,windspeed_10m_max&timezone=auto`;

      setLoading(true);

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather API request failed.');
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (city && startDate) {
      fetchWeatherData();
    }
  }, [city, startDate, endDate]);

  useEffect(() => {
    if (weatherData) {
      const bestDay = bestDayToWashCar(weatherData, startDate!, endDate!);
      setBestDayToWash(bestDay);
    }
  }, [weatherData, startDate, endDate]);

  function bestDayToWashCar(weatherData: any, startDate: string | dayjs.Dayjs, endDate: string | dayjs.Dayjs) {
    const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
    const formattedEndDate = endDate ? dayjs(endDate).format('YYYY-MM-DD') : formattedStartDate;

    if (!weatherData || !weatherData.daily) {
      return 'No data available.';
    }

    const { time, temperature_2m_max, precipitation_sum, windspeed_10m_max } = weatherData.daily;

    const dateRange = formattedEndDate === formattedStartDate ? [formattedStartDate] : time;

    let bestDay = null;
    let bestTemp = -100;

    for (let i = 0; i < dateRange.length; i++) {
      const date = dateRange[i];
      const tempMax = temperature_2m_max[i];
      const rain = precipitation_sum[i];
      const windSpeed = windspeed_10m_max[i];

      if (rain === 0 && tempMax >= 0 && tempMax <= 50 && windSpeed < 20) {
        if (tempMax > bestTemp) {
          bestTemp = tempMax;
          bestDay = { date, tempMax };
        }
      }
    }

    if (bestDay) {
      if (formattedStartDate === formattedEndDate) {
        return `${bestDay.date} is a great day to wash the car! The temperature is ${bestDay.tempMax}°C with no rain and low wind.`;
      }
      return `The best day to wash the car is ${bestDay.date} with a max temperature of ${bestDay.tempMax}°C, no rain, and low wind.`;
    }

    if (formattedStartDate === formattedEndDate) {
      return `No ideal conditions for washing the car on ${formattedStartDate}.`;
    }

    return 'No ideal days for washing the car within the selected date range.';
  }

  return (
    <Box>
      {loading ? (
        <CircularProgress size="16px"/>
      ) : weatherData ? (
        <Typography variant="body1">{bestDayToWash}</Typography>
      ) : null}
    </Box>
  );
}

export default DisplayWeatherData;

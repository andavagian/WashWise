import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from 'dayjs';
import {CITY_COORDINATES} from '../constants';

interface WeatherDataProps {
  city: string;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  yesOrNoValue?: boolean;
}

function DisplayWeatherData({city, startDate, endDate, yesOrNoValue}: WeatherDataProps) {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [bestDayToWash, setBestDayToWash] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchWeatherData() {
      const {latitude, longitude} = CITY_COORDINATES[city] || {};
      const defaultStartDate = dayjs().startOf('day');
      const defaultEndDate = defaultStartDate.add(7, 'day');

      const resolvedStartDate = yesOrNoValue ? startDate : defaultStartDate;
      const resolvedEndDate = yesOrNoValue ? endDate || resolvedStartDate : defaultEndDate;

      if (!latitude || !longitude || !resolvedStartDate) {
        return;
      }

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${dayjs(resolvedStartDate).format(
        'YYYY-MM-DD'
      )}&end_date=${dayjs(resolvedEndDate).format(
        'YYYY-MM-DD'
      )}&daily=temperature_2m_max,precipitation_sum,windspeed_10m_max&timezone=auto`;

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

    if (city) {
      fetchWeatherData();
    }
  }, [city, startDate, endDate, yesOrNoValue]);

  useEffect(() => {
    if (weatherData) {
      const resolvedStartDate = yesOrNoValue ? startDate! : dayjs().startOf('day');
      const resolvedEndDate = yesOrNoValue ? endDate! : resolvedStartDate.add(7, 'day');
      const bestDay = bestDayToWashCar(weatherData, resolvedStartDate, resolvedEndDate);
      setBestDayToWash(bestDay);
    }
  }, [weatherData, startDate, endDate, yesOrNoValue]);

  function bestDayToWashCar(weatherData: any, startDate: string | dayjs.Dayjs, endDate: string | dayjs.Dayjs) {
    const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
    const formattedEndDate = endDate ? dayjs(endDate).format('YYYY-MM-DD') : formattedStartDate;

    if (!weatherData || !weatherData.daily) {
      return 'No data available.';
    }

    const { time = [], temperature_2m_max = [], precipitation_sum = [], windspeed_10m_max = [] } = weatherData.daily;

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
          bestDay = {date, tempMax};
        }
      }
    }

    if (bestDay) {
      if (yesOrNoValue) {
        if (formattedStartDate === formattedEndDate) {
          return `${bestDay.date} is a great day to wash the car! The temperature is ${bestDay.tempMax}°C with no rain and low wind.`;
        }
        return `The best day to wash the car is ${bestDay.date} with a max temperature of ${bestDay.tempMax}°C, no rain, and low wind.`;
      }
      else {
        return `In the upcoming week, the best day to wash your car is ${bestDay.date} with a max temperature of ${bestDay.tempMax}°C, no rain, and low wind.`;
      }
    }

    if (yesOrNoValue) {
      if (formattedStartDate === formattedEndDate) {
        return `No ideal conditions for washing the car on ${formattedStartDate}.`;
      }
      return 'No ideal days for washing the car within the selected date range.';
    } else {
      return 'No ideal days for washing the car in the upcoming week.';
    }
  }

  return (
    <Box>
      {loading ? (
        <CircularProgress size="16px"/>
      ) : weatherData ? (
        <Typography variant="body1" mt={2}>{bestDayToWash}</Typography>
      ) : !city && !yesOrNoValue && <Typography variant="body2" mt={2}>Please choose a city.</Typography>}
    </Box>
  );
}

export default DisplayWeatherData;

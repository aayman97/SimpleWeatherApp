import {OPENWEATHER_API_KEY} from '@env';
import axios from 'axios';
import endPoints from './endPoints';

export const baseURLs = {
  API_URL: 'http://api.openweathermap.org/data/2.5',
  WEB_URL: 'http://openweathermap.org/img/w',
};

export const getWeatherForCountry = async (country: string) => {
  const response = await axios.get(
    `${
      baseURLs.API_URL + endPoints.weather
    }?q=${country}&appid=${OPENWEATHER_API_KEY}`,
  );

  return response.data;
};

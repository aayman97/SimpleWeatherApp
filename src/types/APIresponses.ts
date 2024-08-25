type Coord = {
  lon: number;
  lat: number;
};

type WeatherItem = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Weather = WeatherItem[];

type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type Wind = {
  speed: number;
  deg: number;
};

type Clouds = {
  all: number;
};

type Sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

type InValidResponse = {
  cod: number;
  message: string;
};

type ValidResponse = {
  cod: number;
  coord: Coord;
  weather: Weather;
  base: string;
  main: Main;
  visibility: number;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  wind: Wind;
  timeStamp: Date;
};

type cityWeatherData = Omit<
  ValidResponse,
  'cod' | 'coord' | 'visibility' | 'base'
>;

type city = {
  id: number;
  name: string;
  country: string;
  data: cityWeatherData[];
};

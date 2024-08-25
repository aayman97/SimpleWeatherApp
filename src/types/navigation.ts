import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  CitySelectorScreen: undefined;
  HistoricalDataScreen: {city: city};
  DetailsScreen: {city: cityWeatherData};
};

export type CitySelectorScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CitySelectorScreen'
>;
export type HistoricalDataScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HistoricalDataScreen'
>;
export type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DetailsScreen'
>;

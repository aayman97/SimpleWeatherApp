import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CitySelectorScreen from '../Screens/CitySelectorScreen';
import HistoricalDataScreen from '../Screens/HistoricalDataScreen';
import DetailsScreen from '../Screens/DetailsScreen';
import {RootStackParamList} from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CitySelectorScreen" component={CitySelectorScreen} />
      <Stack.Screen
        name="HistoricalDataScreen"
        component={HistoricalDataScreen}
      />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

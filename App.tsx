/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/Navigations/AppNavigator';
import {useNetInfo} from '@react-native-community/netinfo';
import {Alert} from 'react-native';

function App(): React.JSX.Element {
  const netInfo = useNetInfo();

  //   check internet connections
  useEffect(() => {
    if (netInfo.isConnected == false && netInfo.isInternetReachable == false) {
      Alert.alert(
        'Internet Connection',
        `Please check your internet connection.`,
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    }
  }, [netInfo]);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;

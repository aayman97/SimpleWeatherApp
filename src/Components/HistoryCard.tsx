import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import BaseText from './BaseText';
import {baseURLs} from '../network/API-Functions';
import {moderateScale} from '../Helpers/moderateScale';
import R from '../Resources/R';
import {kelvinToCelsius} from '../Helpers/kelvinToCelsius';
import {adjustDateWithTimezoneOffset} from '../Helpers/adjustDateWithTimezoneOffset';
import {adjustTheTimeWithTimezoneOffset} from '../Helpers/adjustTheTimeWithTimezoneOffset';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

type props = {
  cityDetails: cityWeatherData;
};

type navigationProps = Omit<
  NativeStackScreenProps<RootStackParamList, 'HistoricalDataScreen'>,
  'route'
>;

const HistoryCard = ({cityDetails, navigation}: props & navigationProps) => {
  const {weather, main, timeStamp, timezone, dt} = cityDetails;
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('DetailsScreen', {
          city: cityDetails,
        });
      }}>
      {/* Image of the weather */}
      <FastImage
        source={{uri: `${baseURLs.WEB_URL}/${weather[0].icon}.png`}}
        style={styles.iconImageStyle}
        resizeMode="center"
      />

      {/* details */}
      <View style={styles.detailsContainer}>
        <BaseText
          fontSize={moderateScale(12)}
          color={R.Colors.gray}
          fontWeight="100"
          letterSpacing={1}>
          {`${adjustDateWithTimezoneOffset(timeStamp).dateOnCalender} - ${
            adjustTheTimeWithTimezoneOffset(timeStamp).hourAndMinute
          }`}
        </BaseText>

        <BaseText fontSize={moderateScale(17)} fontWeight="800">
          {`${weather[0].main}, ${kelvinToCelsius(main.temp).toFixed(2)}°C`}
        </BaseText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImageStyle: {
    width: 72,
    height: 72,
  },
  detailsContainer: {
    gap: 5,
  },
});

export default HistoryCard;

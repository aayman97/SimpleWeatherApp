import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import BaseContainer from '../Components/BaseContainer';
import BaseText from '../Components/BaseText';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import {baseURLs} from '../network/API-Functions';
import {kelvinToCelsius} from '../Helpers/kelvinToCelsius';
import {moderateScale} from '../Helpers/moderateScale';
import R from '../Resources/R';
import {adjustDateWithTimezoneOffset} from '../Helpers/adjustDateWithTimezoneOffset';
import {adjustTheTimeWithTimezoneOffset} from '../Helpers/adjustTheTimeWithTimezoneOffset';

type props = NativeStackScreenProps<RootStackParamList, 'DetailsScreen'>;

const {width, height} = Dimensions.get('screen');
const DetailsScreen = ({route, navigation}: props) => {
  const {name, sys, weather, main, wind, timeStamp} = route.params.city;

  const animatedSharedValue = useSharedValue(-height);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: animatedSharedValue.value,
        },
      ],
    };
  }, []);

  useEffect(() => {
    animatedSharedValue.value = withSpring(0, {
      duration: 3000,
    });
  }, []);

  return (
    <BaseContainer>
      <Animated.View style={[styles.detailsContainer, animatedStyle]}>
        {/* name */}
        <BaseText
          fontSize={moderateScale(25)}>{`${name}, ${sys.country}`}</BaseText>

        {/* image */}

        <FastImage
          source={{uri: `${baseURLs.WEB_URL}/${weather[0].icon}.png`}}
          style={styles.iconImageStyle}
          resizeMode="contain"
        />

        {/* details */}
        <View>
          <View style={styles.detailsRow}>
            <BaseText fontWeight="900" fontSize={moderateScale(16)}>
              Description
            </BaseText>

            <BaseText fontSize={moderateScale(20)} color={R.Colors.mainBlue}>
              {weather[0].main}
            </BaseText>
          </View>

          <View style={styles.detailsRow}>
            <BaseText fontWeight="900" fontSize={moderateScale(16)}>
              Temperature
            </BaseText>

            <BaseText
              fontSize={moderateScale(20)}
              color={R.Colors.mainBlue}>{`${kelvinToCelsius(main.temp).toFixed(
              2,
            )}°C`}</BaseText>
          </View>

          <View style={styles.detailsRow}>
            <BaseText fontWeight="900" fontSize={moderateScale(16)}>
              Humidity
            </BaseText>

            <BaseText fontSize={moderateScale(20)} color={R.Colors.mainBlue}>
              {main.humidity + '%'}
            </BaseText>
          </View>

          <View style={styles.detailsRow}>
            <BaseText fontWeight="900" fontSize={moderateScale(16)}>
              Wind Speed
            </BaseText>

            <BaseText fontSize={moderateScale(20)} color={R.Colors.mainBlue}>
              {wind.speed + ' Km/h'}
            </BaseText>
          </View>
        </View>
      </Animated.View>

      {/* info and time sentence */}

      <View style={styles.sentenceStyle}>
        <BaseText
          color="#3D4548"
          style={{
            textAlign: 'center',
          }}
          fontSize={moderateScale(
            14,
          )}>{`Weather information for ${name} recieved on`}</BaseText>
        <BaseText color="#3D4548" fontSize={moderateScale(14)}>
          {`${adjustDateWithTimezoneOffset(timeStamp).dateOnCalender} - ${
            adjustTheTimeWithTimezoneOffset(timeStamp).hourAndMinute
          }`}
        </BaseText>
      </View>
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    width: width * 0.85,
    height: height * 0.55,
    backgroundColor: 'white',
    position: 'absolute',
    top: -height * 0.04,
    left: (width * 0.15) / 2,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconImageStyle: {
    width: 150,
    height: 150,
  },
  detailsRow: {
    flexDirection: 'row',
    width: '90%',
    height: 30,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sentenceStyle: {
    position: 'absolute',
    top: height * 0.7,
    paddingHorizontal: 15,
    alignSelf: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
export default DetailsScreen;

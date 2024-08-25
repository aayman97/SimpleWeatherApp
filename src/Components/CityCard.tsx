import React, {Dispatch, SetStateAction, useCallback} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import BaseText from './BaseText';
import R from '../Resources/R';
import {moderateScale} from '../Helpers/moderateScale';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../types/navigation';
import {getWeatherForCountry} from '../network/API-Functions';
import {MMKV} from 'react-native-mmkv';

const {width, height} = Dimensions.get('screen');

type navigationProps = Omit<
  NativeStackScreenProps<RootStackParamList, 'CitySelectorScreen'>,
  'route'
>;

type Props = {
  data: city;
  storage?: MMKV;
  cities: city[];
  setCities: Dispatch<SetStateAction<city[]>>;
  onRemove: (id: number) => void;
};

const CityCard = ({
  data,
  onRemove,
  navigation,
  storage,
  cities,
  setCities,
}: Props & navigationProps) => {
  const onSubmit = () => {
    getWeatherForCountry(data.name).then(
      (res: cityWeatherData) => {
        let noMatchedElement = true;
        let citiesTemp = [...cities];
        for (let i = 0; i < citiesTemp.length; i++) {
          if (res.id === citiesTemp[i].id) {
            res.timeStamp = new Date();
            citiesTemp[i].data = [...citiesTemp[i].data, res].sort(
              (a, b) =>
                new Date(b.timeStamp).getTime() -
                new Date(a.timeStamp).getTime(),
            );
            noMatchedElement = false;
            break;
          }
        }
        if (noMatchedElement) {
          let dataTemp = [];
          res.timeStamp = new Date();
          dataTemp.push(res);
          citiesTemp.push({
            id: res.id,
            country: res.sys.country,
            name: res.name,
            data: dataTemp,
          });
        }

        setCities(citiesTemp);
        storage?.set('cities', JSON.stringify(citiesTemp));
        navigateToHistoricalDataScreen();
      },
      err => {},
    );
  };
  const navigateToHistoricalDataScreen = () => {
    navigation.navigate('HistoricalDataScreen', {
      city: data,
    });
  };

  return (
    <View testID={`testID_${data.name}`} style={[styles.cardWrapper]}>
      {/* Card details */}
      <View style={[styles.cardContainer]}>
        <TouchableOpacity
          style={styles.touchableOpacityContainer}
          onPress={() => {
            navigation.navigate('DetailsScreen', {
              city: data.data[0],
            });
          }}>
          {/* Icon and city with country */}
          <View style={styles.iconAndCityContainer}>
            <Image source={R.Images.cityIcon} style={styles.cityIconStyle} />
            <BaseText
              fontSize={moderateScale(17)}
              fontWeight="700"
              style={{width: '65%'}}
              letterSpacing={1}>
              {`${data.name},${data.country}`}
            </BaseText>
          </View>

          {/* info and delete buttons */}
          <View style={styles.deleteAndInfoButtonsContainer}>
            <TouchableOpacity
              onPress={() => {
                onRemove(data.id);
              }}>
              <Image source={R.Images.deleteIcon} style={styles.imageIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onSubmit}>
              <Image source={R.Images.infoIcon} style={styles.imageIcon} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    height: 70,
  },
  removeButtonContainer: {
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'red',
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#f1f0f4',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderColor: 'rgba(0,0,0,0.1)',
  },
  cityIconStyle: {
    width: 30,
    height: 30,
  },
  iconAndCityContainer: {flexDirection: 'row', gap: 20, alignItems: 'center'},
  touchableOpacityContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteAndInfoButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  imageIcon: {
    width: 30,
    height: '100%',
    resizeMode: 'contain',
  },
});
export default React.memo(CityCard);

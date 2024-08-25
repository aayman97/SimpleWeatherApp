import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import BaseContainer from '../Components/BaseContainer';
import BaseText from '../Components/BaseText';
import CityCard from '../Components/CityCard';
import R from '../Resources/R';
import BaseModal from '../Components/BaseModal';
import BaseInput from '../Components/BaseInput';
import {getWeatherForCountry} from '../network/API-Functions';
import {MMKV} from 'react-native-mmkv';
import DeviceInfo from 'react-native-device-info';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../types/navigation';
import {useNetInfo} from '@react-native-community/netinfo';

const {width, height} = Dimensions.get('screen');

type AddCityButtonProp = {
  onPress: () => void;
};

const AddCityButton = ({onPress}: AddCityButtonProp) => {
  return (
    <TouchableOpacity
      style={styles.addCityButtonContainer}
      onPress={onPress}
      testID="Add_City_Button">
      <BaseText color={R.Colors.white}>+</BaseText>

      <BaseText color={R.Colors.white}>Add City</BaseText>
    </TouchableOpacity>
  );
};

type props = NativeStackScreenProps<RootStackParamList, 'CitySelectorScreen'>;

const CitySelectorScreen = ({navigation}: props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [cities, setCities] = useState<city[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [storage, setStorage] = useState<MMKV>();

  const netInfo = useNetInfo();

  const onSubmit = useCallback(() => {
    if (searchTerm) {
      setLoading(true);
      getWeatherForCountry(searchTerm).then(
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
          setErrorMessage('');
          setLoading(false);
          setModalVisible(false);
          setSearchTerm('');
        },
        err => {
          setLoading(false);
          if (
            netInfo.isConnected == false &&
            netInfo.isInternetReachable == false
          ) {
            setErrorMessage('Check your internet connection please');
          } else {
            setErrorMessage('Please Enter a valid country');
          }
        },
      );
    }
  }, [searchTerm, cities]);

  const onRemove = useCallback(
    (id: number) => {
      let temp = [...cities];
      temp = temp.filter(item => item.id !== id);
      setCities(temp);
      storage?.set('cities', JSON.stringify(temp));
    },
    [cities],
  );

  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      setStorage(
        new MMKV({
          id: `user-${uniqueId}-storage`,
        }),
      );
    });
  }, []);

  useEffect(() => {
    if (storage) {
      const jsonCities = storage?.getString('cities');
      let citiesObject;
      if (jsonCities) {
        citiesObject = JSON.parse(jsonCities);
        setCities(citiesObject);
      }

      setLoading(false);
    }
  }, [storage]);

  return (
    <BaseContainer headerTitle="Cities" showBackButton={false}>
      <View style={{width, height}}>
        <AddCityButton
          onPress={() => {
            setModalVisible(true);
          }}
        />
        {loading ? (
          <ActivityIndicator
            color={R.Colors.mainBlue}
            size={'large'}
            style={{marginTop: 20}}
          />
        ) : (
          <ScrollView contentContainerStyle={{paddingBottom: height * 0.35}}>
            {cities.map((item, index) => (
              <CityCard
                data={item}
                key={item.id}
                onRemove={onRemove}
                navigation={navigation}
                storage={storage}
                cities={cities}
                setCities={setCities}
              />
            ))}
          </ScrollView>
        )}
      </View>
      <BaseModal
        testID="base_modal_add_city"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}>
        {/* Modal content */}
        <View style={styles.modalContentContainer}>
          <BaseInput
            testID={'search_input'}
            value={searchTerm}
            onChangeText={e => {
              setSearchTerm(e);
            }}
            onSubmit={onSubmit}
          />

          {errorMessage && (
            <BaseText testID={'testID_error_message'} color={'red'}>
              {errorMessage}
            </BaseText>
          )}
        </View>
      </BaseModal>
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  addCityButtonContainer: {
    flexDirection: 'row',
    backgroundColor: R.Colors.mainBlue,
    width: width * 0.35,
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 50,
    position: 'absolute',
    bottom: height * 0.25,
    right: 15,
    zIndex: 99,
  },
  modalContentContainer: {
    width: '100%',
    height: '40%',
    backgroundColor: R.Colors.white,
  },
});
export default CitySelectorScreen;

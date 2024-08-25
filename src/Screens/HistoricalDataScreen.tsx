import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import BaseContainer from '../Components/BaseContainer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import HistoryCard from '../Components/HistoryCard';

const {width, height} = Dimensions.get('screen');
type props = NativeStackScreenProps<RootStackParamList, 'HistoricalDataScreen'>;

const HistoricalDataScreen = ({navigation, route}: props) => {
  const {name, data} = route.params.city;
  return (
    <BaseContainer headerTitle={`${name} historical`}>
      <ScrollView contentContainerStyle={{paddingBottom: height * 0.3}}>
        {data.map((item, index) => {
          return (
            <HistoryCard
              cityDetails={item}
              key={item.id + '-' + index}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </BaseContainer>
  );
};

const styles = StyleSheet.create({});
export default HistoricalDataScreen;

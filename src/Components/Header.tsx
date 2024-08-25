import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import BaseText from './BaseText';
import R from '../Resources/R';
import {moderateScale} from '../Helpers/moderateScale';
import {useNavigation} from '@react-navigation/native';

type props = {
  showBackButton?: boolean;
  headerTitle?: string;
  style?: TextStyle;
};
const Header = ({showBackButton = true, headerTitle, style}: props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        backgroundColor: R.Colors.mainBlue,
      }}>
      <View style={styles.headerContainer}>
        {showBackButton ? (
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={R.Images.bacKArrow} style={styles.arrowImage} />
          </TouchableOpacity>
        ) : (
          <View style={{height: 50}} />
        )}

        <BaseText
          color={R.Colors.white}
          fontWeight={'400'}
          style={style}
          fontSize={moderateScale(25)}>
          {headerTitle}
        </BaseText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    minHeight: 100,
    backgroundColor: R.Colors.mainBlue,
    paddingHorizontal: 30,
  },
  arrowContainer: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    // backgroundColor: 'red',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  arrowImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
});
export default Header;

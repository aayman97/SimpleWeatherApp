import React from 'react';
import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import R from '../Resources/R';

const {width, height} = Dimensions.get('screen');

type props = {
  value?: string;
  style?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  testID: string;
};
const BaseInput = ({style, onChangeText, value, onSubmit, testID}: props) => {
  return (
    <View style={styles.inputContainer}>
      <Image source={R.Images.searchIcon} style={styles.imageStyle} />
      <TextInput
        testID={testID}
        value={value}
        placeholder="Search for cities"
        style={[styles.textInputStyle, style]}
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 60,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  textInputStyle: {
    width: width - 65,
    height: '100%',
  },
});

export default BaseInput;

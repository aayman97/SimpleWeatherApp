import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import R from '../Resources/R';

type FontProps = {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  letterSpacing?: number;
  children: React.ReactNode;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
  testID?: string;
};
const BaseText = ({
  children,
  fontWeight = '400',
  color = R.Colors.black,
  fontSize = 20,
  letterSpacing,
  style,
  numberOfLines,
  testID,
}: FontProps) => {
  const mapWeightToFontFamily = () => {
    const weight = parseInt(fontWeight);
    if (weight >= 100 && weight <= 300) {
      return 'Roboto-Light';
    } else if (weight >= 400 && weight <= 600) {
      return 'Roboto-Regular';
    } else if (weight >= 700 && weight <= 900) {
      return 'Roboto-Bold';
    } else {
      return 'Roboto-Regular';
    }
  };
  return (
    <Text
      testID={testID}
      numberOfLines={numberOfLines}
      style={[
        {
          fontSize,
          fontFamily: mapWeightToFontFamily(),
          letterSpacing,
          color,
        },

        style,
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({});

export default BaseText;

import React from 'react';
import {Image, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import R from '../Resources/R';
import Header from './Header';

type props = {
  children: React.ReactNode;
  headerTitle?: string;
  showBackButton?: boolean;
  style?: ViewStyle;
  headerTextStyle?: TextStyle;
};
const BaseContainer = ({
  children,
  headerTitle,
  showBackButton,
  style,
  headerTextStyle,
}: props) => {
  return (
    <View style={styles.container}>
      <Image
        source={R.Images.bottomWaveForContainer}
        style={styles.waveImageStyle}
      />

      <View style={styles.childrenContainer}>
        <Header
          headerTitle={headerTitle}
          showBackButton={showBackButton}
          style={headerTextStyle}
        />
        <View style={style}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f0f4',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  waveImageStyle: {
    width: '100%',
    height: '33%',
    resizeMode: 'contain',
    bottom: -3,
  },
  childrenContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default BaseContainer;

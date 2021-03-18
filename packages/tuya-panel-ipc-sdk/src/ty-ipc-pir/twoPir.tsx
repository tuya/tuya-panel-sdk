import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TwoPirProps } from './interface';
import publicConfig from '../publicConfig';
import Res from './res';

const { cx } = publicConfig;

const TwoPir: React.FC<TwoPirProps> & { defaultProps: Partial<TwoPirProps> } = props => {
  const {
    dpCodeA,
    dpCodeAValue,
    dpCodeB,
    dpCodeBValue,
    activeColor,
    pirWidth,
    pirHeight,
    OnText,
    OffText,
    pieBtnTextStyle,
  } = props;
  return (
    <View style={[styles.twoPirPage, { width: pirWidth, height: pirHeight }]}>
      <View style={[styles.twoPirBox, { width: pirWidth / 2 - 2 }]}>
        {dpCodeAValue && (
          <Image
            source={Res.twoPirLeftShadow}
            style={[
              styles.twoPirLeftShadow,
              {
                tintColor: activeColor === '#fc2f07' ? undefined : activeColor,
              },
            ]}
          />
        )}
        <TouchableOpacity
          style={[styles.twoPirPieBox, { alignItems: 'flex-end' }]}
          activeOpacity={0.8}
          onPress={() => props.changePir(dpCodeA, dpCodeAValue)}
        >
          <Image
            source={Res.twoPirLeftPie}
            style={[styles.twoPirPie, { tintColor: dpCodeAValue ? activeColor : undefined }]}
          />
          <TYText
            style={[
              styles.twoPirSwitchValue,
              {
                right: '40%',
                color: dpCodeAValue ? '#fff' : '#333',
              },
              pieBtnTextStyle,
            ]}
          >
            {dpCodeAValue ? OnText : OffText}
          </TYText>
        </TouchableOpacity>
      </View>
      <View style={[styles.twoPirBox, { width: pirWidth / 2 - 2 }]}>
        {dpCodeBValue && (
          <Image
            source={Res.twoPirRightShadow}
            style={[
              styles.twoPirRightShadow,
              {
                tintColor: activeColor === '#fc2f07' ? undefined : activeColor,
              },
            ]}
          />
        )}
        <TouchableOpacity
          style={[styles.twoPirPieBox, { alignItems: 'flex-start' }]}
          activeOpacity={0.8}
          onPress={() => props.changePir(dpCodeB, dpCodeBValue)}
        >
          <Image
            source={Res.twoPirRightPie}
            style={[styles.twoPirPie, { tintColor: dpCodeBValue ? activeColor : undefined }]}
          />
          <TYText
            style={[
              styles.twoPirSwitchValue,
              {
                color: dpCodeBValue ? '#fff' : '#333',
                left: '40%',
              },
              pieBtnTextStyle,
            ]}
          >
            {dpCodeBValue ? OnText : OffText}
          </TYText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

TwoPir.defaultProps = {
  activeColor: '#fc2f07',
};

const styles = StyleSheet.create({
  twoPirBox: {
    height: '100%',
  },
  twoPirLeftShadow: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  twoPirPage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  twoPirPie: {
    resizeMode: 'contain',
    width: '92%',
  },
  twoPirPieBox: {
    alignItems: 'center',
    bottom: 8,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  twoPirRightShadow: {
    left: 0,
    position: 'absolute',
    top: 0,
  },
  twoPirSwitchValue: {
    fontSize: cx(12),
    position: 'absolute',
    textAlign: 'center',
  },
});

export default TwoPir;

import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { ThreePirProps } from './interface';
import publicConfig from '../publicConfig';
import Res from './res';

const { cx } = publicConfig;

const ThreePir: React.FC<ThreePirProps> & { defaultProps: Partial<ThreePirProps> } = props => {
  const {
    dpCodeA,
    dpCodeAValue,
    dpCodeB,
    dpCodeBValue,
    dpCodeC,
    dpCodeCValue,
    activeColor,
    pirWidth,
    pirHeight,
    OnText,
    OffText,
    pieBtnTextStyle,
  } = props;
  return (
    <View style={[styles.threePirPage, { width: pirWidth, height: pirHeight }]}>
      <View style={[styles.threePirBox, { width: pirWidth / 2 }]}>
        {dpCodeAValue && (
          <Image
            source={Res.threePirLeftShadow}
            style={[
              styles.threePirLeftShadow,
              {
                tintColor: activeColor === '#fc2f07' ? undefined : activeColor,
              },
            ]}
          />
        )}
        <View style={styles.threePirPieBox}>
          <Image
            source={Res.threePirLeftPie}
            style={[styles.threePirPie, { tintColor: dpCodeAValue ? activeColor : undefined }]}
          />
          <TouchableOpacity
            style={[styles.threePirSwitchValueBox, { left: '8%' }]}
            activeOpacity={0.7}
            onPress={() => props.onChangePir(dpCodeA, dpCodeAValue)}
          >
            <TYText
              style={[
                styles.threePirSwitchValue,
                {
                  color: dpCodeAValue ? '#fff' : '#333',
                },
                pieBtnTextStyle,
              ]}
            >
              {dpCodeAValue ? OnText : OffText}
            </TYText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.threePirBox, { width: pirWidth / 2 }]}>
        {dpCodeCValue && (
          <Image
            source={Res.threePirRightShadow}
            style={[
              styles.threePirRightShadow,
              {
                tintColor: activeColor === '#fc2f07' ? undefined : activeColor,
              },
            ]}
          />
        )}
        <View style={styles.threePirPieBox}>
          <Image
            source={Res.threePirRightPie}
            style={[styles.threePirPie, { tintColor: dpCodeCValue ? activeColor : undefined }]}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.threePirSwitchValueBox, { right: '8%' }]}
            onPress={() => props.onChangePir(dpCodeC, dpCodeCValue)}
          >
            <TYText
              style={[
                styles.threePirSwitchValue,
                {
                  color: dpCodeCValue ? '#fff' : '#333',
                },
                pieBtnTextStyle,
              ]}
            >
              {dpCodeCValue ? OnText : OffText}
            </TYText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.threeMiddlePirBox}>
        {dpCodeBValue && (
          <Image
            source={Res.threePirMiddleShadow}
            style={[
              styles.threePirRightShadow,
              {
                tintColor: activeColor === '#fc2f07' ? undefined : activeColor,
              },
            ]}
          />
        )}
      </View>
      <View style={styles.threeMiddlePieBox}>
        <View style={styles.threePirPieBox}>
          <Image
            source={Res.threePirMiddlePie}
            style={[styles.threePirPie, { tintColor: dpCodeBValue ? activeColor : undefined }]}
          />
          <TouchableOpacity
            style={[styles.threePirSwitchValueBox, { bottom: '5%' }]}
            activeOpacity={0.7}
            onPress={() => props.onChangePir(dpCodeB, dpCodeBValue)}
          >
            <TYText
              style={[
                styles.threePirSwitchValue,
                {
                  color: dpCodeBValue ? '#fff' : '#333',
                },
                pieBtnTextStyle,
              ]}
            >
              {dpCodeBValue ? OnText : OffText}
            </TYText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

ThreePir.defaultProps = {
  activeColor: '#fc2f07',
};

const styles = StyleSheet.create({
  threeMiddlePieBox: {
    bottom: -Math.round(cx(14)),
    position: 'absolute',
    width: Math.round(cx(226)),
  },
  threeMiddlePirBox: {
    left: '50%',
    marginLeft: -110,
    position: 'absolute',
    width: 226,
  },
  threePirBox: {},
  threePirLeftShadow: {
    position: 'absolute',
    resizeMode: 'contain',
    right: 0,
    top: 0,
  },
  threePirPage: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: cx(20),
  },
  threePirPie: {
    resizeMode: 'contain',
    width: '100%',
  },
  threePirPieBox: {
    alignItems: 'center',
    bottom: 8,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  threePirRightShadow: {
    left: 0,
    position: 'absolute',
    resizeMode: 'contain',
    top: 0,
  },
  threePirSwitchValue: {
    fontSize: cx(12),
    paddingHorizontal: cx(18),
    paddingVertical: cx(8),
    textAlign: 'center',
  },
  threePirSwitchValueBox: {
    position: 'absolute',
  },
});

export default ThreePir;

import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { OnePirProps } from './interface';
import publicConfig from '../publicConfig';
import Res from './res';

const { cx } = publicConfig;

const OnePir: React.FC<OnePirProps> & { defaultProps: Partial<OnePirProps> } = props => {
  const {
    dpCodeA,
    dpCodeAValue,
    activeColor,
    pirWidth,
    pirHeight,
    OnText,
    OffText,
    pieBtnTextStyle,
  } = props;
  return (
    <View style={[styles.onePirPage, { width: pirWidth, height: pirHeight }]}>
      {dpCodeAValue && (
        <Image
          source={Res.onePirOnShadow}
          style={[
            styles.onePirShadow,
            { tintColor: activeColor === '#fc2f07' ? undefined : activeColor },
          ]}
        />
      )}
      <TouchableOpacity
        style={styles.onePirPieBox}
        activeOpacity={0.8}
        onPress={() => props.changePir(dpCodeA, dpCodeAValue)}
      >
        <Image
          source={Res.onePirPie}
          style={[styles.onePirPie, { tintColor: dpCodeAValue ? activeColor : undefined }]}
        />
        <TYText
          style={[
            styles.onePirSwitchValue,
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
  );
};

OnePir.defaultProps = {
  activeColor: '#fc2f07',
};

const styles = StyleSheet.create({
  onePirPage: {},
  onePirPie: {
    resizeMode: 'contain',
    width: '100%',
  },
  onePirPieBox: {
    alignItems: 'center',
    bottom: 8,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },

  onePirShadow: {
    resizeMode: 'contain',
    width: '100%',
  },
  onePirSwitchValue: {
    fontSize: cx(12),
    position: 'absolute',
    textAlign: 'center',
  },
});

export default OnePir;

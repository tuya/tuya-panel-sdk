import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import Strings from './i18n';
import Res from './res';

const { convertX: cx } = Utils.RatioUtils;

interface IHangupButton {
  onPress: () => void;
  disabled?: boolean;
}

const HangupButton: React.FC<IHangupButton> = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={styles.buttonWrap}
      disabled={disabled}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <View style={styles.centerText}>
        <Image source={Res.hangupIcon} style={{ marginRight: cx(9) }} />
        <TYText color="#fff" text={Strings.getLang('TYLock_hangup')} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrap: {
    alignItems: 'center',
    backgroundColor: '#FF4040',
    borderRadius: cx(38),
    flexDirection: 'row',
    height: cx(52),
    justifyContent: 'center',
    width: cx(319),
  },

  centerText: {
    alignItems: 'center',
    flexDirection: 'row',
    width: cx(64),
  },
});

export default HangupButton;

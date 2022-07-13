import React, { FC } from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  StyleProp,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
import { TYText, TopBar, Utils } from 'tuya-panel-kit';
import Res from '../../res';

const { convertX: cx } = Utils.RatioUtils;

interface BleToastProps {
  style: StyleProp<ViewStyle>;
  text: string;
  image: ImageSourcePropType;
  onPress: () => void;
}

const BleToast: FC<BleToastProps> = props => {
  const { style, text = '', image = Res.bleAlert, onPress } = props;
  return (
    <TouchableOpacity
      style={[styles.shareTip, style]}
      activeOpacity={1}
      onPress={onPress && onPress}
    >
      <Image source={Res.bleAlert} />
      <TYText style={styles.shareText} text={text} />
      <Image source={image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareText: {
    color: '#22242C',
    flex: 1,
    fontSize: cx(14),
    marginLeft: cx(6),
    textAlign: 'left',
  },
  shareTip: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    borderRadius: cx(24),
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    marginHorizontal: cx(24),
    paddingHorizontal: cx(16),
    paddingVertical: 10,
    position: 'absolute',
    right: 0,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    top: 16 + TopBar.height,
  },
});

export default BleToast;

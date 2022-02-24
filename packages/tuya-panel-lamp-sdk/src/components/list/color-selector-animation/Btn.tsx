import React from 'react';
import { ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { IconFont } from 'tuya-panel-kit';

export interface IProps {
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  path: string;
  size: number;
}

const Btn: React.FC<IProps> = ({ style, onPress, iconColor, path, size }) => (
  <TouchableOpacity activeOpacity={1} onPress={onPress} style={style}>
    <IconFont d={path} size={size} color={iconColor} />
  </TouchableOpacity>
);

export default Btn;

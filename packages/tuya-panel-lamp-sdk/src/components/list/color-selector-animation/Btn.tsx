import React from 'react';
import { ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { IconFont } from 'tuya-panel-kit';

export interface IProps {
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  path: string;
}

const Btn: React.FC<IProps> = ({ style, onPress, iconColor, path }) => (
  <TouchableOpacity activeOpacity={1} onPress={onPress} style={style}>
    <IconFont d={path} size={14} color={iconColor} />
  </TouchableOpacity>
);

export default Btn;

import React, { SFC } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { IconFont } from 'tuya-panel-kit';
import Button from './Button';

export interface IProps {
  btnColor: string;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const AddBtn: SFC<IProps> = ({ style, iconColor, btnColor, onPress }) => (
  <Button color={btnColor} style={style} onPress={onPress}>
    <IconFont name="plus" size={18} color={iconColor} />
  </Button>
);

export default AddBtn;

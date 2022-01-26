import React from 'react';
import { View } from 'react-native';
import { IconFont } from 'tuya-panel-kit';
import { IIcon } from './common/interface';

const Child = (props: IIcon) => {
  const { icon, color, size, iconStyle } = props;
  return (
    <View style={{ backgroundColor: '#fff', ...iconStyle }}>
      <IconFont d={icon} size={size} color={color} />
    </View>
  );
};
export default Child;

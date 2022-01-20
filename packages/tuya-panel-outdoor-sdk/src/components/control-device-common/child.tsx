import React, { ReactElement } from 'react';
import { View, StyleSheet, ImageSourcePropType } from 'react-native';
import { TYSdk, Utils, IconFont } from 'tuya-panel-kit';
import homeModal from './homeModal';
import { IIconProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;

const child = (props: IIconProps) => {
  const { icon, color, size, iconStyle } = props;
  return (
    <View style={{ backgroundColor: '#fff', ...iconStyle }}>
      <IconFont d={icon} size={size} color={color} />
    </View>
  );
};

export default homeModal(child);

const styles = StyleSheet.create({});

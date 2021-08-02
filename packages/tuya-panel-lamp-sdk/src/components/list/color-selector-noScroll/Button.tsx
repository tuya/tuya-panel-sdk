import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

export interface IProps {
  style?: StyleProp<ViewStyle>;
  color?: string;
  active?: boolean;
  activeColor?: string;
  activeStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
  children?: React.ReactNode;
}

const Button: React.FunctionComponent<IProps> = ({
  style,
  onPress,
  onLongPress,
  active,
  color,
  children,
  activeColor,
  activeStyle,
}: IProps) => (
  <View style={[styles.btn, style, active && { borderColor: activeColor }, active && activeStyle]}>
    <TouchableOpacity
      style={[styles.inner, { backgroundColor: color }]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  </View>
);

export default Button;

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: cx(22),
    borderWidth: cx(2),
    height: cx(44),
    justifyContent: 'center',
    width: cx(44),
  },
  inner: {
    alignItems: 'center',
    borderRadius: cx(20),
    height: cx(40),
    justifyContent: 'center',
    width: cx(40),
  },
});

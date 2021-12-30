import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { IconFont, TYText, Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

export interface HeaderProps {
  prefixCls?: string;
  title?: ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
  // value?: Dayjs;
  value: string;
  color?: string;
}

interface ButtonProps extends TouchableOpacityProps {
  icon: string;
  color: string;
}

function Button(props: ButtonProps) {
  const { icon = 'arrow', color = '#000', ...other } = props;
  return (
    <TouchableOpacity {...(other as TouchableOpacityProps)}>
      <View style={styles.iconButton}>
        <IconFont name={icon} color={color} />
      </View>
    </TouchableOpacity>
  );
}

function Header(props: HeaderProps) {
  const { title, onPrev, onNext, value, color } = props;
  return (
    <View style={styles.container}>
      <Button icon="backIos" onPress={onPrev} color={color} />
      <View>
        <TYText size={16} color={color}>
          {value}
        </TYText>
      </View>
      <Button icon="arrow" onPress={onNext} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: cx(10),
    paddingVertical: 8,
  },

  // BUTTON
  iconButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 13,

    height: cx(26),
    justifyContent: 'center',
    width: cx(26),
  },
});

export default Header;

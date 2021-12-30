import React, { Component, SFC } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { IconFont, TYText, Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

interface IProp {
  // 点击加
  onNext: () => void;

  // 点击上一次
  onPrev: () => void;

  // 中间文字，受控
  timeText: React.ReactNode;
  color?: string;
  disabled?: boolean;
}

// picker头部文件，理论上这个区域渲染是可以让用户自定义的，保留切换方法既可以
interface ButtonProps extends TouchableOpacityProps {
  icon?: string;
  color?: string;
}

const Button: SFC<ButtonProps> = ({ icon = 'arrow', color = '#000', disabled, ...otherProps }) => {
  console.log('props Button disabled', disabled);
  return (
    <TouchableOpacity {...(otherProps as TouchableOpacityProps)}>
      <View style={[styles.iconButton, disabled ? { opacity: 0.6 } : {}]}>
        <IconFont name={icon} color={color} />
      </View>
    </TouchableOpacity>
  );
};

class Header extends Component<IProp> {
  render() {
    const { onNext, timeText, onPrev, color = '#000', disabled } = this.props;
    console.log('props disabled', disabled);
    return (
      <View style={styles.container}>
        <Button icon="backIos" onPress={onPrev} color={color} />
        <View>
          {typeof timeText === 'string' ? (
            <TYText size={16} color={color}>
              {timeText}
            </TYText>
          ) : (
            timeText
          )}
        </View>
        <Button onPress={onNext} color={color} disabled={disabled} />
      </View>
    );
  }
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

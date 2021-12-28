import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { buttonProps } from './interface';

const Button: React.FC<buttonProps> = props => {
  const {
    label,
    style,
    isActive,
    textStyle,
    activeTextStyle,
    horizontal,
    onItemPress,
    icon,
  } = props;
  const customTextStyle = [
    styles.textStyle,
    textStyle,
    isActive && styles.activeTextStyle,
    isActive && activeTextStyle,
  ];
  const wrapperStyle = [
    styles.wrapperStyle,
    horizontal
      ? { height: '100%' }
      : {
          alignSelf: 'stretch' as
            | 'auto'
            | 'flex-start'
            | 'flex-end'
            | 'stretch'
            | 'baseline'
            | 'center',
        },
  ];
  return (
    <TouchableOpacity onPress={onItemPress} activeOpacity={1} style={[style, wrapperStyle]}>
      {icon || (
        <TYText style={customTextStyle} numberOfLines={1}>
          {`${label}`}
        </TYText>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  activeTextStyle: {
    color: '#5190F3',
  },
  textStyle: {
    backgroundColor: 'transparent',
    color: '#fff',
    textAlign: 'center',
  },
  wrapperStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

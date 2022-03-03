import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient, Utils } from 'tuya-panel-kit';
import { Rect } from 'react-native-svg';

const { width: screenWidth } = Utils.RatioUtils;

interface IMantle {
  style?: StyleProp<ViewStyle>;
  height?: number;
  stops?: { [key: string]: string };
}

const Mantle: React.FC<IMantle> = ({
  children,
  style,
  height,
  stops = {
    '0%': 'rgba(0,0,0,0.4)',
    '100%': 'rgba(0,0,0,0)',
  },
}) => {
  return (
    <View style={[style, { height }]}>
      <LinearGradient x1="0%" y1="0%" x2="0%" y2="100%" stops={stops} style={{ height }}>
        <Rect width={screenWidth} height={height} />
      </LinearGradient>
      {children}
    </View>
  );
};

export default Mantle;

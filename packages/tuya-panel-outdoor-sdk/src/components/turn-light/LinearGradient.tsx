import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'tuya-panel-kit';
import { Rect } from 'react-native-svg';

interface Props {
  wrapperStyle?: StyleProp<ViewStyle>;
  width: string | number;
  height: string | number;
}

const Gradient: FC<Props> = ({ wrapperStyle, width, height }) => {
  return (
    <LinearGradient
      gradientId="Gradient"
      style={[
        wrapperStyle,
        {
          width,
          height,
          overflow: 'hidden',
        },
      ]}
      x1="0%"
      y1="0%"
      x2="100%"
      y2="100%"
      stops={{
        '0%': '#262629',
        '100%': '#343438',
      }}
    >
      <Rect width={width} height={height} />
    </LinearGradient>
  );
};
Gradient.defaultProps = {
  wrapperStyle: {},
};
export default Gradient;

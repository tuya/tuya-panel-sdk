/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { FC, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { ColorProps, ColorData } from './interface';

const ColorRect: FC<ColorProps> = ({ style, colors = [], onPress, activeOpacity }) => {
  const { borderRadius, width, height } = StyleSheet.flatten([style]);
  const calculateHeight = <T extends Array<any>>(data: T, index: number) => {
    if (index === 0) return 0;
    let res = 0;
    if (typeof height === 'number' && typeof data !== 'string') {
      data.forEach((item, idx) => {
        if (idx === 0) {
          res = 0;
        } else if (idx > 0 && idx <= index) {
          res += height * data[idx - 1].percent;
        }
      });
    }
    return res;
  };
  const handlePress = () => {
    onPress();
  };
  const colorDataList: ColorData[] = useMemo(() => {
    if (typeof height === 'number') {
      return colors.map((item, index) => {
        const { color, percent } =
          typeof item === 'string' ? { color: item, percent: 1 / colors.length } : item;
        const startY =
          typeof item !== 'string'
            ? calculateHeight(colors, index)
            : (height / colors.length) * index;
        const itemHeight = height * percent;
        return {
          color,
          startY,
          itemHeight,
        };
      });
    }
    return [];
  }, [colors]);

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={activeOpacity}>
      <Svg style={style} height={height} width={width} rx={borderRadius}>
        {colorDataList.map(({ color, startY, itemHeight }, index) => (
          <Rect key={index} width={width} height={itemHeight} x="0" y={startY} fill={color} />
        ))}
      </Svg>
    </TouchableOpacity>
  );
};
ColorRect.defaultProps = {
  activeOpacity: 0.8,
};
export default ColorRect;

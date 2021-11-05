/* eslint-disable react/prop-types */

import React, { FC, useLayoutEffect, useState } from 'react';
import { Path, Svg, LinearGradient, Stop, Defs } from 'react-native-svg';
import { ColorValue } from 'react-native';
import { getPath } from '../../utils/index';

interface sizePropTypes {
  height: number;
  width: number;
}

interface strokeStyleTypes {
  width?: number;
  color?: ColorValue;
  opacity?: number;
}

interface linearStyleTypes {
  color?: ColorValue;
  opacity?: number;
}

interface Props {
  /**
   * 大小
   */
  size: sizePropTypes;
  /**
   * 传入数据
   */
  data: number[];
  /**
   * 曲线样式
   */
  strokeStyle?: strokeStyleTypes;
  /**
   * 底部渐变
   */
  bottomLinearStyle?: linearStyleTypes;
  /**
   * 顶部渐变
   */
  topLinearStyle?: linearStyleTypes;
  /**
   * 曲线斜率
   */
  slope?: number;
}

const defaultStrokeStyle: strokeStyleTypes = {
  width: 1,
  color: 'black',
  opacity: 1,
};

const defaultLinearStyle: linearStyleTypes = {
  color: 'transparent',
  opacity: 0,
};

const LineBoxSvg: FC<Props> = props => {
  const { size, data, strokeStyle, bottomLinearStyle, topLinearStyle, slope } = props;
  const { height: lineBoxHeight, width: lineBoxWidth } = size;
  const { width: strokeWidth, color: strokeColor, opacity: strokeOpacity } =
    strokeStyle ?? defaultStrokeStyle;
  const { color: buttonLinearColor, opacity: buttonLinearOpacity } =
    bottomLinearStyle ?? defaultLinearStyle;

  const { color: topLinearColor, opacity: topLinearOpacity } = topLinearStyle ?? defaultLinearStyle;
  const buttonLineY = lineBoxHeight - strokeWidth * 2; // 高度要容纳曲线厚度和斜率造成的高度超出，最下方位置
  const TopLineY = strokeWidth * 2; // 最上方位置，要容纳曲线厚度和斜率造成的高度超出
  const [line, setLine] = useState('');

  useLayoutEffect(() => {
    data?.length && setLine(getPath(data, buttonLineY, lineBoxWidth, TopLineY, slope));
  }, [data]);

  return (
    <Svg width={lineBoxWidth} height={lineBoxHeight}>
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0" stopColor={topLinearColor} stopOpacity={topLinearOpacity} />
          <Stop offset="1" stopColor={buttonLinearColor} stopOpacity={buttonLinearOpacity} />
        </LinearGradient>
      </Defs>
      <Path
        d={line}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="url(#grad)"
        strokeOpacity={strokeOpacity}
      />
    </Svg>
  );
};

export default LineBoxSvg;

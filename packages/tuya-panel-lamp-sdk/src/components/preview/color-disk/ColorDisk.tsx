/* eslint-disable react/no-array-index-key */
import React, { FC, useMemo } from 'react';
import Svg, { Path } from 'react-native-svg';
import _ from 'lodash';
import { getCirclePointCoordinate } from '../../../utils';
import { ColorDiskProps, ColorType } from './interface';

const ColorDisk: FC<ColorDiskProps> = ({ style, radius = 0, startAngle = 0, colors = [] }) => {
  const colorDatas = useMemo(() => {
    const center = [radius, radius];
    let cumulativeAngle = startAngle;
    return colors.map((item: ColorType) => {
      const { color, percent } = _.isString(item)
        ? { color: item, percent: 1 / colors.length }
        : { ...item, percent: item.percent / 100 };
      const currentAngle = Math.PI * 2 * percent; // current part's angle
      const [startX, startY] = getCirclePointCoordinate(center, radius, cumulativeAngle); // Start point coordinates
      cumulativeAngle += currentAngle;
      const [endX, endY] = getCirclePointCoordinate(center, radius, cumulativeAngle); // End point coordinates
      return { color, center, startX, startY, endX, endY };
    });
  }, [radius, startAngle, colors]);

  return (
    <Svg style={style} height={radius * 2} width={radius * 2}>
      {colorDatas.map(({ color, center, startX, startY, endX, endY }, index) => (
        <Path
          key={index}
          d={`M ${center[0]} ${center[1]} L ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY} Z`}
          stroke="none"
          strokeWidth={0}
          fill={color}
        />
      ))}
    </Svg>
  );
};

export default ColorDisk;

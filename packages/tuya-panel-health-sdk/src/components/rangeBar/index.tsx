/* eslint-disable react/no-array-index-key */
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { findIndex, isFunction } from 'lodash';
import Color from 'color';
import { Svg, G, Rect, Text, Circle } from 'react-native-svg';
import useMergeProps from '../../hooks/useMergeProps';
import { RangeBarProps } from './interface';
import styles from './style';

import { valueInRange, linear } from './utils';

const defaultProps: RangeBarProps = {
  space: 2,
  width: 280,
  height: 80,
  strokeWidth: 6,
  titleTextColor: Color('#000').alpha(0.3).rgbaString(),
  scaleTextColor: Color('#000').alpha(0.6).rgbaString(),
  titleTextOffset: 16,
  scaleTextOffset: 20,
};

const RangeBar: FC<RangeBarProps> = baseProps => {
  const props = useMergeProps<RangeBarProps>(baseProps, defaultProps);
  const {
    dataSource,
    value,
    width,
    height,
    titleTextColor,
    scaleTextColor,
    strokeWidth,
    titleTextOffset,
    scaleTextOffset,
    space,
    style,
    formatScaleText,
  } = props;

  const rangeLength = dataSource?.length ?? 0;

  const rangeWidth = (width - (rangeLength - 1) * space) / rangeLength;
  const lineY = (height - strokeWidth) / 2;
  const valueIndex = findIndex(dataSource, item => valueInRange(value, item.range));

  const getValuePosition = (index: number) => {
    const valueRange = dataSource[index]?.range;
    const l = linear({ domain: valueRange, range: [0, rangeWidth] });
    const diff = l.map(value);
    return diff;
  };

  // draw line
  const line = (
    <>
      {dataSource.map((item, index) => {
        const { color } = item;
        const startX = index * rangeWidth + index * space;
        const rectProps = { x: startX, y: lineY, width: rangeWidth, height: strokeWidth };
        return <Rect key={index} {...rectProps} fill={color} />;
      })}
    </>
  );

  const circle = useMemo(() => {
    if (valueIndex === -1) return null;
    const diff = getValuePosition(valueIndex);
    const valueX = rangeWidth * valueIndex + diff;
    const valueColor = dataSource[valueIndex].color;
    const circleProps = { cx: valueX, cy: height / 2, r: strokeWidth, stroke: valueColor };
    return <Circle {...circleProps} strokeWidth={2} fill="#fff" />;
  }, [valueIndex]);

  // draw circle
  const titleEle = (
    <>
      {dataSource.map((item, index) => {
        const { title, range } = item;
        const startX = index * rangeWidth + index * space;
        const textProps = {
          x: startX + rangeWidth / 2,
          y: lineY + titleTextOffset,
          fill: titleTextColor,
        };
        return (
          <Text key={index} {...textProps} fontSize="10" stroke="none" textAnchor="middle">
            {title}
          </Text>
        );
      })}
    </>
  );

  // draw scaleText
  const scaleTextEle = (
    <>
      {dataSource.map((item, index) => {
        const { range } = item;
        const [min, max] = range;
        if (index !== 0) {
          const text = isFunction(formatScaleText) ? formatScaleText(min) : min;
          const startX = index * rangeWidth + index * space;
          const textProps = { x: startX, y: lineY - scaleTextOffset, fill: scaleTextColor };
          return (
            <Text key={index} {...textProps} fontSize="10" stroke="none" textAnchor="middle">
              {text}
            </Text>
          );
        }
        return null;
      })}
    </>
  );
  return (
    <View style={[styles.wrapper, style]}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <G>
          {scaleTextEle}
          {line}
          {circle}
          {titleEle}
        </G>
      </Svg>
    </View>
  );
};

export default RangeBar;

import React, { useMemo } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { BarList } from './BarList';

export const sum = (arr: number[]) => {
  if (arr.length === 0) return arr;
  return [...arr].reduce((acc, val) => acc + val, 0);
};

export const WAKE_COLOR = '#FFCF3A';
export const LIGHT_COLOR = '#E5C7F2';
export const DEEP_COLOR = '#BF73DE';
export const REM_COLOR = '#F8F1FB';

export const DEFAULT_COLORS = {
  Wake: WAKE_COLOR,
  Light: LIGHT_COLOR,
  Deep: DEEP_COLOR,
  REM: REM_COLOR,
};

// 0-清醒；1-浅睡；2-深睡；3-REM（可能没有）
// eslint-disable-next-line no-shadow
export enum SleepStatus {
  'Wake' = 'Wake',
  'Deep' = 'Deep',
  'Light' = 'Light',
  'REM' = 'REM',
}

export interface Data {
  value: number;
  label: string;
  key?: string;
  color?: string;
}
export interface BarPercentProps {
  data: Data[];
  style?: StyleProp<ViewStyle>;
}

const BarPercent = (props: BarPercentProps) => {
  const { data, style } = props;
  const total = useMemo(() => sum(data.map(d => +d.value)) as number, [JSON.stringify(data)]);
  const { length } = data;
  const renderItem = (item, index) => {
    const flexPercent = (item.value / total) * length;
    return (
      <BarList.Item
        key={item?.key || index}
        flexPercent={flexPercent}
        backgroundColor={item.color || DEFAULT_COLORS[item.key]}
      />
    );
  };
  return <BarList dataSource={data} style={style} renderItem={renderItem} />;
};

export default BarPercent;

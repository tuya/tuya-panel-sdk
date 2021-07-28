import React, { ReactNode, Component, SFC, useMemo } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

export interface BarListProps<T> {
  dataSource: T[];
  renderItem: (item: T, index: number) => ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface ItemProps {
  flexPercent: number;
  backgroundColor?: string;
}

export const sum = (arr: number[]) => {
  if (arr.length === 0) return arr;
  return [...arr].reduce((acc, val) => acc + val, 0);
};

export const Item: SFC<ItemProps> = (props: ItemProps) => {
  const { flexPercent = 1, backgroundColor = '#BF73DE' } = props;
  return <View style={[styles.item, { backgroundColor, flex: flexPercent }]} />;
};

export class BarList<T> extends Component<BarListProps<T>> {
  static Item = Item;
  render() {
    const { dataSource, renderItem, style } = this.props;
    const items = dataSource.map((item: T, index: number) => renderItem(item, index));
    return <View style={[styles.container, style]}>{items}</View>;
  }
}

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

const BarPercent: SFC<BarPercentProps> = (props: BarPercentProps) => {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: cx(24),
    overflow: 'hidden',
  },
  item: {
    height: '100%',
  },
});

export default BarPercent;

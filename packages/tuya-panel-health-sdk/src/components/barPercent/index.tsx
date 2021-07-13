import React, { ReactNode, Component, SFC } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

export interface BarPercentProps<T> {
  dataSource: T[];
  renderItem: (item: T, index: number) => ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface BarPercentItemProps {
  flexPercent: number;
  backgroundColor?: string;
}

export const sum = (arr: number[]) => {
  if (arr.length === 0) return arr;
  return [...arr].reduce((acc, val) => acc + val, 0);
};

const Item: SFC<BarPercentItemProps> = (props: BarPercentItemProps) => {
  const { flexPercent = 1, backgroundColor = '#BF73DE' } = props;
  return <View style={[styles.item, { backgroundColor, flex: flexPercent }]} />;
};
export class BarPercent<T> extends Component<BarPercentProps<T>> {
  static Item = Item;
  render() {
    const { dataSource, renderItem, style } = this.props;
    const items = dataSource.map((item: T, index: number) => renderItem(item, index));
    return <View style={[styles.container, style]}>{items}</View>;
  }
}

const WAKE_COLOR = '#FFCF3A';
const LIGHT_COLOR = '#E5C7F2';
const DEEP_COLOR = '#BF73DE';
const REM_COLOR = '#F8F1FB';

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
export interface SleepBarPercentProps {
  dataSource: { value: number; type: SleepStatus; color?: string }[];
  style?: StyleProp<ViewStyle>;
}

// Sleep distribution
export class SleepBarPercent extends Component<SleepBarPercentProps> {
  render() {
    const { dataSource, style } = this.props;
    const total = sum(dataSource.map(d => +d.value)) as number;
    const { length } = dataSource;
    return (
      <BarPercent
        dataSource={dataSource}
        style={style}
        renderItem={(item, index) => {
          const flexPercent = (item.value / total) * length;
          return (
            <BarPercent.Item
              key={index}
              flexPercent={flexPercent}
              backgroundColor={item?.color ?? DEFAULT_COLORS[`${item.type}`]}
            />
          );
        }}
      />
    );
  }
}

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

export default SleepBarPercent;

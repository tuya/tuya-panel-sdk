import React, { ReactNode, Component, SFC, useMemo } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

export interface ItemProps {
  flexPercent: number;
  backgroundColor?: string;
}
export interface BarListProps<T> {
  dataSource: T[];
  renderItem: (item: T, index: number) => ReactNode;
  style?: StyleProp<ViewStyle>;
}

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

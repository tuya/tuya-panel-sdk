import React, { Component } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { LoadingDoubleBounce, LoadingBubbles, LoadingPulse } from './circle-loading-view';
import CircleLoading from './circle-loading';

/**
 * 把所有load的样式组件集合在一起
 */

const typeEnum = {
  none: 'none',
  doubleBounce: 'double-bounce',
  bubbles: 'bubbles',
  pulse: 'pulse',
  ring: 'ring',
};

interface IProps {
  style: StyleProp<ViewStyle>; // 容器样式
  type: string; // loading样式
  size?: number; // 大小
  color?: string; // 颜色
  renderLoading?: () => any; // render自定义组件
  loadingStyle?: StyleProp<ViewStyle>; // loading样式
  spaceBetween?: number;
}

export default class Loading extends Component<IProps> {
  static defaultProps = {
    type: typeEnum.bubbles,
    renderLoading: undefined,
    size: 10,
    color: '#eee',
    style: {},
  };

  renderLoadingItem() {
    const { type, size, color, spaceBetween } = this.props;
    switch (type) {
      case typeEnum.doubleBounce:
        return <LoadingDoubleBounce size={size} color={color} />;
      case typeEnum.bubbles:
        return <LoadingBubbles size={size} color={color} spaceBetween={spaceBetween} />;
      case typeEnum.pulse:
        return <LoadingPulse size={size} color={color} />;
      case typeEnum.ring:
        return <CircleLoading />;
      default:
        return <View />;
    }
  }

  render() {
    const { renderLoading, style, loadingStyle } = this.props;
    if (renderLoading) return renderLoading();
    return (
      <View style={[styles.root, style]}>
        <View style={[styles.loading, loadingStyle]}>{this.renderLoadingItem()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {},
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

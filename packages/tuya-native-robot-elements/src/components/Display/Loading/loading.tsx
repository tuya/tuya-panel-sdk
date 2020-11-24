import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
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
  ring: 'ring'
};

export default class Loading extends Component {
  static propTypes = {
    /**
     * loading样式
     */
    type: PropTypes.oneOf([typeEnum.doubleBounce, typeEnum.bubbles, typeEnum.pulse, typeEnum.none]),
    /**
     * render自定义组件
     */
    renderLoading: PropTypes.func,
    /**
     * 大小
     */
    size: PropTypes.number,
    /**
     * 颜色
     */
    color: PropTypes.string,
    /**
     * 容器样式
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    type: typeEnum.bubbles,
    renderLoading: undefined,
    size: 10,
    color: '#eee',
    style: {},
  };

  renderLoadingItem() {
    const { type, size, color } = this.props;
    switch (type) {
      case typeEnum.doubleBounce:
        return <LoadingDoubleBounce size={size} color={color} />;
      case typeEnum.bubbles:
        return <LoadingBubbles size={size} color={color} />;
      case typeEnum.pulse:
        return <LoadingPulse size={size} color={color} />;
      case typeEnum.ring:
        return <CircleLoading />;
      default:
        return <View />;
    }
  }

  render() {
    const { type, renderLoading, style, loadingStyle } = this.props;
    if (renderLoading) return renderLoading();
    return (
      <View style={[styles.root, style]}>
        <View style={[styles.loading, loadingStyle]}>{this.renderLoadingItem()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {},
});

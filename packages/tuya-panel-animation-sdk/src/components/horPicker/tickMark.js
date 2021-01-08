import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated, ViewPropTypes } from 'react-native';
import { Utils } from 'tuya-panel-kit';

export const { convertX: cx, convertY: cy, width: winWidth } = Utils.RatioUtils;

const lineView = (width, hideStart, index) => {
  return (
    <View style={[styles.lineView, { width }]} key={index}>
      {new Array(6).fill(0).map((i, idx) => {
        if (idx === 0 && !hideStart) {
          return <View style={styles.highLine} key={idx} />;
        }
        if (idx === 5) {
          return <View style={styles.highLine} key={idx} />;
        }
        if ([1, 2, 3, 4].includes(idx)) {
          return <View style={styles.shortLine} key={idx} />;
        }
        return <View style={styles.emptyLine} key={idx} />;
      })}
    </View>
  );
};

export default class TickMark extends PureComponent {
  static propTypes = {
    dataLength: PropTypes.number.isRequired,
    itemWidth: PropTypes.number.isRequired,
    emptyViewLength: PropTypes.number.isRequired,
    style: ViewPropTypes.style,
    themeColor: PropTypes.string.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  markLeft = new Animated.Value(this.props.itemWidth / 2);

  render() {
    const { dataLength, itemWidth, emptyViewLength, style, themeColor } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Animated.View
          style={[
            styles.tickMarkView,
            {
              left: this.markLeft,
            },
          ]}
        >
          {new Array(dataLength + 2 * emptyViewLength).fill(0).map((i, idx) => {
            if (idx > emptyViewLength - 1 && idx < dataLength + emptyViewLength - 1) {
              return lineView(itemWidth, idx > emptyViewLength, idx);
            }
            return <View style={[styles.emptyView, { width: itemWidth }]} key={idx} />;
          })}
        </Animated.View>
        <View
          style={[
            styles.centerLine,
            {
              backgroundColor: themeColor,
              left: winWidth / 2,
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerLine: {
    bottom: 0,
    height: cx(30),
    position: 'absolute',
    width: cx(2),
  },
  container: {
    height: cx(30),
    justifyContent: 'flex-end',
    width: winWidth,
  },
  emptyLine: {
    backgroundColor: 'transparent',
    height: cx(10),
    width: cx(2),
  },
  emptyView: {
    height: cx(20),
  },
  highLine: {
    backgroundColor: '#e5e5e5',
    height: cx(20),
    width: cx(2),
  },
  lineView: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shortLine: {
    backgroundColor: '#e5e5e5',
    height: cx(10),
    width: cx(2),
  },
  tickMarkView: {
    flexDirection: 'row',
  },
});

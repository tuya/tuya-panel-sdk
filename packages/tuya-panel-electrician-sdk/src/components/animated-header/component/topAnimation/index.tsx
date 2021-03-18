import React, { Component } from 'react';
import { Animated, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { TopAnimationProps } from '../index.type';

const { convertY: cy, width: winWidth } = Utils.RatioUtils;

export default class Animation extends Component<TopAnimationProps> {
  render() {
    const { height, opacity, content } = this.props;
    return (
      <Animated.View style={styles.mask}>
        <Animated.View style={[styles.maskBtn, { opacity }]}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.maskBtn2}
            onPress={() => this.props.setChange(1)}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.maskView,
            {
              height,
            },
          ]}
        >
          {content ? content() : <View />}
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  mask: {
    alignSelf: 'center',
    bottom: 0,
    flex: 1,
    height: cy(667),
    left: 0,
    position: 'absolute',
    top: 0,
    width: winWidth,
  },
  maskBtn: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
    bottom: 0,
    flex: 1,
    height: cy(667),
    justifyContent: 'center',
    overflow: 'hidden',
    width: winWidth,
  },
  maskBtn2: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
    bottom: 0,
    flex: 1,
    height: cy(667),
    justifyContent: 'center',
    overflow: 'hidden',
    width: winWidth,
  },
  maskView: {
    backgroundColor: '#FFFFFF',
    height: cy(341),
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    width: winWidth,
  },
});

/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Component } from 'react';
import { View, StyleSheet, Animated, Easing, StyleProp, TextStyle } from 'react-native';
import { LinearGradient, TYText } from 'tuya-panel-kit';
import { Svg, Path, Rect } from 'react-native-svg';

type Props = {
  /**
   * 文本样式
   */
  textStyle: StyleProp<TextStyle>;
  /**
   * 亮度值
   */
  bright: number;
  /**
   * 最小值
   */
  minBright: number;
  /**
   * 最大值
   */
  maxBright: number;
  /**
   * 尺寸
   */
  size: number;
  /**
   * 轨道宽度
   */
  trackWidth: number;
  /**
   * 标签文本
   */
  label: string;
  /**
   * 格式化百分比
   */
  formatPercent?: (v: number) => number;
};

export default class HueBrightSlider extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.animation.setValue(this.props.bright);
    this.animation.addListener(this.handleUpdatePercent);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.bright !== this.props.bright) {
      this.needUpdate = true;
    }
  }

  componentDidUpdate() {
    if (this.needUpdate) {
      this.needUpdate = false;
      this.runAnimation(this.props.bright);
    }
  }

  private animation: Animated.Value = new Animated.Value(0);
  private textRef: TYText;
  private needUpdate = false;

  runAnimation(value: number) {
    this.animation.stopAnimation();
    Animated.timing(this.animation, {
      toValue: value,
      duration: 16,
      easing: Easing.linear,
    }).start();
  }

  update(bright: number) {
    this.runAnimation(bright);
  }

  handleUpdatePercent = ({ value }: { value: number }) => {
    const percent = this.formatPercent(value);
    // @ts-ignore
    this.textRef && this.textRef.setText(`${this.props.label}: ${percent}%`);
  };

  formatPercent(value: number) {
    const { minBright, maxBright, formatPercent } = this.props;
    if (formatPercent) {
      return formatPercent(value);
    }

    return Math.round(((value - minBright) * 99) / (maxBright - minBright) + 1);
  }

  render() {
    const { size, bright, minBright, maxBright, label, trackWidth, textStyle } = this.props;
    return (
      <View style={{ width: size, height: trackWidth }}>
        <View
          style={{
            width: size,
            height: trackWidth,
            borderRadius: trackWidth / 2,
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%"
            stops={{
              '0%': '#000',
              '100%': '#fff',
            }}
            style={{ width: size, height: trackWidth }}
          >
            <Rect x={0} y={0} width={size} height={trackWidth} />
          </LinearGradient>
        </View>
        <TYText
          style={[styles.text, { fontSize: 12, top: trackWidth + 4 }, textStyle]}
          ref={(ref: TYText) => {
            this.textRef = ref;
          }}
        >
          {label}: {this.formatPercent(bright)}%
        </TYText>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: trackWidth + 4,
            left: Animated.add(
              -8,
              this.animation.interpolate({
                inputRange: [minBright, maxBright],
                outputRange: [0, size],
              })
            ),
          }}
        >
          <Svg width="16" height="22">
            <Path
              d="M2,2L2,17L8,20L14,17L14,2Z"
              stroke="#fff"
              strokeWidth={2}
              fill="#a5a5a5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    position: 'absolute',
  },
});

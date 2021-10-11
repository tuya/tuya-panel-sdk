/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Component } from 'react';
import Color from 'color';
import { View, StyleSheet, Animated, Easing, StyleProp, TextStyle } from 'react-native';
import { LinearGradient, TYText } from 'tuya-panel-kit';
import { Svg, Path, Rect } from 'react-native-svg';
import ColorUtils from '../../../utils/color';

type Props = {
  /**
   * 文本样式
   */
  textStyle: StyleProp<TextStyle>;
  /**
   * 色温值
   */
  temp: number;
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
  /**
   * 最小值
   */
  min: number;
  /**
   * 最大值
   */
  max: number;
};

export default class Temperature extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.animation.setValue(this.props.temp);
    this.animation.addListener(this.handleUpdateThumb);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.temp !== this.props.temp) {
      this.needUpdate = true;
    }
  }

  componentDidUpdate() {
    if (this.needUpdate) {
      this.needUpdate = false;
      this.runAnimation(this.props.temp);
    }
  }

  private animation: Animated.Value = new Animated.Value(0);
  private textRef: TYText;
  private needUpdate = false;
  private pathRef: Path;

  handleUpdateThumb = ({ value }: { value: number }) => {
    const color = ColorUtils.brightKelvin2rgb(1000, value);
    const rgb = Color(color).rgbArray();
    this.pathRef &&
      this.pathRef.setNativeProps({ fill: [0, rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, 1] });

    const percent = this.formatPercent(value);
    // @ts-ignore
    this.textRef && this.textRef.setText(`${this.props.label}: ${percent}%`);
  };

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

  formatPercent(value: number) {
    const { min, max, formatPercent } = this.props;
    if (formatPercent) {
      return formatPercent(value);
    }

    return Math.round(((value - min) * 100) / (max - min));
  }

  render() {
    const { size, temp, label, min, max, trackWidth, textStyle = { fontSize: 12 } } = this.props;
    const color = ColorUtils.brightKelvin2rgba(1000, temp);
    const { fontSize } = StyleSheet.flatten(textStyle);
    const lineHeight = fontSize * 1.5;
    return (
      <View style={{ width: trackWidth, height: size }}>
        <View
          style={{
            width: trackWidth,
            height: size,
            borderRadius: trackWidth / 2,
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            gradientId="white-cross-temp"
            x1="0%"
            x2="0%"
            y1="0%"
            y2="100%"
            stops={{
              '0%': '#CDECFE',
              '50%': '#FFFFFF',
              '100%': '#FFCA5C',
            }}
            style={{ width: trackWidth, height: size }}
          >
            <Rect x={0} y={0} width={trackWidth} height={size} />
          </LinearGradient>
        </View>
        <View
          style={[
            styles.text,
            {
              transform: [
                {
                  translateX: -size / 2,
                },
                {
                  translateY: -size / 2,
                },
                {
                  rotate: '-90deg',
                },
              ],
              height: lineHeight,
              width: size,
              left: trackWidth + lineHeight / 2,
              bottom: -lineHeight / 2,
            },
          ]}
        >
          <TYText
            style={[{ fontSize: 12 }, textStyle]}
            ref={(ref: TYText) => {
              this.textRef = ref;
            }}
          >
            {label}: {this.formatPercent(temp)}%
          </TYText>
        </View>

        <Animated.View
          style={{
            position: 'absolute',
            right: trackWidth + 4,
            top: Animated.add(
              -8,
              this.animation.interpolate({
                inputRange: [min, max],
                outputRange: [size, 0],
              })
            ),
          }}
        >
          <Svg width="22" height="16">
            <Path
              ref={(ref: Path) => {
                this.pathRef = ref;
              }}
              d="M2,2L17,2L20,8L17,14L2,14Z"
              stroke="#fff"
              strokeWidth={2}
              fill={color}
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
    alignItems: 'flex-start',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
  },
});

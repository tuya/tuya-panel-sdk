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
   * 色相值
   */
  hue: number;
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
};

export default class HueBrightSlider extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.animation.setValue(this.props.hue);
    this.animation.addListener(this.handleUpdateThumb);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.hue !== this.props.hue) {
      this.needUpdate = true;
    }
  }

  componentDidUpdate() {
    if (this.needUpdate) {
      this.needUpdate = false;
      this.runAnimation(this.props.hue);
    }
  }

  private pathRef: Path;

  private animation: Animated.Value = new Animated.Value(0);

  private needUpdate = false;

  handleUpdateThumb = ({ value }: { value: number }) => {
    const color = ColorUtils.hsb2hex(value, 100, 100);
    const rgb = Color(color).rgbArray();
    this.pathRef &&
      this.pathRef.setNativeProps({ fill: [0, rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, 1] });
  };

  runAnimation(value: number) {
    this.animation.stopAnimation();
    Animated.timing(this.animation, {
      toValue: value,
      duration: 16,
      easing: Easing.linear,
    }).start();
  }

  update(value: number) {
    this.runAnimation(value);
  }

  render() {
    const { size, hue, label, trackWidth, textStyle = { fontSize: 12 } } = this.props;
    const color = ColorUtils.hsv2rgba(hue, 1000, 1000);
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
            gradientId="hue-bright-cross"
            x1="0%"
            x2="0%"
            y1="0%"
            y2="100%"
            stops={{
              '0%': '#FF0000',
              '12%': '#F8CB0E',
              '24%': '#80FE06',
              '36%': '#08FB2B',
              '49%': '#04FAFC',
              '60%': '#0243FC',
              '70%': '#8700F9',
              '82%': '#FC00EF',
              '92%': '#F00A5B',
              '100%': '#FF0000',
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
          <TYText style={[{ fontSize: 12 }, textStyle]}>{label}</TYText>
        </View>

        <Animated.View
          style={{
            position: 'absolute',
            right: trackWidth + 4,
            top: Animated.add(
              -8,
              this.animation.interpolate({
                inputRange: [0, 360],
                outputRange: [0, size],
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

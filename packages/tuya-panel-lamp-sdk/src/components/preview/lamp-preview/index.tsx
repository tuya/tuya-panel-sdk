import React, { Component } from 'react';
import _ from 'lodash';
import Color from 'color';
import { View, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import ColorUtils from '../../../utils/color';

const { convertX: cx } = Utils.RatioUtils;

const defaultProps = {
  /**
   * 开关状态
   */
  power: true,
  /**
   * 工作模式
   */
  workMode: 'white' as 'white' | 'colour' | 'scene',
  /**
   * 彩光值
   */
  colour: { hue: 0, saturation: 1000, value: 1000 },
  /**
   * 白光亮度 dp 值
   */
  bright: 1000,
  /**
   * 色温 dp 值
   */
  temperature: 0,
  /**
   * 当前场景颜色
   */
  sceneColors: [],
  /**
   * 最小色温数值，用于颜色计算
   */
  temperatureMin: 2500,
  /**
   * 最大色温数值，用于颜色计算
   */
  temperatureMax: 7500,
  /**
   * 尺寸
   */
  size: cx(200),
};

type IProps = {
  style?: StyleProp<ViewStyle>;
  lampPic?: string | number;
} & Readonly<typeof defaultProps>;

interface IState {
  halfSize: number;
  middleSize: number;
  halfMiddleSize: number;
  smallSize: number;
  halfSmallSize: number;
  lampOffset: number;
}

const lampSize = cx(160);

export default class LampPreview extends Component<IProps, IState> {
  static defaultProps: IProps = defaultProps;
  constructor(props: IProps) {
    super(props);

    const { size } = this.props;
    const middleSize = size - cx(40);
    const smallSize = middleSize - cx(40);
    this.state = {
      halfSize: size / 2,
      middleSize,
      halfMiddleSize: middleSize / 2,
      smallSize,
      halfSmallSize: smallSize / 2,
      lampOffset: (size - lampSize) / 2,
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.size !== this.props.size) {
      const { size } = this.props;
      const middleSize = size - cx(40);
      const smallSize = middleSize - cx(40);
      this.setState({
        halfSize: size / 2,
        middleSize,
        halfMiddleSize: middleSize / 2,
        smallSize,
        halfSmallSize: smallSize / 2,
        lampOffset: (size - lampSize) / 2,
      });
    }
  }

  shouldComponentUpdate(nextProps: IProps) {
    return !_.isEqual(nextProps, this.props);
  }

  render() {
    const {
      workMode,
      colour,
      lampPic,
      size,
      bright,
      temperature,
      temperatureMax,
      temperatureMin,
      style,
      power,
      sceneColors,
    } = this.props;
    const {
      lampOffset,
      halfMiddleSize,
      halfSmallSize,
      halfSize,
      middleSize,
      smallSize,
    } = this.state;
    let color = '#fff';
    let opacity = 0;
    switch (workMode) {
      case 'white':
        color = ColorUtils.temp2rgb(temperature, { temperatureMin, temperatureMax });
        opacity = ColorUtils.bright2Opacity(bright, { min: 0.5 });
        break;
      case 'colour':
        color = ColorUtils.hsv2rgba(colour.hue, colour.saturation, 1000);
        opacity = ColorUtils.bright2Opacity(colour.value, { min: 0.5 });
        break;
      case 'scene':
        // eslint-disable-next-line no-case-declarations
        const firstColor = sceneColors[0];
        if (firstColor) {
          if (firstColor.temperature || firstColor.brightness) {
            color = ColorUtils.temp2rgb(firstColor.temperature, { temperatureMin, temperatureMax });
            opacity = ColorUtils.bright2Opacity(firstColor.brightness, { min: 0.5 });
          } else {
            color = ColorUtils.hsv2rgba(firstColor.hue, firstColor.saturation, 1000);
            opacity = ColorUtils.bright2Opacity(firstColor.value, { min: 0.5 });
          }
        }
        break;
      default:
    }
    const colorBig = Color(color)
      .alpha(opacity * 0.2)
      .rgbaString();
    const colorMiddle = Color(color)
      .alpha(opacity * 0.5)
      .rgbaString();
    const colorSmall = Color(color).alpha(opacity).rgbaString();
    return (
      <View style={[{ alignItems: 'center' }, style]}>
        <View style={{ width: size, height: size }}>
          {power && (
            <View
              style={[
                styles.circle,
                { width: size, height: size, borderRadius: halfSize, backgroundColor: colorBig },
              ]}
            >
              <View
                style={[
                  styles.circle,
                  {
                    width: middleSize,
                    height: middleSize,
                    borderRadius: halfMiddleSize,
                    backgroundColor: colorMiddle,
                  },
                ]}
              >
                <View
                  style={[
                    styles.circle,
                    {
                      width: smallSize,
                      height: smallSize,
                      borderRadius: halfSmallSize,
                      backgroundColor: colorSmall,
                    },
                  ]}
                />
              </View>
            </View>
          )}
          {lampPic && (
            <Image
              style={[styles.lamp, { top: lampOffset, left: lampOffset }]}
              source={typeof lampPic === 'string' ? { uri: lampPic } : lampPic}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lamp: {
    height: lampSize,
    position: 'absolute',
    width: lampSize,
  },
});

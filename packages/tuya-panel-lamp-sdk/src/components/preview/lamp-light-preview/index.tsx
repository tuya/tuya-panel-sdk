/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import _ from 'lodash';
import Color from 'color';
import { View, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import ColorUtils from '../../../utils/color';

const { convertX: cx } = Utils.RatioUtils;

const defaultProps = {
  /**
   * 工作模式
   */
  workMode: 'white',
  /**
   * 是否亮灯
   */
  power: true,
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
   * 最小色温数值，用于颜色计算
   */
  temperatureMin: 2500,
  /**
   * 最大色温数值，用于颜色计算
   */
  temperatureMax: 7500,
  /**
   * 当前场景颜色
   */
  sceneColors: [],
  /**
   * 光晕图片
   */
  lightPic: require('./res/light.png'),
  /**
   * 灯具图片
   */
  lampPic: require('./res/lamp.png'),
};

type IProps = {
  style?: StyleProp<ViewStyle>;
  lampPic?: string | number;
  lightPic?: string | number;
} & Readonly<typeof defaultProps>;

interface IState {
  halfSize: number;
  middleSize: number;
  halfMiddleSize: number;
  smallSize: number;
  halfSmallSize: number;
  lampOffset: number;
}

const lampSize = cx(320);

export default class LampPreview extends Component<IProps, IState> {
  static defaultProps: IProps = defaultProps;
  shouldComponentUpdate(nextProps: IProps) {
    return !_.isEqual(nextProps, this.props);
  }

  render() {
    const {
      workMode,
      colour,
      style,
      lampPic,
      lightPic,
      bright,
      temperature,
      temperatureMax,
      temperatureMin,
      sceneColors,
      power,
    } = this.props;
    let color;
    let opacity;
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
    const previewColor = Color(color).alpha(opacity).rgbaString();
    return (
      <View style={[{ alignItems: 'center' }, style]}>
        <View style={styles.container}>
          <Image
            style={styles.lamp}
            source={typeof lampPic === 'string' ? { uri: lampPic } : lampPic}
          />
          {power && (
            <Image
              style={[styles.light, { bottom: 0, left: cx(55), tintColor: previewColor }]}
              source={typeof lightPic === 'string' ? { uri: lightPic } : lightPic}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: lampSize,
    justifyContent: 'flex-start',
    width: lampSize,
  },
  lamp: {
    height: lampSize,
    width: lampSize,
  },
  light: {
    height: cx(143),
    position: 'absolute',
    width: cx(210),
  },
});

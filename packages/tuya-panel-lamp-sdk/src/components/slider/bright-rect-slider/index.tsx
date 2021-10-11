import React, { Component } from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import NumberSlider, { NumberSliderProps, numberSliderDefaultProps } from '../number-slider';
import Percent from './Percent';

const { convertX: cx } = Utils.RatioUtils;

interface Props extends NumberSliderProps {
  /**
   * 格式化百分比
   */
  formatPercent?: (value: number) => number;
  /**
   * 图标大小
   */
  iconSize?: number;
  /**
   * 图标颜色
   */
  iconColor?: string;
  /**
   * 百分比样式
   */
  percentStyle?: StyleProp<TextStyle>;
  /**
   * 激活区外百分比颜色
   */
  outPercentColor?: string;
}

export default class PercentSlider extends Component<Props> {
  static defaultProps = numberSliderDefaultProps;
  constructor(props: Props) {
    super(props);
    this.percent = this.formatPercent(this.props.value);
  }

  private percentRef: Percent;
  private percent = 0;
  private thumbPosition = 0;

  formatPercent(value: number) {
    const { formatPercent, min = 10, max = 1000, showMin = min, showMax = max } = this.props;
    if (typeof formatPercent === 'function') {
      return formatPercent(value);
    }
    return Math.round(((value - showMin) * 100) / (showMax - showMin));
  }

  handleThumbChange = (x: number, value: number) => {
    this.thumbPosition = x;
    this.percent = this.formatPercent(value);
    setTimeout(() => {
      if (this.percentRef) {
        this.percentRef.setNativeProps({
          // todo check
          ...this.percentRef.props,
          length: x,
          percent: this.percent,
        });
      } else {
        this.forceUpdate();
      }
    }, 0);
    if (this.props.onThumbChange) {
      this.props.onThumbChange(x, value);
    }
  };

  render() {
    const {
      direction,
      iconSize,
      iconColor,
      percentStyle,
      value,
      style,
      thumbStyle,
      trackStyle,
      tintStyle,
      tintColor,
      outPercentColor,
      reverse,
      ...sliderProps
    } = this.props;
    const isVertical = direction === 'vertical';
    return (
      <NumberSlider
        {...sliderProps}
        direction={direction}
        reverse={reverse}
        tintColor={tintColor}
        value={value}
        trackSlideEnabled
        thumbLimitType="outer"
        style={[isVertical ? styles.sliderVertical : styles.slider, style]}
        trackStyle={[isVertical ? styles.trackVertical : styles.track, trackStyle]}
        thumbStyle={[styles.thumb, thumbStyle]}
        tintStyle={[styles.tint, tintStyle]}
        onThumbChange={this.handleThumbChange}
      >
        <Percent
          ref={(ref: Percent) => {
            this.percentRef = ref;
            return false;
          }}
          percent={this.percent}
          length={this.thumbPosition}
          layout={isVertical ? (reverse ? 'top' : 'bottom') : reverse ? 'right' : 'left'}
          colorOver={tintColor}
          style={[styles.percent, percentStyle]}
          outColor={outPercentColor || '#fff'}
          iconSize={iconSize || 24}
          iconColor={iconColor || '#000'}
        />
      </NumberSlider>
    );
  }
}

const styles = StyleSheet.create({
  percent: {
    color: '#000',
    fontSize: 14,
  },
  slider: {
    height: cx(52),
    width: '100%',
  },
  sliderVertical: {
    height: cx(335),
    width: '100%',
  },
  thumb: {
    opacity: 0,
  },
  tint: {
    borderRadius: 0,
  },
  track: {
    borderRadius: 0,
    height: cx(52),
  },
  trackVertical: {
    borderRadius: 0,
    height: cx(335),
    width: '100%',
  },
});

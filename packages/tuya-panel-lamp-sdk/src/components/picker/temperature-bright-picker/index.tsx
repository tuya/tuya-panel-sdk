import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils, Picker, TYText } from 'tuya-panel-kit';
import TemperaturePicker from '../temperature-picker';

const { convertX } = Utils.RatioUtils;

interface White {
  brightness: number;
  temperature: number;
}

const defaultProps = {
  /**
   * 白光值
   */
  value: { brightness: 1000, temperature: 1000 } as White,
  /**
   * 亮度最小值
   */
  minBrightness: 10,
  /**
   * 亮度最大值
   */
  maxBrightness: 1000,
  /**
   * 色温最小值
   */
  minTemperature: 0,
  /**
   * 色温最大值
   */
  maxTemperature: 1000,
  /**
   * 色温步长
   */
  stepTemperature: 1,
  /**
   * 轨道外圈半径
   */
  radius: convertX(135),
  /**
   * 轨道内圈半径
   */
  innerRadius: convertX(66),
  /**
   * 滑块的半径
   */
  thumbRadius: convertX(16),
  /**
   * 文字大小
   */
  fontSize: 42,
  /**
   * 文字颜色
   */
  fontColor: '#fff',
  /**
   * 显示亮度控制
   */
  showBright: true,
  /**
   * 百分比最小值
   */
  minBrightPercent: 1,
  /**
   * 百分比最大值
   */
  maxBrightPercent: 100,
  /**
   * 亮度百分比步长
   */
  stepBrightPercent: 1,
  /**
   * 色温位置缓存 key
   */
  storageKey: 'temperature_bright_picker',
  /**
   * 值变化事件，仅值有变化时触发
   * @param value
   */
  onChange(value: White) {},
  /**
   * 滑动开始事件
   * @param value
   */
  onGrant(value: White) {},
  /**
   * 滑动过程事件
   * @param value
   */
  onMove(value: White) {},
  /**
   * 滑动结束事件
   * @param value
   */
  onRelease(value: White) {},
  /**
   * 点击轨道事件
   * @param value
   */
  onPress(value: White) {},
};

type DefaultProps = Readonly<typeof defaultProps>;

type Props = {
  style?: any;
  thumbStyle?: number;
  formatValue?: (bright: number) => number;
  formatPercent?: (bright: number) => number;
} & DefaultProps;

export default class TemperatureBrightPicker extends Component<Props> {
  static defaultProps: DefaultProps = defaultProps;
  getPercentItems() {
    const { minBrightPercent, maxBrightPercent, stepBrightPercent } = this.props;
    const items: string[] = [];
    const totalStep = Math.ceil((maxBrightPercent - minBrightPercent) / stepBrightPercent);
    for (let i = 0; i <= totalStep; i++) {
      const percent = i * stepBrightPercent + minBrightPercent;
      items.push(`${Math.min(percent, maxBrightPercent)}`);
    }
    return items;
  }

  formatPercent(value: number) {
    const { maxBrightness, minBrightness, formatPercent } = this.props;
    if (formatPercent) {
      return formatPercent(value);
    }
    return Math.round(((value - minBrightness) * 99) / (maxBrightness - minBrightness) + 1);
  }

  handleGrant = (temperature: number) => {
    const { value } = this.props;
    this.props.onGrant({ ...value, temperature });
  };

  handleMove = (temperature: number) => {
    const { value } = this.props;
    this.props.onMove({ ...value, temperature });
  };

  handleRelease = (temperature: number) => {
    const { value } = this.props;
    this.props.onRelease({ ...value, temperature });
  };

  handlePress = (temperature: number) => {
    const { value } = this.props;
    this.props.onPress({ ...value, temperature });
  };

  handleChange = (temperature: number) => {
    const { value } = this.props;
    this.props.onChange({ ...value, temperature });
  };

  // eslint-disable-next-line consistent-return
  handleChangeBright = (percent: string) => {
    const { maxBrightness, minBrightness, value } = this.props;
    const temp = +percent;
    if (this.props.formatValue) {
      return this.props.formatValue(temp);
    }

    const brightness = Math.round(
      ((temp - 1) * (maxBrightness - minBrightness)) / 99 + minBrightness
    );
    const data = { temperature: value.temperature, brightness };
    this.props.onRelease(data);
    this.props.onChange(data);
  };

  render() {
    const {
      value,
      innerRadius,
      radius,
      thumbRadius,
      minTemperature,
      maxTemperature,
      stepTemperature,
      fontSize,
      fontColor,
      storageKey,
      style,
      showBright,
      ...rest
    } = this.props;
    const innerWidth = fontSize * 2;
    const innerHeight = Math.sqrt(innerRadius ** 2 - (innerWidth / 2) ** 2) * 2;
    const percent = this.formatPercent(value.brightness);
    return (
      <View {...rest} style={[styles.container, style]}>
        <TemperaturePicker
          value={value.temperature}
          radius={radius}
          innerRadius={innerRadius}
          thumbRadius={thumbRadius}
          min={minTemperature}
          max={maxTemperature}
          step={stepTemperature}
          storageKey={storageKey}
          onGrant={this.handleGrant}
          onMove={this.handleMove}
          onRelease={this.handleRelease}
          onPress={this.handlePress}
          onChange={this.handleChange}
        />
        {showBright && (
          <View
            style={{
              width: innerWidth,
              height: innerHeight,
              position: 'absolute',
              justifyContent: 'center',
            }}
          >
            <Picker
              style={{ height: innerHeight }}
              itemStyle={{ height: innerHeight, fontSize, color: fontColor }}
              visibleItemCount={3}
              itemTextColor={fontColor}
              selectedItemTextColor={fontColor}
              textSize={fontSize}
              selectedValue={`${percent}`}
              onValueChange={this.handleChangeBright}
            >
              {this.getPercentItems().map(item => {
                return <Picker.Item key={item} value={item} label={item} />;
              })}
            </Picker>
            <TYText
              style={{
                fontSize: fontSize / 2,
                color: fontColor,
                position: 'absolute',
                left: innerWidth,
              }}
              text="%"
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

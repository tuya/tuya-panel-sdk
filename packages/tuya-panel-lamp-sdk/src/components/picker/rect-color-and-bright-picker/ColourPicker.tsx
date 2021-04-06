import React, { Component } from 'react';
import _ from 'lodash';
import { View, ViewStyle, StyleProp } from 'react-native';
import RectPicker, { ValidBound, ILinear, Point, defaultProps as baseDefualt } from './RectPicker';
import Slider, { IBrightOption } from './Slider';

export interface IHsv {
  hue: number;
  saturation: number;
  value: number;
}

const defaultProps = {
  ...baseDefualt,
  /**
   * 值
   */
  value: { hue: 0, saturation: 1000, value: 1000 } as IHsv,
  /**
   * 色度偏量
   */
  hueOffset: 60,
  /**
   * 亮度配置
   */
  brightOption: {} as IBrightOption,
  /**
   * 是否隐藏亮度调节
   */
  hideBright: false,
  /**
   * 失去焦点时的亮度滑动条颜色
   */
  lossSliderColor: 'rgba(255,255,255,0.4)',
  bgs: [
    {
      colors: [
        { offset: '0%', stopColor: '#FFFC00', stopOpacity: 1 },
        { offset: '18%', stopColor: '#C3FF45', stopOpacity: 1 },
        { offset: '34%', stopColor: '#39DDFC', stopOpacity: 1 },
        { offset: '51%', stopColor: '#6382FC', stopOpacity: 1 },
        { offset: '67%', stopColor: '#FF3FD5', stopOpacity: 1 },
        { offset: '82%', stopColor: '#FE491F', stopOpacity: 1 },
        { offset: '100%', stopColor: '#FFB900', stopOpacity: 1 },
      ],
    },
    {
      x2: '0%',
      y2: '100%',
      colors: [
        { offset: '0%', stopColor: '#fff', stopOpacity: 1 },
        { offset: '24%', stopColor: '#fff', stopOpacity: 0.9 },
        { offset: '100%', stopColor: '#fff', stopOpacity: 0 },
      ],
    },
  ] as ILinear[],
  /**
   * 滑动开始事件
   * @param v
   * @param option
   */
  onGrant(v: any, option?: { isChangeBright: boolean }) {},
  /**
   * 滑动过程事件
   * @param v
   * @param option
   */
  onMove(v: any, option?: { isChangeBright: boolean }) {},
  /**
   * 滑动结束事件
   * @param v
   * @param option
   */
  onRelease(v: any, option?: { isChangeBright: boolean }) {},

  /**
   * 点击事件
   * @param v
   * @param option
   * @version ^0.3.0
   */
  onPress(v: any, option?: { isChangeBright: boolean }) {},
};

type DefaultProps = Readonly<typeof defaultProps>;

type ColourProps = {
  /**
   * 组件的样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 颜色选择区的样式
   */
  rectStyle?: StyleProp<ViewStyle>;
} & DefaultProps;

type IState = IHsv;

export default class ColourPicker extends Component<ColourProps, IState> {
  static defaultProps: DefaultProps = defaultProps;
  constructor(props: ColourProps) {
    super(props);
    this.state = { ...this.props.value };
  }

  componentWillReceiveProps(nextProps: ColourProps) {
    if (!_.isEqual(nextProps.value, this.props.value)) {
      this.setState({ ...nextProps.value });
    }
  }

  shouldComponentUpdate(nextProps: ColourProps, nextState: IState) {
    return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
  }

  onBrightGrant = () => {
    const { hue, saturation, value } = this.state;
    this.firPropsEvent(this.props.onGrant, { hue, saturation, value }, { isChangeBright: true });
  };

  onBrightMove = (value: number) => {
    const { hue, saturation } = this.state;
    this.firPropsEvent(this.props.onMove, { hue, saturation, value }, { isChangeBright: true });
  };

  onBrightRelease = (value: number) => {
    const { hue, saturation } = this.state;
    this.setState({ value });
    this.firPropsEvent(this.props.onRelease, { hue, saturation, value }, { isChangeBright: true });
  };

  onBrightPress = (value: number) => {
    const { hue, saturation } = this.state;
    this.setState({ value });
    this.firPropsEvent(this.props.onPress, { hue, saturation, value }, { isChangeBright: true });
  };

  coorToValue = ({ x, y }: Point, validBound: ValidBound) => {
    const { hueOffset } = this.props;
    const { width, height, x: validStartX, y: validStartY } = validBound;
    const { value } = this.state;
    let hue = Math.round(((x - validStartX) / width) * 360 + hueOffset) % 360;
    const saturation = Math.round(((y - validStartY) / height) * 1000);

    // hueOffset 不等于0时，最左边与最右边的值一样，为确保不会滑到最左边时跳到最右边
    // 滑到最左边时，hue + 1;
    if (hueOffset !== 0) {
      if (Math.abs(x - validStartX) < 1) {
        hue += 1;
      }
    }

    return { hue, saturation, value };
  };

  valueToCoor = (hsv: IHsv, origin: Point, validBound: ValidBound): Point => {
    const { hueOffset } = this.props;
    const { width, height, x: validStartX, y: validStartY } = validBound;
    const { hue, saturation } = hsv;
    let x = ((hue - hueOffset) / 360) * width;
    if (x <= 0) {
      x = width + x;
    }
    const y = (saturation / 1000) * height;

    return { x: x + validStartX, y: y + validStartY };
  };

  valueToColor = (): string => {
    return 'transparent';
  };

  firPropsEvent(cb: (params?: any) => void, ...args: any[]) {
    typeof cb === 'function' && cb(...args);
  }

  handlePickerGrant = () => {
    const { hue, saturation, value } = this.state;
    this.firPropsEvent(this.props.onGrant, { hue, saturation, value });
  };

  handlePickerMove = (hsv: IHsv) => {
    this.firPropsEvent(this.props.onMove, hsv);
  };

  handlePickerRelease = (hsv: IHsv) => {
    this.setState({ ...hsv });
    this.firPropsEvent(this.props.onRelease, hsv);
  };

  handlePickerPress = (hsv: IHsv) => {
    this.setState({ ...hsv });
    this.firPropsEvent(this.props.onPress, hsv);
  };

  initData = async () => {};
  render() {
    const {
      style,
      rectStyle,
      brightOption,
      lossShow,
      lossSliderColor,
      clickEnabled,
      hideBright,
      ...pickerProps
    } = this.props;
    const { hue, saturation, value: bright } = this.state;
    const sliderProps: any = {};
    if (lossShow) {
      sliderProps.activeColor = lossSliderColor;
    }
    return (
      <View style={[{ flex: 1 }, style]}>
        <RectPicker
          coorToValue={this.coorToValue}
          valueToColor={this.valueToColor}
          valueToCoor={this.valueToCoor}
          value={{ hue, saturation, value: bright }}
          lossShow={lossShow}
          clickEnabled={clickEnabled}
          {...pickerProps}
          style={rectStyle}
          onGrant={this.handlePickerGrant}
          onMove={this.handlePickerMove}
          onRelease={this.handlePickerRelease}
          onPress={this.handlePickerPress}
          initData={this.initData}
        />
        {!hideBright && (
          <Slider
            {...brightOption}
            {...sliderProps}
            value={bright}
            clickEnabled={clickEnabled}
            onGrant={this.onBrightGrant}
            onMove={this.onBrightMove}
            onRelease={this.onBrightRelease}
            onPress={this.onBrightPress}
          />
        )}
      </View>
    );
  }
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet, LayoutChangeEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { Svg, Path } from 'react-native-svg';
import NumberSlider, { NumberSliderProps, numberSliderDefaultProps } from '../number-slider';

interface Props extends NumberSliderProps {
  /**
   * 百分比格式化方法
   */
  formatPercent?: (value: number) => number;
  /**
   * 百分比样式
   */
  percentStyle?: StyleProp<TextStyle>;
  /**
   * 组件样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 组件中滑动样式
   */
  sliderStyle?: StyleProp<ViewStyle>;
  /**
   * 是否仅显示滑动条，不需要显示百分比
   */
  onlyScale?: boolean;
  /**
   * 刻度的个数
   */
  linesNum?: number;
  /**
   * 刻度线的宽
   */
  lineWidth?: number;
  /**
   * 百分比相对滑动条的位置
   * 当 direction 为 坚直方向时，其值可为 left 和 right，默认为 right
   * 当 direction 为 水平方向时，其值可为 top 和 bottom，默认为 top
   */
  layout?: 'left' | 'right' | 'top' | 'bottom';
}

interface State {
  isLoaded: boolean;
}

const positionReverseKey = {
  top: 'bottom',
  left: 'right',
  bottom: 'top',
  right: 'left',
};

/**
 * 带百分比的刻度滑动条组件
 * 注:刻度的高由轨道高度限定
 */
export default class ScaleSlider extends Component<Props, State> {
  static defaultProps = numberSliderDefaultProps;
  constructor(props: Props) {
    super(props);
    this.state = { isLoaded: false };
    this.countTextWidth(props.percentStyle);
    this.percent = this.formatPercent(this.props.value);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: Props) {
    if (!_.isEqual(nextProps, this.props)) {
      this.needUpdatePercent = true;
    }
    this.countTextWidth(nextProps.percentStyle);
  }

  componentDidUpdate() {
    if (this.needUpdatePercent) {
      this.handleThumbChange(this.percentInfo.x, this.percentInfo.value);
    }
    this.needUpdatePercent = false;
  }

  getLinePath(offset: number) {
    const { direction, lineWidth = 2 } = this.props;
    const { trackWidth, trackHeight } = this;
    const isVertical = direction === 'vertical';
    const radius = lineWidth / 2;
    if (isVertical) {
      return `M${
        trackWidth - radius
      },${offset}L${radius},${offset}A${radius} ${radius} 0 0 0 ${radius} ${lineWidth + offset}L${
        trackWidth - radius
      },${lineWidth + offset}A${radius} ${radius} 0 0 0 ${trackWidth - radius} ${offset}z`;
    }
    return `M${offset},${radius}L${offset},${trackHeight - radius}A${radius} ${radius} 0 0 0 ${
      lineWidth + offset
    } ${trackHeight - radius}L${
      lineWidth + offset
    },${radius}A${radius} ${radius} 0 0 0 ${offset} ${radius}z`;
  }

  private percentRef: TYText;
  private trackWidth = 0;
  private trackHeight = 0;
  private needUpdatePercent = false;
  private percentInfo: { x: number; value: number } = { x: 0, value: 0 };
  private percent = 0;
  private textHeight = 0;

  countTextWidth(style: StyleProp<TextStyle>) {
    const textStyle = [styles.percent, style];
    const { fontSize, height } = StyleSheet.flatten(textStyle);
    this.textHeight = typeof height === 'number' ? height : fontSize * 1.5;
  }

  formatPercent(value: number) {
    const { formatPercent, min = 0, max = 1000, showMin = min, showMax = max } = this.props;
    if (typeof formatPercent === 'function') {
      return formatPercent(value);
    }
    return Math.round(((value - showMin) * 100) / (showMax - showMin));
  }

  handleThumbChange = (x: number, value: number) => {
    this.percentInfo.x = x;
    this.percentInfo.value = value;
    if (this.percentRef) {
      this.handlePercentUpdate(x, value);
    } else {
      this.needUpdatePercent = true;
    }
    if (this.props.onThumbChange) {
      this.props.onThumbChange(x, value);
    }
  };

  handlePercentUpdate(x: number, value: number) {
    if (this.percentRef) {
      this.percent = this.formatPercent(value);
      const { direction, reverse, percentStyle, layout } = this.props;
      const { fontSize } = StyleSheet.flatten([styles.percent, percentStyle]);
      const percentText = `${this.percent}%`;
      // 文字宽度计算，注意不同字体，此计算可能有出入
      let realTextWidth = fontSize * (percentText.length - 0.5);
      if (percentText.indexOf('1') >= 0) {
        realTextWidth -= fontSize / 2;
      }
      const isVertical = direction === 'vertical';
      let key = reverse ? 'right' : 'left';
      let layoutKey = layout === 'bottom' ? 'bottom' : 'top';
      const MaxPosition = isVertical
        ? this.trackHeight - this.textHeight
        : this.trackWidth - realTextWidth;
      let position = x - realTextWidth / 2;
      if (isVertical) {
        position = x - this.textHeight / 2;
        key = reverse ? 'top' : 'bottom';
        layoutKey = layout === 'left' ? 'left' : 'right';
      }
      position = Math.max(0, Math.min(position, MaxPosition));
      // @ts-ignore
      this.percentRef.setText(`${this.percent}%`);
      // @ts-ignore
      this.percentRef.setNativeProps({
        style: {
          minWidth: realTextWidth,
          [key]: position,
          [positionReverseKey[key]]: 'auto',
          [layoutKey]: isVertical ? -realTextWidth : -this.textHeight,
          [positionReverseKey[layoutKey]]: 'auto',
        },
      });
      this.needUpdatePercent = false;
    }
  }

  handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    this.trackWidth = width;
    this.trackHeight = height;
    if (!this.state.isLoaded) {
      this.setState({ isLoaded: true });
    } else {
      this.forceUpdate();
    }
  };

  renderTrack = () => {
    if (this.state.isLoaded) {
      const {
        direction,
        trackColor = 'rgba(255,255,255,.4)',
        linesNum = 10,
        lineWidth = 2,
      } = this.props;
      const { trackWidth, trackHeight } = this;
      const isVertical = direction === 'vertical';
      const totalLength = isVertical ? trackHeight : trackWidth;
      const num = (linesNum < 2 ? 2 : linesNum) - 1; // 共分几份
      const lineSpace = totalLength / num;
      return (
        <Svg width={trackWidth} height={trackHeight}>
          {[...new Array(num + 1).keys()].map((index: number) => {
            let offset = index * lineSpace - lineWidth / 2;
            if (index === 0) {
              offset = 0;
            } else if (index === num) {
              offset -= lineWidth / 2;
            }
            return <Path key={index} d={this.getLinePath(offset)} fill={trackColor} />;
          })}
        </Svg>
      );
    }
    return null;
  };

  render() {
    const {
      direction,
      percentStyle,
      value,
      style,
      sliderStyle,
      trackStyle,
      thumbStyle,
      onlyScale,
      ...sliderProps
    } = this.props;
    const { isLoaded } = this.state;
    const isVertical = direction === 'vertical';
    return (
      <View style={[isVertical ? styles.containerVertical : styles.container, style]}>
        {!onlyScale && isLoaded && (
          <TYText
            ref={(ref: TYText) => {
              this.percentRef = ref;
              return false;
            }}
            style={[styles.percent, percentStyle]}
            text={`${this.percent}%`}
          />
        )}
        <NumberSlider
          {...sliderProps}
          direction={direction}
          value={value}
          trackSlideEnabled
          style={[isVertical ? styles.sliderVertical : styles.slider, sliderStyle]}
          showTint={false}
          trackColor="transparent"
          renderTrack={this.renderTrack}
          trackStyle={[isVertical ? styles.trackVertical : styles.track, trackStyle]}
          thumbStyle={[isVertical ? styles.thumbVertical : styles.thumb, thumbStyle]}
          thumbLimitType="inner" // 定死
          onThumbChange={this.handleThumbChange}
          onTrackLayout={this.handleLayout}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
  },
  containerVertical: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
  },
  percent: {
    fontSize: 12,
    // todo default height need check
    height: 20,
    position: 'absolute',
    textAlign: 'center',
  },
  slider: {
    height: 36,
  },
  sliderVertical: {
    width: 36,
  },
  thumb: {
    height: 22,
    width: 2,
  },
  thumbVertical: {
    height: 2,
    width: 22,
  },
  track: {
    borderRadius: 0,
    height: 11,
  },
  trackVertical: {
    borderRadius: 0,
    width: 11,
  },
});

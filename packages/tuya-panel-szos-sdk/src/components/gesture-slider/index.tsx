import React, { useMemo, useRef, useState, memo } from 'react';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { View, StyleSheet, ViewStyle, Image, ImageStyle } from 'react-native';
import Res from '../../res';
import { Utils } from 'tuya-panel-kit';
const { color: UColor } = Utils.ColorUtils;

const { convertY: cy, convertX: cx } = Utils.RatioUtils;

interface Date {
  step: number;
}
interface Props {
  style?: ViewStyle;
  onChange?: (data: Date) => void;
  defaultValue?: number;
  thumbStyle?: ImageStyle;
  outerTrackStyle?: ViewStyle; //外轨道
  innerTrackStyle?: ViewStyle; //内轨道
  stepPointStyle?: ViewStyle; //步点样式
  value?: number; //值，设置后由外部控制
  minValue?: number; //最小值
  maxValue?: number; //最大值
  stepValue?: number; //步长。必须可被 minValue 和 maxValue 整除
  thumbWidth?: number; //thumb宽
  stepPointWidth?: number; //步点宽
  renderThumb?: React.ReactElement; //自定义thumb
  width?: number; //外轨道长度
  height?: number; //外轨道高度
  scaleColor?: string; //刻度底色
  scaleSpace?: number; //刻度间距
}

const GestureSlider: React.FC<Props> = props => {
  const {
    style,
    onChange,
    defaultValue,
    value,
    thumbStyle,
    minValue,
    maxValue,
    outerTrackStyle,
    innerTrackStyle,
    width,
    thumbWidth,
    stepPointStyle,
    height,
    scaleSpace,
    scaleColor,
  } = props;
  const min = useMemo(() => minValue || 0, [minValue]);
  const max = useMemo(() => (maxValue || maxValue === 0 ? maxValue : 12 * 60), [maxValue]);
  const _thumbWidth = useMemo(() => thumbWidth || cy(10), [thumbWidth]);
  const _width = useMemo(() => width || cx(303), [width]);
  const _height = useMemo(() => height || cy(60), [height]);
  const _scaleColor = useMemo(() => scaleColor || '#1B0A45', [scaleColor]);
  const _scaleSpace = useMemo(() => scaleSpace || 8, [scaleSpace]);
  const scaleWidth = (max - min) * _scaleSpace + 1;
  const scaleCount = max - min + 1;
  const stepDist = (scaleWidth - 1) / (scaleCount - 1) - 1;
  const distRef = useRef((value || defaultValue || 0) * (stepDist + 1) + 0.5);
  const [scaleDist, setScaleDist] = useState((value || defaultValue || 0) * (stepDist + 1) + 0.5);

  const stop = (absoluteX: number, absoluteY: number) => {
    // 手势往左就是加大数据，往右减小数据
    const dist = absoluteX - beginRef.current.x; //16ms移动的距离，负往左，正往右
    let currentDist = distRef.current;
    currentDist -= dist;
    if (currentDist < 0.5) {
      currentDist = 0.5;
    } else if (currentDist > scaleWidth - 0.5) {
      currentDist = scaleWidth - 0.5;
    }
    const step = Math.floor(currentDist / (stepDist + 1)) + min;
    onChange && onChange({ step: step });
    distRef.current = currentDist;
    //记录最后的位置，给下次计算用
    beginRef.current = { x: absoluteX, y: absoluteY };
    value === undefined && setScaleDist(() => currentDist - (currentDist % (stepDist + 1)) + 0.5);
  };
  const beginRef = useRef({ x: 0, y: 0 });
  // 手势状态
  const onHandlerStateChange = ({ nativeEvent }) => {
    const { state, absoluteX, absoluteY } = nativeEvent;
    if (state === State.BEGAN) {
      beginRef.current = { x: absoluteX, y: absoluteY };
    }
  };
  const onPanGestureEvent = ({ nativeEvent }) => {
    const { absoluteX, absoluteY } = nativeEvent;
    stop(absoluteX, absoluteY);
  };
  return (
    <View style={[styles.root, { width: _width, height: _height }, style]}>
      <Image
        source={Res.icon_sign}
        style={[
          styles.thumbStyle,
          thumbStyle,
          {
            left: _width / 2 - _thumbWidth / 2,
            width: _thumbWidth,
          },
        ]}
      />
      <PanGestureHandler
        onHandlerStateChange={e => onHandlerStateChange(e)}
        onGestureEvent={e => onPanGestureEvent(e)}
      >
        <View style={[styles.outerTrackStyle, outerTrackStyle]}>
          <View
            style={[
              styles.innerTrackStyle,
              {
                width: scaleWidth + _width,
                paddingHorizontal: _width / 2,
                transform: [
                  { translateX: -(value ? (value - min) * (stepDist + 1) + 0.5 : scaleDist) },
                ],
              },
              innerTrackStyle,
            ]}
          >
            {Array.from({ length: scaleCount }, (c, i) => {
              const sortNumber = i + 1;
              return (
                <View
                  key={i}
                  style={[
                    styles.stepPointStyle,
                    {
                      backgroundColor: UColor.hex2RgbString(
                        _scaleColor,
                        sortNumber % 10 === 0 ? 0.3 : 0.2
                      ),
                      height:
                        sortNumber % 10 === 0 ? cy(46) : sortNumber % 5 === 0 ? cy(28) : cy(24),
                    },
                    stepPointStyle,
                  ]}
                />
              );
            })}
          </View>
        </View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: cy(60),
    width: cx(303),
  },
  outerTrackStyle: {
    height: cy(46),
    width: cx(303),
    marginTop: cy(14),
  },
  innerTrackStyle: {
    height: cy(46),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  stepPointStyle: {
    width: 1,
  },
  thumbStyle: {
    height: cy(7),
    width: cy(10),
    top: 0,
    position: 'absolute',
  },
});
GestureSlider.defaultProps = {
  style: {},
  onChange: () => {},
  defaultValue: 0,
  value: undefined,
  thumbStyle: {},
  minValue: 0,
  maxValue: 12 * 60,
  outerTrackStyle: {},
  innerTrackStyle: {},
  width: cx(303),
  thumbWidth: cy(10),
  stepPointStyle: {},
  height: cy(60),
  scaleSpace: 8,
  scaleColor: '#1B0A45',
};
export default memo(GestureSlider);

import React, { useMemo, useRef, useState, memo, useEffect } from 'react';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import {
  View,
  StyleSheet,
  ViewStyle,
  Image,
  ImageStyle,
  ViewComponent,
  TextComponent,
  ImageComponent,
} from 'react-native';
import { Utils } from 'tuya-panel-kit';
import Res from '../../res';

const { convertY: cy, convertX: cx } = Utils.RatioUtils;

interface Date {
  step: number;
}
interface Props {
  style?: ViewStyle;
  onChange?: (data: Date) => void;
  defaultValue?: number;
  thumbStyle?: ImageStyle;
  outerTrackStyle?: ViewStyle; // 外轨道
  innerTrackStyle?: ViewStyle; // 内轨道
  stepPointStyle?: ViewStyle; // 步点样式
  value?: number; // 值，设置后由外部控制
  minValue?: number; // 最小值
  maxValue?: number; // 最大值
  thumbWidth?: number; // thumb宽
  width?: number; // 外轨道长度
  height?: number; // 外轨道高度
  scaleColor?: string | string[]; // 刻度底色
  scaleSpace?: number; // 刻度间距
  customThumb?: ViewComponent | TextComponent | ImageComponent; // 自定义游标
  scaleHeight?: number[] | number; // 刻度高度,可以是数组,数组最多为三个值,为number表示高度一样
}

// 默认刻度高度
const ScaleHeight = [cy(46), cy(28), cy(24)];
// 默认刻度颜色
const ScaleColor = '#1B0A45';
const GestureSlider: React.FC<Props> = (props: Props) => {
  const {
    style = {},
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
    customThumb,
    scaleHeight,
  } = props;
  const min = useMemo(() => minValue || 0, [minValue]); // 刻度最小值
  const max = useMemo(() => (maxValue || maxValue === 0 ? maxValue : 12 * 60), [maxValue]); // 刻度最大值
  const _thumbWidth = useMemo(() => thumbWidth || cy(10), [thumbWidth]);
  const _width = useMemo(() => width || cx(303), [width]); // 刻度条
  const _height = useMemo(() => height || cy(60), [height]);
  const _scaleSpace = useMemo(() => scaleSpace || 8, [scaleSpace]);
  const scaleWidth = (max - min) * _scaleSpace + 1; // 刻度条的总宽度
  const scaleCount = max - min + 1; // 当前刻度数量
  const stepDist = (scaleWidth - 1) / (scaleCount - 1) - 1; // 位置相对的值
  const distRef = useRef((value || defaultValue || 0) * (stepDist + 1) + 0.5); // 位置
  const [scaleDist, setScaleDist] = useState((value || defaultValue || 0) * (stepDist + 1) + 0.5); // 通过useState更新界面
  // 刻度颜色
  const _scaleColor = useMemo(() => {
    if (typeof scaleColor === 'string') {
      return [scaleColor, scaleColor, scaleColor] as string[];
    }
    const defaultScaleColor = Array(3).fill(ScaleColor);
    if (scaleColor instanceof Array) {
      return defaultScaleColor.map((c, i) => {
        return scaleColor[i] || c;
      });
    }
    return defaultScaleColor;
  }, [scaleColor]);
  // 刻度高度
  const _scaleHeight = useMemo(() => {
    if (typeof scaleHeight === 'number') {
      return [scaleHeight, scaleHeight, scaleHeight] as number[];
    }
    if (scaleHeight instanceof Array) {
      return ScaleHeight.map((c, i) => {
        return scaleHeight[i] || c;
      });
    }
    return ScaleHeight;
  }, [scaleHeight]);

  const stop = (absoluteX: number, absoluteY: number) => {
    // 手势往左就是加大数据，往右减小数据
    const dist = absoluteX - beginRef.current.x; // 16ms移动的距离，负往左，正往右
    let currentDist = distRef.current; // 保存上一次的位置
    currentDist -= dist; // 针对变化,更新位置
    // 控制边界
    if (currentDist < 0.5) {
      currentDist = 0.5;
    } else if (currentDist > scaleWidth - 0.5) {
      currentDist = scaleWidth - 0.5;
    }
    // 算出值
    const step = Math.floor(currentDist / (stepDist + 1)) + min;
    // 回调onChange
    onChange && onChange({ step });
    // 更新位置distRef
    distRef.current = currentDist;
    // 记录最后的位置，给下次计算用
    beginRef.current = { x: absoluteX, y: absoluteY };
    // 不可控的由stop修改
    value === undefined && setScaleDist(currentDist - (currentDist % (stepDist + 1)) + 0.5);
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
  // 可控
  useEffect(() => {
    value !== undefined && setScaleDist((value - min) * (stepDist + 1) + 0.5);
  }, [value, min, stepDist]);
  return (
    <View style={[styles.root, { width: _width, height: _height }, style]}>
      <View
        style={[
          styles.thumbBoxStyle,
          {
            // left: _width / 2 - _thumbWidth / 2,
          },
        ]}
      >
        {customThumb || (
          <Image
            source={Res.icon_sign}
            style={[
              styles.thumbStyle,
              thumbStyle,
              {
                width: _thumbWidth,
              },
            ]}
          />
        )}
      </View>
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
                transform: [{ translateX: -scaleDist }],
              },
              innerTrackStyle,
            ]}
          >
            {Array.from({ length: scaleCount }, (c, i) => {
              const sortNumber = i + min;
              let color = _scaleColor[2];
              // eslint-disable-next-line no-shadow
              let height = _scaleHeight[2];
              if (sortNumber % 10 === 0) {
                color = _scaleColor[0];
                height = _scaleHeight[0];
              } else if (sortNumber % 5 === 0) {
                color = _scaleColor[1];
                height = _scaleHeight[1];
              }
              return (
                <View
                  key={i}
                  style={[
                    styles.stepPointStyle,
                    {
                      backgroundColor: color,
                      height,
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
  innerTrackStyle: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    height: cy(46),
    justifyContent: 'space-between',
  },
  outerTrackStyle: {
    height: cy(46),
    marginTop: cy(14),
    width: cx(303),
  },
  root: {
    height: cy(60),
    width: cx(303),
  },
  stepPointStyle: {
    width: 1,
  },
  thumbBoxStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  thumbStyle: {
    height: cy(7),
    top: 0,
    width: cy(10),
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
  customThumb: undefined,
  scaleHeight: ScaleHeight,
};
export default memo(GestureSlider);

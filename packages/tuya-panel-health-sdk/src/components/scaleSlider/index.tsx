import React, { FC, useRef, useMemo, useEffect } from 'react';
import { View, PanResponder } from 'react-native';
import { Utils, TYText, IconFont } from 'tuya-panel-kit';
import useMergeProps from '../../hooks/useMergeProps';
import useMergeValue from '../../hooks/useMergeValue';
import { ScaleSliderProps } from './interface';
import { getOffset, getPrecision } from './utils';
import styles from './style';

import { isUndefined, isFunction } from '../../utils/is';
import { plus } from '../../utils/number-precision';
import { arrowBottomPath } from './icons';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;

// 线间距
const SCALE_SPACE = 8;

const defaultProps: ScaleSliderProps = {
  max: 30,
  min: 0,
  step: 1,
  color: '#A699FF',
  width: 375,
};

const ScaleSlider: FC<ScaleSliderProps> = baseProps => {
  const props = useMergeProps<ScaleSliderProps>(baseProps, defaultProps);
  const { min, max, step, disabled, color, width, style } = props;
  const precision = useMemo(() => getPrecision(step), [step]);
  // 受控非受控处理
  const [value, setValue] = useMergeValue<number>(min, {
    defaultValue: props.defaultValue,
    value: props.value,
  });
  // 刻度个数
  const stepsLength = Math.floor((max - min) / step);
  const scaleWidth = stepsLength * SCALE_SPACE;

  // 获取值偏移量
  const offset = getOffset(value, [min, max]);

  //  ref
  // 记录下上次滑动的距离
  const lastDiff = useRef<number>(0);
  const lastVal = useRef<number>(value);

  useEffect(() => {
    lastDiff.current = offset * scaleWidth;
  }, []);
  useEffect(() => {
    lastVal.current = value;
  }, [value]);

  // 通过坐标获取值
  function getValueByCoords(x: number, y: number): number {
    const roadLength = scaleWidth;
    let diff = -(x - lastDiff.current);
    diff = diff < 0 ? 0 : diff > roadLength ? roadLength : diff;
    const stepLen = (roadLength * step) / (max - min);
    const steps = Math.round(diff / stepLen);
    return plus(min, steps * step);
  }

  // 判断值是否在[min, max]区间内，并且满足步长或是标签值
  function getLegalValue(val: number): number {
    if (isUndefined(val)) return min;
    if (val <= min) return min;
    if (val >= max) return max;

    const steps = Math.round(val / step);
    return parseFloat(Number(steps * step).toFixed(precision));
  }

  function onChange(val) {
    lastVal.current = val;
    setValue(val);
    if (isFunction(props.onChange)) {
      props.onChange(val);
    }
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // const { moveX, moveY } = gestureState;
      },
      onPanResponderMove: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        const newVal = getValueByCoords(dx, dy);
        onChange(getLegalValue(newVal));
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        const newVal = getValueByCoords(dx, dy);
        const lastOffset = getOffset(newVal, [min, max]);
        lastDiff.current = lastOffset * scaleWidth;

        if (isFunction(props.onRelease)) {
          props.onRelease(lastVal.current);
        }
      },
    })
  ).current;
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.pointWrap}>
        <IconFont d={arrowBottomPath} color={color} width={14} height={8} />
      </View>
      <View style={styles.outer} {...panResponder.panHandlers}>
        <View
          style={[
            styles.inner,
            {
              width: scaleWidth + width,
              paddingHorizontal: width / 2,
              transform: [{ translateX: -(offset * scaleWidth) }],
            },
          ]}
        >
          {Array.from({ length: stepsLength }, (c, i) => {
            const sortNumber = i;
            return (
              <View
                key={i}
                style={[
                  styles.item,
                  {
                    backgroundColor: color,
                    height: sortNumber % 10 === 0 ? cy(46) : sortNumber % 5 === 0 ? cy(28) : cy(24),
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default ScaleSlider;

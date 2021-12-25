import React, { FC, useRef } from 'react';
import { View, PanResponder } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
// import { plus } from 'number-precision';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';
import useMergeProps from '../utils/hooks/useMergeProps';
import useMergeValue from '../utils/hooks/useMergeValue';
import { ScaleSliderProps } from './interface';
import { getOffset } from './utils';
import styles from './style';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;

// 线间距
const SCALE_SPACE = 8;

const defaultProps: ScaleSliderProps = {
  max: 30,
  min: 0,
  step: 1,
};

const ScaleSlider: FC<ScaleSliderProps> = baseProps => {
  const props = useMergeProps<ScaleSliderProps>(baseProps, defaultProps);
  const { min, max, step, disabled, style } = props;

  // 受控非受控处理
  const [value, setValue] = useMergeValue<number>(min, {
    defaultValue: props.defaultValue,
    value: props.value,
  });

  // 线个数
  const stepsLength = Math.floor((max - min) / step);
  // 刻度宽度
  const scaleWidth = stepsLength * SCALE_SPACE;

  // 获取值偏移量
  const offset = getOffset(value, [min, max]);

  //  ref
  const position = useRef({
    left: 0,
    top: 0,
  });

  // 通过坐标获取值
  function getValueByCoords(x: number, y: number): number {
    const { left, top } = position.current;
    const roadLength = scaleWidth;
    let diff = x - left;

    console.log('difff====', x, left, diff);
    diff = diff < 0 ? 0 : diff > roadLength ? roadLength : diff;
    const stepLen = (roadLength * step) / (max - min);
    const steps = Math.round(diff / stepLen);

    return min + steps * step;
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        const { moveX, moveY } = gestureState;
        // add code here
        // position.current = { left: moveX, top: moveY };
        console.log('move start ', evt, gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        // add code here
        const { moveX, moveY } = gestureState;
        const v = getValueByCoords(moveX, moveY);
        setValue(v);
        //
        console.log('move move ', v, moveX);
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { moveX, moveY } = gestureState;
        // position.current = { left: moveX, top: moveY };
        console.log('move end ', evt, gestureState);
      },
    })
  ).current;

  console.log(offset, value, 'dsds=======');
  return (
    <View style={styles.wrapper}>
      <TYText> 当前值{value}</TYText>
      <View style={styles.outer} {...panResponder.panHandlers}>
        <View
          style={[
            styles.inner,
            {
              width: scaleWidth,
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
                    backgroundColor: '#333',
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

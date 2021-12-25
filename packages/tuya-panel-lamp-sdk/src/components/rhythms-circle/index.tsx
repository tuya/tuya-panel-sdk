/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-lonely-if */
/* eslint-disable react/default-props-match-prop-types */
import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Image,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import ConicalGradient from '../gradient/conical-gradient';
import Res from '../../res';
import { IData, RhythmsCircleProps } from './interface';

const totalTime = 24 * 60;
const fullDeg = Math.PI * 2;

// 获取图标的x,y坐标
const getPoint = (deg: number, radius: number, center: number) => {
  return {
    x: -radius * Math.sin(deg) + center,
    y: radius * Math.cos(deg) + center,
  };
};

const RhythmsCircle: React.FC<RhythmsCircleProps> = props => {
  const {
    thumbSize,
    thumbStyle,
    disabled,
    disabledOpacity,
    iconStyle,
    timeStyle,
    pickerStyle,
    timeImg,
    lastRingColor,
    defaultTintColor,
    stepTime,
  } = props;
  const dragEnabled = useRef(false);

  const markRefs = useRef<any>([]).current;

  const markImgRefs = useRef<any>([]).current;

  const dragIndex = useRef(0);

  const outerRadius = useRef(props.size / 2);

  const size = useRef(props.size);

  const ringWidth = useRef(props.ringWidth);

  const innerSize = useRef(props.size - props.ringWidth * 2);

  const innerRadius = useRef(innerSize.current / 2);

  const ringRadius = useRef((innerRadius.current + outerRadius.current) / 2);

  const ringRef = useRef<ConicalGradient>();

  const _panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: e => handleSetPanResponder(e),
        // onMoveShouldSetPanResponder: () => !props.disabled && this.dragEnabled,
        // 另一个组件成为新的响应者
        onPanResponderTerminationRequest: () => !(!props.disabled && dragEnabled.current),
        onPanResponderGrant: () => onGrant,
        onPanResponderMove: (e, g) => onMove(e, g),
        onPanResponderRelease: (e, g) => onRelease(e, g),
      }),
    [props]
  );

  const initData = (v: RhythmsCircleProps) => {
    const { data } = v;
    return {
      data: data.map(({ index, time, icon, color }) => ({
        index,
        time,
        icon,
        color,
        deg: (time / totalTime) * fullDeg,
      })),
    };
  };

  const [allData, setAllData] = useState(() => initData(props));

  useEffect(() => {
    size.current = props.size;
    ringWidth.current = props.ringWidth;
    innerSize.current = props.size - props.ringWidth * 2;
    innerRadius.current = innerSize.current / 2;
    outerRadius.current = props.size / 2;
    ringRadius.current = (innerRadius.current + outerRadius.current) / 2;
  }, [props.size, props.ringWidth]);

  useEffect(() => {
    setAllData(() => initData(props));
  }, [props.data]);

  // 极坐标的渐变色
  const getRingColors = (data: IData[]) => {
    const colors = data.map(({ index, time, color }) => ({
      color,
      angle: (time / totalTime) * fullDeg,
    }));

    // 在日落节点后多加一个颜色节点优化显示
    colors.push({
      color: lastRingColor,
      angle: ((data[0].time - 60) / totalTime) * fullDeg,
    });

    colors.sort((a, b) => {
      return a.angle - b.angle;
    });
    return colors;
  };

  const getTintColor = (index: number) => {
    let tintColor = defaultTintColor;
    switch (index) {
      case 0:
        tintColor = '#F7EB2A';
        break;
      case 1:
        tintColor = '#FFB420';
        break;
      case 2:
        tintColor = '#54FFC6';
        break;
      case 3:
        tintColor = '#3391FF';
        break;
      case 4:
        tintColor = '#3391FF';
        break;
      default:
        break;
    }
    return tintColor;
  };
  // 是否成为响应者
  const handleSetPanResponder = useCallback(
    (e: GestureResponderEvent) => {
      // 如果传过来的disabled属性为true,则返回false阻止成为响应者
      if (disabled) {
        return false;
      }
      // 拿到触摸点相对于父元素的横纵坐标
      const { locationX, locationY } = e.nativeEvent;
      const { data } = allData;
      let selectIndex = -1;
      const exist = data.some(({ deg }, index) => {
        const { x, y } = getPoint(deg, ringRadius.current, outerRadius.current);
        const length = Math.sqrt((x - locationX) ** 2 + (y - locationY) ** 2);
        if (length <= thumbSize / 2) {
          selectIndex = index;
          dragEnabled.current = true;
          return true;
        }
        return false;
      });
      dragIndex.current = selectIndex;
      if (exist) {
        return true;
      }
      return true;
    },
    [thumbSize, disabled, allData.data]
  );

  const moveMark = useCallback(
    ({ dx, dy }: PanResponderGestureState, callback: Function, needUpdateState: boolean) => {
      const { data } = allData;
      const dragInx = dragIndex.current;
      const rinRad = ringRadius.current;
      const outRad = outerRadius.current;
      const mark = data[dragInx];
      const markRef = markRefs[dragInx];
      if (!mark || !markRef) {
        return;
      }

      const markImgRef = markImgRefs[dragInx];
      markImgRef.setNativeProps({
        style: {
          tintColor: getTintColor(dragInx),
        },
      });
      const { deg } = mark;
      const { x, y } = getPoint(deg, rinRad, outRad);
      const newX = x + dx;
      const newY = y + dy;
      const length = Math.sqrt((newX - outRad) ** 2 + (newY - outRad) ** 2);
      let angle = Math.acos((newY - outRad) / length);
      if (newX > outRad) {
        angle = fullDeg - angle;
      }

      // 角度对应的时间
      let time = Math.floor((angle * totalTime) / fullDeg);
      // console.log('time1', time);
      // 是否是允许的时间范围
      time = handleStepOver(time);
      // console.log('time2', time);
      // 转回成角度，确保不出现跳动问题
      angle = (time / totalTime) * fullDeg;
      const point = getPoint(angle, rinRad, outRad);
      markRef.setNativeProps({
        style: {
          top: point.y,
          left: point.x,
        },
      });

      const newData = data.map((item, index) => {
        if (index !== dragInx) {
          return item;
        }
        return {
          ...item,
          deg: angle,
          time,
        };
      });
      callback && callback(newData, dragInx);
      // onChange
      console.log('newData---', newData);
      props.onChange && props.onChange(newData);

      ringRef?.current?.setColors(getRingColors(newData));
      if (needUpdateState) {
        // setAllData({ ...allData, data: newData });
        setAllData({ data: newData });
      }
    },
    [props.onChange, allData.data]
  );

  const handleStepOver = (time: number) => {
    let newTime = time;
    const { data } = allData;
    if (data.length === 1) {
      return newTime;
    }

    const dragInx = dragIndex.current;
    // const { dragIndex } = this;
    if (props.stepOverEnabled) {
      // 是否重叠了，需要注意有可能出现多个节点并排的情况
      // 统计不能选择的时间区
      const ranges: number[][] = [];
      data.forEach(({ time: any }, index) => {
        if (index === dragInx) {
          return;
        }
        let min = time - stepTime;
        let rangType = 0; // 第三个元素表示： 0为闭区间，1为左开区间，-1为右开区间
        if (min < 0) {
          ranges.push([totalTime - min, totalTime, -1]);
          min = 0;
          rangType = 1;
        }
        let max = time + stepTime;
        if (max > totalTime) {
          ranges.push([0, max - totalTime, 1]);
          max = totalTime;
          rangType = -1;
        }
        ranges.push([min, max, rangType]);
      });
      // 合并区间
      ranges.sort(([item1], [item2]) => (item1 > item2 ? 1 : item1 < item2 ? -1 : 0));
      const mergeRanges = [ranges[0]];
      ranges.reduce((r, current) => {
        const prevRange = r[r.length - 1];
        const [prevMin, prevMax] = prevRange;
        const [min, max, nextType] = current;
        if (min <= prevMax) {
          if (max > prevMax) {
            prevRange[1] = max;
            if (nextType <= 0) {
              prevRange[2] = nextType;
            }
          }
        } else {
          r.push(current);
        }
        return r;
      }, mergeRanges);
      // 当前手指是否在非选择范围内
      mergeRanges.some(([min, max, type]) => {
        if (type === 0) {
          if (newTime >= min && max >= newTime) {
            if (newTime < (min + max) / 2) {
              newTime = min;
            } else {
              newTime = max;
            }
            return true;
          }
        } else if (type === 1) {
          if (newTime > min && max >= newTime) {
            newTime = max;
            return true;
          }
        } else if (type === -1) {
          if (newTime >= min && max > newTime) {
            newTime = min;
            return true;
          }
        }

        return false;
      });
    } else {
      // 是否大于下一个点
      if (data.length > 1) {
        let nextMark;
        let prevMark;
        if (data.length - 1 === dragInx) {
          nextMark = data[0];
          prevMark = data[dragInx - 1];
        } else {
          nextMark = data[dragInx + 1];
          if (dragInx === 0) {
            prevMark = data[data.length - 1];
          } else {
            prevMark = data[dragInx - 1];
          }
        }
        let { time: maxTime } = nextMark;
        const { time: minTime } = prevMark;
        // 如果最小值大，说明中间有0度，最大值加上360
        // debugger
        let isMinBigThanMax = false;
        if (minTime > maxTime) {
          isMinBigThanMax = true;
          maxTime += totalTime;
          if (newTime < minTime) {
            newTime += totalTime;
          }
        }

        // 最大值和最小值的所占角度的剩余部分的一半
        const rangeDiffTime = (totalTime + minTime - maxTime) / 2;
        if (maxTime - newTime < stepTime && maxTime - newTime > -rangeDiffTime) {
          newTime = (maxTime - stepTime) % totalTime;
        } else if (minTime === 0 && newTime > maxTime) {
          // 边界为0情况
          newTime = minTime + stepTime;
        } else if (
          newTime - minTime < stepTime ||
          (newTime > maxTime && (newTime % totalTime) - minTime < stepTime)
        ) {
          newTime = (minTime + stepTime) % totalTime;
        }

        if (isMinBigThanMax) {
          const diff = newTime - totalTime;
          newTime = diff > 0 ? newTime - totalTime : newTime;
        }
      }
    }
    return newTime;
  };

  const onGrant = () => {};

  const onMove = useCallback(
    (e: GestureResponderEvent, g: PanResponderGestureState) => {
      moveMark(g, props.onMove, false);
    },
    [props.onMove]
  );

  const onRelease = useCallback(
    (e: GestureResponderEvent, g: PanResponderGestureState) => {
      dragEnabled.current = false;
      moveMark(g, props.onRelease, true);
    },
    [props.onRelease]
  );

  const { data } = allData;

  const bgSize = innerSize.current - 12;
  return (
    <View
      style={[
        disabled && { opacity: disabledOpacity },
        pickerStyle,
        { borderRadius: outerRadius.current },
      ]}
    >
      {/* timeStyle */}
      <View
        style={[
          {
            top: (size.current - innerRadius.current * 2) / 2,
            left: (size.current - innerRadius.current * 2) / 2,
            width: innerRadius.current * 2,
            height: innerRadius.current * 2,
            borderRadius: innerRadius.current,
            position: 'absolute',
          },
          timeStyle,
        ]}
      />
      {/* ConicalGradient */}
      <ConicalGradient
        // eslint-disable-next-line no-return-assign
        ref={(ref: ConicalGradient) => (ringRef.current = ref)}
        innerRadius={innerRadius.current}
        outerRadius={outerRadius.current}
        colors={getRingColors(data)}
        offsetAngle={fullDeg / 4}
        segmentAngle={Math.PI / 60}
      />
      {/* timeImg */}
      <Image
        source={timeImg}
        style={{
          position: 'absolute',
          top: (size.current - bgSize) / 2,
          left: (size.current - bgSize) / 2,
          width: bgSize,
          height: bgSize,
        }}
        resizeMode="contain"
      />
      {/* Icon */}
      <View style={[styles.thumbBox, { width: size.current, height: size.current }]}>
        {data.map((item, index) => {
          const point = getPoint(item.deg, ringRadius.current, outerRadius.current);
          return (
            <View
              key={item.time}
              // eslint-disable-next-line no-return-assign
              ref={(ref: View) => (markRefs[index] = ref)}
              style={[
                styles.thumbStyle,
                {
                  width: thumbSize,
                  height: thumbSize,
                  borderRadius: thumbSize / 2,
                  transform: [{ translateX: -thumbSize / 2 }, { translateY: -thumbSize / 2 }],
                  left: point.x,
                  top: point.y,
                },
                thumbStyle,
              ]}
            >
              <Image
                source={item.icon}
                // eslint-disable-next-line no-return-assign
                ref={(ref: Image) => (markImgRefs[index] = ref)}
                style={[
                  {
                    width: thumbSize,
                    height: thumbSize,
                    borderRadius: thumbSize / 2,
                  },
                  iconStyle,
                ]}
              />
            </View>
          );
        })}
      </View>
      {/* panResponder  */}
      <View
        style={[styles.thumbBox, { width: size.current, height: size.current }]}
        pointerEvents="box-only"
        {..._panResponder.panHandlers}
      />
    </View>
  );
};

RhythmsCircle.defaultProps = {
  size: 280, // picker的大小
  ringWidth: 40,
  thumbSize: 36, // 滑块的大小
  data: [], // 渲染的数据
  disabled: false,
  disabledOpacity: 1,
  stepOverEnabled: false, // 是否可以滑过超过上一个节点和下一个节点
  stepTime: 45,
  pickerStyle: {},
  timeStyle: {
    backgroundColor: 'transparent',
  },
  thumbStyle: {
    backgroundColor: '#222430',
  },
  timeImg: Res.timeBg,
  iconStyle: {
    tintColor: '#fff',
  },
  lastRingColor: '#000',
  defaultTintColor: '#fff',
  onGrant() {},
  onMove() {},
  onRelease() {},
  onChange() {},
};

export default RhythmsCircle;

const styles = StyleSheet.create({
  thumbBox: {
    left: 0,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  thumbStyle: {
    backgroundColor: '#222430',
    position: 'absolute',
  },
});

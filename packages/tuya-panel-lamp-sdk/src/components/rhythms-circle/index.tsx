/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-return-assign */
/* eslint-disable no-lonely-if */
import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Image,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { usePersistFn } from 'ahooks';
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

  const initData = (v: IData[]) => {
    return v.map(({ index, time, icon, color, noActiveColor, activeColor }) => ({
      index,
      time,
      icon,
      color,
      noActiveColor,
      activeColor,
      deg: (time / totalTime) * fullDeg,
    }));
  };

  const [allData, setAllData] = useState(() => initData(props.data));

  useEffect(() => {
    size.current = props.size;
    ringWidth.current = props.ringWidth;
    innerSize.current = props.size - props.ringWidth * 2;
    innerRadius.current = innerSize.current / 2;
    outerRadius.current = props.size / 2;
    ringRadius.current = (innerRadius.current + outerRadius.current) / 2;
  }, [props.size, props.ringWidth]);

  useEffect(() => {
    setAllData(() => initData(props.data));
  }, [props.data]);

  // 极坐标的渐变色
  const getRingColors = (data: IData[]) => {
    const colors = data.map(({ time, color }) => ({
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

  // 是否成为响应者
  const handleSetPanResponder = usePersistFn((e: GestureResponderEvent) => {
    // 如果传过来的disabled属性为true,则返回false阻止成为响应者
    if (disabled) {
      return false;
    }
    // 拿到触摸点相对于父元素的横纵坐标
    const { locationX, locationY } = e.nativeEvent;
    let selectIndex = -1;
    const exist = allData.some(({ deg }, index) => {
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
  });

  const moveMark = usePersistFn(
    ({ dx, dy }: PanResponderGestureState, callback: Function, needUpdateState: boolean) => {
      const dragInx = dragIndex.current;
      const rinRad = ringRadius.current;
      const outRad = outerRadius.current;
      const mark = allData[dragInx];
      const markRef = markRefs[dragInx];
      if (!mark || !markRef) {
        return;
      }

      const markImgRef = markImgRefs[dragInx];
      markImgRef.setNativeProps({
        style: {
          tintColor: allData[dragInx].activeColor,
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
      // 是否是允许的时间范围
      time = handleStepOver(time);
      // 转回成角度，确保不出现跳动问题
      angle = (time / totalTime) * fullDeg;
      const point = getPoint(angle, rinRad, outRad);
      markRef.setNativeProps({
        style: {
          top: point.y,
          left: point.x,
        },
      });

      const newData = allData.map((item, index) => {
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
      props.onChange && props.onChange(newData);

      ringRef?.current?.setColors(getRingColors(newData));
      if (needUpdateState) {
        setAllData(newData);
      }
    }
  );

  const handleStepOver = (time: number) => {
    let newTime = time;
    if (allData.length === 1) {
      return newTime;
    }
    const dragInx = dragIndex.current;
    if (props.stepOverEnabled) {
      // 是否重叠了，需要注意有可能出现多个节点并排的情况
      // 统计不能选择的时间区
      const ranges: number[][] = [];
      allData.forEach(({ time: number }, index) => {
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
        const prevMax = prevRange[1];
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
      if (allData.length > 1) {
        let nextMark;
        let prevMark;
        if (allData.length - 1 === dragInx) {
          nextMark = allData[0];
          prevMark = allData[dragInx - 1];
        } else {
          nextMark = allData[dragInx + 1];
          if (dragInx === 0) {
            prevMark = allData[allData.length - 1];
          } else {
            prevMark = allData[dragInx - 1];
          }
        }
        let { time: maxTime } = nextMark;
        const { time: minTime } = prevMark;
        // 如果最小值大，说明中间有0度，最大值加上360
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
        } else if (newTime > minTime && newTime > maxTime) {
          newTime = (minTime + stepTime) % totalTime;
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

  const onMove = usePersistFn((e: GestureResponderEvent, g: PanResponderGestureState) => {
    moveMark(g, props.onMove, false);
  });

  const onRelease = usePersistFn((e: GestureResponderEvent, g: PanResponderGestureState) => {
    dragEnabled.current = false;
    moveMark(g, props.onRelease, true);
  });

  const _panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: handleSetPanResponder,
        // 另一个组件成为新的响应者
        onPanResponderTerminationRequest: () => !(!props.disabled && dragEnabled.current),
        onPanResponderGrant: () => {},
        onPanResponderMove: onMove,
        onPanResponderRelease: onRelease,
      }),
    [props.disabled]
  );

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
        ref={(ref: ConicalGradient) => (ringRef.current = ref)}
        innerRadius={innerRadius.current}
        outerRadius={outerRadius.current}
        colors={getRingColors(allData)}
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
        {allData.map((item, index) => {
          const point = getPoint(item.deg, ringRadius.current, outerRadius.current);
          return (
            <View
              key={item.time}
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
                ref={(ref: Image) => (markImgRefs[index] = ref)}
                style={[
                  {
                    width: thumbSize,
                    height: thumbSize,
                    borderRadius: thumbSize / 2,
                    tintColor: item.noActiveColor,
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
  size: 280,
  ringWidth: 40,
  thumbSize: 36,
  data: [],
  disabled: false,
  disabledOpacity: 1,
  stepOverEnabled: false,
  stepTime: 45,
  pickerStyle: {},
  timeStyle: {
    backgroundColor: 'transparent',
  },
  thumbStyle: {
    backgroundColor: '#222430',
  },
  timeImg: Res.timeBg,
  iconStyle: {},
  lastRingColor: '#000',
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

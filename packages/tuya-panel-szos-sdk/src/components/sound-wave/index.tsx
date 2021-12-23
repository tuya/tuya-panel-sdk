/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { StyleSheet, View, Animated, ViewStyle } from 'react-native';
import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;
interface Props {
  /*
   * 区域宽度
   */
  width?: number;
  /*
   * 区域高度
   */
  height?: number;
  /*
   * 柱子数量
   */
  barCount?: number;
  /*
   * 区域样式
   */
  style?: ViewStyle;
  /*
   * 柱子初始高度
   */
  barInitHeight?: number;
  /*
   * 柱子宽度
   */
  barWidth?: number;
  /*
   * 柱子颜色
   */
  barColor?: string;
  /*
   * 变化时间
   */
  duration?: number;
  /*
   * 控制开始结束
   */
  start?: boolean;
  /*
   * 外界控制变化，数据区间为0～1
   */
  data?: number[];
}
// 创建bar动画
const SoundWave: React.FC<Props> = props => {
  const {
    width = cx(310),
    height = cx(212),
    barCount = 62,
    style,
    barInitHeight = 16,
    barWidth = 2,
    barColor = '#534B72',
    duration = 150,
    start = true,
    data = [],
  } = props;
  /*
   * 控制动画开始和结束
   */
  const animatedStartRef = useRef(start);

  /*
   * 控制每个柱子是否可以animated
   */
  const animatedStatus = useRef<boolean[]>([]);
  const { barsAnimated } = useMemo(() => {
    const arr = Array.from({ length: barCount }, () => true);
    animatedStatus.current = arr;
    return {
      barsAnimated: arr.map(() => new Animated.Value(barInitHeight)),
    };
  }, [barCount]);

  // 当没有toHeight随机
  const animate = useCallback(
    (index: number, toHeight?: number) => {
      if (!animatedStatus.current[index]) {
        return;
      }
      const valueStart = toHeight || height * Math.random();
      const valueEnd = toHeight ? barInitHeight : (height / 10) * Math.random();
      const timeStart = toHeight ? duration : duration * (2 - Math.random());
      const timeEnd = toHeight ? duration : duration * (2 - Math.random());
      animatedStatus.current[index] = false;
      Animated.sequence([
        Animated.timing(barsAnimated[index], {
          toValue: valueStart,
          duration: timeStart,
          useNativeDriver: false,
        }),
        Animated.timing(barsAnimated[index], {
          toValue: valueEnd,
          duration: timeEnd,
          useNativeDriver: false,
        }),
      ]).start(() => {
        animatedStatus.current[index] = true;
        !toHeight && animate(index);
      });
    },
    [duration, height, barsAnimated]
  );

  useEffect(() => {
    animatedStartRef.current = start;
    if (!animatedStartRef.current) {
      return;
    }
    data && data.length > 0
      ? data.forEach((c, i) => {
          animate(i, c * height);
        })
      : barsAnimated.forEach((c, i) => {
          animate(i);
        });
    return () => {
      animatedStartRef.current = false;
    };
  }, [start, data]);

  return (
    <View
      style={[
        styles.root,
        style,
        {
          width,
          height,
        },
      ]}
    >
      {barsAnimated.map((ani, index) => {
        return (
          <Animated.View
            key={`${index}`}
            style={{
              width: barWidth,
              height: ani,
              backgroundColor: barColor,
              borderRadius: (barWidth as number) / 2,
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SoundWave;

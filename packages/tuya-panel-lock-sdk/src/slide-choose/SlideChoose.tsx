import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, PanResponder, Animated } from 'react-native';
import { Rect } from 'react-native-svg';
import { TYText, Utils, LinearGradient } from 'tuya-panel-kit';
import { SlideChooseProps } from './interface';

const { width } = Utils.RatioUtils;
const screenWidth = width;
const barViewTotalWidth = width * 0.9; /** 滑动按钮总宽度 */
const barHeight = 52; /** 滑动按钮高度 */
const barWidth = 160; /** 滑动按钮单边宽度 渐变色彩区域 */
const circleR = 40; /** 中间按钮半径 */
const originCenterLeft = screenWidth * 0.5 - circleR; /** 计算中间按钮位置 */
const minLeftX = (screenWidth - barViewTotalWidth) / 2; /** 左边最小边界 */
const maxRightX = originCenterLeft + barViewTotalWidth / 2 - circleR; /** 右边最大边界 */
const offsetX = 20; /** 触发事件X皱偏移量 */

const SlideChoose: React.FC<SlideChooseProps> = ({
  onChooseLeft,
  onChooseRight,
  leftText = 'left',
  rightText = 'right',
  tiggerDistance = offsetX,
  leftColors = {
    '0%': '#FF4040',
    '100%': 'rgba(254,72,71,0.5)',
  },
  rightColors = {
    '0%': '#239C8E',
    '100%': 'rgba(35,156,142,0.5)',
  },
  btnTextColor = '#fff',
}) => {
  const dimensionLeft = { width: barWidth, height: barHeight };
  const dimensionRight = { width: barWidth, height: barHeight };
  const [isShowAnimate, setisShowAnimate] = useState<boolean>(true);
  const [centerPoint, setcenterPoint] = useState<number>(originCenterLeft);

  const [startX, setstartX] = useState<number>(0);
  const leftValue = useRef<Animated.Value>(new Animated.Value(0)).current;
  const rightValue = useRef<Animated.Value>(new Animated.Value(0)).current;
  const middleValue = useRef<Animated.Value>(new Animated.Value(0)).current;

  const startAnimation = () => {
    stopAnimation();
    if (!isShowAnimate) setisShowAnimate(true);
    leftValue.setValue(0.3);
    rightValue.setValue(0.3);
    middleValue.setValue(0.3);
    const animations = [
      Animated.timing(leftValue, {
        duration: 600,
        toValue: 1,
      }),
      Animated.timing(middleValue, {
        duration: 600,
        toValue: 1,
      }),
      Animated.timing(rightValue, {
        duration: 600,
        toValue: 1,
      }),
    ];
    Animated.stagger(500, animations).start(({ finished }) => {
      finished && startAnimation();
    });
  };

  const stopAnimation = () => {
    leftValue.stopAnimation();
    middleValue.stopAnimation();
    rightValue.stopAnimation();
  };

  React.useEffect(() => {
    startAnimation();
    return () => {
      console.log('unmount --------> ');
      stopAnimation();
    };
  }, []);

  const onPanResponderGrant = (e: { nativeEvent: { locationX: React.SetStateAction<number> } }) => {
    setstartX(e.nativeEvent.locationX); // 按住滑块的时候,记录偏移量
  };

  const onPanResponderMove = (e: any, gestureState: { moveX: number }) => {
    setisShowAnimate(false);
    const realMarginLeft = gestureState.moveX - circleR - startX;
    setcenterPoint(realMarginLeft);
  };

  const onPanResponderEnd = (e: any, gestureState: { moveX: any }) => {
    const move = gestureState.moveX;
    const distance = move - startX - circleR;

    if (distance < minLeftX + tiggerDistance) onChooseLeft && onChooseLeft();
    if (distance > maxRightX - tiggerDistance) onChooseRight && onChooseRight();

    setcenterPoint(originCenterLeft);
    startAnimation();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // 建立监视器
      onPanResponderGrant, // 事件,按下
      onPanResponderMove, // 移动
      onPanResponderEnd, // 结束
    })
  ).current;

  const waitAnimate = (rotate: string, isLeft: boolean, wrapStyle?: any) => {
    return (
      <View style={[styles.waitWrap, wrapStyle]}>
        <Animated.View
          style={[
            styles.waitItem,
            { transform: [{ rotate }], opacity: isLeft ? rightValue : leftValue },
          ]}
        />
        <Animated.View
          style={[styles.waitItem, { transform: [{ rotate }], opacity: middleValue }]}
        />
        <Animated.View
          style={[
            styles.waitItem,
            { transform: [{ rotate }], opacity: isLeft ? leftValue : rightValue },
          ]}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.left, { width: barWidth }]}>
        <LinearGradient
          gradientId="GradientLeft"
          style={styles.leftRect}
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
          stops={leftColors}
        >
          <Rect {...dimensionLeft} />
        </LinearGradient>
        <TYText
          testID="leftText"
          style={[styles.text, { position: 'absolute', left: 16, color: btnTextColor }]}
        >
          {leftText}
        </TYText>
        {isShowAnimate && waitAnimate('45deg', true)}
      </View>
      <View style={[styles.right, { width: barWidth }]}>
        <LinearGradient
          gradientId="GradientRight"
          style={styles.rightRect}
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
          stops={rightColors}
        >
          <Rect {...dimensionRight} />
        </LinearGradient>
        <TYText
          testID="rightText"
          style={[styles.text, { position: 'absolute', right: 16, color: btnTextColor }]}
        >
          {rightText}
        </TYText>
        {isShowAnimate && waitAnimate('225deg', false)}
      </View>
      <View
        testID="circleKey"
        {...panResponder.panHandlers}
        style={[
          styles.circle,
          {
            width: circleR * 2,
            height: circleR * 2,
            left:
              centerPoint < minLeftX ? minLeftX : centerPoint > maxRightX ? maxRightX : centerPoint,
          },
        ]}
      >
        <Image source={require('./res/circleKey.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    width: screenWidth,
  },
  left: {
    borderBottomLeftRadius: 26,
    borderTopLeftRadius: 26,
    height: 52,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  leftRect: {
    height: 52,
  },
  right: {
    borderBottomRightRadius: 26,
    borderTopRightRadius: 26,
    height: 52,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  rightRect: {
    height: 52,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  waitItem: {
    borderBottomColor: '#FFF',
    borderBottomWidth: 2,
    borderLeftColor: '#FFF',
    borderLeftWidth: 2,
    height: 10,
    width: 10,
  },
  waitWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 16,
    justifyContent: 'space-around',
    left: 54,
    position: 'absolute',
    top: 19,
    width: 40,
  },
});

export default SlideChoose;

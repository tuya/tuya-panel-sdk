import React, { useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

import { Utils, LinearGradient } from 'tuya-panel-kit';
import { Rect } from 'react-native-svg';
import Res from './res';
import { DoubleButtonProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;
const DoubleButton: React.FC<DoubleButtonProps> = ({
  dataSource,
  height,
  width,
  activeHeight,
  activeWidth,
  style,
  titleSize,
  textSize,
  delayLongPressTime,
  isLine,
  lineStyle,
  bgStartWidth,
  bgEndWidth,
  activeButtonView,
  textStartDistance,
  textEndDistance,
  titleStyle,
  textStyle,
  titleActiveTop,
  textActiveBottom,
  activeOpacity,
  gradient,
  animatedTime,
  animationOutSpeed,
  handleLeftLong,
  handleRightLong,
  handleLeftButton,
  handleRightButton,
  handleLeftIn,
  handleRightIn,
  handleLeftOut,
  handleRightOut,
  isGradient,
  leftButtonColor,
  rightButtonColor,
}) => {
  // 当前按钮激活状态  --left/right/off
  const [activeButton, setActiveButton] = useState('none');
  // 按钮宽度
  const buttonWidth = useRef(new Animated.Value(0)).current;
  // 按钮高度
  const buttonHeight = useRef(new Animated.Value(0)).current;
  // 左侧按钮点击下颜色宽度
  const leftBgWidth = useRef(new Animated.Value(0)).current;
  // 右侧按钮点击下颜色宽度
  const rightBgWidth = useRef(new Animated.Value(0)).current;
  // 左侧按钮背景透明度
  const leftBgOpacity = useRef(new Animated.Value(0)).current;
  // 右侧按钮背景透明度
  const rightBgOpacity = useRef(new Animated.Value(0)).current;
  // 左侧文字透明度
  const leftTextOpacity = useRef(new Animated.Value(1)).current;
  // 右侧文字透明度
  const rightTextOpacity = useRef(new Animated.Value(1)).current;
  // 左侧文字距左边距
  const leftTextLeft = useRef(new Animated.Value(0)).current;
  // 右侧文字距右边距
  const rightTextRight = useRef(new Animated.Value(0)).current;
  // 文字上边距
  const textTop = useRef(new Animated.Value(0)).current;
  // 小字文字下边距
  const textBottom = useRef(new Animated.Value(0)).current;
  //  小字透明度
  const pressOpacity = useRef(new Animated.Value(1)).current;
  const animationGroup = {
    left: {
      bgWidth: leftBgWidth,
      bgOpacity: leftBgOpacity,
      textOpacity: leftTextOpacity,
      textDisplace: leftTextLeft,
      buttonColor: leftButtonColor,
    },
    right: {
      bgWidth: rightBgWidth,
      bgOpacity: rightBgOpacity,
      textOpacity: rightTextOpacity,
      textDisplace: rightTextRight,
      buttonColor: rightButtonColor,
    },
  };
  let animationExecutionTime = useRef(0).current;
  useEffect(() => {
    buttonHeight.addListener(value => {
      animationExecutionTime = Number(value.value);
    });
  }, []);

  // 动画
  const animation = (animated: any, value: boolean, time: number) => {
    return Animated.timing(animated, {
      toValue: value ? 1 : 0,
      duration: time,
    });
  };

  // 点击左/右侧按钮
  const handleAnimated = (direction: 'left' | 'right') => {
    setActiveButton('none');
    if (direction === 'left') {
      handleLeftButton();
    } else {
      handleRightButton();
    }
  };
  // 开始长按左/右侧按钮
  const handleAnimatedIn = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      rightAnimated(true, 0).start();
      leftAnimated(true, 1).start();
      handleLeftIn();
    } else {
      leftAnimated(true, 0).start();
      rightAnimated(true, 1).start();
      handleRightIn();
    }
  };
  // 结束长按左/右侧按钮
  const handleAnimatedOut = (direction: 'left' | 'right', time: number) => {
    if (direction === 'left') {
      leftAnimatedReset(time * animationOutSpeed).start();
      handleLeftOut();
    } else {
      rightAnimatedReset(time * animationOutSpeed).start();
      handleRightOut();
    }
  };
  // 长按左/右侧按钮时间到触发
  const handleAnimatedLong = (direction: 'left' | 'right') => {
    setActiveButton(direction);

    if (direction === 'left') {
      handleLeftLong();
    } else {
      handleRightLong();
    }
  };
  // 左侧动画
  const leftAnimated = (value: boolean, time: number) => {
    return Animated.parallel([
      Animated.parallel([
        animation(buttonHeight, value, time * animatedTime),
        animation(buttonWidth, value, time * animatedTime),
        animation(pressOpacity, !value, time * animatedTime * 0.25),
        animation(rightTextOpacity, !value, time * animatedTime * 0.25),
        animation(textBottom, value, time * animatedTime * 0.25),
        Animated.sequence([
          animation(textTop, value, time * animatedTime * 0.25),
          animation(leftTextLeft, value, time * animatedTime * 0.35),
        ]),
      ]),
      Animated.sequence([
        animation(leftBgOpacity, true, time * animatedTime * 0.05),
        animation(leftBgWidth, value, time * animatedTime * 0.85),

        Animated.sequence([
          Animated.parallel([
            animation(buttonHeight, false, time * animatedTime * 0.1),
            animation(buttonWidth, false, time * animatedTime * 0.1),
            animation(leftBgOpacity, false, time * animatedTime * 0.1),
            animation(leftTextOpacity, !value, time * animatedTime * 0.1),
          ]),
          Animated.parallel([
            animation(leftBgWidth, false, time * animatedTime * 0.1),
            animation(leftTextLeft, false, 0),
            animation(pressOpacity, true, time * animatedTime * 0.1),
            animation(rightTextOpacity, true, animatedTime * 0.1),
            animation(textTop, false, time * animatedTime * 0.1),
            animation(textBottom, false, time * animatedTime * 0.1),
            animation(leftTextOpacity, true, time * animatedTime * 0.1),
          ]),
        ]),
      ]),
    ]);
  };
  // 左侧重置动画
  const leftAnimatedReset = (time: number) => {
    return Animated.sequence([
      Animated.parallel([
        animation(pressOpacity, false, 0),
        animation(textBottom, true, 0),
        animation(buttonHeight, false, time * animatedTime),
        animation(buttonWidth, false, time * animatedTime),
        animation(leftBgWidth, false, time * animatedTime * 0.85),
        animation(leftTextLeft, false, time * animatedTime * 0.85),
        animation(textTop, true, 0),
        animation(rightTextOpacity, false, 0),
      ]),
      Animated.parallel([
        animation(textTop, false, time * animatedTime * 0.25),
        animation(leftBgOpacity, false, time * animatedTime * 0.05),
        animation(pressOpacity, true, time * animatedTime * 0.25),
        animation(textBottom, false, time * animatedTime * 0.25),
        animation(rightTextOpacity, true, time * animatedTime * 0.25),
      ]),
    ]);
  };
  // 右侧动画
  const rightAnimated = (value: boolean, time: number) => {
    return Animated.parallel([
      Animated.parallel([
        animation(buttonHeight, value, time * animatedTime),
        animation(buttonWidth, value, time * animatedTime),
        Animated.sequence([
          animation(textTop, value, time * animatedTime * 0.25),
          animation(rightTextRight, value, time * animatedTime * 0.35),
        ]),
        animation(leftTextOpacity, !value, time * animatedTime * 0.25),
        animation(pressOpacity, !value, time * animatedTime * 0.25),
        animation(textBottom, value, time * animatedTime * 0.25),
      ]),
      Animated.sequence([
        animation(rightBgOpacity, true, time * animatedTime * 0.05),
        animation(rightBgWidth, value, time * animatedTime * 0.85),
        Animated.sequence([
          Animated.parallel([
            animation(buttonHeight, false, time * animatedTime * 0.1),
            animation(buttonWidth, false, time * animatedTime * 0.1),
            animation(rightBgOpacity, false, time * animatedTime * 0.1),
            animation(rightTextOpacity, !value, time * animatedTime * 0.1),
          ]),
          Animated.parallel([
            animation(rightBgWidth, false, time * animatedTime * 0.1),
            animation(rightTextRight, false, 0),
            animation(textBottom, false, time * animatedTime * 0.1),
            animation(pressOpacity, true, time * animatedTime * 0.1),
            animation(textTop, false, time * animatedTime * 0.1),
            animation(leftTextOpacity, true, time * animatedTime * 0.1),
            animation(rightTextOpacity, true, time * animatedTime * 0.1),
          ]),
        ]),
      ]),
    ]);
  };
  // 右侧重置动画
  const rightAnimatedReset = (time: number) => {
    return Animated.sequence([
      Animated.parallel([
        animation(pressOpacity, false, 0),
        animation(textBottom, true, 0),
        animation(buttonHeight, false, time * animatedTime),
        animation(buttonWidth, false, time * animatedTime),
        animation(rightBgWidth, false, time * animatedTime * 0.85),
        animation(rightTextRight, false, time * animatedTime * 0.85),
        animation(textTop, true, 0),
        animation(leftTextOpacity, false, 0),
      ]),
      Animated.parallel([
        animation(textTop, false, time * animatedTime * 0.25),
        animation(rightBgOpacity, false, time * animatedTime * 0.05),
        animation(pressOpacity, true, time * animatedTime * 0.25),
        animation(textBottom, false, time * animatedTime * 0.25),
        animation(leftTextOpacity, true, time * animatedTime * 0.25),
      ]),
    ]);
  };
  const button = (direction: 'left' | 'right') => {
    const { bgWidth, bgOpacity, textOpacity, textDisplace, buttonColor } = animationGroup[
      direction
    ];
    const { title, text, activeTitle, activeText } = dataSource[direction];
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        delayLongPress={delayLongPressTime}
        style={styles.buttonStyle}
        onPress={() => activeButton === direction && handleAnimated(direction)}
        onLongPress={() => handleAnimatedLong(direction)}
        onPressIn={() => activeButton !== direction && handleAnimatedIn(direction)}
        onPressOut={() =>
          activeButton !== direction && handleAnimatedOut(direction, animationExecutionTime)
        }
      >
        <Animated.View
          style={[
            activeButtonView,
            styles.activeButton,
            {
              [direction]: 0,
              width: bgWidth.interpolate({
                inputRange: [0, 1],
                outputRange: [bgStartWidth, bgEndWidth],
              }),
              backgroundColor: buttonColor,
              opacity: bgOpacity,
            },
          ]}
          pointerEvents="none"
        />
        <Animated.Text
          size={titleSize}
          style={[
            titleStyle,
            {
              opacity: textOpacity,
              [direction]: textDisplace.interpolate({
                inputRange: [0, 1],
                outputRange: [textStartDistance, textEndDistance],
              }),

              top: textTop.interpolate({
                inputRange: [0, 1],
                outputRange: [0, titleActiveTop],
              }),
            },
          ]}
        >
          {activeButton !== direction ? title : activeTitle}
        </Animated.Text>
        <Animated.Text
          size={textSize}
          style={[
            textStyle,
            {
              opacity: pressOpacity,

              bottom: textBottom.interpolate({
                inputRange: [0, 1],
                outputRange: [0, textActiveBottom],
              }),
            },
          ]}
        >
          {activeButton !== direction ? text : activeText}
        </Animated.Text>
      </TouchableOpacity>
    );
  };
  return (
    <Animated.View
      style={[
        styles.main,
        style,
        {
          // borderRadius: radius,

          width: buttonWidth.interpolate({
            inputRange: [0, 1],
            outputRange: [width, activeWidth],
          }),

          height: buttonHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [height, activeHeight],
          }),
        },
      ]}
    >
      {isGradient && (
        <LinearGradient {...gradient}>
          <Rect width="100%" height="100%" />
        </LinearGradient>
      )}

      {button('left')}

      {isLine && (
        <Animated.Image
          source={Res.line}
          style={[
            lineStyle,
            {
              position: 'absolute',

              opacity: pressOpacity,
            },
          ]}
        />
      )}
      {button('right')}
    </Animated.View>
  );
};
DoubleButton.defaultProps = {
  height: cx(70),
  activeHeight: cx(80),
  width: cx(300),
  activeWidth: cx(320),

  delayLongPressTime: 2000,
  animatedTime: 2000,
  style: {
    borderRadius: cx(34),
  },
  activeButtonView: {
    borderRadius: cx(34),
  },
  titleSize: cx(16),
  titleStyle: {
    color: '#fff',
  },
  titleActiveTop: cx(10),
  textSize: cx(12),
  textStyle: {
    color: '#fff',
  },
  textActiveBottom: cx(10),
  isLine: true,
  animationOutSpeed: 1,
  lineStyle: {},
  bgStartWidth: '75%',
  bgEndWidth: '200%',
  textStartDistance: '0%',
  textEndDistance: '50%',
  handleLeftLong: () => {},
  handleRightLong: () => {},
  handleLeftButton: () => {},
  handleRightButton: () => {},
  handleLeftIn: () => {},
  handleRightIn: () => {},
  handleLeftOut: () => {},
  handleRightOut: () => {},
  isGradient: true,
  activeOpacity: 1,
  leftButtonColor: '#FF536B',
  rightButtonColor: '#2856F4',
  dataSource: {
    left: {
      title: '',
      text: '',
      activeTitle: '',
      activeText: '',
    },
    right: {
      title: '',
      text: '',
      activeTitle: '',
      activeText: '',
    },
  },
  gradient: {
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '0%',
    stops: {
      '0%': '#FF536B',
      '100%': '#2856F4',
    },
  },
};
const styles = StyleSheet.create({
  activeButton: {
    height: '100%',
    position: 'absolute',
    top: 0,
  },
  buttonStyle: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '50%',
  },

  main: {
    alignItems: 'center',

    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    // shadowOpacity: 1,
  },
});
export default DoubleButton;

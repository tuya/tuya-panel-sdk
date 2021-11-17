import React, { FC, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';
import { Circle } from 'react-native-svg';
import { Utils, LinearGradient } from 'tuya-panel-kit';

interface IProps {
  style: ViewStyle | TextStyle | ImageStyle;
  /**
   * 背景图
   */
  bgImage: number;
  /**
   * 目标图片
   */
  centerImage: number;
  /**
   * 运动的图片
   */
  spotImage: number;
  /**
   * 子组件
   */
  centerView: React.ReactNode;
}

const { convertX: cx } = Utils.RatioUtils;

// rn版本5.30不支持高斯模糊，5.31才行,所以目前换成了图片实现
// <BlurView style={styles.blurView} blurType="light" blurAmount={11.89} />
// 运动步数区域
const SportNoTarget: FC<IProps> = (props: IProps) => {
  const { style, bgImage, centerImage, spotImage, centerView } = props;
  const dimension = { width: cx(190), height: cx(190) };
  const rotateAnimate = useRef(new Animated.Value(0)).current;
  const rotateAnimate2 = useRef(new Animated.Value(0)).current;

  // 切换tabbar停止动画重新开始
  useEffect(() => {
    // 运行动画
    rotateExecute(rotateAnimate, 4000);
    rotateExecute(rotateAnimate2, 6000);
    return () => {
      rotateAnimate.stopAnimation();
      rotateAnimate2.stopAnimation();
    };
  }, []);

  const rotateExecute = (animate: any, duration: number) => {
    Animated.loop(
      Animated.timing(animate, {
        toValue: 1, // 最终值 为1，这里表示最大旋转 360度
        duration,
        easing: Easing.linear,
      })
    ).start();
  };

  const rotateValue = (animate: any) => {
    const value = animate.interpolate({
      inputRange: [0, 1], // 输入值
      outputRange: ['0deg', '360deg'], // 输出值
    });
    return value;
  };

  return (
    <View style={[styles.box, style]}>
      <ImageBackground style={styles.borderOuter} source={bgImage}>
        <ImageBackground style={styles.borderInner} source={bgImage}>
          <View style={styles.containOuter}>
            <LinearGradient
              style={dimension}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
              stops={{
                '0%': `#FEFFFF`,
                '100%': `#E4EDFE`,
              }}
            >
              <Circle cx={cx(95)} cy={cx(95)} r={cx(95)} />
            </LinearGradient>
            <ImageBackground style={styles.contentInner} source={centerImage}>
              {centerView}
            </ImageBackground>
          </View>
        </ImageBackground>
        <Animated.Image
          style={[
            styles.spot1,
            {
              transform: [{ rotate: rotateValue(rotateAnimate2) }, { translateX: cx(112) }],
            },
          ]}
          source={spotImage}
        />
      </ImageBackground>
      {/* 目前渐变实现很难用，很麻烦 */}
      <Animated.Image
        style={[
          styles.spot2,
          {
            transform: [{ rotate: rotateValue(rotateAnimate) }, { translateX: cx(135) }],
          },
        ]}
        source={spotImage}
      />
    </View>
  );
};
export default SportNoTarget;

const styles = StyleSheet.create({
  borderInner: {
    alignItems: 'center',
    borderColor: '#FFFFFF',
    height: cx(224),
    justifyContent: 'center',
    width: cx(224),
  },
  borderOuter: {
    alignItems: 'center',
    height: cx(270),
    justifyContent: 'center',
    width: cx(270),
  },
  box: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  containOuter: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: cx(95),
    height: cx(190),
    justifyContent: 'center',
    width: cx(190),
  },
  contentInner: {
    alignItems: 'center',
    height: cx(220),
    justifyContent: 'center',
    width: cx(220),
  },
  spot1: {
    height: cx(20),
    position: 'absolute',
    width: cx(20),
  },
  spot2: {
    height: cx(14),
    position: 'absolute',
    width: cx(14),
  },
  // blurView: {
  //   backgroundColor: '#0376FF',
  //   opacity: 0.3,
  //   width: cx(138),
  //   height: cx(138),
  //   borderRadius: cx(69),
  // },
});

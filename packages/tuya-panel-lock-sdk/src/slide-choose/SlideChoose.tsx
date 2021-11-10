import React, { useRef } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { Circle } from 'react-native-svg';
import { Utils, TYText, LinearGradient } from 'tuya-panel-kit';
import ArrowWave from './ArrowWave';
import { useLinearGradient, useHandleResponder, useBtnText } from './hooks';
import { getLinearGradientParams, getBarStyle, gethandleStyle, getArrowWaveNum } from './utils';
import { SlideChooseProps } from './interface';

const { width } = Utils.RatioUtils;
// 中间图标 和背景分离
// loading
const defaultHanldeIcon = require('./res/circleKey.png');

const SlideChoose: React.FC<SlideChooseProps> = ({
  onChooseLeft,
  onChooseRight,
  leftText = 'left',
  rightText = 'right',
  triggerDistance = 50,
  leftColor = 'transparent',
  rightColor = 'transparent',
  btnTextColor = '#fff',
  loadingTextColor = '#fff',
  handleIcon = defaultHanldeIcon,
  waveColor = '#ddd',
  circleBgColor = '#fff',
  circleRadius = 40,
  loadingText = undefined,
  async = false,
  indicatorColor = '#000',
  handleStyle,
  singleSide = false,
  sliderWidth = 165,
  showArrowWave = 3,
  onChooseEnd,
  onTouchStart,
  openWaveAnimation = true,
  waveContainerStyle,
}) => {
  const screenWidth = width;
  const barHeight = 52; /** 滑动按钮高度 */
  const barWidth = singleSide ? sliderWidth * 2 : sliderWidth; /** 滑动按钮单边宽度 渐变色彩区域 */
  const originCenterLeft = barWidth * 0.5 - circleRadius; /** 计算中间按钮位置 */
  const distanceOfArrowToSide = barWidth * 0.4; /** 箭头距离边界的距离，控制文字显示范围 */

  const arrowWaveLeftRef = useRef<any>();
  const arrowWaveRightRef = useRef<any>();
  const [leftLinearGradient, rightLinearGraient] = useLinearGradient(
    leftColor,
    rightColor,
    barWidth,
    barHeight
  );
  const { panResponder, centerPos, waiting } = useHandleResponder({
    triggerDistance,
    barWidth,
    async,
    onTouchStart,
    circleRadius,
    onMove: () => {
      arrowWaveLeftRef.current?.hide();
      arrowWaveRightRef.current?.hide();
    },
    onMoveEnd: (status, done) => {
      if (status === 'left') onChooseLeft && onChooseLeft(done);
      if (status === 'right') onChooseRight && onChooseRight(done);
      if (status === 'left' || status === 'right') onChooseEnd && onChooseEnd(done);

      if (status === 'done') {
        arrowWaveLeftRef.current?.show();
        arrowWaveRightRef.current?.show();
      }
    },
  });

  const leftTextElement = useBtnText(leftText, {
    color: btnTextColor,
    position: 'absolute',
    left: 16,
  });
  const rightTextElement = useBtnText(rightText, {
    color: btnTextColor,
    position: 'absolute',
    right: 16,
  });

  const { linearProps, stops } = getLinearGradientParams(circleBgColor);

  const showLeft = !singleSide || singleSide === true || singleSide === 'left';
  const showRight = !singleSide || singleSide === 'right';
  const leftStyle = getBarStyle(singleSide, true);
  const rightStyle = getBarStyle(singleSide, false);
  const innerHandleStyle = gethandleStyle(singleSide);
  const arrowNum = getArrowWaveNum(showArrowWave, singleSide);

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      <View style={[styles.sliderWraper, { width: singleSide ? barWidth : barWidth * 2 }]}>
        {showLeft && (
          <View style={[styles.left, { ...leftStyle, width: barWidth }]}>
            {leftLinearGradient}
            {leftTextElement}
            {singleSide && rightTextElement}
            {showArrowWave && (
              <ArrowWave
                ref={arrowWaveLeftRef}
                arrowColor={waveColor}
                reverse
                arrowNum={arrowNum}
                openWaveAnimation={openWaveAnimation}
                arrowStyle={{ transform: [{ rotate: singleSide ? '225deg' : '45deg' }] }}
                containerStyle={{
                  position: 'absolute',
                  left: distanceOfArrowToSide,
                  width: singleSide ? 70 : 35,
                  ...(waveContainerStyle || {}),
                }}
              />
            )}
          </View>
        )}

        {showRight && (
          <View style={[styles.right, { ...rightStyle, width: barWidth, marginLeft: -1 }]}>
            {rightLinearGraient}
            {rightTextElement}
            {singleSide && leftTextElement}
            {showArrowWave && (
              <ArrowWave
                ref={arrowWaveRightRef}
                arrowColor={waveColor}
                arrowNum={arrowNum}
                openWaveAnimation={openWaveAnimation}
                arrowStyle={{
                  transform: [{ rotate: singleSide ? '45deg' : '225deg' }],
                }}
                containerStyle={{
                  position: 'absolute',
                  right: distanceOfArrowToSide,
                  width: singleSide ? 70 : 35,
                }}
              />
            )}
          </View>
        )}

        {waiting && loadingText && (
          <View
            style={{
              position: 'absolute',
              width: 2 * circleRadius,
              // left: originCenterLeft,
              overflow: 'hidden',
            }}
          >
            <TYText style={{ color: loadingTextColor, textAlign: 'center' }}>{loadingText}</TYText>
          </View>
        )}

        <Animated.View
          testID="circleKey"
          {...panResponder.panHandlers}
          style={[
            styles.circle,
            {
              width: circleRadius * 2,
              height: circleRadius * 2,
              borderRadius: circleRadius,
              ...innerHandleStyle,
              ...handleStyle,
              transform: [{ translateX: centerPos }],
            },
          ]}
        >
          <LinearGradient gradientId="GradientCircle" {...linearProps} stops={stops}>
            <Circle cx={circleRadius} cy={circleRadius} r={circleRadius} />
          </LinearGradient>

          {waiting ? <ActivityIndicator color={indicatorColor} /> : <Image source={handleIcon} />}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    position: 'absolute',
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  left: {
    height: 52,
    justifyContent: 'center',
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  right: {
    height: 52,
    justifyContent: 'center',
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  sliderWraper: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default SlideChoose;

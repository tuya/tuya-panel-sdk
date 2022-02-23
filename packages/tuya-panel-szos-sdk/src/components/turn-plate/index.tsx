import React, { FC, useEffect, useState } from 'react';
import {
  Animated,
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Progress, Utils } from 'tuya-panel-kit';
import res from '../../res';

interface IProps {
  /**
   * 图片背景样式
   */
  imageStyle?: StyleProp<ViewStyle>;
  /**
   * 转盘样式
   */
  turnPlateStyle?: StyleProp<ViewStyle>;
  /**
   * 分布在周边的圆点样式
   */
  dotStyle?: StyleProp<ViewStyle>;
  /**
   * 转盘上圆点样式样式
   */
  turnPlateDotStyle?: StyleProp<ViewStyle>;
  /**
   * 隐藏的Progress样式
   */
  progressStyle?: StyleProp<ViewStyle>;
  /**
   * 转盘事件
   */
  onTurnPlateChange: (v: number) => void;
  /**
   * 转动的值
   */
  plateValue: number;
  /**
   * 间距
   */
  plateStepValue?: number;
  /**
   * 起始角度
   */
  startAngle?: number;
  /**
   * 结束角度
   */
  endAngle?: number;
  /**
   * 盒子容器大小
   */
  boxHeight?: number;
  /**
   * 转盘容器大小
   */
  driverHeight?: number;
  /**
   * 激活颜色
   */
  activeColor?: string;
  /**
   * 未激活颜色
   */
  inactiveColor?: string;
  /**
   * 转盘背景图
   */
  imageSource?: ImageSourcePropType;
  /**
   * Progress max
   */
  max?: number;
  /**
   * Progress min
   */
  min?: number;
  /**
   * Progress start 角度
   */
  startDegree?: number;
  /**
   * Progress end 角度
   */
  andDegree?: number;
  /**
   * Progress scaleHeight
   */
  scaleHeight?: number;
  /**
   * Progress 滑块半径
   */
  thumbRadius?: number;
  /**
   * 禁止使用
   */
  disabled?: boolean;
}

const { convertY } = Utils.RatioUtils;

const TurnPlate: FC<IProps> = (props: IProps) => {
  const {
    turnPlateStyle,
    imageStyle,
    dotStyle,
    turnPlateDotStyle,
    progressStyle,
    onTurnPlateChange,
    plateValue = 0,
    plateStepValue = 5,
    activeColor = '#6161EF',
    inactiveColor = '#D9D9E0',
    imageSource = res.driver,
    startAngle = 225,
    endAngle = 270,
    driverHeight = convertY(185),
    boxHeight = convertY(300),
    startDegree = 130,
    andDegree = 280,
    scaleHeight = 70,
    thumbRadius = 35,
    max = 100,
    min = 0,
    disabled = false,
  } = props;

  const [ang, setAng] = useState<number>(plateValue / plateStepValue);
  const dotCount = Math.round(max / plateStepValue) + 1;
  // 点与点之间的角度
  const angleUnit = endAngle / (dotCount - 1);
  useEffect(() => {
    setAng(Math.round(plateValue / plateStepValue));
  }, [plateValue]);

  return (
    <ImageBackground
      source={imageSource}
      style={[style.background, { width: boxHeight, height: boxHeight }, imageStyle]}
    >
      {dotCount > 0 &&
        Array.from({ length: dotCount }).map((c, i) => {
          // 弧长
          const dotAngle = ((i * angleUnit + startAngle) / 180) * Math.PI;
          return (
            <View
              style={[
                style.dot,
                {
                  width: convertY(6),
                  height: convertY(6),
                  backgroundColor: ang >= i ? activeColor : inactiveColor,
                  // 盒子半径-圆盘半径*计算角度-圆点半径
                  top: boxHeight / 2 - convertY(120) * Math.cos(dotAngle) - convertY(3),
                  // 盒子半径+圆盘半径*计算角度-圆点半径
                  left: boxHeight / 2 + convertY(120) * Math.sin(dotAngle) - convertY(3),
                  opacity: disabled ? 0.7 : 1,
                },
                dotStyle,
              ]}
            />
          );
        })}

      <View style={[{ width: driverHeight, height: driverHeight }, turnPlateStyle]}>
        <Animated.View
          style={{
            width: driverHeight,
            height: driverHeight,
            transform: [{ rotate: `${ang * angleUnit}deg` }],
          }}
        >
          <View
            style={[
              style.dot,
              {
                backgroundColor: activeColor,
                top:
                  driverHeight / 2 -
                  convertY(75) * Math.cos((startAngle / 180) * Math.PI) -
                  convertY(5),
                left:
                  driverHeight / 2 +
                  convertY(75) * Math.sin((startAngle / 180) * Math.PI) -
                  convertY(5),
                opacity: disabled ? 0.7 : 1,
              },
              turnPlateDotStyle,
            ]}
          />
        </Animated.View>
      </View>

      <Progress
        style={[{ position: 'absolute', opacity: 0 }, style.progress, progressStyle]}
        stepValue={plateStepValue}
        value={ang * plateStepValue}
        startDegree={startDegree}
        andDegree={andDegree}
        scaleHeight={scaleHeight}
        thumbRadius={thumbRadius}
        max={max}
        min={min}
        disabled={disabled}
        onValueChange={v => {
          setAng(Math.round(v / plateStepValue));
        }}
        onSlidingComplete={(v: number) => {
          onTurnPlateChange(v);
        }}
      />
    </ImageBackground>
  );
};
TurnPlate.defaultProps = {
  turnPlateStyle: {},
  imageStyle: {},
  dotStyle: {},
  turnPlateDotStyle: {},
  progressStyle: {},
  // onTurnPlateChange : (v: number) => {},
  // plateValue: 0,
  plateStepValue: 5,
  activeColor: '#6161EF',
  inactiveColor: '#D9D9E0',
  imageSource: res.driver,
  startAngle: 225,
  endAngle: 270,
  driverHeight: convertY(185),
  boxHeight: convertY(300),
  startDegree: 130,
  andDegree: 280,
  scaleHeight: 70,
  thumbRadius: 35,
  max: 100,
  min: 0,
  disabled: false,
};
const style = StyleSheet.create({
  background: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: convertY(40),
    position: 'relative',
  },
  dot: {
    borderRadius: convertY(5),
    height: convertY(10),
    position: 'absolute',
    width: convertY(10),
  },
  progress: {
    height: convertY(270),
    width: convertY(270),
  },
});

export default TurnPlate;

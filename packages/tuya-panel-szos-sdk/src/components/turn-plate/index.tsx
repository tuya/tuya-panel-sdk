import React, { FC, useEffect, useState } from 'react'
import { Animated, ImageBackground, ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle, } from 'react-native'
import { Progress, Utils } from 'tuya-panel-kit'
import res from '../../res'

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
  value: number;
  /**
   * 步长
   */
  stepValue?: number;
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
}

const { convertY,convertX } = Utils.RatioUtils

const DriverHeight = convertY(185)
const BoxHeight = convertY(300)
// 点与点之间的角度
const angleUnit = 13.5
const DotCount = 21
const intAngle = 225

const TurnPlate: FC<IProps> = ({
                                 turnPlateStyle = {},
                                 imageStyle,
                                 dotStyle = {},
                                 turnPlateDotStyle = {},
                                 progressStyle = {},
                                 onTurnPlateChange,
                                 value = 0,
                                 stepValue = 25,
                                 activeColor = '#6161EF',
                                 inactiveColor = '#D9D9E0',
                                 imageSource = res.driver,
                               }: IProps) => {
  const [ang, setAng] = useState<number>(value / stepValue)

  useEffect(() => {
    if (value) {
      setAng(value / stepValue)
    }
  }, [value])
  return (
    <ImageBackground source={imageSource} style={[style.background, imageStyle]}>
      {Array.from({ length: DotCount }).map((c, i) => {
        const dotAngle = ((i * angleUnit + intAngle) / 180) * Math.PI
        return (
          <View
            key={dotAngle}
            style={[
              style.dot,
              {
                width: convertY(6),
                height: convertY(6),
                backgroundColor: ang >= i ? activeColor : inactiveColor,
                // 盒子半径-圆盘半径*计算角度-圆点半径
                top: BoxHeight / 2 - convertY(120) * Math.cos(dotAngle) - convertY(3),
                // 盒子半径+圆盘半径*计算角度-圆点半径
                left: BoxHeight / 2 + convertY(120) * Math.sin(dotAngle) - convertY(3),
              },
              dotStyle,
            ]}
          />
        )
      })}

      <View style={[style.wrap, turnPlateStyle]}>
        <Animated.View style={[{ transform: [{ rotate: `${ang * angleUnit}deg` }] }, style.wrap]}>
          <View style={[style.dot, { backgroundColor: activeColor }, turnPlateDotStyle]}/>
        </Animated.View>


      </View>
      <Progress
        style={[{ position: 'absolute', opacity: 0 }, style.progress, progressStyle]}
        stepValue={stepValue}
        value={ang * stepValue}
        max={(DotCount - 1) * stepValue}
        startDegree={130}
        andDegree={280}
        scaleHeight={90}
        thumbRadius={45}
        onValueChange={v => {
          setAng(v / stepValue)
        }}
        onSlidingComplete={(v: number) => {
          onTurnPlateChange(v)
        }}
      />
    </ImageBackground>
  )
}

const style = StyleSheet.create({
  background: {
    alignItems: 'center',
    alignSelf: 'center',
    height: BoxHeight,
    justifyContent: 'center',
    marginVertical: convertY(40),
    position: 'relative',
    width: BoxHeight,
  },
  dot: {
    borderRadius: convertY(5),
    height: convertY(10),
    left: DriverHeight / 2 + convertY(75) * Math.sin((intAngle / 180) * Math.PI) - convertY(5),
    position: 'absolute',
    top: DriverHeight / 2 - convertY(75) * Math.cos((intAngle / 180) * Math.PI) - convertY(5),
    width: convertY(10),
  },
  progress: {
    height: convertY(350),
    width: convertY(350),
  },
  wrap: {
    height: DriverHeight,
    width: DriverHeight,
  },
})

export default TurnPlate

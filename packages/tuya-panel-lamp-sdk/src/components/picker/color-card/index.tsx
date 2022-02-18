import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, TouchableWithoutFeedback, Animated } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { useControllableValue, usePersistFn } from 'ahooks';
import { Svg, Rect } from 'react-native-svg';
import { objectShallowEqual, hsv2hex, ColorUtils } from '../../../utils';
import Slider from './Slider';
import { Color as ColorData } from './Colors';
import { ColorCardsProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;

const ColorCard: React.FC<ColorCardsProps> = props => {
  const {
    style,
    isColour = true,
    height = 200,
    width = 400,
    hasBorder = false,
    borderColor = '#fff',
    borderWidth = 1,
    xNum = 11,
    yNum = 5,
    hideBright,
    brightOption = {
      activeColor: '#fff',
      trackColor: 'grey',
      fontColor: '#000',
    },
    opacityAnimationValue = 1,
    disabled,
    colors = ColorData,
    onMove,
    innerBorder = 3,
    innerRadius = 10,
    innerStyle = {
      borderColor: '#fff',
    },
    outerRadius = 12,
  } = props;
  const opacity = useRef(new Animated.Value(opacityAnimationValue)).current;
  const [singleWidth, setSingleWidth] = useState(31);
  const [singleHeight, setSingleHeight] = useState(31);
  const [value, setValue] = useControllableValue(props, { trigger: 'onRelease' });
  useEffect(() => {
    setSingleHeight(Math.fround(!hideBright ? (height - cx(40)) / yNum : height / yNum));
    setSingleWidth(Math.fround(width / xNum));
  }, [width, height]);
  const handleCardPress = usePersistFn(e => {
    if (disabled) return;
    const { locationX, locationY } = e.nativeEvent;
    const xCount = Math.floor(locationX / singleWidth) + 1;
    const yCount = Math.floor(locationY / singleHeight);
    const totalCount = xNum * yCount + xCount;
    setValue(
      isColour
        ? {
            ...colors[totalCount - 1],
            value: value.value,
          }
        : {
            ...colors[totalCount - 1],
            brightness: value.brightness,
          }
    );
  });
  const colourCards = useMemo(() => {
    const currentIndex = colors.findIndex(item =>
      isColour
        ? objectShallowEqual(item, value, ['hue', 'saturation'])
        : objectShallowEqual(item, value, ['temperature'])
    );
    const xIndex = currentIndex % xNum;
    const yIndex = Math.floor(currentIndex / xNum);
    return (
      <View style={{ width }}>
        <TouchableWithoutFeedback style={{ width }} onPress={handleCardPress}>
          <Animated.View
            style={[
              {
                overflow: 'hidden',
                borderWidth,
                borderColor,
                width,
                opacity,
                height: hideBright ? height : height - cx(40),
              },
              hideBright
                ? {
                    borderRadius: outerRadius,
                  }
                : {
                    borderTopLeftRadius: outerRadius,
                    borderTopRightRadius: outerRadius,
                  },
            ]}
          >
            <Svg width={width} height={hideBright ? height : height - cx(40)}>
              {colors.map((item, index) => {
                const top = index % xNum;
                const left = Math.floor(index / xNum);
                return (
                  <Rect
                    key={item}
                    x={top * singleWidth}
                    y={left * singleHeight}
                    width={singleWidth}
                    height={singleHeight}
                    fill={
                      isColour
                        ? hsv2hex(item.hue, item.saturation, item.value)
                        : ColorUtils.brightKelvin2rgba(item.brightness, item.temperature)
                    }
                  />
                );
              })}
            </Svg>
          </Animated.View>
        </TouchableWithoutFeedback>
        {Object.keys(value).length > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              innerStyle,
              {
                borderWidth: innerBorder,
                borderRadius: innerRadius,
                width: singleWidth + innerBorder * 1.2,
                height: singleHeight + innerBorder * 1.2,
                top: yIndex * singleHeight - innerBorder / 2,
                left: xIndex * singleWidth - innerBorder / 2,
                position: 'absolute',
              },
              opacityAnimationValue < 1 && {
                backgroundColor: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['#000', 'rgba(0,0,0,0)'],
                }),
              },
              currentIndex === 0 && {
                borderTopLeftRadius: Math.fround(outerRadius + innerRadius / 2),
              },
              currentIndex === xNum - 1 && {
                borderTopRightRadius: Math.fround(outerRadius + innerRadius / 2),
              },
              hideBright &&
                currentIndex === xNum * (yNum - 1) && {
                  borderBottomLeftRadius: Math.fround(outerRadius + innerRadius / 2),
                },
              hideBright &&
                currentIndex === xNum * yNum - 1 && {
                  borderBottomRightRadius: Math.fround(outerRadius + innerRadius / 2),
                },
            ]}
          />
        )}
      </View>
    );
  }, [singleWidth, singleHeight, xNum, yNum, value, opacityAnimationValue]);

  const handleBrightMove = (v: number) => {
    const params = isColour ? { ...value, value: v } : { ...value, brightness: v };
    onMove?.(params);
  };

  const handleBrightComplete = (v: number) => {
    const params = isColour ? { ...value, value: v } : { ...value, brightness: v };
    setValue(params);
  };

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: opacityAnimationValue,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [opacityAnimationValue]);

  return (
    <View
      style={[
        style,
        {
          width: width + innerBorder * 2,
          height: height + innerBorder * 2,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      {colourCards}
      <View style={{ width }}>
        {!hideBright && (
          <Slider
            style={{ width }}
            onlySlider={false}
            borderColor={hasBorder ? borderColor : 'transparent'}
            borderWidth={borderWidth}
            {...brightOption}
            opacityAnimationValue={opacityAnimationValue}
            disabled={disabled}
            min={10}
            max={1000}
            // trackColor={isDarkTheme ? 'rgba(255,255,255,0.1)' : '#DDD'}
            clickEnabled
            value={isColour ? value.value : value.brightness}
            onGrant={handleBrightComplete}
            onMove={handleBrightMove}
            onRelease={handleBrightComplete}
            onPress={handleBrightComplete}
          />
        )}
      </View>
    </View>
  );
};

export default ColorCard;

import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import { SceneAnimationListProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;
const SceneAnimationList: React.FC<SceneAnimationListProps> = ({
  scrollProperty,
  style,
  contentStyle,
  scenesList,
  itemStyle,
  textColor,
  activeOpacity,
  isAnimated,
  animatedTime,
  cardScale,
  sceneItemStyle,
  imgStyle,
  textStyle,
  textSize,
  onPress,
  borderColor,
  activeKey,
  animatingClick,
  itemStartColor,
  itemAnimatedColor,
  borderWidth,
}) => {
  const animationList = scenesList?.map(() => {
    return new Animated.Value(0);
  });
  const animaItem = useRef(animationList).current;

  const [activeItem, setActiveItem] = useState(-1);
  const animation = (key: any, value: number) => {
    return Animated.timing(key, {
      toValue: value,
      duration: animatedTime,
    });
  };
  let animatedIngTime = useRef(false).current;
  useEffect(() => {
    activeItem !== -1 &&
      !animatingClick &&
      animaItem[activeItem].addListener(item => {
        animatedIngTime = !!Number(item.value);
      });
  }, [activeItem]);
  const handleScene = (key: string | number, idx: number) => {
    isAnimated &&
      Animated.sequence([animation(animaItem[idx], 1), animation(animaItem[idx], 0)]).start();
    onPress(key);
    setActiveItem(idx);
  };
  return (
    <ScrollView
      {...scrollProperty}
      style={style}
      contentContainerStyle={[styles.contentStyle, contentStyle]}
    >
      {scenesList?.map((item, idx: number) => {
        const { key, itemView, img, text } = item;
        const active = activeKey ? activeKey === key : activeItem === idx;
        return (
          <Animated.View
            key={key}
            style={[
              itemStyle,
              styles.itemView,
              active && {
                borderWidth,
              },
              {
                transform: [
                  {
                    scale: animaItem[idx].interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, cardScale],
                    }),
                  },
                ],
                borderColor,

                backgroundColor: animaItem[idx].interpolate({
                  inputRange: [0, 1],
                  outputRange: [itemStartColor || 'blue', itemAnimatedColor || 'green'],
                }),
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={activeOpacity}
              onPress={() => !animatedIngTime && handleScene(key, idx)}
              style={styles.sceneItem}
            >
              {itemView || (
                <View style={[sceneItemStyle, styles.sceneItemStyle]}>
                  {img && <Image source={img} style={imgStyle} />}
                  {text && (
                    <TYText text={text} color={textColor} style={textStyle} size={textSize} />
                  )}
                </View>
              )}

              <TYText />
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};
SceneAnimationList.defaultProps = {
  scrollProperty: {
    scrollEventThrottle: 16,
    showsVerticalScrollIndicator: false,
  },
  contentStyle: {
    paddingHorizontal: cx(10),
  },
  activeOpacity: 1,
  isAnimated: true,
  animatedTime: 200,
  cardScale: 0.9,
  onPress: (value: string | number) => {},
  animatingClick: false,
};
const styles = StyleSheet.create({
  contentStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemView: {
    borderRadius: cx(16),
    height: cx(88),
    marginTop: cx(20),
    overflow: 'hidden',
    width: cx(168),
  },
  sceneItem: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  sceneItemStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: cx(20),
    width: '100%',
  },
});
export default SceneAnimationList;

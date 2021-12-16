/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useRef } from 'react';
import { View, StyleSheet, Image, Animated, TouchableOpacity, Easing } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { useControllableValue, useUpdateEffect } from 'ahooks';
import { DrawerProps, DrawerData } from './interface';

const MusicDrawer: FC<DrawerProps> = props => {
  const {
    height,
    value,
    styles,
    animateDuration,
    animateEasing,
    onPress,
    renderActiveContent,
  } = props;
  const {
    containerStyle,
    contentStyle,
    titleStyle,
    subTitleStyle,
    rightIconStyle,
    leftIconStyle,
    leftIconBoxStyle,
    rightIconBoxStyle,
  } = styles || {};
  const cardHeight = useRef(
    value.map(index => {
      return new Animated.Value(height);
    })
  ).current;
  const activeHeight = useRef(
    value.map(index => {
      return height;
    })
  );
  // 组件渲染次数
  const renderTime = useRef(0);
  const [activeIndex, setActiveIndex] = useControllableValue<number>(props, {
    valuePropName: 'activeIndex',
    trigger: 'onChangeIndex',
  });
  const _onLayout = (e: any, index: number) => {
    const { height: itemHeight } = e.nativeEvent.layout;
    activeHeight.current[index] = itemHeight + height;
    // 防止没计算完高度就进行渲染,且有默认index才进行动画值的设置
    if (
      typeof cardHeight[activeIndex] !== 'undefined' &&
      renderTime.current < value.length &&
      activeIndex !== -1
    ) {
      cardHeight[activeIndex]?.setValue(activeHeight.current[activeIndex]);
    }
    renderTime.current++;
  };
  useUpdateEffect(() => {
    // 没选中的默认收缩
    cardHeight.forEach(item => {
      Animated.timing(item, {
        toValue: height,
        duration: animateDuration,
        easing: Easing[animateEasing],
      }).start();
    });
    // 选中的展开
    if (activeIndex !== -1) {
      Animated.timing(cardHeight[activeIndex], {
        toValue: activeHeight.current[activeIndex],
        duration: animateDuration,
        easing: Easing[animateEasing],
      }).start();
    }
  }, [activeIndex, activeHeight]);

  const handlePress = (item: DrawerData, idx: number) => {
    // 如果已展开，就关闭
    if (idx === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(idx);
    }
    onPress(item, idx);
  };
  const renderRightIcon = (item: DrawerData, index: number) => {
    const res = !item.rightIconSource?.normalIcon
      ? index === activeIndex
        ? item.rightIconSource?.stopIcon
        : item.rightIconSource?.startIcon
      : item.rightIconSource?.normalIcon;

    if (res !== undefined) {
      return (
        <TouchableOpacity style={style.videoBtnBox} onPress={() => handlePress(item, index)}>
          <View style={[rightIconBoxStyle, style.iconBox]}>
            <Image style={rightIconStyle} source={res} resizeMode="contain" />
          </View>
        </TouchableOpacity>
      );
    }
    return <View />;
  };
  const renderItem = (item: DrawerData, index: number) => {
    return (
      <Animated.View
        key={item.id}
        style={[
          style.cardContainer,
          containerStyle,
          {
            height: cardHeight[index],
          },
        ]}
      >
        <View style={[contentStyle, style.videoContent, { height }]}>
          <View style={style.videoInfo}>
            {item.leftIconSource && (
              <View style={[leftIconBoxStyle, style.iconBox]}>
                <Image style={leftIconStyle} source={item.leftIconSource} resizeMode="contain" />
              </View>
            )}
            <View>
              {item.title && <TYText style={titleStyle}>{item.title}</TYText>}
              {item.subTitle && <TYText style={subTitleStyle}>{item.subTitle}</TYText>}
            </View>
          </View>

          {renderRightIcon(item, index)}
        </View>
        <View onLayout={e => _onLayout(e, index)}>{renderActiveContent(item.id)}</View>
      </Animated.View>
    );
  };
  return <View>{value.map((item, index) => renderItem(item, index))}</View>;
};
const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    overflow: 'hidden',
    width: '100%',
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoBtnBox: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  videoContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    width: '100%',
  },
  videoInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
MusicDrawer.defaultProps = {
  height: 102,
  animateDuration: 300,
  animateEasing: 'linear',
};
export default MusicDrawer;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  ScrollView,
  NativeScrollEvent,
  LayoutChangeEvent,
} from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { ColorUtils } from '../../../utils';
import { IColor, IColorSelectorAnimationProp } from './interface';
import Circle from './Circle';
import Btn from './Btn';
// eslint-disable-next-line import/no-named-as-default
import icon from '../../../res/iconfont';

const { convertX: cx, winWidth } = Utils.RatioUtils;

const ColorSelectorAnimation: React.FC<IColorSelectorAnimationProp> = ({
  onDel,
  onAdd,
  onSelect,
  showDel,
  showAdd,
  data,
  noWrap,
  left,
  selectIndex,
  style,
  addBtnStyle,
  delBtnStyle,
  activeStyle,
  btnStyle,
  addIconColor,
  delIconColor,
  scaleValue,
  scrollEnabled,
}) => {
  const [index, setIndx] = useState(selectIndex);
  const [newData, setNewData] = useState(data);
  const refX = useRef<ScrollView>();
  const refLayout = useRef(false);
  const refNum = useRef(0);

  useEffect(() => {
    setIndx(selectIndex);
  }, [selectIndex]);

  useEffect(() => {
    setNewData(data);
  }, [data]);

  const renderItem = () => {
    return newData.map((item: IColor, i: number) => {
      const { isColour, hue, saturation, value, brightness, temperature } = item;
      let color: string;
      if (isColour) {
        color = ColorUtils.hsv2rgba(hue, saturation, value);
      } else {
        color = ColorUtils.brightKelvin2rgba(brightness, temperature);
      }
      const active = index === i;
      return (
        <TouchableOpacity
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          activeOpacity={0.7}
          onPress={() => onSelect(i)}
          style={active ? activeStyle : btnStyle}
        >
          <Circle backgroundColor={color} scaleValue={active ? scaleValue : 1} />
        </TouchableOpacity>
      );
    });
  };

  const renderCenter = () => {
    return (
      <>
        {renderItem()}
        {showAdd && (
          <Btn
            onPress={handleAdd}
            path={icon.add}
            style={[styles.buttonStyle, addBtnStyle]}
            iconColor={addIconColor}
          />
        )}
        {showDel && (
          <Btn
            onPress={() => handleDel(index)}
            path={icon.remove}
            style={[styles.buttonStyle, delBtnStyle]}
            iconColor={delIconColor}
          />
        )}
      </>
    );
  };

  const onLayoutX = (e: LayoutChangeEvent) => {
    // 铺满时添加删除按钮不再移动了
    if (e.nativeEvent.layout.x === 0) {
      refLayout.current = true;
      refNum.current = newData.length;
    }
  };

  const handleAdd = () => {
    onAdd();
    if (refLayout.current) {
      refX.current.scrollTo({ x: left * (newData.length + 1 - refNum.current) });
    }
  };
  const handleDel = (i: number) => {
    onDel(i);
    if (refLayout.current) {
      refX.current.scrollTo({ x: left * (newData.length + 1 - refNum.current) });
    }
  };

  if (noWrap) {
    return <View style={[styles.container, { flexWrap: 'wrap' }, style]}>{renderCenter()}</View>;
  }
  return (
    <ScrollView
      onLayout={onLayoutX}
      ref={(ref: ScrollView) => {
        refX.current = ref;
      }}
      scrollEventThrottle={16}
      contentContainerStyle={[styles.container, style]}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={scrollEnabled}
      horizontal
    >
      {renderCenter()}
    </ScrollView>
  );
};

ColorSelectorAnimation.defaultProps = {
  showAdd: true,
  showDel: true,
  data: [
    {
      isColour: true,
      hue: 360,
      saturation: 800,
      value: 1000,
    },
    {
      isColour: false,
      brightness: 1000,
      temperature: 0,
    },
    {
      isColour: true,
      hue: 220,
      saturation: 1000,
      value: 1000,
    },
  ],
  noWrap: false,
  scrollEnabled: true,
  selectIndex: -1,
  scaleValue: 0.65,
  left: cx(41),
  style: {},
  addBtnStyle: {},
  delBtnStyle: {},
  activeStyle: {
    alignItems: 'center',
    borderRadius: cx(14),
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.9)',
    height: cx(28),
    justifyContent: 'center',
    marginRight: cx(9),
    marginBottom: cx(9),
    width: cx(28),
    overflow: 'hidden',
  },
  btnStyle: {
    alignItems: 'center',
    borderRadius: cx(16),
    height: cx(32),
    justifyContent: 'center',
    marginRight: cx(9),
    width: cx(32),
    marginBottom: cx(9),
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSelect(index: number) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onAdd() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onDel(index: number) {},
  addIconColor: '#000000',
  delIconColor: '#000000',
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: cx(14),
    height: cx(28),
    justifyContent: 'center',
    marginBottom: cx(9),
    marginRight: cx(9),
    width: cx(28),
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: cx(9),
    paddingHorizontal: cx(20),
  },
});

export default ColorSelectorAnimation;

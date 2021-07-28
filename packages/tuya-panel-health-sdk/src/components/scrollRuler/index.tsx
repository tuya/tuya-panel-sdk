import React, { FC, ReactNode, useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, FlatList, ColorValue, ViewStyle } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';

const { convertX: cx, convertY: cy, width } = Utils.RatioUtils;

const HALF_WIDTH = width / 2;
const SCALE_LONG_SPACE = cx(80);
const SCALE_SHORT_SPACE = cx(80) / 10;
const DEFAULT_SCALE_SHORT_HEIGHT = cy(32);
const DEFAULT_SCALE_MIDDLE_HEIGHT = cy(37);
const DEFAULT_SCALE_LONG_HEIGHT = cy(46);

export interface SliderRulerProps {
  min: number;
  max: number;
  // 两个刻度之间的值
  step: number;
  value: number;
  title?: ReactNode;
  scaleShortHeight?: number;
  scaleMiddleHeight?: number;
  scaleLongHeight?: number;
  scaleColor?: ColorValue;
  titleStyle?: ViewStyle;
  valueStyle?: ViewStyle;
  pointerStyle?: ViewStyle;
  formatValue?: (v: number) => number | string;
  onChange?: (v: number) => void;
}

const ScrollRuler: FC<SliderRulerProps> = (props: SliderRulerProps) => {
  const {
    min,
    max,
    value,
    title,
    scaleShortHeight,
    scaleMiddleHeight,
    scaleLongHeight,
    scaleColor,
    titleStyle,
    valueStyle,
    pointerStyle,
    formatValue,
    onChange,
  } = props;
  // current value
  const cvRef = useRef(value);
  const ref = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let timer: number;
    if (ref.current) {
      // https://stackoverflow.com/questions/67440618/react-native-flatlist-scrolltoindex-is-not-working-when-screen-loaded-for-the
      timer = setTimeout(() => {
        ref.current.scrollToOffset({ offset: (value - min) * SCALE_LONG_SPACE });
      }, 10);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [ref]);

  const handleScroll = e => {
    const { x } = e.nativeEvent.contentOffset;
    // 根据偏移量计算值
    const intV = Math.floor(x / SCALE_LONG_SPACE);
    const decimalV = Math.floor((x % SCALE_LONG_SPACE) / SCALE_SHORT_SPACE);
    const cv = Math.max(min, Math.min(max, intV + min + decimalV / 10));
    const formatV = formatValue(cv);
    cvRef.current = formatV;
    textRef.current && textRef.current.setText(formatV);
  };

  const handleScrollEndDrag = () => {
    if (cvRef.current) {
      onChange && onChange(cvRef.current);
    }
  };

  // draw line
  const scaleStyle = (index: number) => {
    let height: number;
    switch (index) {
      case 0:
        height = scaleLongHeight;
        break;
      case 5:
        height = scaleMiddleHeight;
        break;
      default:
        height = scaleShortHeight;
        break;
    }
    return [styles.item, { backgroundColor: scaleColor, height }] as ViewStyle;
  };

  const renderItem = ({ index }) => {
    const item = [...Array(10).keys()].map((it, i) => {
      return <View key={`${index}${it}`} style={scaleStyle(i)} />;
    });
    return <View style={styles.itemWrap}>{item}</View>;
  };

  const listHeaderComponent = useMemo(() => <View style={{ width: HALF_WIDTH }} />, []);
  const listFooterComponent = useMemo(
    () => (
      <View style={{ width: HALF_WIDTH }}>
        <View style={[styles.item, { height: scaleLongHeight, backgroundColor: scaleColor }]} />
      </View>
    ),
    []
  );

  const header = useMemo(
    () => (
      <View>
        {title && <TYText style={[styles.title, titleStyle]}>{title}</TYText>}
        <View style={styles.valueWrap}>
          <TYText style={[styles.value, valueStyle]} ref={textRef}>
            {cvRef.current}
          </TYText>
        </View>
        <View style={styles.pointerBox}>
          <View style={[styles.pointer, pointerStyle]} />
        </View>
      </View>
    ),
    [title]
  );

  return (
    <View style={styles.container}>
      {header}
      <FlatList
        ref={ref}
        data={[...Array(max - min).keys()]}
        horizontal
        renderItem={renderItem}
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEndDrag}
        initialNumToRender={10}
        scrollEventThrottle={60}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={listFooterComponent}
        getItemLayout={(data, index) => ({ length: cx(80), offset: cx(80) * index, index })}
      />
    </View>
  );
};

ScrollRuler.defaultProps = {
  min: 0,
  max: 10,
  value: 0,
  scaleShortHeight: DEFAULT_SCALE_SHORT_HEIGHT,
  scaleMiddleHeight: DEFAULT_SCALE_MIDDLE_HEIGHT,
  scaleLongHeight: DEFAULT_SCALE_LONG_HEIGHT,
  scaleColor: '#666',
  formatValue: v => v,
};

const styles = StyleSheet.create({
  container: {
    width,
  },
  item: {
    alignSelf: 'flex-start',
    marginRight: cx(7),
    width: cx(1),
  },
  itemWrap: {
    flexDirection: 'row',
    width: cx(80),
  },
  pointer: {
    borderBottomColor: '#666',
    borderBottomWidth: 4,
    borderLeftColor: 'transparent',
    borderLeftWidth: 4,
    borderRightColor: 'transparent',
    borderRightWidth: 5,
    borderTopColor: 'transparent',
    borderTopWidth: 5,
    height: 0,
    width: 0,
  },
  pointerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: cx(8),
  },
  title: {
    color: '#666',
    fontSize: cx(16),
    fontWeight: 'bold',
    marginBottom: cy(10),
    textAlign: 'center',
  },
  value: {
    color: '#666',
    fontSize: cx(48),
    fontWeight: 'bold',
    marginBottom: cy(12),
    marginTop: cy(18),
  },
  valueWrap: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ScrollRuler;

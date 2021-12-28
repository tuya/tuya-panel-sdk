import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import _get from 'lodash/get';
import Button from './button';
import { RadioButtonProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;
const TabsBar: React.FC<RadioButtonProps> = props => {
  const {
    dataSource,
    horizontal,
    value,
    defaultValue,
    dividerStyle,
    disabled,
    style,
    disabledOpacity,
    activeItemStyle,
    textStyle,
    activeTextStyle,
    itemStyle,
    onChange,
    divider,
  } = props;
  const _activeTextStyle = [textStyle, styles.activeTextStyle, activeTextStyle];
  const labelValue = _get(
    dataSource.find(item => item.value === value),
    ['label'],
    ''
  );
  const itemPadding = useRef(+_get(StyleSheet.flatten(props.itemStyle), ['padding'], cx(3)))
    .current;
  const activePosition = useRef(new Animated.Value(0));
  const [values, setValues] = useState(
    value !== undefined
      ? value
      : defaultValue !== undefined
      ? defaultValue
      : _get(dataSource, [0, 'value'], null)
  );
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [activeViewHidden, setActiveViewHidden] = useState(false);
  const [itemContentWidth, setItemContentWidth] = useState(0);
  const [dividerWidth, setDividerWidth] = useState<number>(0);
  const [mark, setMark] = useState(false);
  const _wrapperStyle = [
    styles.wrapperStyle,
    {
      flexDirection: (horizontal ? 'row' : 'column') as
        | 'row'
        | 'column'
        | 'row-reverse'
        | 'column-reverse',
      width: horizontal ? dataSource.length * cx(64) : cx(64),
      height: horizontal ? cx(48) : dataSource.length * cx(48),
    },
    style,
  ];
  const _activeViewStyle = [
    styles.activeViewStyle,
    { backgroundColor: 'transparent', borderRadius: cx(5) },
    activeItemStyle,
    {
      width: horizontal
        ? itemContentWidth - itemPadding * 2 - dividerWidth / 2
        : wrapperHeight - itemPadding * 2,
      height: horizontal
        ? wrapperHeight - itemPadding * 2 - dividerWidth / 2
        : itemContentWidth - itemPadding * 2 - dividerWidth,
      [horizontal ? 'left' : 'top']: activePosition.current,
      justifyContent: 'center',
      alignItems: 'center',
    },
  ];
  // 移动activeItem动画
  const moveActiveView = (moveValue: number | string) => {
    Animated.spring(activePosition.current, {
      toValue: getActivePositionValue(moveValue), // 内容+分割线的宽度为一个单位
    }).start();
    setValues(value);
  };
  // 计算值对应位置
  const getActivePositionValue = (dataSourceValue: number | string) => {
    // 内容+分割线的宽度为一个单位, 在最后一个单位减去分割线
    if (getActiveIndex(dataSourceValue) === 0) {
      return getActiveIndex(dataSourceValue) * itemContentWidth + itemPadding;
    }
    if (getActiveIndex(dataSourceValue) === dataSource.length - 1) {
      return getActiveIndex(dataSourceValue) * itemContentWidth + itemPadding + dividerWidth;
    }
    return getActiveIndex(dataSourceValue) * itemContentWidth + itemPadding + dividerWidth / 2;
  };
  // value对应的index
  const getActiveIndex = (activeIndex: number | string) => {
    const index = dataSource.findIndex(item => item.value === activeIndex);
    return index > -1 ? index : -2;
  };

  useEffect(() => {
    if (value !== undefined && mark) {
      moveActiveView(value);
    }
  }, [props, mark]);

  const wrapperLayout = e => {
    const wrapperSize = e.nativeEvent.layout;
    const len = dataSource.length;
    const wrapperWidth = wrapperSize[horizontal ? 'width' : 'height'];
    setWrapperHeight(wrapperSize[horizontal ? 'height' : 'width']);
    // 除去边框的内容的宽度
    setItemContentWidth((wrapperWidth - (len - 1) * Number(dividerWidth)) / len);
    setDividerWidth(getDividerWidth());
    setActiveViewHidden(false);
    setMark(true);
  };
  // 分割线宽度
  const getDividerWidth = () => {
    return Number(
      _get(
        StyleSheet.flatten(getDividerStyle()),
        [horizontal ? 'width' : 'height'],
        StyleSheet.hairlineWidth
      )
    );
  };
  const getDividerStyle = () => {
    const barDividerStyle = [
      {
        width: horizontal ? StyleSheet.hairlineWidth : wrapperHeight,
        height: horizontal ? wrapperHeight : StyleSheet.hairlineWidth,
        backgroundColor: '#CCC',
      },
      dividerStyle,
    ];
    return barDividerStyle;
  };

  // 切换
  const changeActiveItem = (changeValue: string | number) => {
    if (changeValue !== values) {
      // 父组件没传value属性, 才由子组件更新, 否则通过useEffect监听props改变
      if (value === undefined) {
        moveActiveView(changeValue);
      }
      triggerOnChange(changeValue);
    }
  };
  const triggerOnChange = (triggerValue: string | number) => {
    onChange && onChange(triggerValue);
  };
  const getItem = () => {
    const buttonStyle = [{ flex: 1 }, itemStyle];
    const buttonTextStyle = [styles.textStyle, textStyle];

    return dataSource
      .map(({ label, value: dataValue, unSelectedIcon }) => (
        <Button
          key={dataValue}
          horizontal={horizontal}
          label={label}
          icon={unSelectedIcon}
          style={buttonStyle}
          textStyle={buttonTextStyle}
          activeTextStyle={{ opacity: 0 }}
          isActive={values === dataValue}
          onItemPress={() => changeActiveItem(dataValue)}
        />
      ))
      .reduce((res, node, idx) => {
        // 插入分割线
        if (divider && idx !== 0) {
          // eslint-disable-next-line
          res.push(<View key={`divider_${idx}`} style={[getDividerStyle()]} />);
        }
        res.push(node);
        return res;
      }, []);
  };

  return (
    <View
      onLayout={wrapperLayout}
      pointerEvents={disabled ? 'none' : 'auto'}
      style={[_wrapperStyle, { opacity: disabled ? disabledOpacity : 1 }]}
    >
      {!activeViewHidden && (
        <Animated.View style={_activeViewStyle}>
          <TYText style={_activeTextStyle} numberOfLines={1}>
            {`${labelValue}`}
          </TYText>
        </Animated.View>
      )}
      {getItem()}
    </View>
  );
};
export default TabsBar;
TabsBar.defaultProps = {
  horizontal: true,
  defaultValue: undefined,
  value: undefined,
  disabled: false,
  disabledOpacity: 0.6,
  divider: true,
  onChange: () => {},
  style: {},
  itemStyle: {},
  activeItemStyle: {},
  textStyle: {},
  activeTextStyle: {},
  dividerStyle: {},
};
const styles = StyleSheet.create({
  activeTextStyle: {
    backgroundColor: 'transparent',
    color: '#5190F3',
    fontSize: cx(14),
    textAlign: 'center',
  },
  activeViewStyle: {
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 2,
  },
  textStyle: {
    backgroundColor: 'transparent',
    color: '#CCCCCC',
    fontSize: cx(14),
    textAlign: 'center',
  },

  wrapperStyle: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderColor: '#FFFFFF',
    borderRadius: cx(5),
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
});

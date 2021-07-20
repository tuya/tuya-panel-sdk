import React, { Component } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import AddBtn from './AddBtn';
import Button from './Button';
import { ColorUtils } from '../../../utils';

const { convertX: cx } = Utils.RatioUtils;

interface Color {
  isColour: boolean; // 是否彩光
  hue?: number;
  saturation?: number;
  value?: number;
  brightness?: number;
  temperature?: number;
}

const defaultProps = {
  /**
   * 是否展示添加按钮
   */
  showAdd: true,
  /**
   * 颜色列表
   */
  data: [] as Color[],
  /**
   * 颜色最大数量
   */
  max: 8,
  /**
   * 当前选中的颜色下标
   */
  selectIndex: -1,
  /**
   * 容器样式
   */
  style: null as StyleProp<ViewStyle>,
  /**
   * 颜色按钮样式
   */
  btnStyle: null as StyleProp<ViewStyle>,
  /**
   * 选中的颜色按钮样式
   */
  activeStyle: null as StyleProp<ViewStyle>,
  /**
   * 新增按钮背景色
   */
  addBtnBg: 'rgba(255,255,255,0.2)',
  /**
   * 新增按钮图标颜色
   */
  addIconColor: '#fff',
  /**
   * 新增按钮点击事件
   */
  onAdd() {},
  /**
   * 颜色按钮点击事件
   */
  onSelect(index: number) {},
  /**
   * 颜色按钮长按事件
   */
  onLongPress(index: number) {},
};

type DefaultProps = Readonly<typeof defaultProps>;

export type IProps = DefaultProps;

interface IState {
  scrollEnabled: boolean;
}

export default class extends Component<IProps, IState> {
  static defaultProps: DefaultProps = defaultProps;
  renderItem = (item: Color, index: number) => {
    const { selectIndex, onSelect, onLongPress, btnStyle, activeStyle } = this.props;
    const { isColour, hue, saturation, value, brightness, temperature } = item;
    let color: string;
    if (isColour) {
      color = ColorUtils.hsv2rgba(hue, saturation, value);
    } else {
      color = ColorUtils.brightKelvin2rgba(brightness, temperature);
    }
    const active = selectIndex === index;
    return (
      <Button
        onPress={() => onSelect(index)}
        onLongPress={() => onLongPress(index)}
        style={[styles.btn, btnStyle, (index + 1) % 6 === 0 && { marginRight: 0 }]}
        key={index}
        color={color}
        activeColor="rgba(255,255,255,0.8)"
        activeStyle={activeStyle}
        active={active}
      >
        {active && <View style={styles.active} />}
      </Button>
    );
  };

  render() {
    const { style, addBtnBg, addIconColor, data, onAdd, showAdd, max, btnStyle } = this.props;
    return (
      <View style={[styles.container, style]}>
        {data.map(this.renderItem)}
        {showAdd && (
          <AddBtn
            iconColor={addIconColor}
            btnColor={addBtnBg}
            onPress={onAdd}
            style={[styles.addBtn, btnStyle, max <= data.length && { opacity: 0.4 }]}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: '#fff',
    borderRadius: cx(6),
    height: cx(12),
    width: cx(12),
  },
  addBtn: {
    marginBottom: 12,
  },
  btn: {
    marginBottom: 12,
    marginRight: cx(15),
  },
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: cx(8),
    width: '100%',
  },
});

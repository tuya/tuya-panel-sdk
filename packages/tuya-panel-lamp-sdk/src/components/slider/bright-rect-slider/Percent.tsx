/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import { StyleSheet, View, StyleProp, TextStyle } from 'react-native';
import { TYText, IconFont } from 'tuya-panel-kit';
import icons from './icons';

interface IPercentProps {
  /**
   * 对齐方式
   */
  layout: 'left' | 'top' | 'right' | 'bottom';
  /**
   * 百分比值
   */
  percent?: number;
  /**
   * 激活区背景色
   */
  colorOver: string;
  /**
   * 百分比样式
   */
  style: StyleProp<TextStyle>;
  /**
   * 滑动激活区外的百分比颜色
   */
  outColor: string;
  /**
   * 长度
   */
  length?: number;
  /**
   * 图标尺寸
   */
  iconSize: number;
  /**
   * 图标颜色
   */
  iconColor: string;
}

export default class Percent extends React.Component<IPercentProps, IPercentProps> {
  constructor(props: IPercentProps) {
    super(props);
    this.state = { ...this.props };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: IPercentProps) {
    this.setState({ ...nextProps });
  }

  setNativeProps(nextProps: IPercentProps) {
    this.setState({ ...nextProps });
  }

  render() {
    const {
      percent = 0,
      length = 0,
      colorOver,
      style,
      outColor,
      iconSize,
      layout,
      iconColor,
    } = this.state;
    let icon = icons.brightLevel1;
    if (percent > 20 && percent <= 60) {
      icon = icons.brightLevel2;
    } else if (percent > 60) {
      icon = icons.brightLevel3;
    }
    let lengthKey = 'width';
    const isVertical = layout === 'top' || layout === 'bottom';
    if (layout === 'top' || layout === 'bottom') {
      lengthKey = 'height';
    }
    const { fontSize } = StyleSheet.flatten([styles.percentText, style]);
    const textWidth = fontSize * 3;
    const minWidth = iconSize + textWidth + 4;
    return (
      <View style={styles.percent} pointerEvents="none">
        <View style={styles[layout]}>
          <View style={[styles[`${layout}Text`], isVertical ? { minWidth } : { width: minWidth }]}>
            <IconFont d={icon} size={iconSize} color={outColor} style={styles.percentIcon} />
            <TYText text={`${percent}%`} style={[styles.percentText, style, { color: outColor }]} />
          </View>
        </View>
        <View
          style={[
            styles.mark,
            styles[layout],
            {
              [layout]: 0,
              [lengthKey]: length,
              backgroundColor: colorOver,
            },
          ]}
        >
          <View style={[styles[`${layout}Text`], isVertical ? { minWidth } : { width: minWidth }]}>
            <IconFont style={styles.percentIcon} d={icon} size={iconSize} color={iconColor} />
            <TYText text={`${percent}%`} style={[styles.percentText, style]} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomText: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    width: '100%',
  },
  left: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
  },
  leftText: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    marginLeft: 16,
  },
  mark: {
    height: '100%',
    opacity: 1,
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
  },
  percent: {
    flex: 1,
  },
  percentIcon: {
    // marginLeft: 16,
  },
  percentText: {
    fontSize: 14,
    marginLeft: 4,
  },
  right: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
  rightText: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'flex-end',
    marginRight: 16,
  },
  top: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  topText: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    width: '100%',
  },
});

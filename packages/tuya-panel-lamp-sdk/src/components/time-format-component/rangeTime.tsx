/* eslint-disable no-param-reassign */
import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { TYText, Utils } from 'tuya-panel-kit';
import Strings from '../timing-repeat-list/i18n';
import { parseHour12Data } from '../../utils';

const { convertX: cx } = Utils.RatioUtils;
const { parseTimer } = Utils.TimeUtils;
export interface IRangeProp {
  /** *
   * 开始时间
   */
  startTime?: number;
  /**
   * 结束时间
   */
  endTime?: number;
  /** *
   * 是否24小时进制
   */
  is24Hour?: boolean;
  /** *
   * 上午字符
   */
  amText?: string;
  /** *
   * 下午字符
   */
  pmText?: string;
  /** *
   * 最外层容器样式
   */
  contentStyle?: StyleProp<ViewStyle>;
  /** *
   * item项样式
   */
  itemStyle?: StyleProp<ViewStyle>;
  /** *
   * 24小时制统一文字样式
   */
  is24HourTextStyle?: StyleProp<TextStyle>;
  /** *
   * 单位样式
   */
  unitStyle?: StyleProp<TextStyle>;
  /** *
   * 时间样式
   */
  timeStyle?: StyleProp<TextStyle>;
  /**
   * 超出文字内容是否显示省略号
   */
  isEllipsis?: boolean;
  /**
   * 超出文字样式
   */
  isEllipsisStyle?: StyleProp<TextStyle>;
}

// eslint-disable-next-line react/display-name
export default ({
  startTime = 60,
  endTime = 120,
  is24Hour = false,
  amText = Strings.getLang('TYLamp_am'),
  pmText = Strings.getLang('TYLamp_pm'),
  contentStyle = {},
  itemStyle = {},
  is24HourTextStyle = {},
  unitStyle = {},
  timeStyle = {},
  isEllipsis = false,
  isEllipsisStyle = {},
}: IRangeProp) => {
  startTime *= 60;
  endTime *= 60;
  const startPM = parseHour12Data(startTime).isPM;
  const endPM = parseHour12Data(endTime).isPM;
  if (is24Hour) {
    if (isEllipsis) {
      return (
        <TYText
          style={[styles.isEllipsisStyle, isEllipsisStyle]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {`${parseTimer(startTime)} - ${parseTimer(endTime)}`}
        </TYText>
      );
    }
    return (
      <View style={[styles.contentStyle, contentStyle]}>
        <TYText style={[styles.is24HourTextStyle, is24HourTextStyle]}>
          {parseTimer(startTime)}
        </TYText>
        <TYText style={[styles.is24HourTextStyle, is24HourTextStyle]}> - </TYText>
        <TYText style={[styles.is24HourTextStyle, is24HourTextStyle]}>{parseTimer(endTime)}</TYText>
      </View>
    );
  }
  if (isEllipsis) {
    return (
      <TYText
        style={[styles.isEllipsisStyle, isEllipsisStyle]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {`${startPM ? pmText : amText} ${parseHour12Data(startTime).timeStr} - ${
          endPM ? pmText : amText
        } ${parseHour12Data(endTime).timeStr}`}
      </TYText>
    );
  }
  return (
    <View style={[styles.contentStyle, contentStyle]}>
      <View style={[styles.itemStyle, itemStyle]}>
        <TYText style={[styles.unitStyle, unitStyle]}>{startPM ? pmText : amText}</TYText>
        <TYText style={[styles.timeStyle, timeStyle]}>{parseHour12Data(startTime).timeStr}</TYText>
      </View>
      <TYText style={[styles.is24HourTextStyle, is24HourTextStyle]}> - </TYText>
      <View style={[styles.itemStyle, itemStyle]}>
        <TYText style={[styles.unitStyle, unitStyle]}>{endPM ? pmText : amText}</TYText>
        <TYText style={[styles.timeStyle, timeStyle]}>{parseHour12Data(endTime).timeStr}</TYText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    flexDirection: 'row',
  },
  is24HourTextStyle: {
    color: '#010101',
    fontSize: cx(16),
    fontWeight: '500',
  },
  isEllipsisStyle: {
    color: '#010101',
    flex: 1,
    fontSize: cx(16),
    fontWeight: '500',
  },
  itemStyle: {
    alignItems: 'center',
  },
  timeStyle: {
    color: '#010101',
    fontSize: cx(16),
    fontWeight: '500',
    marginRight: cx(4),
  },
  unitStyle: {
    color: '#010101',
    fontSize: cx(16),
    fontWeight: '500',
    marginRight: cx(4),
  },
});

import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { TYText, Utils } from 'tuya-panel-kit';
import Strings from '../timing-repeat-list/i18n';
import { parseHour12Data } from '../../utils';

const { convertX: cx } = Utils.RatioUtils;
const { parseTimer } = Utils.TimeUtils;
export interface ISingProp {
  /** *
   * 时间
   */
  time?: number;
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
   * item项样式
   */
  itemStyle?: StyleProp<ViewStyle>;
  /** *
   * 单位样式
   */
  unitStyle?: StyleProp<TextStyle>;
  /** *
   * 时间样式
   */
  timeStyle?: StyleProp<TextStyle>;
}
// eslint-disable-next-line react/display-name
export default ({
  time = 720,
  is24Hour = false,
  amText = Strings.getLang('TYLamp_am'),
  pmText = Strings.getLang('TYLamp_pm'),
  itemStyle = {},
  unitStyle = {},
  timeStyle = {},
}: ISingProp) => {
  const second = time * 60;
  if (is24Hour) {
    return <TYText style={[styles.timeStyle, timeStyle]}>{parseTimer(second)}</TYText>;
  }
  const { timeStr, isPM } = parseHour12Data(second);
  return (
    <View style={[styles.itemStyle, itemStyle]}>
      <TYText style={[styles.unitStyle, unitStyle]}>{isPM ? pmText : amText}</TYText>
      <TYText style={[styles.timeStyle, timeStyle]}>{timeStr}</TYText>
    </View>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  timeStyle: {
    color: '#010101',
    fontSize: cx(16),
    fontWeight: '500',
  },
  unitStyle: {
    color: '#010101',
    fontSize: cx(16),
    fontWeight: '500',
    marginRight: cx(4),
  },
});

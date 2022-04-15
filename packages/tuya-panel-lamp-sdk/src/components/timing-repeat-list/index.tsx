/* eslint-disable no-shadow */
import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { TYText, Utils } from 'tuya-panel-kit';
import TimeFormatComponent from '../time-format-component';
import Strings from './i18n';

const { RangeTime, SingleTime } = TimeFormatComponent;

const { convertX: cx } = Utils.RatioUtils;

interface IProp {
  /**
   * 数据格式
   */
  data?: {
    // 名称
    name: string;
    // 开始时间
    startTime: number;
    // 结束时间
    endTime?: number;
  }[];
  /**
   * 是否24小时进制
   */
  is24Hour: boolean;
  /**
   * 时间点属性
   */
  singleTimeProps?: any;
  /**
   * 时间段属性
   */
  rangeTimeProps?: any;
  /**
   * 外层容器样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 滚动区域样式
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * 每一项样式
   */
  itemStyle?: StyleProp<ViewStyle>;
  /**
   * 每一项右边部分样式
   */
  rightStyle?: StyleProp<ViewStyle>;
  /**
   * 右边部分名称文字样式
   */
  nameStyle?: StyleProp<TextStyle>;
}

const TimingRepeatList: React.FC<IProp> = ({
  data,
  is24Hour,
  style,
  contentStyle,
  itemStyle,
  rightStyle,
  nameStyle,
  singleTimeProps,
  rangeTimeProps,
}) => {
  return (
    <ScrollView
      style={[styles.main, style]}
      contentContainerStyle={[styles.contentStyle, contentStyle]}
    >
      <TouchableOpacity activeOpacity={1}>
        {data.map(({ name, startTime, endTime = startTime }, i: number) => {
          return (
            <View key={i.toString()} style={[styles.itemStyle, itemStyle]}>
              {startTime === endTime ? (
                <SingleTime time={startTime} is24Hour={is24Hour} {...singleTimeProps} />
              ) : (
                <RangeTime startTime endTime is24Hour={is24Hour} {...rangeTimeProps} />
              )}
              <View style={[styles.rightStyle, rightStyle]}>
                <TYText style={[styles.nameStyle, nameStyle]}>{name}</TYText>
              </View>
            </View>
          );
        })}
      </TouchableOpacity>
    </ScrollView>
  );
};

TimingRepeatList.defaultProps = {
  is24Hour: false,
  data: [
    {
      name: Strings.getLang('TYLamp_normal'),
      startTime: 720,
      endTime: 720,
    },
  ],
  style: {},
  contentStyle: {},
  itemStyle: {},
  rightStyle: {},
  nameStyle: {},
  singleTimeProps: {},
  rangeTimeProps: {},
};

export default TimingRepeatList;

const styles = StyleSheet.create({
  contentStyle: {
    paddingBottom: cx(32),
  },
  itemStyle: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: cx(27),
    flexDirection: 'row',
    height: cx(54),
    justifyContent: 'space-between',
    marginTop: cx(9),
    paddingHorizontal: cx(24),
    width: '100%',
  },
  main: {
    maxHeight: cx(149),
    overflow: 'hidden',
    paddingHorizontal: cx(16),
    width: '100%',
  },
  nameStyle: {
    color: '#39a9ff',
    fontSize: cx(12),
  },
  rightStyle: {
    alignItems: 'center',
    backgroundColor: 'rgba(16,130,254,0.1)',
    borderRadius: Math.round(cx(4)),
    justifyContent: 'center',
    marginLeft: cx(16),
    paddingHorizontal: cx(4),
    paddingVertical: cx(2),
  },
});

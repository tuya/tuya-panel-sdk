/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TYText, Utils, Slider } from 'tuya-panel-kit';
import Strings from './i18n';

const { convertX: cx } = Utils.RatioUtils;
const sliderWidth = 207;

interface SettingSliderProps {
  /**
   * 主题色
   */
  themeColor: string;
  /**
   * 滑动回调
   */
  onValueChange: (backValue: string | number) => void;
  /**
   * 滑动结束回调
   */
  onValueConfrim: (backValue: string | number) => void;
  /**
   * dp code
   */
  code: string;
  /**
   * 当前值
   */
  value: number | string;
  /**
   * 滑动步数
   */
  step: number;
  /**
   * 滑动值范围
   */
  range: any[];
  /**
   * dp类型，只支持 value | enum
   */
  type: string;
}

const SettingSlider = ({
  themeColor = '#57BCFB',
  onValueConfrim,
  onValueChange,
  code = null,
  value,
  step = 1,
  range = [],
  type = 'value',
}: SettingSliderProps) => {
  const [percent, setPercent] = useState(range.indexOf(value) || 0);
  const [titles, setTitles] = useState({ startTxt: '', endTxt: '', valueTxt: '' });
  const getTitle = () => {
    switch (type) {
      case 'value':
        setTitles({
          // @ts-ignore
          startTxt: Strings.formatValue('valueTxt', range[0], Strings.getDpLang(code, 'unit')),
          // @ts-ignore
          endTxt: Strings.formatValue(
            'valueTxt',
            range[range.length - 1],
            Strings.getDpLang(code, 'unit')
          ),
          // @ts-ignore
          valueTxt: Strings.formatValue(
            'valueTxt',
            range[percent],
            Strings.getDpLang(code, 'unit')
          ),
        });
        break;
      case 'enum':
        setTitles({
          startTxt: Strings.getDpLang(code, range[0]),
          endTxt: Strings.getDpLang(code, range[range.length - 1]),
          valueTxt: Strings.getDpLang(code, range[percent]),
        });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    getTitle();
  }, [percent]);
  const { startTxt, endTxt, valueTxt } = titles;
  return (
    <View style={styles.content}>
      <TYText style={styles.percent}>{startTxt}</TYText>
      <View style={styles.container}>
        <View
          style={[
            styles.popWrap,
            { left: Math.round((sliderWidth / (range.length - 1) - 12) * percent) - 32 },
          ]}
        >
          <View style={[styles.pop, { backgroundColor: themeColor }]}>
            <TYText color="#fff" numberOfLines={2}>
              {valueTxt}
            </TYText>
          </View>
          <View style={[styles.arrow, { borderTopColor: themeColor }]} />
        </View>
        <Slider.Horizontal
          style={{
            width: sliderWidth,
            height: 20,
            borderRadius: 10,
            backgroundColor: '#eee',
          }}
          trackStyle={{ height: 12, borderRadius: 6, margin: 4 }}
          maximumValue={range.length - 1}
          minimumValue={0}
          value={1}
          stepValue={step}
          maximumTrackTintColor="#eee"
          minimumTrackTintColor={themeColor}
          onValueChange={v => {
            setPercent(Math.round(v));
            onValueChange && onValueChange(range[+v]);
          }}
          onSlidingComplete={v => {
            setPercent(Math.round(v));
            onValueConfrim && onValueConfrim(range[+v]);
          }}
          canTouchTrack
        />
      </View>
      <TYText style={styles.percent}>{endTxt}</TYText>
    </View>
  );
};

export default SettingSlider;

const styles = StyleSheet.create({
  arrow: {
    borderColor: 'transparent',
    borderWidth: cx(4),
    bottom: 0,
    left: cx(28) + 12,
    position: 'absolute',
  },
  container: {
    paddingTop: cx(52),
    position: 'relative',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  percent: {
    color: '#999',
    fontSize: cx(16),
    marginHorizontal: cx(12),
    paddingTop: cx(44),
  },
  pop: {
    alignItems: 'center',
    borderRadius: cx(12),
    display: 'flex',
    height: cx(36),
    justifyContent: 'center',
    width: 64,
  },
  popWrap: {
    height: cx(44),
    position: 'absolute',
    top: 0,
  },
});

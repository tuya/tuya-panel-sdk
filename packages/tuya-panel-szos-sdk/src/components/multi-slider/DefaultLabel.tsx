/*
 * @Author: your name
 * @Date: 2021-10-22 11:22:45
 * @LastEditTime: 2021-11-05 11:00:08
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: In User Settings Edit
 * @FilePath: /tuya-panel-sdk/packages/tuya-panel-szos-sdk/src/components/multi-slider/DefaultLabel.tsx
 */
import React, { FC } from 'react';

import { View, Text, StyleSheet, StyleProp, TextStyle } from 'react-native';

const sliderRadius = 1;
const width = 48;

interface IDefaultLabel {
  oneMarkerValue: number | string,
  twoMarkerValue: number | string,
  oneMarkerLeftPosition: number,
  twoMarkerLeftPosition: number,
  oneMarkerPressed: boolean,
  twoMarkerPressed: boolean,
  unit: string,
  sliderLabelStyle?: StyleProp<TextStyle>
}

const DefaultLabel: FC<IDefaultLabel> = props => {
  const {
    oneMarkerValue,
    twoMarkerValue,
    oneMarkerLeftPosition,
    twoMarkerLeftPosition,
    oneMarkerPressed,
    twoMarkerPressed,
    unit,
    sliderLabelStyle
  } = props;

  return (
    <View style={{ position: 'relative' }}>
      {Number.isFinite(oneMarkerLeftPosition) &&
        Number.isFinite(oneMarkerValue) && (
          <View
            style={[
              styles.sliderLabel,
              { left: oneMarkerLeftPosition - width / 2 + sliderRadius },
              oneMarkerPressed && styles.markerPressed,
            ]}
          >
            <Text style={[styles.sliderLabelText, sliderLabelStyle]}>{`${oneMarkerValue}${unit || ''}`}</Text>
          </View>
        )}

      {Number.isFinite(twoMarkerLeftPosition) &&
        Number.isFinite(twoMarkerValue) && (
          <View
            style={[
              styles.sliderLabel,
              { left: twoMarkerLeftPosition - width / 2 + sliderRadius, bottom: twoMarkerLeftPosition - oneMarkerLeftPosition < 40 ? -60 : 0 },
              twoMarkerPressed && styles.markerPressed,
            ]}
          >
            <Text style={[styles.sliderLabelText, sliderLabelStyle]}>{`${twoMarkerValue}${unit || ''}`}</Text>
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  sliderLabel: {
    position: 'absolute',
    bottom: 0,
    minWidth: width,

  },
  sliderLabelText: {
    alignItems: 'center',
    textAlign: 'center',
    fontStyle: 'normal',
    fontSize: 12,
    color: '#FFFFFF'
  },
  markerPressed: {
  },
});

export default DefaultLabel

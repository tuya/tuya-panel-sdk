import React, { FC } from 'react';

import { View, Text, StyleSheet } from 'react-native';

const sliderRadius = 1;
const width = 48;

interface IDefaultLabel {
  oneMarkerValue: number | string;
  twoMarkerValue: number | string;
  oneMarkerLeftPosition: number;
  twoMarkerLeftPosition: number;
  oneMarkerPressed: boolean;
  twoMarkerPressed: boolean;
  unit: string;
  labelTextColor?: string;
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
    labelTextColor = '#ffffff',
  } = props;

  return (
    <View style={{ position: 'relative' }}>
      {Number.isFinite(oneMarkerLeftPosition) && Number.isFinite(oneMarkerValue) && (
        <View
          style={[
            styles.sliderLabel,
            { left: oneMarkerLeftPosition - width / 2 + sliderRadius },
            oneMarkerPressed && styles.markerPressed,
          ]}
        >
          <Text style={[styles.sliderLabelText, { color: labelTextColor }]}>{`${oneMarkerValue}${
            unit || ''
          }`}</Text>
        </View>
      )}

      {Number.isFinite(twoMarkerLeftPosition) && Number.isFinite(twoMarkerValue) && (
        <View
          style={[
            styles.sliderLabel,
            {
              left: twoMarkerLeftPosition - width / 2 + sliderRadius,
              bottom: twoMarkerLeftPosition - oneMarkerLeftPosition < 40 ? -60 : 0,
            },
            twoMarkerPressed && styles.markerPressed,
          ]}
        >
          <Text style={[styles.sliderLabelText, { color: labelTextColor }]}>{`${twoMarkerValue}${
            unit || ''
          }`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  markerPressed: {},
  sliderLabel: {
    bottom: 0,
    minWidth: width,
    position: 'absolute',
  },
  sliderLabelText: {
    alignItems: 'center',
    color: '#000000',
    fontSize: 12,
    fontStyle: 'normal',
    textAlign: 'center',
  },
});

export default DefaultLabel;

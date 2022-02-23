import { TYText } from 'tuya-panel-kit';
import React from 'react';
import { LineBoxSvg as LineBoxSvgView } from '@tuya/tuya-panel-szos-sdk';
import { View } from 'react-native';

const lineBoxWidth = 266;
const lineBoxHeight = 72;
const strokeWidth = 2;

const LineBoxSvg = () => {
  const data = [0, 1, 10, -10, 0, 0, 0, 2, 0, 12]; // x轴10个数据，y轴数据大小
  return (
    <View style={{ alignItems: 'center' }}>
      <TYText text="default style" style={{ marginTop: 10, marginBottom: 10 }} />
      <LineBoxSvgView
        range={{ min: -12, max: 12 }}
        size={{ height: lineBoxHeight, width: lineBoxWidth }}
        data={data}
      />

      <TYText text="linear gradient style" style={{ marginTop: 10, marginBottom: 10 }} />
      <LineBoxSvgView
        range={{ min: -12, max: 12 }}
        size={{ height: lineBoxHeight, width: lineBoxWidth }}
        data={data}
        strokeStyle={{ width: strokeWidth, color: 'rgba(45,167,58)' }}
        bottomLinearStyle={{ color: 'rgba(45,167,58)', opacity: 0 }}
        topLinearStyle={{ color: 'rgba(45,167,58)', opacity: 0.3 }}
      />
    </View>
  );
};

export default LineBoxSvg;

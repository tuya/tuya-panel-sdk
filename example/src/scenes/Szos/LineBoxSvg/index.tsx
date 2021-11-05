import { Utils } from 'tuya-panel-kit';
import React from 'react';
import { LineBoxSvg as LineBoxSvgView } from '@tuya/tuya-panel-szos-sdk';

const {
  RatioUtils: { convertX: cx },
} = Utils;

const lineBoxWidth = cx(266);
const lineBoxHeight = cx(72);
const strokeWidth = cx(2);

const LineBoxSvg = () => {
  const data = [0, 1, 10, -10, 0, 0, 0, 2, 0, 12]; // x轴10个数据，y轴数据大小
  return (
    <LineBoxSvgView
      range={{ min: -12, max: 12 }}
      size={{ height: lineBoxHeight, width: lineBoxWidth }}
      data={data}
      strokeStyle={{ width: strokeWidth, color: 'rgba(45,167,58)' }}
      bottomLinearStyle={{ color: 'rgba(45,167,58)', opacity: 0 }}
      topLinearStyle={{ color: 'rgba(45,167,58)', opacity: 0.3 }}
    />
  );
};

export default LineBoxSvg;

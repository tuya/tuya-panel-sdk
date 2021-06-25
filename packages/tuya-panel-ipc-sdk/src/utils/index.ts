import _ from 'lodash';
// 根据缩放系数转换实际数值
export const showMathPowValue = (value, scale) => {
  const realvalue = _.isUndefined(value) ? 0 : value;
  if (Number(realvalue) === 0) {
    return 0;
  }
  if (scale === 0) {
    return (Number(realvalue) / Math.pow(10, scale)).toFixed(0);
  }
  return (Number(realvalue) / Math.pow(10, scale)).toFixed(1);
};


// 将具体数值，转换为对应区间百分比
export const numberToPercent = (v: undefined | number, min: number, max: number) => {
  if (_.isUndefined(v)) {
    v = max;
  }
  if (v === 1 && min === 1) {
    return `1%`;
  }
  return `${Math.ceil((100 * (v - min)) / (max - min))}%`;
};

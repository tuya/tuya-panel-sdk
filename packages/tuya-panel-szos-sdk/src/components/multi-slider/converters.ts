/*
 * @Author: your name
 * @Date: 2021-10-22 11:22:44
 * @LastEditTime: 2021-11-29 19:47:02
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: In User Settings Edit
 * @FilePath: /tuya-panel-sdk/packages/tuya-panel-szos-sdk/src/components/multi-slider/converters.ts
 */

export const closest = (array: any[], n: number): number => {
  let minI = 0;
  let maxI = array.length - 1;

  if (array[minI] > n) {
    return minI;
  }
  if (array[maxI] < n) {
    return maxI;
  }
  if (array[minI] <= n && n <= array[maxI]) {
    let closestIndex = null;

    while (closestIndex === null) {
      const midI = Math.round((minI + maxI) / 2);
      const midVal = array[midI];

      if (midVal === n) {
        closestIndex = midI;
      } else if (maxI === minI + 1) {
        const minValue = array[minI];
        const maxValue = array[maxI];
        const deltaMin = Math.abs(minValue - n);
        const deltaMax = Math.abs(maxValue - n);

        closestIndex = deltaMax <= deltaMin ? maxI : minI;
      } else if (midVal < n) {
        minI = midI;
      } else if (midVal > n) {
        maxI = midI;
      } else {
        closestIndex = -1;
      }
    }

    return closestIndex;
  }

  return -1;
};

export const valueToPosition = (
  value: number,
  valuesArray: number[],
  sliderLength: number,
  offset: number
): number => {
  const index = closest(valuesArray, value);
  const arrLength = valuesArray.length - 1;
  const validIndex = index === -1 ? arrLength : index;
  return (sliderLength * validIndex) / arrLength + offset;
};

export const positionToValue = (
  position: number,
  valuesArray: number[],
  sliderLength: number
): number => {
  if (position < 0 || sliderLength < position) {
    return null;
  }
  const arrLength = valuesArray.length - 1;
  const index = (arrLength * position) / sliderLength;
  return valuesArray[Math.round(index)];
};

export const roundFun = (value: number, n: number): number => {
  return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
};

export const createArray = (start: number, end: number, step: number): any[] => {
  const direction = start - end > 0 ? -1 : 1;
  const result: any[] = [];
  if (!step) {
    return result;
  }
  const length = Math.abs((start - end) / step) + 1;
  for (let i = 0; i < length; i++) {
    result.push(
      roundFun(
        start + i * Math.abs(step) * direction,
        step >= 1 ? 0 : step?.toString()?.split('.')[1]?.length
      )
    );
  }
  return result;
};

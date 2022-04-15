const closest = (array: any[], n: number) => {
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

export function valueToPosition(
  value: number,
  valuesArray: number[],
  sliderLength: number,
  offset: number
) {
  const index = closest(valuesArray, value);

  const arrLength = valuesArray.length - 1;
  const validIndex = index === -1 ? arrLength : index;

  return (sliderLength * validIndex) / arrLength + offset;
}

export function positionToValue(position: number, valuesArray: number[], sliderLength: number) {
  if (position < 0 || sliderLength < position) {
    return null;
  }
  const arrLength = valuesArray.length - 1;
  const index = (arrLength * position) / sliderLength;
  return valuesArray[Math.round(index)];
}

const roundFun = (value: number, n: number) =>
  Math.round(value * Math.pow(10, n)) / Math.pow(10, n);

export function createArray(start: number, end: number, step: number) {
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
}

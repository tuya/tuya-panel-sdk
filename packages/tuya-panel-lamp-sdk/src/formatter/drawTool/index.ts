/* eslint-disable no-shadow */
/* eslint-disable no-console */
import _ from 'lodash';
import { nToSH, toFixed, avgSplit, sToN } from '../../utils';
import DpCodes from '../../utils/dpCodes';
const { drawToolCode } = DpCodes;

enum DAUBTYPE {
  all = 1,
  single,
  clear,
}

function* transform(value: string) {
  let start = 0;
  let result: number | string = '';
  let length;
  while (true) {
    length = yield result;
    const newStart = length > 0 ? start + length : value.length + (length || 0);
    result = length > 0 ? sToN(value.slice(start, newStart)) : value.slice(start, newStart);
    if (newStart >= value.length) break;
    start = newStart;
  }
  return result;
}

export default class DrawToolFormater {
  uuid: string;
  defaultValue: any;

  constructor(
    uuid = drawToolCode,
    defaultValue = { version: 1, daubType: 0, hue: 0, saturation: 1000, value: 1000 }
  ) {
    this.uuid = uuid;
    this.defaultValue = defaultValue;
  }

  parse(val = ''): DrawToolType {
    if (typeof val !== 'string') {
      console.warn(drawToolCode, 'dp数据有问题，无法解析');
      return this.defaultValue;
    }
    const generator = transform(val);
    const step = (n?: number) => generator.next(n);
    step();
    const version = step(2).value;
    const daubType = DAUBTYPE[step(2).value];
    const effect = step(2).value;
    const hue = step(4).value || 0;
    const saturation = +(step(2).value || 0) * 10;
    const value = +(step(2).value || 0) * 10;
    const brightness = +(step(2).value || 0) * 10;
    const temperature = +(step(2).value || 0) * 10;

    const result = {
      version,
      daubType,
      effect,
      hue,
      saturation,
      value,
      brightness,
      temperature,
      isWhite: [brightness, temperature].some(v => v),
    } as DrawToolType;

    // 处理单选、擦除，逻辑一样
    if ([DAUBTYPE[2], DAUBTYPE[3]].includes(daubType)) {
      const singleDataStr = toFixed(step(2).value.toString(2), 8);
      const singleType = sToN(singleDataStr.slice(0, 1), 2);
      result.singleType = singleType;
      result.quantity = sToN(singleDataStr.slice(1), 2);
      const indexStr = step().value.toString();
      const indexs = new Set<number>();
      if (singleType === 0) {
        // 连续
        avgSplit(indexStr, 8).forEach(v => {
          const arr = avgSplit(v, 4);
          _.range(sToN(arr[0]), sToN(arr[1]) + 1).forEach(a => indexs.add(a));
        });
      } else if (singleType === 1) {
        // 单点
        avgSplit(indexStr, 4).forEach(v => indexs.add(sToN(v)));
      }
      result.indexs = indexs;
    }

    return result;
  }

  format(data: DrawToolType): string {
    const {
      version = 1,
      daubType = DAUBTYPE[1],
      effect = 1,
      hue = 0,
      saturation = 0,
      value = 0,
      brightness = 0,
      temperature = 0,
    } = data;
    const s = Math.round((saturation || 0) / 10);
    const v = Math.round((value || 0) / 10);
    const b = Math.round((brightness || 0) / 10);
    const t = Math.round((temperature || 0) / 10);

    let result = `${nToSH(version)}${nToSH(Number(DAUBTYPE[daubType]))}${nToSH(effect)}${nToSH(
      hue,
      4
    )}${nToSH(s)}${nToSH(v)}${nToSH(b)}${nToSH(t)}`;
    // 点选时额外发送的数据
    if ([DAUBTYPE[2], DAUBTYPE[3]].includes(daubType)) {
      const { singleType = 1, quantity = 1, indexs = new Set() } = data;
      result += `${nToSH(parseInt(`${singleType}${toFixed(indexs.size.toString(2), 7)}`, 2))}${[
        ...indexs,
      ].reduce((acc, cur) => acc + nToSH(cur, 4), '')}`;
    }
    return result;
  }
}

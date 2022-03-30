import _ from 'lodash';
import { Color, DpSchema, IFormater } from '../../../interface';

function* transform(value: string): Generator<number, number, number> {
  let start = 0;
  let result = 0;
  let length;
  for (; true; ) {
    length = yield result;
    // 不是数字时，返回0
    result = parseInt(value.substr(start, length), 16) || 0;
    if (start + length >= value.length) {
      break;
    }
    start += length;
  }
  return result;
}

/**
 * 彩光数据转换器
 */
export default class ColourFormater implements IFormater {
  uuid: string;
  schema: DpSchema;
  defaultValue: Color = { hue: 0, saturation: 1000, value: 1000 }; // 数据有问题时，返回的数据
  constructor(uuid: string = 'colour_data', defaultValue: Color = null) {
    this.uuid = uuid;
    if (defaultValue) {
      this.defaultValue = defaultValue;
    }
  }

  // 比较两个值是否一致
  equal(source: string, target: string): boolean {
    return source === target;
  }

  // 将标准协议数据转为项目数据
  parse(value: string): Color {
    // 数据是否正确
    const length = value.length;
    if (length !== 12) {
      // 数据有问题，给出提示
      console.warn('数据有问题，无法解析');
      return this.defaultValue;
    }

    const generator = transform(value);
    generator.next(); // 准备
    const step4 = () => {
      return generator.next(4);
    };

    return {
      hue: step4().value,
      saturation: step4().value,
      value: step4().value,
    };
  }
  to16(value: number, length: number = 4): string {
    let result = new Number(value).toString(16);
    if (result.length < length) {
      result = _.padStart(result, length, '0');
    }
    return result;
  }
  // 将数据转为标准协议数据
  format(data: Color): string {
    const { hue, saturation, value } = data;
    return `${this.to16(hue)}${this.to16(saturation)}${this.to16(value)}`;
  }
}

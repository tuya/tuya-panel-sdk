import _ from 'lodash';
import { to16, transform } from '../../utils';
import defaultData from './default';

export default class RhythmFormatter {
  constructor(uuid = 'rhythm_mode', defaultValue = null, flag: boolean) {
    this.defaultValue = defaultData;
    this.uuid = uuid;
    this.isSupportTemp = flag;
    if (defaultValue) {
      this.defaultValue = defaultValue;
    }
  }

  defaultValue: IRhythmData;
  uuid: string;
  isSupportTemp: boolean;
  parse(dpValue: string): IRhythmData {
    if (!dpValue || dpValue.length <= 10 || dpValue.length % 2 !== 0) {
      console.warn('The data format is wrong and cannot be parsed');
      return this.defaultValue;
    }

    const generator = transform(dpValue);
    const step2 = () => {
      const { value } = generator.next(2);
      return value;
    };
    generator.next();
    const version = step2();
    const power = !!step2();
    const mode = step2();
    const weekNum = step2();
    const weeks = _.padStart(Number(weekNum).toString(2), 8, '0')
      .split('')
      .reverse()
      .map(v => parseInt(v, 10));
    const number = step2();
    const rhythms = [];
    for (let i = 0; i < number; i++) {
      const valid = !!step2();
      const hour = step2();
      const minute = step2();
      const hue1 = step2();
      const hue2 = step2();
      const hue = hue1 * 100 + hue2;
      const saturation = step2();
      const v = step2();
      const brightness = step2();
      const temperature = step2();
      rhythms.push({
        power: valid,
        hour,
        minute,
        hue,
        saturation,
        value: v,
        brightness,
        temperature,
      });
    }
    return {
      version,
      power,
      mode,
      weeks,
      number,
      rhythms,
    };
  }

  format(data: IRhythmData): string {
    const { version, power, mode, weeks, rhythms } = data;
    const weekStr = _.padStart([...weeks].reverse().join(''), 8, '0');
    const number = rhythms.length;
    const weeksValue = parseInt(weekStr, 2);
    return `${to16(version)}${to16(Number(power))}${to16(mode)}${to16(weeksValue)}${to16(
      number
    )}${rhythms
      .map(({ power: valid, hour, minute, hue, saturation, value: v, temperature, brightness }) => {
        const hue1 = Math.floor(hue / 100); // 百分位
        const hue2 = hue % 100; // 十位与个位
        // 不支持色温时，色温值传100
        return `${to16(Number(valid))}${to16(hour)}${to16(minute)}${to16(hue1)}${to16(hue2)}${to16(
          saturation
        )}${to16(v)}${to16(brightness)}${to16(this.isSupportTemp ? temperature : 100)}`;
      })
      .join('')}`;
  }
}

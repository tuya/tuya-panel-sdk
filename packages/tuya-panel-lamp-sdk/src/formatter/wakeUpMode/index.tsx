import _ from 'lodash';
import { SupportUtils, to16, transform } from '../../utils';
import DpCodes from '../../utils/dpCodes';

const { wakeUpCode } = DpCodes;

export default class WakeUpFormatter {
  constructor(uuid = wakeUpCode, defaultValue = null) {
    this.defaultValue = {
      version: 0,
      number: 0,
      nodes: [],
    };
    this.uuid = uuid;
    if (defaultValue) {
      this.defaultValue = defaultValue;
    }
  }

  defaultValue: IWakeUpData;
  uuid: string;

  parse(dpValue: string): IWakeUpData {
    const isSigMesh = SupportUtils.isSigMeshDevice();
    if ((isSigMesh && dpValue.length <= 8) || (!isSigMesh && dpValue.length <= 6)) {
      console.warn('The data format is wrong and cannot be parsed');
      const res = {
        version: isSigMesh ? 1 : 0,
        number: 0,
        nodes: [],
      };
      return isSigMesh ? { ...res, mode: 2 } : res;
    }

    const generator = transform(dpValue);
    const step = (number: number) => {
      const { value } = generator.next(number);
      return value;
    };
    generator.next();
    const version = step(2);
    let mode = 3;
    // 如果版本号是1，则是sigMesh设备，一个参数模式字段
    if (version === 1) {
      mode = step(2);
    }
    const number = step(2);
    const nodes = [];
    for (;;) {
      const power = !!step(2);
      const weekNum = step(2);
      const weeks = _.padStart(weekNum.toString(2), 8, '0')
        .split('')
        .reverse()
        .map(v => parseInt(v, 10));
      const delay = step(2);
      const hour = step(2);
      const minute = step(2);
      let hue = 0;
      let saturation = 0;
      let value = 0;
      let brightness = 0;
      let temperature = 0;
      switch (mode) {
        case 3:
          hue = step(4);
          saturation = step(2);
          value = step(2);
          brightness = step(2);
          temperature = step(2);
          break;
        case 2:
          hue = step(4);
          saturation = step(2);
          value = step(2);
          break;
        default:
          brightness = step(2);
          temperature = step(2);
          break;
      }

      const { value: last, done } = generator.next(2);
      nodes.push({
        power,
        weeks,
        delay,
        hour,
        minute,
        hue,
        saturation,
        value,
        brightness,
        temperature,
        last,
      });
      if (done) {
        break;
      }
    }
    const res = {
      version,
      number,
      nodes,
    };
    return version === 1 ? { ...res, mode } : res;
  }

  format(data: ISleepData): string {
    const { version, mode, number, nodes } = data;
    const versionStr = to16(version);
    const isSigMesh = versionStr === '01';
    let modeStr = '03';
    if (isSigMesh && mode) {
      modeStr = to16(mode);
    }
    const numberStr = to16(number);
    const nodeStr = nodes
      .map(
        ({
          power,
          weeks,
          delay,
          hour,
          minute,
          hue,
          saturation,
          value,
          brightness,
          temperature,
          last,
        }: WakeUpItem) => {
          const powerStr = power ? '01' : '00';
          const weeksValue: string = _.padStart([...weeks].reverse().join(''), 8, '0');
          const weeksStr = to16(parseInt(weeksValue, 2), 2);
          const delayStr = to16(delay);
          const hourStr = to16(hour);
          const minuteStr = to16(minute);
          const hueStr = to16(hue, 4);
          const saturationStr = to16(saturation);
          const valueStr = to16(value);
          const brightStr = to16(brightness);
          const temperatureStr = to16(temperature);
          const lastStr = to16(last);
          let res;
          if (modeStr === '01') {
            res = `${powerStr}${weeksStr}${delayStr}${hourStr}${minuteStr}${brightStr}${temperatureStr}${lastStr}`;
          } else if (modeStr === '02') {
            res = `${powerStr}${weeksStr}${delayStr}${hourStr}${minuteStr}${hueStr}${saturationStr}${valueStr}${lastStr}`;
          } else if (modeStr === '03') {
            res = `${powerStr}${weeksStr}${delayStr}${hourStr}${minuteStr}${hueStr}${saturationStr}${valueStr}${brightStr}${temperatureStr}${lastStr}`;
          }
          return res;
        }
      )
      .join('');
    return version === 1
      ? `${versionStr}${modeStr}${numberStr}${nodeStr}`
      : `${versionStr}${numberStr}${nodeStr}`;
  }
}

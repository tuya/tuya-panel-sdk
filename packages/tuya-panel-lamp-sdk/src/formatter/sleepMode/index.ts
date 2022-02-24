import { SupportUtils, to16, transform } from '../../utils';
import DpCodes from '../../utils/dpCodes';
import _ from 'lodash';

const { sleepCode } = DpCodes;

export default class SleepFormatter {
  constructor(uuid = sleepCode, defaultValue = null) {
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

  defaultValue: ISleepData;
  uuid: string;

  parse(dpValue: string): ISleepData {
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
    const step2 = () => {
      const { value } = generator.next(2);
      return value;
    };
    const step4 = () => {
      const { value } = generator.next(4);
      return value;
    };
    generator.next();
    const version = step2();
    let mode = 3;
    // 如果版本号是1，则是sigMesh设备，一个参数模式字段
    if (version === 1) {
      mode = step2();
    }
    const number = step2();
    const nodes = [];
    for (;;) {
      const power = !!step2();
      const weekNum = step2();
      const weeks = _.padStart(weekNum.toString(2), 8, '0')
        .split('')
        .reverse()
        .map(v => parseInt(v, 10));
      const delay = step2();
      const hour = step2();
      const minute = step2();
      let hue = 0;
      let saturation = 0;
      let value = 0;
      let brightness = 0;
      let temperature = 0;
      let finished;
      if (mode === 3) {
        hue = step4();
        saturation = step2();
        value = step2();
        brightness = step2();
        const { value: temp, done } = generator.next(2);
        temperature = temp;
        finished = done;
      } else if (mode === 2) {
        hue = step4();
        saturation = step2();
        const { value: v, done } = generator.next(2);
        value = v;
        finished = done;
      } else if (mode === 1) {
        brightness = step2();
        const { value: temp, done } = generator.next(2);
        temperature = temp;
        finished = done;
      }
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
      });
      if (finished) {
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
        }: SleepItem) => {
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
          let res;
          if (modeStr === '01') {
            res = `${powerStr}${weeksStr}${delayStr}${hourStr}${minuteStr}${brightStr}${temperatureStr}`;
          } else if (modeStr === '02') {
            res = `${powerStr}${weeksStr}${delayStr}${hourStr}${minuteStr}${hueStr}${saturationStr}${valueStr}`;
          } else if (modeStr === '03') {
            res = `${powerStr}${weeksStr}${delayStr}${hourStr}${minuteStr}${hueStr}${saturationStr}${valueStr}${brightStr}${temperatureStr}`;
          }
          return res;
        }
      )
      .join('');
    return isSigMesh
      ? `${versionStr}${modeStr}${numberStr}${nodeStr}`
      : `${versionStr}${numberStr}${nodeStr}`;
  }
}

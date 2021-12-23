import _padStart from 'lodash/padStart';
import { to16, transform } from '../../utils';
import DpCodes from '../../utils/dpCodes';

const { cycleTimingCode } = DpCodes;

export default class CycleTimerFormatter {
  constructor(uuid = cycleTimingCode, defaultValue = null) {
    this.defaultValue = {
      version: 0,
      length: 16,
      nodes: [],
    };
    this.uuid = uuid;
    if (defaultValue) {
      this.defaultValue = defaultValue;
    }
  }

  defaultValue: CycleTimerData;
  uuid: string;

  parse(dpValue: string): CycleTimerData {
    if (!dpValue || dpValue.length <= 4 || (dpValue.length - 4) % 32 !== 0) {
      // eslint-disable-next-line no-console
      console.warn(`Unable to parse data【${cycleTimingCode}】: ${dpValue}`);
      return this.defaultValue;
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
    const length = step2();
    const nodes = [];
    // eslint-disable-next-line no-constant-condition
    for (; true; ) {
      const powerNum = step2();
      const powerInfo = _padStart(parseInt(`${powerNum}`, 16).toString(2), 8, '0');
      const powerBits = powerInfo.split('');
      const power = !!Number(powerBits[powerBits.length - 1]);
      // 通道号
      const channel = parseInt(powerBits.slice(1, powerBits.length - 1).join(''), 2);
      const weeksNum = step2();
      const weeks = _padStart(weeksNum.toString(2), 8, '0')
        .split('')
        .reverse()
        .map(v => parseInt(v, 10));
      const startTime = step4();
      const endTime = step4();
      const openTime = step4();
      const closeTime = step4();
      const hue = step4();
      const saturation = step2();
      const value = step2();
      const brightness = step2();
      const { value: temperature, done } = generator.next(2);
      nodes.push({
        power,
        channel,
        weeks,
        startTime,
        endTime,
        openTime,
        closeTime,
        color: {
          hue,
          saturation,
          value,
          brightness,
          temperature,
        },
      });
      if (done) {
        break;
      }
    }

    return {
      version,
      length,
      nodes,
    };
  }

  format(data: CycleTimerData): string {
    const { version, length, nodes } = data;
    const versionStr = to16(version);
    const lengthStr = to16(length);
    const nodesStr = nodes
      .map(
        ({
          power,
          channel,
          weeks,
          startTime,
          endTime,
          openTime,
          closeTime,
          color,
        }: CycleTimerItem) => {
          const channelStr = _padStart((channel || 1).toString(2), 7, '0');
          const powerChannel = parseInt(`${channelStr}${power ? 1 : 0}`, 2);
          const powerChannelStr = to16(powerChannel, 2);
          const weeksValue: string = _padStart([...weeks].reverse().join(''), 8, '0');
          const weeksStr = to16(parseInt(weeksValue, 2), 2);
          const startTimeStr = to16(startTime, 4);
          const endTimeStr = to16(endTime, 4);
          const openTimeStr = to16(openTime, 4);
          const closeTimeStr = to16(closeTime, 4);
          const { hue, saturation, value, brightness, temperature } = color;
          const hueStr = to16(hue, 4);
          const saturationStr = to16(saturation);
          const valueStr = to16(value);
          const brightnessStr = to16(brightness);
          const temperatureStr = to16(temperature);

          return `${powerChannelStr}${weeksStr}${startTimeStr}${endTimeStr}${openTimeStr}${closeTimeStr}${hueStr}${saturationStr}${valueStr}${brightnessStr}${temperatureStr}`;
        }
      )
      .join('');
    return `${versionStr}${lengthStr}${nodesStr}`;
  }
}

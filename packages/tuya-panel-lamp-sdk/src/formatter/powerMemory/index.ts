import { transform, to16 } from '../../utils';
import DpCodes from '../../utils/dpCodes';

const { powerMemoryCode } = DpCodes;

export default class PowerMemoryFormatter {
  constructor(uuid = powerMemoryCode, defaultValue = null) {
    this.defaultValue = {
      version: 0,
      mode: 0,
      hue: 0,
      saturation: 0,
      value: 0,
      brightness: 1000,
      temperature: 1000,
    };
    this.uuid = uuid;
    if (defaultValue) {
      this.defaultValue = defaultValue;
    }
  }

  defaultValue: PowerMemoryData;
  uuid: string;

  parse(value: string): PowerMemoryData {
    const { length } = value;
    if (length !== 24) {
      // eslint-disable-next-line no-console
      console.warn(`Unable to parse data【${powerMemoryCode}】: ${value}`);
      return this.defaultValue;
    }
    const generator = transform(value);
    generator.next();
    const step2 = () => {
      return generator.next(2);
    };
    const step4 = () => {
      return generator.next(4);
    };
    return {
      version: step2().value,
      mode: step2().value,
      hue: step4().value,
      saturation: step4().value,
      value: step4().value,
      brightness: step4().value,
      temperature: step4().value,
    };
  }

  format(data: PowerMemoryData): string {
    const { version, mode, hue, saturation, value, brightness, temperature } = data;
    return `${to16(version, 2)}${to16(mode, 2)}${to16(hue, 4)}${to16(saturation, 4)}${to16(
      value,
      4
    )}${to16(brightness, 4)}${to16(temperature, 4)}`;
  }
}

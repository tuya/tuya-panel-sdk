import { transform, to16 } from '../../utils';

export default class ControlDataFormatter {
  constructor(uuid = 'control_data', defaultValue = null) {
    this.defaultValue = {
      mode: 1,
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

  defaultValue: IControlData;
  uuid: string;

  parse(value: string): IControlData {
    const { length } = value;
    if (length !== 21) {
      console.warn('The data format is wrong and cannot be parsed');
      return this.defaultValue;
    }
    const generator = transform(value);
    generator.next();
    const step1 = () => {
      return generator.next(1);
    };
    const step4 = () => {
      return generator.next(4);
    };
    return {
      mode: step1().value,
      hue: step4().value,
      saturation: step4().value,
      value: step4().value,
      brightness: step4().value,
      temperature: step4().value,
    };
  }

  format(data: IControlData): string {
    const { mode, hue, saturation, value, brightness, temperature } = data;
    return `${to16(mode, 1)}${to16(hue, 4)}${to16(saturation, 4)}${to16(value, 4)}${to16(
      brightness,
      4
    )}${to16(temperature, 4)}`;
  }
}

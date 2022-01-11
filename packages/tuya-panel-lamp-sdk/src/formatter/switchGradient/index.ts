import { transform, to16 } from '../../utils';

export default class SwitchGradientFormatter {
  constructor(uuid = 'switch_gradient', defaultValue = null) {
    this.defaultValue = { on: 800, off: 800 };
    this.uuid = uuid;
    if (defaultValue) {
      this.defaultValue = defaultValue;
    }
  }

  defaultValue: ISwitchGradient;

  uuid: string;

  parse(value: string): ISwitchGradient {
    const { length } = value;
    if (length !== 14) {
      console.warn('The data format is wrong and cannot be parsed');
      return this.defaultValue;
    }
    const generator = transform(value);
    generator.next();
    // 版本号
    generator.next(2).value;
    return {
      on: generator.next(6).value,
      off: generator.next(6).value,
    };
  }

  format(data: ISwitchGradient): string {
    const { on, off } = data;
    return `00${to16(on, 6)}${to16(off, 6)}`;
  }
}

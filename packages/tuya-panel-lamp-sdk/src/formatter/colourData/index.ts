import { transform, to16 } from '../../utils';

export default class ColourFormatter {
  constructor(uuid = 'colour_data', defaultValue = null) {
    this.defaultValue = { hue: 0, saturation: 1000, value: 1000 };
    this.uuid = uuid;
    if (defaultValue) {
      this.defaultValue = defaultValue;
    }
  }

  defaultValue: IColour;
  uuid: string;

  parse(value: string): IColour {
    const { length } = value;
    if (length !== 12) {
      console.warn('The data format is wrong and cannot be parsed');
      return this.defaultValue;
    }
    const generator = transform(value);
    generator.next();
    const step4 = () => {
      return generator.next(4);
    };
    return {
      hue: step4().value,
      saturation: step4().value,
      value: step4().value,
    };
  }

  format(data: IColour): string {
    const { hue, saturation, value } = data;
    return `${to16(hue, 4)}${to16(saturation, 4)}${to16(value, 4)}`;
  }
}

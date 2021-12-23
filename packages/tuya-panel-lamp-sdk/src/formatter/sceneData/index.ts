import { to16, transform } from '../../utils';
import DpCodes from '../../utils/dpCodes';

const { sceneCode } = DpCodes;

export default class SceneFormatter {
  constructor(uuid = sceneCode, defaultValue = null) {
    this.defaultValue = {
      id: 0,
      colors: [
        {
          speed: 50,
          time: 50,
          mode: 0,
          hue: 0,
          saturation: 1000,
          value: 1000,
          brightness: 0,
          temperature: 0,
        },
      ],
    };
    this.uuid = uuid;
    if (defaultValue) {
      this.defaultValue = defaultValue;
    }
  }

  defaultValue: SceneValue;
  uuid: string;

  parseUnits(generator: Generator): SceneUnit[] {
    const step2 = () => {
      return generator.next(2);
    };
    const step4 = () => {
      return generator.next(4);
    };
    const result = [];
    // eslint-disable-next-line no-constant-condition
    for (; true; ) {
      const time = step2().value;
      const speed = step2().value;
      const mode = step2().value;
      const hue = step4().value;
      const saturation = step4().value;
      // eslint-disable-next-line prefer-destructuring
      const value = step4().value;
      const brightness = step4().value;
      const { value: temperature, done } = step4();
      result.push({
        time,
        speed,
        mode,
        hue,
        saturation,
        value,
        brightness,
        temperature,
      });
      if (done) {
        break;
      }
    }
    return result;
  }

  parse(value: string): SceneValue {
    if (!value || (value.length - 2) % 26 !== 0) {
      // eslint-disable-next-line no-console
      console.warn(`Unable to parse data【${sceneCode}】: ${value}`);
      return this.defaultValue;
    }
    const generator = transform(value);
    generator.next();
    const { value: id, done } = generator.next(2);
    if (done) {
      return {
        id,
      };
    }
    const sceneUnits = this.parseUnits(generator);
    const colors = sceneUnits.map(
      ({ time, speed, mode, hue, saturation, value: colorBright, brightness, temperature }) => ({
        time,
        speed,
        mode,
        hue,
        saturation,
        value: colorBright,
        brightness,
        temperature,
      })
    );
    return {
      id,
      colors,
    };
  }

  format(data: SceneValue): string {
    const { id, colors } = data;
    if (colors && colors.length) {
      const units = colors
        .map(
          ({ hue, saturation, value, brightness, temperature, time, speed, mode }) =>
            `${to16(time, 2)}${to16(speed, 2)}${to16(mode, 2)}${to16(hue, 4)}${to16(
              saturation,
              4
            )}${to16(value, 4)}${to16(brightness, 4)}${to16(temperature, 4)}`
        )
        .join('');
      return `${to16(id, 2)}${units}`;
    }
    return `${to16(id, 2)}`;
  }
}

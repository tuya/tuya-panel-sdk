import _ from 'lodash';
import { Color, DpSchema, IFormater, WhiteColor } from '../../../interface';

export type SceneColor = Color & WhiteColor;

interface SceneData {
  id: number;
  time?: number;
  speed?: number;
  mode?: number;
  colors?: SceneColor[];
}

interface SceneUnit {
  time: number;
  speed: number;
  mode: number;
  hue: number;
  saturation: number;
  value: number;
  brightness: number;
  temperature: number;
}

function* transform(value: string): Generator<number, number, number> {
  let start = 0;
  let result = 0;
  let length;
  for (; true; ) {
    length = yield result;
    result = parseInt(value.substr(start, length), 16);
    if (start + length >= value.length) {
      break;
    }
    start += length;
  }
  return result;
}

/**
 * 场景数据转换器
 */
export default class SceneFormater implements IFormater {
  uuid: string;
  schema: DpSchema;
  defaultValue: SceneData = {
    id: 0,
    speed: 50,
    time: 50,
    mode: 0,
    colors: [{ hue: 0, saturation: 1000, value: 1000, brightness: 0, temperature: 0 }],
  }; // 数据有问题时，返回的数据
  constructor(uuid: string = 'scene_data', defaultValue: SceneData = null) {
    this.uuid = uuid;
    if (defaultValue) {
      this.defaultValue = defaultValue;
    }
  }

  // 比较两个值是否一致
  equal(source: string, target: string): boolean {
    return source === target;
  }

  /**
   * 解析场景各个单元
   * @param generator generator 函数
   */
  parseUnits(generator: Generator): SceneUnit[] {
    const step2 = () => {
      return generator.next(2);
    };
    const step4 = () => {
      return generator.next(4);
    };
    const result: SceneUnit[] = [];
    for (; true; ) {
      const time = step2().value;
      const speed = step2().value;
      const mode = step2().value;

      const hue = step4().value;
      const saturation = step4().value;
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

  // 将标准协议数据转为项目数据
  parse(value: string): SceneData {
    // 数据是否正确
    const length = value.length;
    if ((length - 2) % 26 !== 0) {
      // 数据有问题，给出提示
      console.log('数据有问题，无法解析');
      return this.defaultValue;
    }

    const generator = transform(value);
    generator.next(); // 准备
    // id
    const { value: id, done } = generator.next(2);
    if (done) {
      return {
        id,
      };
    }
    const sceneUnits = this.parseUnits(generator);
    const { time, speed, mode } = sceneUnits[0];
    const colors: SceneColor[] = sceneUnits.map(
      ({ hue, saturation, value, brightness, temperature }) => ({
        hue,
        saturation,
        value,
        brightness,
        temperature,
      })
    );
    return {
      id,
      time,
      speed,
      mode,
      colors,
    };
  }
  to16(value: number, length: number): string {
    let result = new Number(value).toString(16);
    if (result.length < length) {
      result = _.padStart(result, length, '0');
    }
    return result;
  }
  // 将数据转为标准协议数据
  format(data: SceneData): string {
    const { id, time, speed, mode, colors } = data;
    if (colors && colors.length) {
      const unitPrefix = `${this.to16(time, 2)}${this.to16(speed, 2)}${this.to16(mode, 2)}`;
      const units = colors
        .map(
          ({ hue, saturation, value, brightness, temperature }) =>
            `${unitPrefix}${this.to16(hue, 4)}${this.to16(saturation, 4)}${this.to16(
              value,
              4
            )}${this.to16(brightness, 4)}${this.to16(temperature, 4)}`
        )
        .join('');
      return `${this.to16(id, 2)}${units}`;
    } else {
      return `${this.to16(id, 2)}`;
    }
  }
}

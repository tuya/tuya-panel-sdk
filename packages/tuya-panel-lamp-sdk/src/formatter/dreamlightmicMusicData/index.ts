import { to16, transform } from '../../utils';
import DpCodes from '../../utils/dpCodes';

const { dreamLightMicMusicCode } = DpCodes;

interface DreamLightMicMusicColor {
  hue: number;
  saturation: number;
}

interface DreamLightMicMusicData {
  v: number;
  power: boolean;
  id: number;
  isLight: number;
  mode: number;
  speed: number;
  sensitivity: number;
  a: number;
  b: number;
  c: number;
  brightness: number;
  colors: DreamLightMicMusicColor[];
}

export default class DreamLightMicMusicFormatter {
  uuid: string;

  defaultValue: DreamLightMicMusicData = {
    v: 1,
    power: true,
    id: 0,
    isLight: 0, // 0 无声时灯灭、 1无声时灯维持10%亮度
    mode: 3, // 0跳变 1渐变 2 呼吸 3 闪烁
    speed: 100,
    sensitivity: 50,
    a: 0,
    b: 0,
    c: 0,
    brightness: 100,
    colors: [
      { hue: 0, saturation: 100 },
      { hue: 120, saturation: 100 },
      { hue: 240, saturation: 100 },
      { hue: 60, saturation: 100 },
      { hue: 80, saturation: 100 },
      { hue: 280, saturation: 100 },
    ],
  };

  constructor(uuid = dreamLightMicMusicCode, defaultValue?: DreamLightMicMusicData) {
    this.uuid = uuid;
    if (defaultValue) {
      this.defaultValue = defaultValue;
    }
  }

  /**
   * 解析场景各个单元
   * @param generator generator 函数
   */
  parseUnits(generator: Generator): DreamLightMicMusicColor[] {
    const step2 = () => {
      return generator.next(2);
    };

    const step4 = () => {
      return generator.next(4);
    };

    const result = [];
    // eslint-disable-next-line no-constant-condition
    for (; true; ) {
      const hue = step4().value;
      const { value: saturation, done } = step2();
      result.push({
        hue,
        saturation,
      });
      if (done) {
        break;
      }
    }
    return result;
  }

  parse(value: string): DreamLightMicMusicData {
    const { length } = value;
    if (!length) {
      // eslint-disable-next-line no-console
      console.warn(`Unable to parse data【${dreamLightMicMusicCode}】: ${value}`);
      return this.defaultValue;
    }

    const generator = transform(value);
    const step2 = () => {
      const { value: v } = generator.next(2);
      return v;
    };
    generator.next();
    const v = step2();
    const power = step2();
    let id = step2();
    const opt = Array.from(step2().toString(2).padStart(8, '0')).map(i => Number(i));
    const isLight = parseInt(opt.slice(0, 4).join('').padStart(8, '0'), 2);
    const mode = parseInt(opt.slice(4).join('').padStart(8, '0'), 2);
    // 摇滚、爵士、古典 特殊处理
    if (id === 0) {
      if (isLight === 0 && mode === 3) id = 0;
      if (isLight === 0 && mode === 2) id = 1;
      if (isLight === 1 && mode === 2) id = 2;
    } else if (id === 1) id = 3;
    else if (id === 2) id = 4;
    else if (id === 3) id = 5;

    const speed = step2();
    const sensitivity = step2();
    const a = step2();
    const b = step2();
    const c = step2();
    const brightness = step2();
    const colors = this.parseUnits(generator);
    return {
      v,
      power: Boolean(power),
      id,
      isLight,
      mode,
      sensitivity,
      speed,
      a,
      b,
      c,
      brightness,
      colors,
    };
  }

  format(data: DreamLightMicMusicData): string {
    const { v, power, isLight, mode, sensitivity, speed, a, b, c, brightness, colors } = data;
    const fixedIds = [0, 0, 0, 1, 2, 3];
    const id = fixedIds[data.id];
    const lightByte = parseInt(String(isLight), 10).toString(2).padStart(4, '0');
    const modeByte = parseInt(String(mode), 10).toString(2).padStart(4, '0');
    const optNum = parseInt(lightByte + modeByte, 2);
    if (colors && colors.length) {
      const units = colors
        .map(({ hue, saturation }) => `${to16(hue, 4)}${to16(saturation, 2)}`)
        .join('');
      return `${to16(v, 2)}${to16(power, 2)}${to16(id, 2)}${to16(optNum, 2)}${to16(speed, 2)}${to16(
        sensitivity,
        2
      )}${to16(a, 2)}${to16(b, 2)}${to16(c, 2)}${to16(brightness, 2)}${units}`;
    }
    return `${to16(v, 2)}${to16(power, 2)}${to16(id, 2)}${to16(optNum, 2)}${to16(speed, 2)}${to16(
      sensitivity,
      2
    )}${to16(a, 2)}${to16(b, 2)}${to16(c, 2)}`;
  }
}

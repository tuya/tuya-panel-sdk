/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Utils } from 'tuya-panel-kit';
import ColorObj from 'color';

const { color: ColorUtils } = Utils.ColorUtils;

ColorUtils.temp2rgb = function (
  kelvin: number,
  { temperatureMin = 4000, temperatureMax = 8000 } = {}
) {
  let newKelvin = kelvin;
  newKelvin /= 10; // 0 - 1000 范围
  const temp = temperatureMin + ((temperatureMax - temperatureMin) * newKelvin) / 100;
  const hsv = this.rgb2hsv(...this.kelvin2rgb(temp));
  return this.hsv2RgbString(...hsv);
};

ColorUtils.brightKelvin2rgb = function (
  bright = 1000,
  kelvin = 1000,
  { temperatureMin = 4000, temperatureMax = 8000 } = {}
) {
  let newKelvin = kelvin;
  let newBright = bright;
  newBright /= 10;
  newKelvin /= 10;
  const temp = temperatureMin + ((temperatureMax - temperatureMin) * newKelvin) / 100;
  const hsv = this.rgb2hsv(...this.kelvin2rgb(temp));
  const brightV = newBright;
  hsv[2] = brightV;
  return this.hsv2RgbString(...hsv);
};

ColorUtils.bright2Opacity = (
  brightness: number,
  option: { min: number; max: number } = { min: 0.2, max: 1 }
) => {
  const { min = 0.2, max = 1 } = option;
  return Math.round((min + ((brightness - 10) / (1000 - 10)) * (max - min)) * 100) / 100;
};

/**
 * 格式化hsv
 * 亮度将转化为透明度变化
 */
ColorUtils.hsv2rgba = function (hue: number, saturation: number, bright: number) {
  try {
    let color: string = ColorUtils.hsb2hex(hue, saturation / 10, 100);
    // @ts-ignore
    color = new ColorObj(color as string).alpha(this.bright2Opacity(bright)).rgbString();
    return color;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return 'transparent';
  }
};

ColorUtils.brightKelvin2rgba = function (bright: number, kelvin: number) {
  try {
    let color = ColorUtils.brightKelvin2rgb(1000, kelvin || 0);
    // @ts-ignore
    color = new ColorObj(color).alpha(this.bright2Opacity(bright)).rgbString();
    return color;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return 'transparent';
  }
};

export default ColorUtils;

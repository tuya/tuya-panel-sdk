const rgbReg = /^rgb/;
const colorReg = /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\.\d]+))?\)/;
const hashReg = /^#/;

export function toFixed16(v: string, length = 2) {
  let d = parseInt(v, 10).toString(16);
  if (d.length < length) {
    d = '0'.repeat(length - d.length) + d;
  } else {
    d = d.slice(0, length);
  }
  return d;
}

function getRgb(color: string) {
  const { length } = color;
  let rgb = [];
  for (let index = 0; index < length / 2; index++) {
    const idx = index * 2;
    const start = color[idx];
    const next = color[idx + 1];
    rgb[index] = start + next;
  }
  return rgb;
}

function decodeMemorizeKey(data: string) {
  return data;
}

/**
 *
 *
 * @export
 * @param {string} color
 * @returns rgba 0-255 {number[]}
 */
export const decodeColor = function (color: string): number[] {
  let rgb;
  if (rgbReg.test(color)) {
    const matcher = color.match(colorReg) || [];
    rgb = [matcher[1], matcher[2], matcher[3]].map(item => parseInt(item));
    let alpha = matcher[4] as any;
    if (alpha !== undefined) {
      alpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha;
      alpha = Math.floor(alpha * 255);
      rgb.push(alpha);
    }
    return rgb;
  }

  color = color.replace(hashReg, '');
  const len = color.length;
  if (len !== 6 && len !== 3 && len !== 8) {
    color = '000000';
  }
  if (len === 3) {
    rgb = color.split('').map(item => `${item}${item}`);
  } else {
    rgb = getRgb(color);
  }
  rgb = rgb.map(i => {
    let v = parseInt(i, 16);
    if (v < 0) v = 0;
    if (v > 255) v = 255;
    return v;
  });
  if (rgb.length === 3) {
    rgb.push(255);
  }
  return rgb;
};

/**
 * hex2rgba
 *
 * @param {String} hex '#FF0000'
 * @param {Number} alpha 0-1
 * @returns 'ff0000ff'
 */
export function hex2rgba(hex: string, alpha = 1) {
  const alpha16 = toFixed16(Math.round(alpha * 255).toString());
  const color = hex.replace(hashReg, '');
  return `${color}${alpha16}`;
}

/**
 * hex2ahex
 *
 * @param {String} hex '#FFFFFF'
 * @param {Number} alpha 0-1
 */
export function hex2ahex(hex: string, alpha = 1) {
  const alpha16 = toFixed16(Math.round(alpha * 255).toString());
  const color = hex.replace(hashReg, '');
  return `#${alpha16}${color}`;
}

export function isRobotQuiet(status: string) {
  const quietStatuses = ['standby', 'paused', 'charging', 'charge_done', 'sleep', 'fault'];
  const isQuiet = quietStatuses.includes(status);
  return isQuiet;
}

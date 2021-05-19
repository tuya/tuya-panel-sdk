/**
 * @description 将十进制的 hsv 转换成十六进制的 hhsssvvv
 * 范围为 h: [0, 360], s: [0， 1000], v: [0， 1000]
 * @param h 色相（Hue）
 * @param s 饱和度 (Saturation)
 * @param v 亮度（Value）
 * @returns {String} result
 */

const encodeColorData = (h: number, s: number, v: number) => {
  let hue = h % 360;
  hue = hue > 0 ? hue : h;
  hue = hue < 0 ? 360 + hue : hue;

  return [hue, s, v].reduce((curr, next) => {
    let hex = next.toString(16);
    if (hex.length < 4) {
      hex = '0'.repeat(4 - hex.length) + hex;
    } else {
      hex = hex.slice(0, 4);
    }
    return curr + hex;
  }, '');
};

/**
 * @description 将十六进制的 hhsssvvv 转换成十进制的 hsv
 * 范围为 h: [0, 360], s: [0, 1000], v: [0, 1000]
 * @param hsvStr hhsssvvv
 * @returns {Array} [h, s, v]
 */

const decodeColorData = (byte: string) => {
  if (!byte || byte.length !== 12) {
    return [0, 1000, 1000];
  }
  const b = byte.match(/[a-z\d]{4}/gi) || [];
  return b.reduce((curr, hex) => {
    curr.push(parseInt(hex, 16));
    return curr;
  }, []);
};

export default {
  encodeColorData,
  decodeColorData,
};

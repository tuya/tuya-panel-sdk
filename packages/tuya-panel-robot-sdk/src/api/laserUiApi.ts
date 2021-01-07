import { NativeModules } from 'react-native';
import { IBitmapToImageOpt } from './interface';

const TYLaserManager = NativeModules.TYRCTLaserManager;

// ------------------------------------------------
/**
 * 激光位图数据转化为base64图片
 *
 * @export
 * @param {BitmapToImageOpt} opts
 * @returns
 */
export function laserBitmapToImageBase64(opts: IBitmapToImageOpt) {
  const { width, height, points, pointLength, colorsMaps, scale, orientation } = opts;
  return new Promise((resolve, reject) => {
    if (!TYLaserManager.laserBitmapToImageBase64)
      reject(new Error('no TYLaserManager.laserBitmapToImageBase64'));

    TYLaserManager.laserBitmapToImageBase64(
      width,
      height,
      points,
      pointLength,
      JSON.stringify(colorsMaps),
      scale,
      orientation,
      resolve,
      reject
    );
  });
}

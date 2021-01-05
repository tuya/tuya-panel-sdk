import { NativeModules } from 'react-native';

const TYLaserManager = NativeModules.TYRCTLaserManager;

// ------------------------------------------------

interface BitmapToImageOpt {
  width: number,
  height: number,
  points: string,
  pointLength: number,
  colorsMaps: {[index: string]: string},
  scale: number,
  orientation: 'up' | 'down' | 'left' | 'right' | 'upMirrored' | 'downMirrored' | 'leftMirrored' | 'rightMirrored'
}

/**
 * 激光位图数据转化为base64图片
 *
 * @export
 * @param {BitmapToImageOpt} opts
 * @returns
 */
export function laserBitmapToImageBase64(opts: BitmapToImageOpt) {
  const { width, height, points, pointLength, colorsMaps, scale, orientation } = opts;
  return new Promise((resolve, reject) => {
    if (!TYLaserManager.laserBitmapToImageBase64) reject('no TYLaserManager.laserBitmapToImageBase64');

    TYLaserManager.laserBitmapToImageBase64(width, height, points, pointLength, JSON.stringify(colorsMaps), scale, orientation, resolve, reject)
  })
}

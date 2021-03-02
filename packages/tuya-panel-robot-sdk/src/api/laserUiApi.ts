import { NativeModules } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';
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

/**
 * 开启扫地机数据通道
 */
export function laserMapStartChannel(): Promise<void> {
  return new Promise(resolve => {
    TYLaserManager.startConnectSweeperDataChannel();
    resolve();
  });
}

/**
 * 取消地图通道连接，退出面板的时候再调用，不能在地图组件的生命周期内。
 * @returns
 */
export function laserMapStopChannel(): Promise<void> {
  return new Promise(resolve => {
    TYLaserManager.stopConnectSweeperDataChannel();
    resolve();
  });
}

/**
 * 获取实时的地图存储路径和路径存储路径
 * @returns {Object} { mapPath, routePath }
 * mapPath: 地图数据云端的bin文件路径
 * routePath: 路径bin文件路径
 */
export function getLatestMapFile(): Promise<{ mapPath: string; routePath: string }> {
  return new Promise((resolve, reject) => {
    TYLaserManager.getSweeperCurrentPath(TYSdk.devInfo.devId, resolve, reject);
  });
}

/**
 * lz4解压
 * 地图数据解析 base64 + lz4
 * lz4Data	String	带解析字符串数据
 * length	Integer	数据长度
 */
export function laserDecompressLZ4(lz4Data: string, length: number): Promise<void> {
  return new Promise((resolve, reject) => {
    TYLaserManager.laserDecompressLZ4(lz4Data, length, resolve, reject);
  });
}

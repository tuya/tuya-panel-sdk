import { TYSdk } from 'tuya-panel-kit';
import { NativeModules } from 'react-native';
const TYLaserManager = NativeModules.TYRCTLaserManager;

/**
 * 鉴权，获取存储桶的访问权限
 *
 * @param {String} [devId=TYSdk.devInfo.devId]
 * @returns {Promise<string>} 桶名称
 * @docs https://developer.tuya.com/cn/docs/app-development/lasersweeper?id=Ka6o1iaxtu71o#title-3-%E6%9B%B4%E6%96%B0%E4%BA%91%E5%AD%98%E5%82%A8%E9%85%8D%E7%BD%AE
 */
export function updateCloudConfig(devId = TYSdk.devInfo.devId): Promise<string> {
  return new Promise((resolve, reject) => {
    TYLaserManager.updateCloudConfig(devId, resolve, reject);
  });
}

/**
 * 获取文件完整链接
 *
 * @param {string} bucket 桶名称
 * @param {string} filePath 文件相对路径
 * @returns {Promise<string>} 文件的Url
 * @docs https://developer.tuya.com/cn/docs/app-development/lasersweeper?id=Ka6o1iaxtu71o#title-6-%E8%8E%B7%E5%8F%96%E5%AE%8C%E6%95%B4%E6%96%87%E4%BB%B6%E5%9C%B0%E5%9D%80
 */
export function getCloudFileUrl(bucket: string, filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    TYLaserManager.getCloudFileUrl(bucket, filePath, resolve, reject);
  });
}

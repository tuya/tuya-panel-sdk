import { TYSdk } from 'tuya-panel-kit';
import { NativeModules } from 'react-native';
const TYLaserManager = NativeModules.TYRCTLaserManager;

/**
 * 鉴权，获取存储桶的访问权限
 *
 * @param {String} [devId=TYSdk.devInfo.devId]
 * @returns {Promise<string>} 桶名称
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
 */
export function getCloudFileUrl(bucket: string, filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    TYLaserManager.getCloudFileUrl(bucket, filePath, resolve, reject);
  });
}

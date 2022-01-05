// 获取云存储状态
import { TYSdk } from 'tuya-panel-kit';

interface Log {
  str: string;
  timestamp: number;
}

type AtopRes = {
  success: boolean;
  data: Log[];
};

/** 是否购买过云服务，查看状态 */
export const getCloudServiceStatus = (): Promise<any> => {
  const { productId, uuid } = TYSdk.devInfo;

  return TYSdk.apiRequest<string>(
    'tuya.customer.serve.type.instance.served.check',
    { clientId: productId, instanceId: uuid, serveType: 'cloud_lock_shortvideo' },
    '1.0'
  );
};

// 获取当月已观看次数
export const getCurrentMonthViewCount = (): Promise<any> => {
  return TYSdk.apiRequest<{ count: number }>(
    'tuya.m.device.lock.media.view.times.get',
    { devId: TYSdk.devInfo.devId },
    '1.0'
  );
};

// 设置当月已观看次数
export const setCurrentMonthViewCount = (): Promise<any> => {
  return TYSdk.apiRequest<{ count: number }>(
    'tuya.m.device.lock.media.view.times.set',
    { devId: TYSdk.devInfo.devId },
    '1.0'
  );
};

/** 音视频云能力判断 */
export const hasTheAbilityOfAudioInVideo = (): Promise<any> => {
  return TYSdk.apiRequest(
    'tuya.m.device.lock.capability.cloud.get',
    { devId: TYSdk.devInfo.devId },
    '1.0'
  ).then(({ capability }) => Array.isArray(capability) && capability.includes(1));
};

// 获取云存储地址
export const getDomainUrlApi = (): Promise<any> => {
  return TYSdk.apiRequest<AtopRes>(
    'tuya.ia.app.domain.query',
    { bizCode: 'cloud_camera_store' },
    '1.0'
  );
};

// 远程开门ATOP接口
export const remoteOpenApi = (confirm: boolean): Promise<any> => {
  return TYSdk.apiRequest<AtopRes>(
    'tuya.m.device.lock.remote.unlock',
    { confirm, open: true },
    '2.0'
  );
};

// 获取实时图片路径地址
export const getPictureUrlApi = (params: { filePath: string; bucket: string }): Promise<any> => {
  return TYSdk.apiRequest<AtopRes>('tuya.m.device.lock.media.path', params, '2.0');
};

// 获取当前可显示图片路径（用于不在面板内收到dp上报）
export const getCurrentPictureUrlApi = (fileType: number): Promise<any> => {
  return TYSdk.apiRequest<AtopRes>(
    'tuya.m.device.lock.media.path.latest',
    { devId: TYSdk.devInfo.devId, fileType },
    '1.0'
  );
};

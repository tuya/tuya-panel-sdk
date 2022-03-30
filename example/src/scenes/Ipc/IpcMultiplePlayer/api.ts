import { TYIpcNativeModule } from '@tuya/tuya-panel-ipc-sdk';

const { HomeDeviceManager } = TYIpcNativeModule;

// 获取当前家庭下其他设备
export const getDeviceFromFamily = (): Promise<any[]> => {
  return new Promise(resolve => {
    HomeDeviceManager.getFilterDevList(
      (result: []) => {
        resolve(result);
      },
      () => {
        resolve([]);
      }
    );
  });
};

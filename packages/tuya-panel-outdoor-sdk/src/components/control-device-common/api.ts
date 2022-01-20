/* eslint-disable literal-check/literal-check */
import { TYSdk } from 'tuya-panel-kit';

// 寻宠
export const putDpfindDevice = (dpCode: string, dpValue: boolean) => {
  const { devId } = TYSdk.devInfo;
  return TYSdk.apiRequest('tuya.m.trip.outdoors.device.findDevice', {
    deviceId: devId,
    dpCode,
    dpValue,
  });
};

// 获取设备当前位置
export const getDeviceLocation = (): any => {
  return TYSdk.apiRequest(
    'tuya.m.trip.outdoors.location.get',
    {
      deviceId: TYSdk?.devInfo?.devId,
    },
    '1.0'
  );
};

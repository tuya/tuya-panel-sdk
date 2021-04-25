import { TYSdk } from 'tuya-panel-kit';

function api(a: string, postData: any, v = '1.0') {
  return new Promise((resolve, reject) => {
    TYSdk.apiRequest(a, postData, v)
      .then((d: any) => {
        resolve(d);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
const TYNative: { [key: string]: any } = {};

TYNative.getDeviceInitDate = () => {
  return api('tuya.m.device.lock.active.period', {
    devId: TYSdk.devInfo.devId,
  });
};

export default TYNative;

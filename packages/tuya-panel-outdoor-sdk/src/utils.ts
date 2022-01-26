import { NativeModules } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';

const _TYDeviceDevice = NativeModules.TYRCTDeviceModule || NativeModules.TYRCTPanelManager;

// 兼容蓝牙模式下发，app版本高于3.28.5
const putDpData = (data: any) => {
  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    const { option, ...params } = data;
    let isEmpty = true;
    let err;
    const cmds: any = {};
    const codes = [];

    // eslint-disable-next-line no-restricted-syntax
    for (let dpId in params) {
      // 验证dp点是否合法
      if (TYSdk.device.checkDpExist(dpId)) {
        const dpCode = dpId;
        // 如果不是id值，整型
        if (!/^\d+$/.test(dpId)) {
          dpId = TYSdk.device.getDpIdByCode(dpCode);
        }
        cmds[dpId] = params[dpCode];
        isEmpty = false;
        codes.push(dpCode);
      }
    }
    if (isEmpty) {
      err = { ret: 'param error' };
      return reject(err);
    }

    let schema;
    try {
      schema = TYSdk.device.getDpSchema(codes[0]) as any;
    } catch (error) {
      return reject(error);
    }
    let isNew = false;
    let newRoute = -1;
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!schema.extContent) {
      const extContent =
        typeof schema.extContent === 'string'
          ? JSON.parse(schema.extContent)
          : Object.values(schema.extContent);
      isNew = !!extContent.route; // eg: '{"id":9,"route":1}'
      // eslint-disable-next-line no-extra-boolean-cast
      newRoute = !!extContent.route ? extContent.route : -1;
    }

    // 下发数据
    const putData = {
      command: cmds, // {"1": true, "2": false}
      option: typeof option === 'undefined' ? 3 : option, // 0，静音； 1，震动；2,声音； 3，震动声音
    };

    if (isNew) {
      _TYDeviceDevice.deviceDevice.putCustomOrderDpData(
        {
          ...putData,
          orders: newRoute === 2 ? [3] : [3, 1], // 跟putDpData方法的区别就是通道顺序，3是蓝牙，1是mqtt
        },
        (s: any) => {
          resolve({ success: true });
        },
        (d: any) => {
          reject(d);
        }
      );
    } else {
      _TYDeviceDevice.deviceDevice.putDpData(
        {
          ...putData,
        },
        () => {
          resolve({ success: true });
        },
        (d: any) => {
          reject(d);
        }
      );
    }
  });
};

export default { putDpData };

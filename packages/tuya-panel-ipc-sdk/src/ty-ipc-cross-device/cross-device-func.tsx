/* eslint-disable no-console */
import { NativeEventEmitter } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';
import CrossDeveiceManager from './mulDevNativeApi';
import HomeDevManager from './homeDevNativeApi';

const TYEvent = TYSdk.event;

interface dpsInfo {
  dpId: string;
  [propName: string]: string;
}

interface PutDevDpInfo {
  devId: string;
  dps: dpsInfo;
}

// 此功能3.24.5版本以上支持
class CrossDeviceManagerFun {
  /*
    获取当前家庭下的设备列表（不包含分享、群组，且已过滤标位 25 无值的子设备：IPC子设备、红外子设备）
    @param
    成功回调数据内容
    {
      "devId" : "" ,
      "name" : "",
      "pcc" : "",
      "iconUrl" : "",
      "nodeId" : "",
      "uuid" : "",
      "isOnline" : false,
      "capability" : 0,
      "meshId" : "",
      "productId" : "xxx",
      "roomId" : "",
      "switchDp" : 1,
      "mac" : "",
      "schema" : "[{字符串格式}]",
      "quickOpDps" : "",
      "dps" : ""
    }
  */
  getCurrentHomeDevList = () => {
    return new Promise((resolve, reject) => {
      try {
        HomeDevManager.getFilterDevList(
          result => {
            resolve({
              success: true,
              result,
            });
          },
          err => {
            resolve({
              success: false,
              errMsg: JSON.stringify(err),
            });
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  /*
    初始化注册需要监听及控制的设备列表
    @param
    deviceList: 需要监听及控制的设备id数组 如:[id1, id2, id3]
  */
  initAddListenCrossDeviceList = (deviceList: string[]) => {
    const MultiDeveiceManagerEmitter = new NativeEventEmitter(CrossDeveiceManager);
    CrossDeveiceManager.registerDeviceListStatus(deviceList, () => {
      console.log('Device registration is successful');
    });
    MultiDeveiceManagerEmitter.addListener('onDevInfoUpdate', result => {
      // 检测到注册设备信息变更后，发送变更信息
      TYEvent.emit('crossDeviceInfoChange', result);
    });
  };

  /*
    移除监听及控制的设备列表
    组件销毁时调用
    @param
    deviceList: 移除监听及控制的设备id数组 如:[id1, id2, id3]
  */
  removeListenCrossDeviceList = (deviceList: string[]) => {
    CrossDeveiceManager.unRegisterDeviceListStatus(deviceList, () => {
      console.log('removeListen');
    });
    TYEvent.off('crossDeviceInfoChange', () => {});
  };

  /*
    控制其它监听设备的Dp下发指令
    @param
    deviceDpInfo: 移除监听及控制的设备id数组 如:[{[devid1]: '', [dpId2]: [dpvalue1]}, {[devid2]: '', [dpId2]: [dpvalue2]} ]
  */
  putDpWithDevList = (deviceDpInfo: Array<PutDevDpInfo>) => {
    return new Promise((resolve, reject) => {
      try {
        CrossDeveiceManager.putDpWithList(
          deviceDpInfo,
          () => {
            resolve({
              success: true,
            });
          },
          err => {
            resolve({
              success: false,
              errMsg: JSON.stringify(err),
            });
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  };
}

export default new CrossDeviceManagerFun();

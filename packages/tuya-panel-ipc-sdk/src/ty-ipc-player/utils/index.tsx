/* eslint-disable no-console */
import Global from '../config/global';
import Config from '../config';
import TYIpcPlayerManager from '../../ty-ipc-native';
import { disconnect } from '../../ty-ipc-native/nativeManager';

const { isIOS } = Config;

// timeOutTime 判定进入后台5秒后主动断开P2P
export const enterBackTimeOut = (timeOutTime = 5000) => {
  // 安卓进入后台，先立马断开,安卓rn机制如此,进入后台会停止所有的定时;
  !isIOS && TYIpcPlayerManager.backPlayPreview();
  if (isIOS) {
    Global.enterBackTimeOut = setTimeout(() => {
      console.log('5秒后断开P2P连接');
      disconnect();
    }, timeOutTime);
  }
};

export const enterBackTimeOutSpecial = () => {
  TYIpcPlayerManager.exitPlayPreviewSpecial();
};

export const cancelEnterBackTimeOut = () => {
  clearTimeout(Global.enterBackTimeOut);
};

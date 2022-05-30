import { NativeModules, requireNativeComponent, Platform } from 'react-native';

import nativePlayer from './nativePlayer';

const {
  TYRCTCameraManager,
  TYRCTCameraMessageManager,
  TYRCTOrientationManager,
  TYRCTDeviceMultiManager,
  TYRCTHomeDevManager,
  TYRCTMultiCameraManager,
  TYRCTLifecycleManager,
} = NativeModules;

const isIOS = Platform.OS === 'ios';

export default {
  /**
   * @description IPC 功能控制模块
   */
  CameraManager: TYRCTCameraManager,
  /**
   * @description IPC 播放器组件
   */
  CameraPlayer: nativePlayer,
  /**
   * @description 旋转屏幕模块
   */
  OrientationManager: TYRCTOrientationManager,
  /**
   * @description 跨设备控制模块
   */
  DeviceMultiManager: TYRCTDeviceMultiManager,
  /**
   * @description 消息功能控制模块
   */
  CameraMessageManager: TYRCTCameraMessageManager,
  /**
   * @description 原生控制面板生命周期监听模块
   */
  TYRCTLifecycleManager,
  /**
   * @description 跨设备信息模块
   */
  HomeDeviceManager: TYRCTHomeDevManager,
  /**
   * @description 多设备预览功能控制
   */
  MultiCameraManager: TYRCTMultiCameraManager,
  /**
   * @description 跨设备下发
   */
  MultiDeviceManager: TYRCTDeviceMultiManager,
  /**
   * @description 消息功能控制播放器组件
   */
  MessageMediaPlayer: isIOS
    ? requireNativeComponent('TYRCTCameraMessageMediaPlayer')
    : requireNativeComponent('TYRCTCameraMessageMediaPlayerManager'),
};

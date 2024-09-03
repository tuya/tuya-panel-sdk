import { NativeModules } from 'react-native';
import CameraManager from '../ty-ipc-native/nativeApi';
import CameraPlayer from '../ty-ipc-player/nativePlayer';
import OrientationManager from '../ty-ipc-native/tyrctOrientationManager';
import DeviceMultiManager from '../ty-ipc-cross-device/mulDevNativeApi';
import {
  CameraMessageManager,
  MediaPlayer as MessageMediaPlayer,
} from '../ty-ipc-message-player/tyIpcMessagePlayer';
import TYRCTLifecycleManager from '../ty-ipc-player/components/tyrctLifecycleManager';
import HomeDeviceManager from '../ty-ipc-multiple-player/native/homeDeviceManager';
import MultiCameraManager from '../ty-ipc-multiple-player/native/multiCameraManager';
import MultiDeviceManager from '../ty-ipc-multiple-player/native/multiDeviceManager';

const MqttManager = NativeModules.TYRCTMqttManager;

export default {
  /**
   * @description IPC 功能控制模块
   */
  CameraManager,
  /**
   * @description IPC 播放器组件
   */
  CameraPlayer,
  /**
   * @description 旋转屏幕模块
   */
  OrientationManager,
  /**
   * @description 跨设备控制模块
   */
  DeviceMultiManager,
  /**
   * @description 消息功能控制模块
   */
  CameraMessageManager,
  /**
   * @description 消息功能控制播放器组件
   */
  MessageMediaPlayer,
  /**
   * @description 原生控制面板生命周期监听模块
   */
  TYRCTLifecycleManager,
  /**
   * @description 跨设备信息模块
   */
  HomeDeviceManager,
  /**
   * @description 多设备预览功能控制
   */
  MultiCameraManager,
  /**
   * @description 跨设备下发
   */
  MultiDeviceManager,
  /**
   * @description mqtt监听
   */
  MqttManager,
};

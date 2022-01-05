import padStart from 'lodash/padStart';
import { NativeModules } from 'react-native';

const M = NativeModules.TYRCTCameraMessageManager;

/** 视频时长显示格式：00:00 */
export const timeFormat = (t: number): string => {
  let m = 0;
  let s = 0;

  if (t !== 0) {
    m = Math.floor(t / 60);
    s = Math.ceil(t % 60);
  }

  return `${padStart(String(m), 2, '0')}:${padStart(String(s), 2, '0')}`;
};

/** 创建 */
export const createFn = (): Promise<any> =>
  new Promise((resolve, reject) => M.createMediaDevice(resolve, reject));

/** 静音开关 */
export const toggleMute = (mute: boolean): Promise<any> => {
  return new Promise((resolve, reject) => {
    M.enableMute(mute, resolve, reject);
  });
};

type PlayFnType = {
  path: string;
  key: string;
  startTime: number;
};

/** 开始播放视频 */
export const playFn = ({ path, key, startTime }: PlayFnType): Promise<any> => {
  return new Promise((resolve, reject) => {
    M.playMediaVideoWithPath(path, key, startTime, resolve, reject);
  });
};

/** 暂停播放 */
export const pauseFn = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    M.pauseVideoPlay(resolve, reject);
  });
};

/** 暂停后继续 */
export const resumFn = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    M.resumeVideoPlay(resolve, reject);
  });
};

/** 停止播放 */
export const stopFn = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    M.stopVideoPlay(resolve, reject);
  });
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TYSdk } from 'tuya-panel-kit';

const TYEvent = TYSdk.event;

export const getEventName = (device: { devId: string; playerKey?: string }, name: string) => {
  return `${device.playerKey ? device.playerKey : ''}${device.devId}-${name}`;
};

// 事件派发
export const messageEmit = (devId: string, type: string, param: any) => {
  TYEvent.emit(getEventName({ devId }, 'message'), { type, ...param });
};

// 生成随机数 时间戳 + 6位随机数
export const getRandom = () => {
  return `${Date.now()}${Math.floor(Math.random() * 999999 + 100000)}`;
};

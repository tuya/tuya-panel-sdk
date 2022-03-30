/* eslint-disable no-shadow */
import React from 'react';

export interface IRemoteRequestPannel {
  /**
   * @language zh-CN
   * @description 背景色
   * @defaultValue #fff
   */
  /**
   * @language en-US
   * @description background color
   * @defaultValue #fff
   */
  bgColor?: string;
  options?: Partial<OptionsType>;
}
export interface ReactManageProps {
  chargeH5Url: string;
}

export interface RemoteManagerApiType extends OptionsType {
  renderToarst?: boolean;
}

export interface RemoteManagerReturnType {
  remoteAlarmCamera: (opts?: Partial<RemoteManagerApiType>) => void;
  remoteAlarmVideo: (opts?: Partial<RemoteManagerApiType>) => void;
  remoteOpenDoorCamera: (opts?: Partial<RemoteManagerApiType>) => void;
  remoteRealTimeVideo: (opts?: Partial<RemoteManagerApiType>) => void;
  startListen: (opts?: Partial<RemoteManagerApiType>) => void;
  off: () => void;
  updateOptions: (c: Partial<OptionsType>) => void;
  mockReport: (dps: Record<string, any>, ...args: any[]) => void;
}

export interface OptionsType {
  /**
   * @language zh-CN
   * @description 是否为管理员
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description is Admin?
   * @defaultValue false
   */
  isAdmin?: boolean | number;
  /**
   * @language zh-CN
   * @description 是否为分享者
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description is share?
   * @defaultValue false
   */
  isShare?: boolean;
  /**
   * @language zh-CN
   * @description 弹窗类型
   * @defaultValue image
   */
  /**
   * @language en-US
   * @description modal type
   * @defaultValue image
   */
  type?: ModalType;
  /**
   * @language zh-CN
   * @description 是否启用面板倒计时
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description use Panel fake timer
   * @defaultValue false
   */
  useFakeTime?: boolean;
  /**
   * @language zh-CN
   * @description 是否开启音频功能 Ipc 音频 包括相关的操作按钮
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description use Panel fake timer
   * @defaultValue false
   */
  withAudio?: boolean;
  /**
   * @language zh-CN
   * @description 是否支持双向对讲
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description is support towtalk
   * @defaultValue false
   */
  isSupportTowTalk?: boolean;
  /**
   * @language zh-CN
   * @description 设备是否在线
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description device online status
   * @defaultValue false
   */
  deviceOnline: boolean;
  /**
   * @language zh-CN
   * @description 旋转角度
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description rotate
   * @defaultValue 0
   */
  rotate?: number;
  /**
   * @language zh-CN
   * @description 弹窗倒计时
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description count time
   * @defaultValue undefined
   */
  countTime?: number;
  /**
   * @language zh-CN
   * @description 需要初始化传入的 DP 数据
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description initial dp data
   * @defaultValue {}
   */
  initDpData: {
    alarmRequest?: DpValue;
    unlockRequest?: DpValue;
    dp212Data: DpValue;
    videoRequestTime?: DpValue;
  };
  /**
   * @language zh-CN
   * @description  关闭回调
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description onClose
   * @defaultValue undefined
   */
  onClose?: () => void;
  /**
   * @language zh-CN
   * @description 错误回调
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description error callback
   * @defaultValue undefined
   */
  onError?: () => void;
  /**
   * @language zh-CN
   * @description 忽略 回调
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description ignore callback
   * @defaultValue undefined
   */
  onIgnore?: () => void;
  /**
   * @language zh-CN
   * @description 挂断回调
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description hangup callback
   * @defaultValue undefined
   */
  onHangup?: () => void | Promise<void>;
}

export type DpValue = boolean | number | string;
export interface IModal {
  render: (element: React.ReactElement, opts: RemoteManagerApiType) => void;
  /** 关闭通知栏弹窗 */
  closeToarst: () => void;
  /** 弹窗正常关闭 */
  close: (opts?: RemoteManagerApiType) => void;
  /** 弹窗异常关闭 */
  errorClose: () => void;
  /** 当前渲染的弹窗类型 */
  renderedModalType?: ModalType | null;
  // updateOptions: (options: Partial<OptionsType>) => void;
}
export interface IToastApi {
  success: (text: string) => void;
  error: (text: string) => void;
  warning: (text: string) => void;
  loading: (text?: string) => void;
  hide: () => void;
}
export type ModalType = 'image' | 'alarmVideo' | 'alarmImage' | 'video';
export interface ManagerContextType {
  modal: IModal;
  options: RemoteManagerApiType;
  countTime?: number;
  updateOptions?: (options: Partial<OptionsType>) => void;
  dpData?: any;
  toastApi?: IToastApi;
  modalHeaderTitle: string;
  timer?: {
    refresh: (count: number) => void;
  };
  isDoorBellRing?: boolean; // 是否为门铃呼叫
}

export interface PannelDpContextType {
  dpData: any;
}

export interface ImagePannelProps {
  contentHeight: number;
}

export type FnType = () => void;

export type Dp212ParseDataType = {
  ext: {
    type: number;
  };
  time: number;
  type: string;
};

export enum OpenStateEnum {
  default = 'default',
  success = 'success',
  refuse = 'refuse',
  fail = 'fail',
  loading = 'loading',
}

export interface IPCDpCodeType {
  action: 'open' | 'close'; // 请求类型
  requestType: 'openDoor' | 'alarmModal'; // 请求类型 告警还是开门请求
  requestContent: 'image' | 'video'; // 图片抓拍还是实时视频
  withAudio: boolean; // 是否带音频
  isSupportTwoMic: boolean; // 是否支持双向对讲
}

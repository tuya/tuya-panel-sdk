/* eslint-disable no-shadow */
import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export type IAesImage = Pick<
  IPreviewer,
  | 'width'
  | 'height'
  | 'imageKey'
  | 'imagePath'
  | 'imageStyle'
  | 'rotate'
  | 'errorImage'
  | 'errorText'
  | 'errorTextStyle'
  | 'onLoadImageSuccess'
  | 'onLoadImageFailed'
  | 'downloadAble'
>;

export type IVideoProps = Pick<
  IPreviewer,
  | 'imagePath'
  | 'imageKey'
  | 'videoKey'
  | 'videoSource'
  | 'rotate'
  | 'errorImage'
  | 'errorText'
  | 'errorTextStyle'
  | 'defaultVideoHeight'
  | 'onLoadImageSuccess'
  | 'onLoadImageFailed'
  | 'onLoadVideoSuccess'
  | 'onLoadVideoFailed'
  | 'downloadAble'
>;

export interface IPictureProps extends IAesImage {
  /**
   * @language zh-CN
   * @description 关闭回调
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description onClose callback
   * @defaultValue 0
   */
  onClose?: () => void;
}

export interface IPreviewer {
  /**
   * @language zh-CN
   * @description 宽度
   * @defaultValue 50
   */
  /**
   * @language en-US
   * @description width
   * @defaultValue 50
   */
  width?: number;
  /**
   * @language zh-CN
   * @description 高度
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description height
   * @defaultValue 0
   */
  height?: number;
  /**
   * @language zh-CN
   * @description 样式
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description style
   * @defaultValue undefined
   */
  imageStyle?: ViewStyle | ViewStyle[];
  /**
   * @language zh-CN
   * @description 图片源
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description image source
   * @defaultValue undefined
   */
  imagePath?: string;
  /**
   * @language zh-CN
   * @description 图片加密key
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description image key
   * @defaultValue undefined
   */
  imageKey?: string;
  /**
   * @language zh-CN
   * @description 视频数据源
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description video source
   * @defaultValue undefined
   */
  videoSource?: string;
  /**
   * @language zh-CN
   * @description 视频加密key
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description video key
   * @defaultValue undefined
   */
  videoKey?: string;
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
   * @description 头部显示文案
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description modal header text
   * @defaultValue undefined
   */
  headerText?: string;
  /**
   * @language zh-CN
   * @description 关闭回调
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
   * @description 错误显示图
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description error image
   * @defaultValue undefined
   */
  errorImage?: React.ReactElement;
  /**
   * @language zh-CN
   * @description 错误显示文案
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description error text
   * @defaultValue 加载失败
   */
  errorText?: string;
  /**
   * @language zh-CN
   * @description 错误显示文案样式
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description error text style
   * @defaultValue undefined
   */
  errorTextStyle?: TextStyle | TextStyle[];
  /**
   * @language zh-CN
   * @description 成功回调
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description success callback
   * @defaultValue undefined
   */
  onLoadImageSuccess?: (size: any) => void;
  /**
   * @language zh-CN
   * @description 失败回调
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description failed callback
   * @defaultValue undefined
   */
  onLoadImageFailed?: (e: any) => void;
  /**
   * @language zh-CN
   * @description 成功回调
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description success callback
   * @defaultValue undefined
   */
  onLoadVideoSuccess?: () => void;
  /**
   * @language zh-CN
   * @description 失败回调
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description failed callback
   * @defaultValue undefined
   */
  onLoadVideoFailed?: (e: any) => void;
  /**
   * @language zh-CN
   * @description 默认高度
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description default height
   * @defaultValue 0
   */
  defaultVideoHeight?: number;
  /**
   * @language zh-CN
   * @description 是否支持下载
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description can download?
   * @defaultValue 0
   */
  downloadAble?: boolean;
}

/** video status */
export enum PlayStatus {
  init = 'init',
  play = 'play',
  pause = 'pause',
  loading = 'loading',
  error = 'error',
  finish = 'finish',
}

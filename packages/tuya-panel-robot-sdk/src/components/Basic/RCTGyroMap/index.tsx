import React, { Component } from 'react';
import { requireNativeComponent, NativeModules } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const TYRCTPointMap = requireNativeComponent('TYRCTPointMap');
export const TYRCTGyroMapManager = NativeModules.TYRCTTransferManager;

const {
  RatioUtils: { viewHeight, viewWidth },
} = Utils;

interface IMap {
  [index: string]: number;
}

// eslint-disable-next-line no-shadow
enum pointTypeEnum {
  square = 'square',
  circle = 'circle',
}
interface IProps {
  /** 地图宽度 */
  width?: number;
  /** 地图高度 */
  height?: number;
  /** 中心点缩放比例 */
  radius?: number;
  /** 清空地图 */
  clearData: boolean;
  /** 数据点 图像类型 */
  pointType?: pointTypeEnum;
  /** 当前点坐标 */
  currentPos?: { x?: number; y?: number };
  /** 地图点数据集合 */
  data?: Array<number>;
  /** 中心点缩放比例 */
  scale?: IMap;
  /** 当前点图标url */
  markerIcon?: string;
  /** 充电桩图标url */
  pileIcon?: string;
  /** 充电桩坐标 */
  pilePosition?: { x?: number; y?: number };
  /** 背景颜色 */
  backgroundColor?: string;
  /** 障碍点颜色 */
  barrierColor?: string;
  /** 清扫点颜色 */
  pointColor?: string;
  /** 描边颜色 */
  strokeColor?: string;
  /** 描边宽度 */
  strokeWidth?: number;
  /** 补点的阈值 */
  limitPointNum?: number;
  /** 最大放大倍数 */
  maxZoomScale?: number;
}

/**
 * 原生陀螺仪扫地机地图，Plain封装
 */
export default class RCTGyroMap extends Component<IProps> {
  static defaultProps = {
    width: viewWidth,
    height: viewHeight,
    // 不设置兜底图片，请务必传入对应的Uri地址
    // 数据格式为远程资源路径地址 eg: https://domain/images/xxx.png
    pileIcon: '',
    markerIcon: '',
    radius: 1,
    clearData: false,
    pointType: 'square',
    currentPos: {},
    data: [],
    scale: {},
    pilePosition: {},
    backgroundColor: 'transparent',
    barrierColor: '#FFFFFF',
    pointColor: '#D9F6B4',
    strokeColor: '#D9F6B4',
    strokeWidth: 1,
    limitPointNum: 3,
    maxZoomScale: 4,
  };

  render() {
    return <TYRCTPointMap {...this.props} />;
  }
}

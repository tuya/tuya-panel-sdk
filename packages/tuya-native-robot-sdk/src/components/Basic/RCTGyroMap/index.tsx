import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { requireNativeComponent, NativeModules } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const TYRCTPointMap = requireNativeComponent('TYRCTPointMap');
export const TYRCTGyroMapManager = NativeModules.TYRCTTransferManager;

const { RatioUtils: { viewHeight, viewWidth } } = Utils;

/**
 * 原生陀螺仪扫地机地图，Plain封装
 */
export default class RCTGyroMap extends Component {
  static propTypes = {
    /** 地图宽度 */
    width: PropTypes.number,
    /** 地图高度 */
    height: PropTypes.number,
    /** 中心点缩放比例 */
    radius: PropTypes.number,
    /** 清空地图 */
    clearData: PropTypes.bool,
    /** 数据点 图像类型 */
    pointType: PropTypes.oneOf(['square', 'circle']),
    /** 当前点坐标 */
    currentPos: PropTypes.object,
    /** 地图点数据集合 */
    data: PropTypes.array,
    /** 中心点缩放比例 */
    scale: PropTypes.object,
    /** 当前点图标url */
    markerIcon: PropTypes.string,
    /** 充电桩图标url */
    pileIcon: PropTypes.string,
    /** 充电桩坐标 */
    pilePosition: PropTypes.object,
    /** 背景颜色 */
    backgroundColor: PropTypes.string,
    /** 障碍点颜色 */
    barrierColor: PropTypes.string,
    /** 清扫点颜色 */
    pointColor: PropTypes.string,
    /** 描边颜色 */
    strokeColor: PropTypes.string,
    /** 描边宽度 */
    strokeWidth: PropTypes.number,
    /** 补点的阈值 */
    limitPointNum: PropTypes.number,
    /** 最大放大倍数 */
    maxZoomScale: PropTypes.number,
  };

  static defaultProps = {
    width: viewWidth,
    height: viewHeight,
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

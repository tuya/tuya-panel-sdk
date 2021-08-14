import React, { PureComponent } from 'react';
import { requireNativeComponent, NativeModules, View, StyleSheet, StyleProp } from 'react-native';

function toFixed16(v: string, length = 2) {
  let d = parseInt(v, 10).toString(16);
  if (d.length < length) {
    d = '0'.repeat(length - d.length) + d;
  } else {
    d = d.slice(0, length);
  }
  return d;
}

export function hexAlpha(hex: string, alpha = 1) {
  const alpha16 = toFixed16(Math.round(alpha * 255).toString());
  const color = hex.replace(/^#/, '');
  return `#${alpha16}${color}`;
}

const TYRCTLaserMap = requireNativeComponent('TYRCTLaserMap'); // 地图组件

export const TYLaserManager = NativeModules.TYRCTLaserManager;
export const { TYRCTTypeMapManager } = NativeModules; // 3.16激光地图区域框新接口(rnversion: 3.25)

export interface IRCTLaserMapProps {
  style?: StyleProp<View>;
  // height?: number /** float 地图高度 */;
  // width?: number /** float 地图宽度 */;
  mapData?: {
    origin: {
      x: number;
      y: number;
    };
    pilePosition: { x: number; y: number };
    data: string;
    width: number;
    height: number;
  } /** 地图数据 {"width":"", "height":"", "data":"", "origin":""} */;

  pathWidth?: number /** float 路径宽度 */;
  pathColor?: string /** 路径颜色 */;
  pathData?: string /** 路径数据 */;

  planPathWidth?: number /** 规划路径宽度 */;
  planPathColor?: string /** 规划路径颜色 */;
  planPathData?: string /** 规划路径数据 */;

  currentPos?: {
    x: number;
    y: number;
  } /** 当前点位置(即扫地机所在位置: 废弃) */;
  markerIcon?: string /** 扫地机的图片 (当前点的 marker) */;

  pilePosition?: {
    x?: number;
    y?: number;
    hidden?: boolean; // 开启/关闭预警圈
    radius?: number; // 预警圈半径大小 （可以用真实半径米数 / 比例尺)
    borderColor?: number; // 预警圈边框颜色（虚线颜色）
    bgColor?: number; // 预警圈颜色
  } /** 充电桩的坐标 */;
  pileIcon?: string /** 充电桩图标地址 */;

  appointIcon?: string /** 指哪扫哪 图标url */;
  sweepRegionColor?: string /** 区域颜色  */;
  virtualAreaColor?: string /** 禁区颜色 */;
  virtualWallColor?: string /** 虚拟墙颜色 */;

  appointData?: {
    x: number;
    y: number;
  }[] /** 指哪扫哪坐标点 */;
  sweepRegionData?: {
    x: number;
    y: number;
  }[][] /** 区域清扫的区域集合 */;
  virtualAreaData?: {
    x: number;
    y: number;
  }[][] /** 禁区的区域集合 */;

  virtualWallData?: {
    x: number;
    y: number;
  }[][] /** 虚拟墙的区域集合 */;

  areaInfoList?: string;

  edit?: boolean /** 编辑模式 */;

  minAreaWidth?: number /** 划区/禁区框最小边长 */;
  isRotate?: boolean /** 禁区框是否旋转 */;
  scale?: {
    scale: number;
    x: number;
    y: number;
  };
  minZoomScale?: number /** 地图最小放大倍数，默认 1.0 */;
  maxZoomScale?: number /** 地图最大放大倍数 */;

  factorInfo?: { factor?: number; font?: number; color?: string } /** 米数显示信息 */;
  hasTypeMap?: boolean /** 判断是否走新的绘图协议 */;
  splitColor?: string /** 地图分区的分割线颜色 */;

  onLaserMapPoints?: (data: any) => void /** 移动禁区框回调 */;
  onMapId?: (data: {
    mapId: string;
  }) => void /** native 创建一个地图组件实例之后回调 mapId 给到面板 */;
  onLongPressInAreaView?: (data: { id: string }) => void /** 禁区 / 划区框长按命名事件 */;
  onClickSplitArea?: (data: any) => void /** 点击分区的回调 * */;
  onClickRoom?: (data: any) => void /** 点击房间属性回调 * */;
}

interface IRCTLaserMapState {
  layoutWidth: number;
  layoutHeight: number;
}
/**
 * 原生激光扫地机地图，Plain封装
 */

export default class RCTLaserMap extends PureComponent<IRCTLaserMapProps, IRCTLaserMapState> {
  static defaultProps = {
    pathData: '',
    planPathData: '',
    currentPos: {},
    pilePosition: {},

    pathWidth: 0.8,
    pathColor: '#ffffff',
    planPathWidth: 0.8,
    planPathColor: '#FFD700',
    splitColor: '#ffffff',

    appointData: [],
    sweepRegionData: [],
    virtualAreaData: [],
    virtualWallData: [],

    sweepRegionColor: hexAlpha('#B0F523', 0.5),
    virtualAreaColor: hexAlpha('#F53D23', 0.5),
    virtualWallColor: hexAlpha('#F5A623'),

    // 不设置兜底图片，请务必传入对应的Uri地址
    // 数据格式为远程资源路径地址 eg: https://domain/images/xxx.png
    appointIcon: '',
    markerIcon: '',
    pileIcon: '',
    edit: false,

    minAreaWidth: 20,
    isRotate: false,
    scale: {
      scale: 1.0,
      x: undefined,
      y: undefined,
    },
    minZoomScale: 1.0,
    maxZoomScale: 4,

    factorInfo: {},
    hasTypeMap: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      layoutWidth: 0,
      layoutHeight: 0,
    };
  }

  // onEvent = (event: React.SyntheticEvent) => {
  //   cb && cb(event.nativeEvent);
  // };

  handleEvent = (cb?: (data: any) => void) => (event: React.SyntheticEvent) => {
    cb && cb(event.nativeEvent);
  };

  handleLayout = (e: any) => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({ layoutHeight: height, layoutWidth: width });
  };

  render() {
    const {
      onLaserMapPoints,
      onMapId,
      onLongPressInAreaView,
      onClickSplitArea,
      onClickRoom,
      ...props
    } = this.props;
    const { layoutHeight, layoutWidth } = this.state;
    const ready = !!(layoutHeight && layoutWidth);
    return (
      <View style={styles.root} onLayout={this.handleLayout}>
        {ready && (
          <TYRCTLaserMap
            {...props}
            width={layoutWidth}
            height={layoutHeight}
            onClickSplitArea={this.handleEvent(onClickSplitArea)}
            onLaserMapPoints={this.handleEvent(onLaserMapPoints)}
            onMapId={this.handleEvent(onMapId)}
            onLongPressInAreaView={this.handleEvent(onLongPressInAreaView)}
            onClickRoom={this.handleEvent(onClickRoom)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

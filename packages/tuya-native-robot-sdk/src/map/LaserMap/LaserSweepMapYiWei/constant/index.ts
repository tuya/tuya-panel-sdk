import Binary from '@leizl/binary';
import { Utils } from '@tuya-rn/tuya-native-components';
import _ from 'lodash';

import { scaleNumber } from '../../../../utils/PressCoordinateUtils';
import { createJsonError } from '../../../../utils/FunctionUtils';

const {
  StringUtils: { hexStringToNumber },
  NumberUtils: { highLowToInt },
  ColorUtils: { color: ColorUtils },
} = Utils;

const fileTypeMap = {
  map: 0,
  path: 1,
  increPath: 2,
  planPath: 3,
};

const bitmapTypeMap = {
  sweep: '00', // 清扫点
  barrier: '01', // 障碍点
  battery: '10', // 充电桩
  unknown: '11', // 未知区域
};

// 解析地图框数据的type
const areaTypeMap = {
  sweepRegion: '10',
  virtualWall: '11',
  appoint: '13',
  virtualArea: '14',
};

// 和native 交互用户地图状态
const nativeMapStatus = {
  normal: 0,
  pressToRun: 1,
  areaSet: 2,
  virtualArea: 3,
  virtualWall: 4,
};

export interface IPathPoint {
  x: number;
  y: number;
  skip?: number; // 0 | 1
}

export function shrinkValue(value: any) {
  return scaleNumber(1, value);
}

export { fileTypeMap, bitmapTypeMap, areaTypeMap, nativeMapStatus };

export interface IMapHeaderData {
  id: number;
  type: number;
  bgWidth: number;
  bgHeight: number;
  originX: number;
  originY: number;
  resolution?: number;
  pileX: number;
  pileY: number;
  compressAfterLength?: number;
}

export interface IPathHeaderData {
  id: number;
  type: number;
  totalCount: number;
  compressAfterLength?: number; // lz4 压缩后长度
}

export interface IMapConfig {
  bitmapColorMap: Object;
  isBlob: boolean;
  isLz4: boolean;
  mapHeaderLen: number;
  pathHeaderByteLen: number;
  formatPathPoint(p: IPathPoint): IPathPoint;
  formatMapHeader(header: string): IMapHeaderData;
  formatPathHeader(header: string): IPathHeaderData;
}

function hidePath(originPoint: IPathPoint) {
  const { x, y } = originPoint;
  const completeY = Binary.complement(y);
  const lastY = parseInt(completeY.slice(-1), 10);
  const visible = lastY;
  const realPoint = { x: shrinkValue(x), y: shrinkValue(y) };
  return {
    ...realPoint,
    skip: Number(!visible),
  };
}

// 一微V1地图 文件内容是char
export const defaultMapConfig = {
  isBlob: false,
  isLz4: false,
  isHidePath: false,
  mapHeaderLen: 32,
  pathHeaderByteLen: 12,
  formatPathPoint(originPoint: IPathPoint) {
    const { x, y } = originPoint;
    const realPoint = { x: shrinkValue(x), y: shrinkValue(y) };
    return realPoint;
  },
  formatMapHeader(data: string) {
    let [id, type, bgWidth, bgHeight, originX, originY, pileX, pileY] = _.chunk(
      hexStringToNumber(data),
      2
    ).map(([high, low]) => highLowToInt(high, low));
    [originX, originY, pileX, pileY] = [originX, originY, pileX, pileY].map(d => shrinkValue(d));
    return {
      id,
      type,
      bgWidth,
      bgHeight,
      originX,
      originY,
      pileX,
      pileY,
    };
  },
  formatPathHeader(data: string) {
    const headerLength = this.pathHeaderByteLen / 2;
    const dataArr = hexStringToNumber(data);
    const [id, type, totalCount] = _.chunk(dataArr.slice(0, headerLength), 2).map(([high, low]) =>
      highLowToInt(high, low)
    );
    return {
      id,
      type,
      totalCount,
    };
  },
};

const defaultLz4Config = {
  isBlob: true,
  isLz4: true,
  mapHeaderLen: 36,
  pathHeaderByteLen: 16,
  formatMapHeader(data: string) {
    let [
      id,
      _type,
      bgWidth,
      bgHeight,
      originX,
      originY,
      pileX,
      pileY,
      compressAfterLength,
    ] = _.chunk(hexStringToNumber(data), 2).map(([high, low]) => highLowToInt(high, low));
    [originX, originY, pileX, pileY] = [originX, originY, pileX, pileY].map(d => shrinkValue(d));
    const [roomEditableByte, type] = hexStringToNumber(data.slice(4, 8));
    return {
      id,
      roomEditable: !!roomEditableByte,
      type,
      bgWidth,
      bgHeight,
      originX,
      originY,
      pileX,
      pileY,
      compressAfterLength,
    };
  },
  formatPathHeader(data: string) {
    const headerLength = this.pathHeaderByteLen / 2;
    const dataArr = hexStringToNumber(data);
    const [id, type, totalCount, compressAfterLength] = _.chunk(
      dataArr.slice(0, headerLength),
      2
    ).map(([high, low]) => highLowToInt(high, low));
    return {
      id,
      type,
      totalCount,
      compressAfterLength,
    };
  },
};

// Tuya公版协议，Blob传输
export const mapConfigTuya = {
  isBlob: true,
  mapHeaderLen: 36, // 多了一位resolution
  formatPathPoint(originPoint: IPathPoint) {
    const { x, y } = originPoint;
    // 路径点按机器坐标系上报。
    const realPoint = { x: shrinkValue(x), y: -shrinkValue(y) };
    return realPoint;
  },
  formatMapHeader(data: string) {
    let [id, type, bgWidth, bgHeight, originX, originY, resolution, pileX, pileY] = _.chunk(
      hexStringToNumber(data),
      2
    ).map(([high, low]) => highLowToInt(high, low));
    [originX, originY, pileX, pileY] = [originX, originY, pileX, pileY].map(d => shrinkValue(d));
    return {
      id,
      type,
      bgWidth,
      bgHeight,
      originX,
      originY,
      pileX,
      pileY,
      resolution,
    };
  },
};

export const mapConfigTuya_Lz4 = {
  ...mapConfigTuya,
  isLz4: true,
  isBlob: true,
  mapHeaderLen: 40,
  pathHeaderByteLen:16,
  formatPathHeader(data: string) {
    const headerLength = this.pathHeaderByteLen / 2;
    const dataArr = hexStringToNumber(data);
    const [id, type, totalCount, compressAfterLength] = _.chunk(
      dataArr.slice(0, headerLength),
      2
    ).map(([high, low]) => highLowToInt(high, low));
    return {
      id,
      type,
      totalCount,
      compressAfterLength,
    };
  },
  formatMapHeader(data: string) {
    let [
      id,
      type,
      bgWidth,
      bgHeight,
      originX,
      originY,
      resolution,
      pileX,
      pileY,
      compressAfterLength,
    ] = _.chunk(hexStringToNumber(data), 2).map(([high, low]) => highLowToInt(high, low));
    [originX, originY, pileX, pileY] = [originX, originY, pileX, pileY].map(d => {
      if (_.isNaN(d)) {
        throw createJsonError('formatMapHeader NaN exception', data);
      }
      return shrinkValue(d);
    });
    return {
      id,
      type,
      bgWidth,
      bgHeight,
      originX,
      originY,
      pileX,
      pileY,
      resolution,
      compressAfterLength,
    };
  }
}

export const mapConfigHidePath = {};

// 一微V2地图，文件内容是bin,增加路径隐藏
export const mapConfigV2 = {
  isBlob: true,
  formatPathPoint: hidePath,
};

// 路径，地图传输采用blob文件，不是char文本
export const mapConfigBlob = {
  isBlob: true,
  formatPathPoint: hidePath,
};

export const mapConfigBlob_HidePath = {
  isBlob: true,
  formatPathPoint: hidePath,
};

export const mapConfigChar_HidePath = {
  formatPathPoint: hidePath,
};

export const mapConfigBlob_Lz4 = {
  ...defaultLz4Config,
};

export const mapConfigBlob_Lz4_HidePath = {
  ...mapConfigBlob_Lz4,
  formatPathPoint: hidePath,
};

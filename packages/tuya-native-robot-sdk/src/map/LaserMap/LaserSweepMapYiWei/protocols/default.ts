import { Utils } from '@tuya-rn/tuya-native-components';
import _ from 'lodash';
import Api from '../../../../api';
import { convertColorToArgbDEC } from '../../../../utils/PressCoordinateUtils';

import {
  bitmapTypeMap,
  IMapConfig,
  IPathPoint,
  IPathHeaderData,
  IMapHeaderData,
} from '../constant';


import { IPathFileData, IMapFileData } from '../observables';

const {
  ColorUtils: { color: ColorUtils },
} = Utils;


export const colorOriginMap = [
  '#F9424F',
  '#FDD02B',
  '#39D9B2',
  '#208CFF',
  '#FA7A80',
  '#A8E772',
  '#A288FF',
  '#3EE9F3',
];

export const colorHighlightMap = [
  '#FBA2A6',
  '#FDE079',
  '#5EF8D3',
  '#7DB9FF',
  '#FCC6A2',
  '#94FCA4',
  '#EEBAFB',
  '#3FBAF3',
];

export function createHouseColorMap(count: number, colors: string[]) {
  function getColor(step: number, color: string) {
    const [h, s, v] = ColorUtils.hex2hsv(color);
    return ColorUtils.hsv2hex(h, s, v - step);
  }
  const map = new Map();

  let step = 0; // 第几圈
  const counts = colors.length; // 一圈有多少数量

  for (let index = 0; index < count; index++) {
    let hex = getColor(step, colors[index % counts]);
    const id = index;
    map.set(id, hex);
    if (index % counts === 0) step += 1;
  }
  {
    map.set(60, '#D0D0D0');
    map.set(61, '#D0D0D1');
    map.set(62, '#D0D0D2');
    map.set(63, '#D0D0D3');
  }
  return map;
}


export interface PointsColor {
  [index: number]: string;
}

export interface IHistoryMapConfig {
  bucket: string;
  file: string;
  mapLength: number;
  pathLength: number;
}

export interface IUrlMapConfig {
  bucket: string;
  file: string;
}

export interface ParseMapFileUtilConfig extends IMapConfig {
  pointsColor: PointsColor[];
}

const defaultConfig = {
  pointsColor: [
    '#ABD6FFFF', // 清扫点(地图背景颜色)
    '#646464FF', //  障碍点(地图描边边框)、
    '#FFFFFF00', // 未知区域（看不见的点）
    '#7ED321FF', // 充电桩
  ],
};
const defaultOptions = {
  isBlob: false,
  isLz4: false,
  isHidePath: false,
  mapHeaderLen: 32,
  pathHeaderByteLen: 12,
};

export abstract class ParseMapFileUtil {
  isHidePath: boolean;
  isBlob: boolean;
  isLz4: boolean;
  pathHeaderByteLen: number;
  mapHeaderLen: number;
  pointsColor: PointsColor[];
  bitmapColorMap: any;
  houseColorMap: Map<any, any>;
  houseHighlightColorMap: Map<any, any>;

  constructor(config?: ParseMapFileUtilConfig) {
    const options = { ...defaultOptions, ...defaultConfig, config };
    const {
      //   isBlob,
      //   isLz4,
      //   isHidePath,
      //   pathHeaderByteLen,
      bitmapColorMap,
      pointsColor,
      //   mapHeaderLen,
    } = options;
    this.bitmapColorMap = bitmapColorMap;
    this.pointsColor = pointsColor;
    this.houseColorMap = createHouseColorMap(64, colorOriginMap);
    this.houseHighlightColorMap = createHouseColorMap(64, colorHighlightMap);
  }

  // @overload
  abstract formatPathPoint(originPoint: IPathPoint): IPathPoint;
  abstract formatMapHeader(data: string): IMapHeaderData;
  abstract formatPathHeader(data: string): IPathHeaderData;
  abstract parsePathFile(
    data: string,
    byteHeaderLength: number,
    isPlanPath?: boolean
  ): IPathFileData;
  abstract parseMapFile(data: string, headerLength: number): IMapFileData;

  getBitMapByType = _.memoize(
    (type: string, houseId?: number) => {
      let color;
      if (this.bitmapColorMap) {
        color = this.dealBitmapColorMap(type);
      } else {
        color = this.dealPointsColor(type, houseId);
      }
      return convertColorToArgbDEC(color);
    },
    function key(type: string, houseId: number) {
      return type + houseId;
    }
  );

  // 充电桩小于0时视为无效充电桩
  transformPileXY({ pileX, pileY }: any, { originX, originY }: any) {
    if (pileX <= 0 && pileY <= 0) return {};
    const finalX = pileX - originX;
    const finalY = pileY - originY;
    if (_.isNaN(finalX) || _.isNaN(finalY)) {
      debugger;
      return {};
    }
    return {
      x: finalX,
      y: finalY,
    };
  }

  dealPointsColor(type: string, houseId?: number, houseColorMap = this.houseColorMap) {
    const [sweep, barrier, unknown, battery] = this.pointsColor;
    if (houseId > -1 && type === bitmapTypeMap.sweep) {
      let houseColor = houseColorMap.get(houseId);
      if (houseColor) return houseColor;
    }

    const mapColor = {
      [bitmapTypeMap.sweep]: sweep,
      [bitmapTypeMap.barrier]: barrier,
      [bitmapTypeMap.battery]: battery,
      [bitmapTypeMap.unknown]: unknown,
    };
    return mapColor[type] || sweep;
  }

  dealBitmapColorMap(type: any) {}

  handleIncrePoints(points: Array<number[]>) {
    // console.warn('points', points);
    return points.map((point: number[]) => {
      const [x, y] = point;
      return this.formatPathPoint({ x, y });
    });
  }

  getContent = async (url: string) => {
    const fileType = this.isBlob ? 'blob' : 'text';
    const data = await Api.downloadFile(url, fileType);
    return data;
  };

  decodeMapFile = async (url: any) => {
    const content = await this.getContent(url);
    return this.parseMapFile(content);
  };

  decodePathFile = async (url: any, isPlanPath?: boolean) => {
    const content = await this.getContent(url);
    return this.parsePathFile(content, undefined, isPlanPath);
  };

  decodeHistoryFile = async ({ bucket, file, mapLength, pathLength }: IHistoryMapConfig) => {
    if (this.isBlob) {
      mapLength *= 2;
      pathLength *= 2;
    }
    const url = await Api.getCloudFileUrl(bucket, file);
    const data = await this.getContent(url);
    const mapData = data.slice(0, mapLength);
    const pathData = data.slice(mapLength, mapLength + pathLength);
    const mapState = this.parseMapFile(mapData);
    const pathState = this.parsePathFile(pathData);
    const nextState = { ...mapState, ...pathState };
    delete nextState.header;
    return nextState;
  };

  decodeFileMapData = async ({ bucket, file }: IUrlMapConfig) => {
    const url = await Api.getCloudFileUrl(bucket, file);
    const data = await this.getContent(url);
    const mapState = this.parseMapFile(data);
    return mapState;
  };
}

import { Utils } from '@tuya-rn/tuya-native-components';
import _ from 'lodash';

import Api from '../../../../api';
import { handleError, isNumber } from '../../../../utils/FunctionUtils';
import { dealPL, convertColorToArgbDEC } from '../../../../utils/PressCoordinateUtils';
import { hex2ahex } from '../../../../utils/Robot';
import lz4 from '../../../../utils/lz4';

import { bitmapTypeMap, IMapConfig, IPathPoint } from '../constant';

const {
  StringUtils: { hexStringToNumber },
  NumberUtils: { highLowToInt, numToHexString },
  ColorUtils: { color: ColorUtils },
} = Utils;

function createHouseColorMap(count: number) {
  const colorOriginMap = [
    '#F9424F',
    '#FDD02B',
    '#39D9B2',
    '#208CFF',
    '#FA7A80',
    '#A8E772',
    '#A288FF',
    '#3EE9F3',
    '#94FCA4',
    '#3EE9F3',
    '#A288FF',
    '#FCC6A2',
    '#A8E772',
    '#39DAFE',
    '#EEBAFB',
  ];

  function getColor(step: number, color: string) {
    const [h, s, v] = ColorUtils.hex2hsv(color);
    // const hue = index * 10 + step;
    // const s = 80 - step * 2;
    // const v = 90 - step * 2;
    return ColorUtils.hsv2hex(h, s, v - step);
  }
  const map = new Map();
  // const step = Math.round(360 / count);

  let step = 0; // 第几圈
  const counts = colorOriginMap.length; // 一圈有多少数量

  for (let index = 0; index < count; index++) {
    let hex = getColor(step, colorOriginMap[index % counts]);
    // const hue = step * index;
    const id = index;
    // const hex = ColorUtils.hsv2hex(hue, 50, 100);
    // const value = RobotUtils.hex2rgba(hex);
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

const houseColorMap = createHouseColorMap(64);

// console.warn('houseColorMap', houseColorMap);

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
export default class ParseMapFileUtil {
  constructor(config: ParseMapFileUtilConfig) {
    this.config = { ...defaultConfig, ...config };
  }

  config: ParseMapFileUtilConfig;
  pointsColor: PointsColor[];
  bitmapColorMap: {};

  getBitMapByType = _.memoize(
    (type: string, houseId?: number) => {
      let color;
      if (this.config.bitmapColorMap) {
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
  transformPileXY({ pileX, pileY }, { originX, originY }) {
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

  dealPointsColor(type: string, houseId?: number) {
    const [sweep, barrier, unknown, battery] = this.config.pointsColor;
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
      return this.config.formatPathPoint({ x, y });
    });
  }

  // dealPathPoint = (originPoint: IPathPoint) => {
  //   const { x, y } = originPoint;
  //   const completeY = Binary.complement(y);
  //   const lastY = parseInt(completeY.slice(-1), 10);
  //   const visible = lastY;
  //   const realPoint = { x: shrinkValue(x), y: shrinkValue(y) };
  //   // console.warn('visible', { lastY, skip:  Number(!visible)  })
  //   return {
  //     ...realPoint,
  //     skip: Number(!visible),
  //     // $ox: x,
  //     // $oy: y,
  //   };
  // };

  parsePathFile = (
    data: string,
    byteHeaderLength: number = this.config.pathHeaderByteLen,
    isPlanPath?: boolean
  ) => {
    if (isPlanPath) {
      // debugger;
    }
    const headerLength = byteHeaderLength / 2;
    const dataArr = hexStringToNumber(data);
    const { id, type, totalCount, compressAfterLength } = this.config.formatPathHeader(
      data.slice(0, byteHeaderLength)
    );
    if (_.isNaN(type)) {
      debugger;
      throw new Error('path type is NaN');
    }

    if (_.isEqual(NaN, id)) {
      handleError(new Error('parsePathFile exception id'));
      throw new Error('path id is NaN');
    }
    let pathDataArr;
    // debugger;
    // 压缩后长度为0，代表压缩失败，走原来逻辑
    if (this.config.isLz4 && compressAfterLength !== 0) {
      const maxBufferLength = totalCount / 4;
      const encodeDataArray = hexStringToNumber(data.slice(byteHeaderLength));
      const decodeDataArray = lz4.uncompress(encodeDataArray, maxBufferLength);
      pathDataArr = _.chunk(decodeDataArray, 4);
    } else {
      pathDataArr = _.chunk(dataArr.slice(headerLength), 4);
    }

    const pathData = pathDataArr.reduce<IPathPoint[]>((pre, cur) => {
      const [x, y] = _.chunk(cur, 2).map(([high, low]) => dealPL(highLowToInt(high, low)));
      // const originPoint = { x, y };
      // const realPoint = { x: shrinkValue(x), y: shrinkValue(y) };
      const realPoint = this.config.formatPathPoint({ x, y });
      if (isNumber(realPoint.x) && isNumber(realPoint.y)) {
        pre.push(realPoint);
      }
      return pre;
    }, []);

    return {
      pathData,
      id,
      type,
      totalCount: pathData.length,
      startCount: 0,
      currentCount: pathData.length,
      isFull: true,
      header: {
        id,
        type,
        totalCount,
        originData: dataArr.slice(0, headerLength),
      },
    };
  };

  // 使用文件data作为缓存key，是不是有内存溢出的风险，能否用 header作为key？？
  parseMapFile = (data: string, headerLength = this.config.mapHeaderLen) => {
    const {
      id,
      type,
      bgWidth,
      bgHeight,
      originX,
      originY,
      pileX,
      pileY,
      compressAfterLength,
    } = this.config.formatMapHeader(data.slice(0, headerLength));
    if (type > 255) {
      throw new Error(`mapData header typ: ${type} is not valid`);
    }
    const mapArea = bgWidth * bgHeight;
    let mapDataStr: string;
    if (this.config.isLz4) {
      let maxBufferLength = mapArea / 4 + 1;
      if (type === 5) {
        maxBufferLength = mapArea + 1;
      }
      let encodeDataArray;
      if (type === 5) {
        encodeDataArray = hexStringToNumber(
          data.slice(headerLength),
          headerLength + compressAfterLength * 2
        );
      } else {
        encodeDataArray = hexStringToNumber(data.slice(headerLength));
      }
      const decodeDataArray = lz4.uncompress(encodeDataArray, maxBufferLength);
      mapDataStr = _(decodeDataArray)
        .map(d => _.padStart(d.toString(16), 2, '0'))
        .value()
        .join('');
    } else {
      mapDataStr = data.slice(headerLength, headerLength + mapArea * 2);
    }

    const mapDataLen = mapDataStr.length;
    // const splitData = data.slice(headerLength + mapArea * 2, headerLength + mapArea * 2 + 4);
    // let [splitID, roomSum] = hexStringToNumber(splitData);
    // console.log('edit_rooms ====>', { splitID, roomSum }, splitData);
    let bitmapBytes: number[] = [];
    let idColorMap;
    if (type === 5) {
      idColorMap = {};
      const houseInfoCountMap = new Map();
      const houseInfoBitMap = new Map();
      // const step = Math.round(mapDataLen / 2 / 60);
      for (let index = 0; index < mapDataLen; index += 2) {
        const point_16 = mapDataStr.slice(index, index + 2);
        const point_2 = _.padStart(parseInt(point_16, 16).toString(2), 8, '0');
        const pointInfo = point_2.slice(6);
        const roomId = parseInt(point_2.slice(0, 6), 2);
        const bitmap = this.getBitMapByType(pointInfo, roomId);
        bitmapBytes.push(bitmap);
        if (pointInfo === '00') {
          houseInfoCountMap.set(
            roomId,
            houseInfoCountMap.get(roomId) ? houseInfoCountMap.get(roomId) + 1 : 1
          );
          houseInfoBitMap.set(roomId, bitmap);
          // bitmapBytes.push(bitmap);
          // {0: "#FF8080ff", 61: "#FFCC80ff", 62: "#E6FF80ff", 63: "#99FF80ff"}
        }
        idColorMap[roomId] = hex2ahex(houseColorMap.get(roomId));
      }
      console.log(
        'houseInfoCountMap',
        houseInfoCountMap,
        'houseInfoBitMap',
        houseInfoBitMap,
        'idColorMap',
        idColorMap
      );
      // debugger;
    } else {
      const dataArray = mapDataStr.split('');
      const isRepeat = dataArray.length * 4 === mapArea;
      // console.warn('inner-start');
      // let start = new Date();
      bitmapBytes = dataArray.reduce((pre: any[], cur: string) => {
        // debugger;
        const data = Utils.NumberUtils.toFixedString(parseInt(cur, 16).toString(2), 4);

        const [one, two] = data.match(/\w{2}/g).map((d: any) => this.getBitMapByType(d));
        const double = [one, two];
        const finalData = isRepeat ? double.concat(double) : double;
        pre.push(...finalData);
        return pre;
      }, []);
    }
    // debugger;
    if (bgWidth * bgHeight < bitmapBytes.length) {
      bitmapBytes.splice(bgWidth * bgHeight, bitmapBytes.length - bgWidth * bgHeight);
    }
    if (bgHeight && bgHeight * bgWidth !== bitmapBytes.length) {
      debugger;
      throw new Error(
        `bgHeight * bgWidth !== bitmapBytes.length ===>bgWidth=${bgWidth};bgHeight=${bgHeight}; length=${bitmapBytes.length}`
      );
    }

    const mapData = {
      width: bgWidth,
      height: bgHeight,
      data: JSON.stringify(bitmapBytes),
      origin: {
        x: originX,
        y: originY,
      },
      ...(idColorMap ? { roomIdColorMap: JSON.stringify(idColorMap) } : {}),
    };

    const nextState = {
      mapData,
      pilePosition: this.transformPileXY({ pileX, pileY }, { originX, originY }),
      header: {
        id,
        type,
        bgWidth,
        bgHeight,
        originX,
        originY,
        pileX,
        pileY,
        originData: data.slice(0, headerLength),
      },
      idColorMap,
    };
    return nextState;
  };

  getContent = async (url: string) => {
    const fileType = this.config.isBlob ? 'blob' : 'text';
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
    if (this.config.isBlob) {
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

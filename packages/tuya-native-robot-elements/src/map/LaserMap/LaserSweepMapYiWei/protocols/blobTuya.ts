import { Utils } from '@tuya-rn/tuya-native-components';
import _ from 'lodash';

import { handleError, createJsonError } from '../../../../utils/FunctionUtils';
import { dealPL } from '../../../../utils/PressCoordinateUtils';
import { hex2ahex } from '../../../../utils/Robot';
import lz4 from '../../../../utils/lz4';

import { tuyaHidePath } from './char';
import { defaultBlobFormatPathHeader } from './blob';
import { shrinkValue, IPathPoint } from '../constant';
import { ParseMapFileUtil } from './default';

const {
  StringUtils: { hexStringToNumber },
  NumberUtils: { highLowToInt },
} = Utils;

export class BlobLz4TuyaProtocol extends ParseMapFileUtil {
  isBlob = true;
  isLz4 = true;
  mapHeaderLen = 40;
  pathHeaderByteLen = 16;

  formatPathPoint = tuyaHidePath;

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

  formatPathHeader = defaultBlobFormatPathHeader;

  parsePathFile = (
    data: string,
    byteHeaderLength: number = this.pathHeaderByteLen,
    isPlanPath?: boolean
  ) => {
    if (isPlanPath) {
      // debugger;
    }
    const headerLength = byteHeaderLength / 2;
    const dataArr = hexStringToNumber(data);
    const { id, forceUpdate, type, totalCount, compressAfterLength } = this.formatPathHeader(
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
    if (this.isLz4 && compressAfterLength > 0) {
      const maxBufferLength = totalCount / 4;
      const encodeDataArray = hexStringToNumber(data.slice(byteHeaderLength));
      const decodeDataArray = lz4.uncompress(encodeDataArray, maxBufferLength);
      pathDataArr = _.chunk(decodeDataArray, 4);
    } else {
      pathDataArr = _.chunk(dataArr.slice(headerLength), 4);
    }

    const pathData = pathDataArr.reduce<IPathPoint[]>((pre, cur) => {
      const [x, y] = _.chunk(cur, 2).map(([high, low]) => dealPL(highLowToInt(high, low)));

      const realPoint = this.formatPathPoint({ x, y });

      pre.push(realPoint);
      return pre;
    }, []);

    return {
      pathData,
      id,
      forceUpdate,
      type,
      totalCount: pathData.length,
      startCount: 0,
      currentCount: pathData.length,
      isFull: true,
      header: {
        id,
        forceUpdate,
        type,
        totalCount,
        originData: dataArr.slice(0, headerLength),
      },
    };
  };

  parseMapFile = (data: string, headerLength = this.mapHeaderLen) => {
    const header = this.formatMapHeader(data.slice(0, headerLength));
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
    } = header;
    if (type > 255) {
      throw new Error(`mapData header typ: ${type} is not valid`);
    }
    const mapArea = bgWidth * bgHeight;
    let mapDataStr: string;
    if (this.isLz4 && compressAfterLength) {
      let encodeDataArray;
      let maxBufferLength = mapArea / 4 + 1;

      if (type === 5) {
        maxBufferLength = mapArea + 1;
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

    let bitmapBytes: number[] = [];
    let idColorMap: any;
    let roomInfo: any;
    if (type === 5) {
      idColorMap = {};
      roomInfo = {};
      const houseInfoCountMap = new Map();
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
          // houseInfoBitMap.set(roomId, bitmapColor);
        } else {
          // houseInfoBitMap.set(pointInfo, bitmapColor);
        }
        idColorMap[roomId] = hex2ahex(this.houseColorMap.get(roomId));
        roomInfo[roomId] = {
          normalColor: hex2ahex(this.houseColorMap.get(roomId)),
          highlightColor: hex2ahex(this.houseHighlightColorMap.get(roomId)),
        };
      }
    } else {
      const dataArray = mapDataStr.split('');
      const isRepeat = dataArray.length * 4 === mapArea;
      bitmapBytes = dataArray.reduce((pre: any[], cur: string) => {
        const data = Utils.NumberUtils.toFixedString(parseInt(cur, 16).toString(2), 4);

        const [one, two] = data.match(/\w{2}/g).map((d: any) => this.getBitMapByType(d));
        const double = [one, two];
        const finalData = isRepeat ? double.concat(double) : double;
        pre.push(...finalData);
        return pre;
      }, []);
    }
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
      ...(roomInfo ? { roomInfo: JSON.stringify(roomInfo) } : {}),
    };

    const nextState = {
      mapData,
      pilePosition: this.transformPileXY({ pileX, pileY }, { originX, originY }),
      header: {
        ...header,
        originData: data.slice(0, headerLength),
      },
    };
    return nextState;
  };
}

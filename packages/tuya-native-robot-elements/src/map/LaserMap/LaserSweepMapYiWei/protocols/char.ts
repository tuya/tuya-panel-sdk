import Binary from '@leizl/binary';
import { Utils } from '@tuya-rn/tuya-native-components';
import _ from 'lodash';

import { handleError } from '../../../../utils/FunctionUtils';
import { dealPL } from '../../../../utils/PressCoordinateUtils';

import { IPathPoint, IMapHeaderData, IPathHeaderData, shrinkValue } from '../constant';
import { ParseMapFileUtil } from './default';


const {
  StringUtils: { hexStringToNumber },
  NumberUtils: { highLowToInt },
} = Utils;

export class CharProtocol extends ParseMapFileUtil {
  isBlob = false;
  isLz4 = false;
  isHidePath = false;
  mapHeaderLen = 32;
  pathHeaderByteLen = 12;

  formatPathPoint(originPoint: IPathPoint): IPathPoint {
    const { x, y } = originPoint;
    const realPoint = { x: shrinkValue(x), y: shrinkValue(y) };
    return realPoint;
  }

  formatMapHeader(data: string): IMapHeaderData {
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
  }

  formatPathHeader(data: string): IPathHeaderData {
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
  }

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
    const { id, type, totalCount } = this.formatPathHeader(data.slice(0, byteHeaderLength));
    if (_.isNaN(type)) {
      debugger;
      throw new Error('path type is NaN');
    }

    if (_.isEqual(NaN, id)) {
      handleError(new Error('parsePathFile exception id'));
      throw new Error('path id is NaN');
    }
    let pathDataArr = _.chunk(dataArr.slice(headerLength), 4);

    const pathData: any = pathDataArr.reduce((pre, cur) => {
      const [x, y] = _.chunk(cur, 2).map(([high, low]) => dealPL(highLowToInt(high, low)));
      const realPoint = this.formatPathPoint({ x, y });
      pre.push(realPoint);
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

  parseMapFile = (data: string, headerLength = this.mapHeaderLen) => {
    const { id, type, bgWidth, bgHeight, originX, originY, pileX, pileY } = this.formatMapHeader(
      data.slice(0, headerLength)
    );
    if (type > 255) {
      throw new Error(`mapData header typ: ${type} is not valid`);
    }
    const mapArea = bgWidth * bgHeight;
    let mapDataStr = data.slice(headerLength, headerLength + mapArea * 2);

    let bitmapBytes: number[] = [];
    let idColorMap = {};

    const dataArray = mapDataStr.split('');
    const isRepeat = dataArray.length * 4 === mapArea;
    bitmapBytes = dataArray.reduce((pre: any[], cur: string) => {
      // debugger;
      const data = Utils.NumberUtils.toFixedString(parseInt(cur, 16).toString(2), 4);

      const [one, two] = data.match(/\w{2}/g).map((d: any) => this.getBitMapByType(d));
      const double = [one, two];
      const finalData = isRepeat ? double.concat(double) : double;
      pre.push(...finalData);
      return pre;
    }, []);

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
}

function createFormatPath({ reverseY, hidePath }: { reverseY?: boolean; hidePath?: boolean } = {}) {
  return (originPoint: IPathPoint) => {
    const { x, y } = originPoint;
    if (!_.isNumber(x) || !_.isNumber(y)) {
      throw new Error(`path point x or y is not number: x = ${x}, y = ${y}`);
    }
    let realPoint;
    if (reverseY) {
      realPoint = { x: shrinkValue(x), y: -shrinkValue(y) };
    } else {
      realPoint = { x: shrinkValue(x), y: shrinkValue(y) };
    }
    if (!hidePath) {
      return realPoint;
    }

    const completeY = Binary.complement(y);
    // const lastY = parseInt(completeY.slice(-1), 10);
    // const visible = lastY;
    const lastY = completeY.slice(-1);
    const visible = lastY === '1';

    // if (!visible) {
    //   debugger;
    // }
    // if(realPoint.x < 50) {
    //   return {
    //     ...realPoint,
    //     skip: 1,
    //   };
    // }
    return {
      ...realPoint,
      skip: Number(!visible),
    };
  };
}

export const hidePath = createFormatPath({ hidePath: true });

export const tuyaHidePath = createFormatPath({ reverseY: true, hidePath: true });

export const defaultFormatPathPoint = createFormatPath();

export class CharHidePathProtocol extends CharProtocol {
  formatPathPoint = hidePath;
}

import Binary from '@leizl/binary';
import { Utils } from '@tuya-rn/tuya-native-components';
import _ from 'lodash';

import { IPathPoint, IMapHeaderData, IPathHeaderData, shrinkValue } from '../constant';

const {
  StringUtils: { hexStringToNumber },
  NumberUtils: { highLowToInt },
  ColorUtils: { color: ColorUtils },
} = Utils;

export interface IProtocolOptions {
  bitmapColorMap?: Object;
  isBlob?: boolean;
  isLz4?: boolean;
  mapHeaderLen?: number;
  pathHeaderByteLen?: number;
}

const defaultOptions = {
  isBlob: false,
  isLz4: false,
  isHidePath: false,
  mapHeaderLen: 32,
  pathHeaderByteLen: 12,
};

export abstract class LaserProtocol {
  isHidePath: boolean;
  isBlob: boolean;
  isLz4: boolean;
  pathHeaderByteLen: number;

  //   static instance: LaserProtocol;

  constructor(opts: IProtocolOptions) {
    const options = { ...defaultOptions, opts };
    const { isBlob, isLz4, isHidePath, pathHeaderByteLen } = options;
    this.isBlob = isBlob;
    this.isLz4 = isLz4;
    this.isHidePath = isHidePath;
    this.pathHeaderByteLen = pathHeaderByteLen;
  }

  formatPathPoint(originPoint: IPathPoint) {
    const { x, y } = originPoint;
    const realPoint = { x: shrinkValue(x), y: shrinkValue(y) };
    return realPoint;
  }

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
  }

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
  }
}

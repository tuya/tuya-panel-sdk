/** 乐动路径解析、组包协议 */

import { Utils } from '@tuya-rn/tuya-native-components';
import Binary from '@leizl/binary';
import _isUndefined from 'lodash/isUndefined';
import _isString from 'lodash/isString';
import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash/isArray';
import _isNil from 'lodash/isNil';

import { toJsonSafe } from '../../../utils/StringsUtils';
import { transformXYByResolution, getRCTLineStructure } from '../../../utils/PressCoordinateUtils';
import dpValueFunc from '../../../map/LaserMap/LaserSweepMapLeDong/constant/dpValueFunc';
import logger from '../../../utils/LoggerUtils';

export interface IOriginPathData {
  pathID: number;
  posArray: number[][];
  hasPathInfo: number;
  startPos: number;
  totalPoints: number;
  pointCounts: number;
}

export interface IParsePathData {
  pathId: number;
  pathData: { x: number; y: number; type: string }[] | [];
  hasPathInfo: number;
  startCount: number;
  totalCount: number;
  pointCounts: number;
}

const pathTypeAlias = new Map([
  ['default', 'common'], // 没有含义的路径
  ['00', 'common'], //正常清扫弓字轨迹
  ['01', 'charge'], // 回充轨迹
  ['02', 'control'], // 遥控轨迹
  ['03', 'userTransitions'], // 用户定义区域的转场路径
  ['10', 'transitions'], // 清扫转场轨迹
]);

function checkPoint(pre, cur) {
  if (pre && cur) {
    // if ((pre[0] - cur[0]) ** 2 + (pre[1] - cur[1]) ** 2 > 4500) console.warn(pre, cur);

    if ((pre[0] - cur[0]) ** 2 + (pre[1] - cur[1]) ** 2 > 250000) {
      // throw new Error(`checkPoint 路径跳点异常: pre = ${pre}, cur=${cur}`)
    }
  }
}

function parsePath(
  posArray: number[][],
  hasPathInfo = 0,
  resolution = 0.05
): { x: number; y: number; type: string }[] | [] {
  if (!_isArray(posArray)) return [];
  const pathData = [];

  posArray.forEach((value: [number, number], index) => {
    const [x, y] = value;
    const point = transformXYByResolution(x, y, resolution);
    checkPoint(posArray[index - 1], value);
    if (Number.isNaN(point.x) || Number.isNaN(point.y) || _isNil(point.x) || _isNil(point.y)) {
      debugger;
      logger.info(`路径数据不合法, pathData: ${point}, 位置： ${index}`);
    } else {
      // if (hasPathInfo === 1) {
      // 如果有含义
      const [typeX, typeY] = value.map(d => {
        const complement = Binary.complement(d);
        const lastByte = parseInt(complement.slice(-2), 2);
        return parseInt(`${lastByte % 4}`, 10);
      });
      pathData.push({
        ...point,
        hasPathInfo: true,
        skip: 0,
        type: pathTypeAlias.get(`${typeX}${typeY}`) || pathTypeAlias.get('00'),
      });
      // }
      // else {
      //   return {
      //     ...point,
      //     hasPathInfo: false,
      //     skip: 0,
      //     type: pathTypeAlias.get('default'),
      //   };
      // }
    }
  });
  // ];
  return pathData;
}

function decode(
  data: string | IOriginPathData,
  opts: {
    mapPathId?: number; // map中的pathId
    resolution: number;
  } = {
    resolution: 0.05,
  }
): IParsePathData | Object {
  let originData;
  if (_isString(data)) {
    const originMapData: { data: IOriginPathData } = toJsonSafe(data);
    if (_isString(originMapData)) return {};

    originData = originMapData.data;
  } else {
    originData = data;
  }

  const { hasPathInfo = 0, posArray, pathID, startPos, totalPoints, pointCounts } = originData;

  if (!_isUndefined(opts.mapPathId) && opts.mapPathId !== pathID)
    return {
      pathData: [],
      hasPathInfo: false,
      pathId: 0,
      totalCount: 0,
      startCount: 0,
      pointCounts: 0,
    };

  const pathData = parsePath(posArray, hasPathInfo, opts.resolution);

  return {
    pathData,
    hasPathInfo,
    pathId: pathID,
    totalCount: totalPoints,
    startCount: startPos,
    pointCounts: pointCounts,
  };
}

function decodeToOrigin(data: string, opts: {}): IParsePathData | Object {
  const originMapData: { data: IOriginPathData } = toJsonSafe(data);
  if (_isString(originMapData)) return {};

  const { data: originData } = originMapData;
  return originData;
}

function encodeRequest(
  opts: { startCount: number; userId: string } = { startCount: 0, userId: '0' }
) {
  const data = {
    infoType: 21011,
    data: { startPos: opts.startCount, mask: 0 },
    extend: { taskid: `${new Date().getTime()}`, usid: opts.userId },
  };
  return data;
}

function decodeWithScanOrigin(
  prePath: IOriginPathData,
  curPath: IOriginPathData,
  start: number = 0,
  mapPathId?: number
) {
  // 累加路径
  // console.warn(curPath.pathID === prePath.pathID, curPath.startPos === start, curPath.startPos < curPath.totalPoints, prePath.pointCounts + curPath.pointCounts > curPath.totalPoints);
  // console.warn(prePath, curPath, start, mapPathId);
  // if (start >= 20000) debugger
  if (!curPath.posArray) {
    // 没有路径
    return prePath;
  }
  const isStart = curPath.startPos === 0;
  if (curPath.pointCounts !== curPath.posArray.length) {
    // 当前路径长度不合法
    logger.error('当前路径长度不合法'); // TODO: 后续加上提示
    return prePath;
  }

  if (isStart && curPath.pathID === mapPathId) {
    // 新的全量数据
    return curPath;
  }

  if (curPath.pathID !== mapPathId && curPath.pathID > prePath.pathID) {
    // 如果不匹配，直接清空数据
    //// 如果不匹配，返回前一个
    logger.info('curPath.pathID !== mapPathId', curPath.pathID, mapPathId);
    return {
      posArray: [],
      hasPathInfo: false,
      pathID: 0,
      totalPoints: 0,
      startPos: 0,
      pointCounts: 0,
    };
    // return prePath;
  }

  // if (_isEmpty(prePath)){
  //   // 如果累加结果是空的
  //   return curPath;
  // }

  // if (curPath.pathID > prePath.pathID) {
  //   return curPath;
  // }

  if (
    curPath.pathID === prePath.pathID &&
    curPath.startPos === start && // 上报的数据起点与下发起点一致
    // curPath.startPos < curPath.totalPoints // 当请求路径起始点小于总路径点表示合法
    prePath.pointCounts + curPath.pointCounts <= curPath.totalPoints // 如果累加数据和最新上报的总点数小，表示合法
  ) {
    return {
      posArray: [...prePath.posArray, ...curPath.posArray],
      hasPathInfo: curPath.hasPathInfo || false,
      pathID: curPath.pathID,
      totalPoints: curPath.totalPoints,
      startPos: curPath.startPos,
      pointCounts: prePath.pointCounts + curPath.pointCounts,
    };
  }

  return prePath;
}

function decodeIsPathStartEqual(data: string, start: number) {
  const originMapData: { data: IOriginPathData } = toJsonSafe(data);
  if (_isString(originMapData)) return false;

  const { data: originData } = originMapData;
  if (originData.startPos === start) return true;
  return false;
}

function filterRequestWithRobotStatus(pathData: IParsePathData, robotStatus: string) {
  // logger.info('robotStatus', robotStatus, pathData);

  if (
    dpValueFunc.robotStatusFault(robotStatus) ||
    dpValueFunc.robotStatusFullCharge(robotStatus) ||
    dpValueFunc.robotStatusIdle(robotStatus) ||
    dpValueFunc.robotStatusPause(robotStatus) ||
    dpValueFunc.robotStatusCharing(robotStatus) ||
    dpValueFunc.robotStatusDormant(robotStatus)
  ) {
    if (!pathData.pathId) return true;
    if (pathData.pointCounts >= pathData.totalCount) return false;
    return true;
  }
  return true;
}

export default {
  decode,
  decodeToOrigin,
  encodeRequest,
  filterRequestWithRobotStatus,
  decodeWithScanOrigin,
  decodeIsPathStartEqual,
  parsePath,
};

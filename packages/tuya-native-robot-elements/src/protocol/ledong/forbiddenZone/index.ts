import { TYSdk } from '@tuya-rn/tuya-native-components';

import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';

import { toJsonSafe } from '../../../utils/StringsUtils';
import { transformXYByResolution, getRCTAreaStructure } from '../../../utils/PressCoordinateUtils';
import nativeMap from '../../../map/LaserMap/LaserSweepMapLeDong/constant/nativeMap';
import { ILaserMapArea } from '../../../api/laserUIApi';
import CustomError from '../../../utils/CustomError';

import { operators } from 'rxjs';
/**
 * 禁区框组包
 * @param {*} param0
 */

enum ForbidTypeEnum {
  all = 'all',
  sweep = 'sweep',
  mop = 'mop',
}

interface IPoint {
  x: number;
  y: number;
}

interface IOriginRegion {
  vertexs: [[number, number], [number, number], [number, number], [number, number]];
  id: number;
  active: string;
  tag: string;
  forbidType: ForbidTypeEnum;
  isWall?: boolean;
}

interface IOriginCommRegion {
  message: string;
  infoType: number;
  userId: string;
  dInfo: {
    userId: string;
    ts: string;
  };
  data: {
    mapId: number;
    value: IOriginRegion[];
  };
}

interface ILaserMapAreaForbidden extends ILaserMapArea {
  extend: {
    forbidType: ForbidTypeEnum;
  };
}

interface IForbiddenZoneConfig {
  height: number;
  minPos: IPoint;
  mapId: number;
  resolution: number;
  originRegion: IOriginRegion[]; // 原始框数据（清扫框）
  // curPointData: [IPoint, IPoint, IPoint, IPoint][]; // 当前框数据（禁区框）
  // curPointData: {
  //   id: string;
  //   text: string;
  //   points: [IPoint, IPoint, IPoint, IPoint];
  // }[];
  curPointData: ILaserMapAreaForbidden[];
}

const active = 'forbid';
const infoType = 21004;

const parsePoint = (
  point: IPoint,
  {
    minX,
    minY,
    height,
    resolution,
  }: { minX: number; minY: number; height: number; resolution: number }
) => {
  const { x: px, y: py } = point;

  const x = Math.ceil((px * resolution + minX) / 0.001);
  const y = Math.ceil(((height - py) * resolution + minY) / 0.001);
  return { x, y };
};

function encodeForbiddenZoneCmdOld(options: IForbiddenZoneConfig) {
  const {
    height,
    minPos: { x: minX, y: minY },
    mapId,
    resolution,
    originRegion,
    curPointData,
  } = options;

  const userId = '0';
  const time = new Date().getTime();

  const vertexsValue = curPointData.map((points, index) => {
    const curPoint = points.map(point => {
      const { x, y } = parsePoint(point, { minX, minY, height, resolution });
      return [x, y];
    });
    const active = 'forbid';
    const id = index * 2 + 1; // 奇数标记禁区
    return {
      vertexs: curPoint,
      id,
      active,
      tag: 'room',
    };
  });

  originRegion.length && vertexsValue.push(...originRegion);

  const commomCmds = [
    {
      data: {
        sn: TYSdk.devInfo.devId,
        value: vertexsValue,
        userId,
        mapId,
      },
      infoType: 21003,
      connectionType: '1',
      dInfo: {
        userId,
        ts: `${time}`,
      },
    },
    {
      connectionType: 0,
      dInfo: {
        ts: `${time}`,
        userId,
      },
      data: {
        sn: TYSdk.devInfo.devId,
        mapId,
        cleanId: [-2],
        extraAreas: [],
        userId,
      },
      infoType: 21023,
    },
  ];

  const commonData = {
    dInfo: {
      ts: `${time}`,
      userId,
    },
    data: {
      sn: TYSdk.devInfo.devId,
      userId,
      cmds: commomCmds,
    },
    infoType: 30000,
  };
  return commonData;
}

function encodeForbiddenZoneVertexsValue(options: IForbiddenZoneConfig) {
  const {
    height,
    minPos: { x: minX, y: minY },
    resolution,
    curPointData,
  } = options;

  const vertexsValue = curPointData.map((area, index) => {
    const { id, content = { text: '' }, points, extend = { forbidType: 'all' } } = area;
    if (!_isArray(points)) throw Error('points不是数组类型');
    const curPoint = points.map(point => {
      const { x, y } = parsePoint(point, { minX, minY, height, resolution });
      return [x, y];
    });
    return {
      vertexs: curPoint,
      id: Number(id),
      active,
      tag: encodeURIComponent(`${content.text || ''}`),
      forbidType: extend.forbidType,
    };
  });

  return vertexsValue;
}

function encodeForbiddenZoneCmd(options: IForbiddenZoneConfig) {
  const {
    height,
    minPos: { x: minX, y: minY },
    mapId,
    resolution,
    originRegion,
    curPointData,
  } = options;

  const userId = '0';
  const time = new Date().getTime();

  const vertexsValue = encodeForbiddenZoneVertexsValue({
    height,
    minPos: { x: minX, y: minY },
    mapId,
    resolution,
    originRegion,
    curPointData,
  });

  // TODO: 需要加上其他区域数据
  originRegion.length && vertexsValue.push(...originRegion);

  const commomCmds = [
    {
      data: {
        sn: TYSdk.devInfo.devId,
        value: vertexsValue,
        userId,
        mapId,
      },
      infoType: 21003,
      connectionType: '1',
      dInfo: {
        userId,
        ts: `${time}`,
      },
    },
    {
      connectionType: 0,
      dInfo: {
        ts: `${time}`,
        userId,
      },
      data: {
        sn: TYSdk.devInfo.devId,
        mapId,
        cleanId: [-2],
        extraAreas: [],
        userId,
      },
      infoType: 21023,
    },
  ];

  const commonData = {
    dInfo: {
      ts: `${time}`,
      userId,
    },
    data: {
      sn: TYSdk.devInfo.devId,
      userId,
      cmds: commomCmds,
    },
    infoType: 30000,
  };
  return commonData;
}

function isForbidType(area: IOriginRegion, curForbidType: ForbidTypeEnum) {
  const isForbid = area.active === active;
  const isWall = !!area.isWall;
  // forbidType不存在，且协议不含forbidType的都被当作禁扫区域
  const noForbidType =
    !area.forbidType && [ForbidTypeEnum.all, ForbidTypeEnum.sweep].includes(curForbidType);

  // // forbidType存在，forbidType为all，opts.forbidType为all、sweep
  // const hasForbidTypeAndAll =
  //   area.forbidType &&
  //   (area.forbidType === ForbidTypeEnum.all &&
  //     [ForbidTypeEnum.all, ForbidTypeEnum.sweep].includes(curForbidType));

  // forbidType存在,forbidType相等
  const hasForbidTypeAndEqual = area.forbidType && area.forbidType === curForbidType;
  return isForbid && !isWall && (noForbidType || hasForbidTypeAndEqual);
}

/** 分类原始数据 */
function partition(area: IOriginRegion[], opt: { forbidType: ForbidTypeEnum }) {
  if (!_isArray(area)) return null;
  const data: IOriginRegion[] = [];
  area.forEach(a => {
    if (isForbidType(a, opt.forbidType)) {
      data.push(a);
    }
  });
  return data;
}

/** 旧的解析 */
function decode(area: IOriginRegion[], opt: { resolution: number }) {
  const CleanZoneData: [[IPoint, IPoint, IPoint, IPoint]] | [] = [];
  area.forEach(a => {
    if (a.active === active) {
      const single: [IPoint, IPoint, IPoint, IPoint] | [] = [];
      a.vertexs &&
        a.vertexs.forEach((value: [number, number]) => {
          const [a_x, a_y] = value;
          const zone = transformXYByResolution(a_x, a_y, opt.resolution);
          single.push(zone);
        });

      CleanZoneData.push(single);
    }
  });
  return CleanZoneData;
}

/** 解析为APP使用的绘图2.0数据结构 */
function decodeToRCTArea(
  area: IOriginRegion[],
  opt: {
    resolution: number;
    bgColor?: string;
    borderColor?: string;
    textColor?: string;
    textSize?: number;
    viewType?: string;
    forbidType: ForbidTypeEnum;
    showName?: boolean;
    canEditName?: boolean;
  } = { resolution: 0.05, forbidType: ForbidTypeEnum.sweep, showName: true, canEditName: true }
) {
  const ZoneData = [];
  if (!opt.resolution) return null;
  if (!area.length) return [];
  const { bgColor, borderColor, textColor, textSize, viewType, forbidType } = opt;

  area.forEach(a => {
    if (isForbidType(a, opt.forbidType)) {
      try {
        const { id, tag } = a;
        const single: [IPoint, IPoint, IPoint, IPoint] | [] = [];

        a.vertexs &&
          a.vertexs.forEach((value: [number, number]) => {
            const [a_x, a_y] = value;
            const zone = transformXYByResolution(a_x, a_y, opt.resolution);
            single.push(zone);
          });

        ZoneData.push(
          getRCTAreaStructure({
            id: `${id}`,
            bgColor,
            borderColor,
            text: opt.showName ? decodeURIComponent(`${tag}`) : '',
            textColor,
            textSize,
            type: nativeMap.nativeMapStatus.virtualArea,
            viewType,
            points: single,
            canRename: opt.canEditName,
            extend: {
              forbidType: opt.forbidType,
            },
          })
        );
      } catch (error) {
        new CustomError(error, 'system');
      }
    }
  });
  // if (!ZoneData.length) return null;
  return ZoneData;
}

/** 从commdp数据解析 */
function decodeCommToRCTArea(
  comm: string,
  opt: {
    resolution: number;
    bgColor?: string;
    borderColor?: string;
    textColor?: number;
    textSize?: number;
    viewType?: string;
    forbidType?: ForbidTypeEnum;
    showName?: boolean;
    canEditName?: boolean;
  }
) {
  const commJson: IOriginCommRegion = toJsonSafe(comm);
  if (_isString(commJson)) return null;
  if (commJson.infoType && commJson.infoType !== infoType) return null;
  if (commJson.data && commJson.data.value) return decodeToRCTArea(commJson.data.value, opt);
  return null;
}

/** 从Commdp数据中分类 */
function partitionFromComm(
  comm: string,
  opt: {
    forbidType: ForbidTypeEnum;
  }
) {
  const commJson: IOriginCommRegion = toJsonSafe(comm);
  if (_isString(commJson)) return null;
  if (commJson.infoType && commJson.infoType !== infoType) return null;
  if (commJson.data && commJson.data.value) return partition(commJson.data.value, opt);
}

export default {
  ForbidTypeEnum,
  encode: encodeForbiddenZoneCmd,
  encodeForbiddenZoneCmdOld,
  encodeForbiddenZoneVertexsValue,
  decode,
  decodeToRCTArea,
  decodeCommToRCTArea,
  partition,
  partitionFromComm,
};

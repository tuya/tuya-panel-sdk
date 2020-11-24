import { TYSdk } from '@tuya-rn/tuya-native-components';
import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';

import { toJsonSafe } from '../../../utils/StringsUtils';
import { transformXYByResolution, getRCTAreaStructure } from '../../../utils/PressCoordinateUtils';
import nativeMap from '../../../map/LaserMap/LaserSweepMapLeDong/constant/nativeMap';
import { ILaserMapArea } from '../../../api/laserUIApi';
import CustomError from '../../../utils/CustomError';

/**
 * 禁区框组包
 * @param {*} param0
 */

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

interface IPoint {
  x: number;
  y: number;
}

interface IOriginRegion {
  vertexs: [[number, number], [number, number], [number, number], [number, number]];
  id: number;
  active: string;
  tag: string;
  mode: string;
}

interface ICleanZoneConfig {
  height: number;
  minPos: IPoint;
  mapId: number;
  resolution: number;
  originRegion: IOriginRegion[]; // 原始框数据（禁区框）
  // curPointData: [IPoint, IPoint, IPoint, IPoint][]; // 当前框数据（清扫框）
  cleanTimes: number; // 清扫次数
  start: boolean; // 是否开始扫
  curPointData: ILaserMapArea[]; // 当前框数据（清扫框）
}

const mode = 'area';
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

function encodeCleanZoneCmdOld(options: ICleanZoneConfig) {
  const {
    height,
    minPos: { x: minX, y: minY },
    mapId,
    resolution,
    originRegion,
    curPointData,
    cleanTimes = 1,
    start = true,
  } = options;

  const cleanCmdMap = new Map([
    [1, 'normal'],
    [2, 'depth'],
  ]);

  const userId = '0';
  const time = new Date().getTime();

  const vertexsValue = curPointData.map((points, index) => {
    const curPoint = points.map(point => {
      const { x, y } = parsePoint(point, { minX, minY, height, resolution });
      return [x, y];
    });
    const active = cleanCmdMap.get(cleanTimes);
    const id = index * 2; // 偶数标记区域清扫
    return {
      vertexs: curPoint,
      id,
      active,
      tag: 'room',
      mode: 'area',
    };
  });

  originRegion.length && vertexsValue.push(...originRegion);
  // 去清扫指令
  const toCleanCmd = {
    connectionType: 0,
    dInfo: {
      ts: `${time}`,
      userId,
    },
    data: {
      sn: TYSdk.devInfo.devId,
      mode: 'reAppointClean',
      userId,
    },
    infoType: 21005,
  };

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
    start && toCleanCmd,
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

function encodeCleanZoneVertexsValue(options: ICleanZoneConfig) {
  const {
    height,
    minPos: { x: minX, y: minY },
    resolution,
    curPointData,
    cleanTimes = 1,
  } = options;

  const cleanCmdMap = new Map([
    [1, 'normal'],
    [2, 'depth'],
  ]);

  const vertexsValue = curPointData.map((area, index) => {
    const { id, content = { text: '' }, points } = area;
    if (!_isArray(points)) throw Error('points不是数组类型');

    const curPoint = points.map(point => {
      const { x, y } = parsePoint(point, { minX, minY, height, resolution });
      return [x, y];
    });
    const active = cleanCmdMap.get(cleanTimes);
    // const id = index * 2; // 偶数标记区域清扫
    return {
      vertexs: curPoint,
      id: Number(id),
      active,
      tag: encodeURIComponent(`${content.text || ''}`),
      mode,
    };
  });
  return vertexsValue;
}

function encodeCleanZoneCmd(options: ICleanZoneConfig) {
  const {
    height,
    minPos: { x: minX, y: minY },
    mapId,
    resolution,
    originRegion,
    curPointData,
    cleanTimes = 1,
    start = true,
  } = options;

  const userId = '0';
  const time = new Date().getTime();

  const vertexsValue = encodeCleanZoneVertexsValue({
    height,
    minPos: { x: minX, y: minY },
    mapId,
    resolution,
    originRegion,
    curPointData,
    cleanTimes,
    start,
  });

  originRegion.length && vertexsValue.push(...originRegion);
  // 去清扫指令
  const toCleanCmd = {
    connectionType: 0,
    dInfo: {
      ts: `${time}`,
      userId,
    },
    data: {
      sn: TYSdk.devInfo.devId,
      mode: 'reAppointClean',
      userId,
    },
    infoType: 21005,
  };

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
    start && toCleanCmd,
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

/** 分类原始数据 */
function partition(area: IOriginRegion[]) {
  if (!_isArray(area)) return null;
  const data: IOriginRegion[] = [];
  area.forEach(a => {
    if (a.mode === mode) {
      data.push(a);
    }
  });
  return data;
}

function decode(area: IOriginRegion[], opt: { resolution: number }) {
  const CleanZoneData: [IPoint?] = [];
  area.forEach(a => {
    if (a.mode === mode) {
      const [a_x, a_y] = a.vertexs[0];
      const zone = transformXYByResolution(a_x, a_y, opt.resolution);
      CleanZoneData.push(zone);
    }
  });
  return CleanZoneData;
}

function decodeToRCTArea(
  area: IOriginRegion[],
  opt: {
    resolution: number;
    bgColor?: string;
    borderColor?: string;
    textColor?: string;
    textSize?: number;
    viewType?: string;
    showName?: boolean;
    canEditName?: boolean;
  } = { resolution: 0.05, showName: true, canEditName: true }
) {
  const CleanZoneData = [];
  if (!opt.resolution) return null;
  if (!area.length) return [];
  area.forEach(a => {
    try {
      if (a.mode === mode) {
        const { id, tag } = a;
        const single: [IPoint, IPoint, IPoint, IPoint] | [] = [];
        const { bgColor, borderColor, textColor, textSize, viewType } = opt;
        a.vertexs &&
          a.vertexs.forEach((value: [number, number]) => {
            const [a_x, a_y] = value;
            const zone = transformXYByResolution(a_x, a_y, opt.resolution);
            single.push(zone);
          });

        CleanZoneData.push(
          getRCTAreaStructure({
            id: `${id}`,
            bgColor,
            borderColor,
            text: opt.showName ? decodeURIComponent(`${tag}`) : '',
            textColor,
            textSize,
            type: nativeMap.nativeMapStatus.areaSet,
            viewType,
            points: single,
            canRename: opt.canEditName,
          })
        );
      }
    } catch (error) {
      new CustomError(error, 'system');
    }
  });
  // if (!CleanZoneData.length) return null;
  return CleanZoneData;
}

function decodeCommToRCTArea(
  comm: string,
  opt: {
    resolution: number;
    bgColor?: string;
    borderColor?: string;
    textColor?: number;
    textSize?: number;
    viewType?: string;
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
function partitionFromComm(comm: string) {
  const commJson: IOriginCommRegion = toJsonSafe(comm);
  if (_isString(commJson)) return null;
  if (commJson.infoType && commJson.infoType !== infoType) return null;
  if (commJson.data && commJson.data.value) return partition(commJson.data.value);
}

export default {
  encode: encodeCleanZoneCmd,
  encodeCleanZoneCmdOld,
  encodeCleanZoneVertexsValue,
  decode,
  decodeToRCTArea,
  decodeCommToRCTArea,
  partition,
  partitionFromComm,
};

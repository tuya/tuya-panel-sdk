import _isString from 'lodash/isString';
import { TYSdk } from '@tuya-rn/tuya-native-components';

import { DECToHex, toJsonSafe } from '../../../utils/StringsUtils';

/** 地图分区协议组包 */

enum OperateEnum {
  reset = 'reset',
  merge = 'merge',
  split = 'split',
}

export interface IMapPartitionCmd {
  dInfo: {
    ts: string;
    userId: string;
  };
  data: {
    autoAreaId?: number;
    mapId?: number;
    operate: OperateEnum;
    extra?: {
      reset?: any;
      merge?: { pixel1: number; pixel2: number };
      split?: { pixel: number; p1: [number, number]; p2: [number, number] };
    };
  };
  infoType: 21030;
}

export interface IMapPartitionOpt {
  autoAreaId?: number;
  mapId?: number;
  operate: OperateEnum;
  mergeIds: [number, number];
  splitId: number;
  splitPoints: { point1: { x: number; y: number }; point2: { x: number; y: number } };
  minX: number;
  minY: number;
  height: number;
  resolution: number;
}

export interface IRoomProp {
  id: number;
  tag: string;
  name: string;
  fan: number;
  water: number;
  order: number;
}

export interface IPutMapPartitionInfoOpt {
  mapId: number;
  rooms: IRoomProp[];
  originAreaValue: any[];
}

export interface IMapPartitionCleanOpt {
  mapId: number;
  pixelIds: number[];
}

export interface IOriginRegion {
  vertexs: [[number, number], [number, number], [number, number], [number, number]];
  id: number;
  mode: string;
  tag: string;
  name: string; // 命名用
  waterPump: number;
  fanLevel: number;
  cleanOrder: number;
}

export interface IOriginCommRegion {
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
    autoAreaValue: IOriginRegion[];
  };
}

const infoType = 21030;

const parsePoint = (
  point: { x: number; y: number },
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

function encodeSetMapPartition(opts: IMapPartitionOpt): IMapPartitionCmd {
  const { autoAreaId, mapId, operate, mergeIds, splitId, splitPoints } = opts;

  const userId = '0';
  const time = new Date().getTime();

  const data = {
    autoAreaId,
    mapId,
    operate,
  };
  let datas: any;
  if (operate === OperateEnum.merge) {
    const [mergeId1, mergeId2] = mergeIds;
    datas = {
      ...data,
      extra: {
        pixel1: mergeId1,
        pixel2: mergeId2,
      },
    };
  }
  if (operate === OperateEnum.split) {
    const { point1, point2 } = splitPoints;
    const { minX, minY, height, resolution } = opts;
    const [splitP1, splitP2] = [point1, point2].map(point => {
      const { x, y } = point;
      const { x: px, y: py } = parsePoint({ x, y }, { minX, minY, height, resolution });
      return [px, py];
    });

    datas = {
      ...data,
      extra: {
        pixel: splitId,
        p1: splitP1,
        p2: splitP2,
      },
    };
  }
  if (operate === OperateEnum.reset) {
    datas = {
      ...data,
    };
  }

  return {
    dInfo: {
      ts: `${time}`,
      userId,
    },
    data: datas || data,
    infoType,
  };
}

function putMapPartitionClean(opts: IMapPartitionCleanOpt) {
  const { mapId, pixelIds } = opts;

  const userId = '0';
  const time = new Date().getTime();
  const cmds = {
    cmds: [
      {
        data: {
          mapId,
          cleanId: [-3],
          extraAreas: [],
          segmentId: pixelIds,
        },
        infoType: 21023,
      },
      {
        data: {
          mode: 'reAppointClean',
        },
        infoType: 21005,
      },
    ],
    mainCmds: [21005],
  };
  return {
    dInfo: {
      ts: `${time}`,
      userId,
    },
    data: cmds,
    infoType: 30000,
  };
}

function putMapPartitionInfo(opts: IPutMapPartitionInfoOpt) {
  const { mapId, rooms, originAreaValue } = opts;
  console.warn('mapId, rooms, originAreaValue', mapId, rooms, originAreaValue);

  const userId = '0';
  const sn = TYSdk.devInfo.devId;
  const time = new Date().getTime();

  const autoAreaValue = rooms.map(value => {
    const { id, tag, fan, water, order, name } = value;
    const rez = {
      active: 'normal',
      cleanType: 'sweepOnly',
      id,
      mode: 'autolayer',
      name: encodeURIComponent(name || ''),
      tag,
      // tag: encodeURIComponent(tag),
      vertexs: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
    };
    fan !== undefined && (rez.fanLevel = String(fan)); // 协议为string
    water !== undefined && (rez.waterPump = Number(water)); // 协议为int类型
    order !== undefined && (rez.cleanOrder = Number(order)); // 协议为int类型

    return rez;
  });

  const commomCmds = [
    {
      data: {
        sn,
        value: originAreaValue,
        autoAreaValue,
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
        sn,
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
      sn,
      userId,
      cmds: commomCmds,
    },
    infoType: 30000,
  };
  return commonData;
}

/** 解析21004中分区数据的 */
function decodeSaveData(area: IOriginRegion[]) {
  const ZoneData = new Map();
  const mode = 'autolayer';
  if (!area.length) return ZoneData;

  area.forEach(a => {
    if (a.mode === mode) {
      // 如果有tag，也存一份，方便反查
      const room = {
        id: a.id,
        tag: a.tag,
        name: decodeURIComponent(a.name || ''),
        water: a.waterPump && `${a.waterPump}`,
        order: a.cleanOrder && Number(a.cleanOrder),
        fan: a.fanLevel && `${a.fanLevel}`,
      };
      ZoneData.set(`${a.id}`, room);

      !!a.tag && ZoneData.set(`${a.tag}`, room);
    }
  });
  return ZoneData;
}

/** 从commdp数据解析 */
function decodeSaveDataFromComm(comm: string, opts = {}) {
  const commJson: IOriginCommRegion = toJsonSafe(comm);
  const infoType = 21004;
  if (_isString(commJson)) return null;
  if (commJson.infoType && commJson.infoType !== infoType) return null;
  if (commJson.data && commJson.data.autoAreaValue)
    return decodeSaveData(commJson.data.autoAreaValue);
  return null;
}

export default {
  OperateEnum,
  encode: encodeSetMapPartition,
  putMapPartitionClean,
  putMapPartitionInfo,
  decodeSaveData,
  decodeSaveDataFromComm,
};

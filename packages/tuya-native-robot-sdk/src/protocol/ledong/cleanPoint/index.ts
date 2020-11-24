import { TYSdk } from '@tuya-rn/tuya-native-components';

import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';
import _round from 'lodash/round';

import { toJsonSafe } from '../../../utils/StringsUtils';
import { transformXYByResolution, getRCTPointStructure } from '../../../utils/PressCoordinateUtils';
import nativeMap from '../../../map/LaserMap/LaserSweepMapLeDong/constant/nativeMap';
import { ILaserMapArea } from '../../../api/laserUIApi';
import complexCmd from '../../../protocol/ledong/complexCmd';

/**
 * 指拿扫哪组包
 * @param {*} param0
 */

interface IPoint {
  x: number;
  y: number;
}

interface IOriginCommRegion {
  infoType: number;
  dInfo: {
    userId: string;
    ts: string;
  };
  data: {
    sn: number;
    mapId: number;
    cleanId: [number];
    extraAreas: [IOriginRegion];
  };
}

interface IOriginRegion {
  vertexs: [[number, number], [number, number], [number, number], [number, number]];
  id: number;
  active: string;
  tag: string;
  mode: string;
}

interface ICleanPointConfig {
  height: number;
  minPos: IPoint;
  mapId: number;
  resolution: number;
  // curPointData: IPoint[]; // 当前框数据（指哪扫拿）
  curPointData: ILaserMapArea[] | IPoint[]; // 当前框数据
}

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

const mode = 'point';
const infoType = 21023;

function encodeCleanPointCmdOld(options: ICleanPointConfig) {
  const {
    height,
    minPos: { x: minX, y: minY }, // 最小x、y的点
    mapId,
    resolution,
    curPointData,
  } = options;

  const [point] = curPointData;

  const x = _round((point.x * resolution + minX) / 0.001);
  const y = _round(((height - point.y) * resolution + minY) / 0.001);
  const time = new Date().getTime();
  const userId = '0';

  const commonDataArr = [
    [x - 750, y - 750],
    [x + 750, y - 750],
    [x + 750, y + 750],
    [x - 750, y + 750],
  ];

  const commonData = {
    dInfo: {
      ts: `${time}`,
      userId,
    },
    data: {
      sn: TYSdk.devInfo.devId,
      userId: 0,
      cmds: [
        {
          connectionType: 0,
          dInfo: {
            ts: `${time}`,
            userId,
          },
          data: {
            sn: TYSdk.devInfo.devId,
            mapId: `${mapId}`,
            cleanId: [-3],
            extraAreas: [
              {
                name: 'aa',
                id: 100,
                tag: encodeURIComponent('room'),
                vertexs: commonDataArr,
                active: 'depth',
                // mode: 'point',
                mode,
              },
            ],
            userId,
          },
          infoType: 21023,
        },
        {
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
        },
      ],
    },
    infoType: 30000,
  };

  return commonData;
}

function encodeCleanPointCmd(options: ICleanPointConfig) {
  const {
    height,
    minPos: { x: minX, y: minY }, // 最小x、y的点
    mapId,
    resolution,
    curPointData,
  } = options;

  const [singlePoint] = curPointData;
  const { id, points } = singlePoint;

  if (_isArray(points)) throw Error('points是数组');
  const x = _round((points.x * resolution + minX) / 0.001);
  const y = _round(((height - points.y) * resolution + minY) / 0.001);
  const time = new Date().getTime();
  const userId = '0';

  const commonDataArr = [
    [x - 750, y - 750],
    [x + 750, y - 750],
    [x + 750, y + 750],
    [x - 750, y + 750],
  ];

  const commonData = {
    dInfo: {
      ts: `${time}`,
      userId,
    },
    data: {
      sn: TYSdk.devInfo.devId,
      userId: 0,
      cmds: [
        {
          connectionType: 0,
          dInfo: {
            ts: `${time}`,
            userId,
          },
          data: {
            sn: TYSdk.devInfo.devId,
            mapId: `${mapId}`,
            cleanId: [-3],
            extraAreas: [
              {
                name: 'aa',
                id: 100,
                tag: encodeURIComponent('room'),
                vertexs: commonDataArr,
                active: 'depth',
                // mode: 'point',
                mode,
              },
            ],
            userId,
          },
          infoType: 21023,
        },
        {
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
        },
      ],
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
  return data[0] || {};
}

function decodeCleanPointCmd(area: [IOriginRegion], opt: { resolution: number }) {
  const appointData: [IPoint?] = [];
  area.forEach(a => {
    if (a.mode === mode) {
      const [a_x, a_y] = a.vertexs[0];
      const appoint = transformXYByResolution(a_x + 750, a_y + 750, opt.resolution);
      appointData.push(appoint);
    }
  });
  return appointData;
}

function decodeToRCTArea(
  area: IOriginRegion[],
  opt: {
    resolution: number;
    bgColor?: string;
    borderColor?: string;
    textColor?: number;
    textSize?: number;
    viewType?: string;
  } = { resolution: 0.05 }
) {
  if (!opt.resolution) return null;
  if (!area.length) return {};
  for (let a of area) {
    if (a.mode === mode) {
      const { id, tag, vertexs } = a;

      const [a_x, a_y] = vertexs[0];
      const appoint = transformXYByResolution(a_x + 750, a_y + 750, opt.resolution);

      const test = getRCTPointStructure({
        id: `${id}`,
        type: nativeMap.nativeMapStatus.pressToRun,
        points: { x: appoint.x, y: appoint.y },
      });

      return test;
    }
  }
  return null;
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
  }
) {
  const commJson: IOriginCommRegion = toJsonSafe(comm);
  if (_isString(commJson)) return null;
  const { data } = decodeComPlex(commJson) || {};
  if (data && data.extraAreas) return decodeToRCTArea(data.extraAreas, opt);
  return null;
}

/** 从Commdp数据中分类 */
function partitionFromComm(comm: string) {
  const commJson: IOriginCommRegion = toJsonSafe(comm);
  if (_isString(commJson)) return null;
  const { data } = decodeComPlex(commJson) || {};
  if (data && data.extraAreas) return partition(data.extraAreas);
}

function decodeComPlex(data: IOriginCommRegion) {
  const cmds = complexCmd.decodeToCmd(data);
  if (_isArray(cmds)) {
    for (let cmd of cmds) {
      if (cmd.infoType && cmd.infoType === infoType) return cmd;
    }
  } else {
    if (cmds.infoType && cmds.infoType === infoType) return cmds;
  }
  return null;
}

export default {
  encode: encodeCleanPointCmd,
  encodeCleanPointCmdOld,
  decode: decodeCleanPointCmd,
  decodeToRCTArea,
  decodeCommToRCTArea,
  partition,
  partitionFromComm,
};

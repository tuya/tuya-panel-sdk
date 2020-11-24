import { Utils } from '@tuya-rn/tuya-native-components';
import _isEmpty from 'lodash/isEmpty';
import _isString from 'lodash/isString';
import _chunk from 'lodash/chunk';
import _keys from 'lodash/keys';
import _findKey from 'lodash/findKey';
import _random from 'lodash/random';
import _floor from 'lodash/floor';
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';

import { transformXYByResolution, getRCTAreaStructure } from '../../../utils/PressCoordinateUtils';

import cleanPoint from '../../../protocol/ledong/cleanPoint';
import cleanZone from '../../../protocol/ledong/cleanZone';
import forbiddenZone from '../../../protocol/ledong/forbiddenZone';
import Api from '../../../api';
import _ from 'lodash';

interface IOriginRegion {
  vertexs: [[number, number], [number, number], [number, number], [number, number]];
  id: number;
  active: string;
  tag: string;
}

interface IOriginMapData {
  mapId: number; // 当前地图id号
  autoAreaId: number; // 自动分区id，-1 表示没有自动分区
  pathId: number;
  width: number;
  height: number;
  resolution: number; // 比例尺
  x_min: number; // 地图左下标对应的x世界坐标
  y_min: number; // 地图左下标对应的x世界坐标
  lz4_len: number; // 地图压缩长度
  area: IOriginRegion[]; // 区域信息
  map: string; // 地图数据
  base64_len: number; // 地图数据长度
  chargeHandleState: string; // 充电桩信息
  chargeHandlePos: [number, number]; //  充电桩位置
  chargeHandlePhi: number; // 充电桩朝向
  AllowForbidArea: 0 | 1; // 是否允许设置区域
  // 历史地图数据
  posArray: [number, number][]; // 历史地图路径路径点
}

interface IParseMap {
  mapData: Object;
  pilePosition: Object;
  pathId: number | undefined;
  mapId: number | undefined;
  width: number;
  height: number;
  resolution: number;
  x_min: number;
  y_min: number;
  appointData: Object;
  origin_x: number;
  origin_y: number;
}

export interface IMapColor {
  sweep: string;
  barrier: string;
  unknown: string;
  battery: string;
}

export enum mapTypeMap {
  barrier = 0, // 障碍点
  sweep = 255, // 清扫点
  // battery = 2; // 充电桩
  unknown = 127, // 未知区域
  // 0 - 255 的
  // 其他数值： 自动分区的ID值
}

function decodeMemorizeKey(data: string) {
  return data;
}
const decode = async function(
  data: string,
  opts: {
    isTopLeft: boolean;
  } = {
    isTopLeft: false,
  }
): Promise<IParseMap> {
  // const { areaColor, pile } = opts;
  const result = {
    mapData: [],
    pilePosition: {},
    pathId: undefined,
    mapId: undefined,
    autoAreaId: -1,
    width: 0,
    height: 0,
    resolution: 0,
    x_min: 0,
    y_min: 0,
    appointData: [],
  };

  const originMapData: { data: IOriginMapData } = Utils.JsonUtils.parseJSON(
    data.replace(/(\{.*\}).*/, '$1')
  );
  // logger.info('originMapData', originMapData);
  if (_isString(originMapData)) return result;

  const { data: originData } = originMapData;

  const {
    pathId,
    mapId,
    autoAreaId,
    width,
    height,
    resolution,
    x_min,
    y_min,
    map,
    area,
    chargeHandlePos = [],
    AllowForbidArea = 1,
    posArray,
  } = originData;
  const mapProportion = width * height; // 地图面积

  const ox = _floor(-(x_min / resolution), 2); // 原点x
  const oy = _floor(height + y_min / resolution, 2); // 原点y

  const [pos_x, pos_y] = chargeHandlePos;
  const pilePosition = pos_x && pos_y ? transformXYByResolution(pos_x, pos_y, resolution) : {}; // 充电桩ß

  let text;
  {
    const startTime = new Date();

    const bytes = Base64.toByteArray(map);

    const lz4Data = lz4.uncompress(bytes, mapProportion + 1);
    text = _(lz4Data)
      .map(d => _.padStart(d.toString(16), 2, '0'))
      .value()
      .join('');
    const endTime = new Date();

    console.log('coastTime rnlz4', endTime - startTime);
  }
  const dataMap = text;
  // {
  //   const startTime = new Date();
  //   const dataMap: undefined | any = await Api.laserDecompressLZ4(map, mapProportion);

  //   const isEqual = text === dataMap;
  //   const endTime = new Date();

  //   console.log('coastTime applz4', endTime - startTime);
  //   console.log('isEqual', isEqual);
  // }

  // debugger;

  if (!dataMap) return result;

  const dataArr = Utils.StringUtils.hexStringToNumber(dataMap);
  if (mapProportion < dataArr.length) {
    dataArr.splice(mapProportion, dataArr.length - mapProportion);
  }

  // let bitmapBytesColors: number[] = [];
  const mapIds = new Map(); // 记录地图有哪些id
  const bitmapBytes: number[] = [];

  CoastTime(() => {
    if (opts.isTopLeft) {
      dataArr.forEach((d: number, index: number) => {
        const id = `${d}`;
        if (!mapIds.has(id)) {
          mapIds.set(id, 0);
        } else {
          const count = mapIds.get(id);
          mapIds.set(id, count + 1);
        }
        bitmapBytes.push(d);
      });
    } else {
      const newDataArr = _chunk(dataArr, width);
      for (let i = newDataArr.length - 1; i >= 0; i--) {
        newDataArr[i].forEach((d: number) => {
          const id = `${d}`;
          if (!mapIds.has(id)) {
            mapIds.set(id, 0);
          } else {
            const count = mapIds.get(id);
            mapIds.set(id, count + 1);
          }
          bitmapBytes.push(d);
        });
      }
    }
  }, '第一次循环地图耗时')()
  

  // const isAreaEmpty = area && !area.length;

  const robotOriginAppointData = cleanPoint.partition(area);
  const robotOriginSweepRegionData = cleanZone.partition(area);
  const robotOriginVirtualAreaData = forbiddenZone.partition(area, {
    forbidType: forbiddenZone.ForbidTypeEnum.sweep,
  });

  const robotOriginVirtualMopAreaData = forbiddenZone.partition(area, {
    forbidType: forbiddenZone.ForbidTypeEnum.mop,
  });

  const nextState = {
    bitmapBytes, // 地图原始数据
    bitmapBytesIds: mapIds, //
    isBitMapEmpty: bitmapBytes.length <= 3,
    hasMapRoom: autoAreaId && autoAreaId !== -1 && autoAreaId !== 0,
    pilePosition,
    mapPathId: pathId,
    mapId,
    autoAreaId,
    width,
    height,
    resolution: _floor(resolution, 2),
    x_min,
    y_min,
    origin_x: ox,
    origin_y: oy,
    AllowForbidArea: !!AllowForbidArea,
    posArray,
    robotOriginAreaData: area,
    robotOriginAppointData,
    robotOriginSweepRegionData,
    robotOriginVirtualAreaData,
    robotOriginVirtualMopAreaData,
  };

  return _omitBy(nextState, _isNil);
}

export default {
  decode,
};

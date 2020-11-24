import { TYSdk, Utils } from '@tuya-rn/tuya-native-components';
import _ from 'lodash';

import { areaTypeMap, nativeMapStatus } from './constant';
import { transformXY } from '../../../utils/PressCoordinateUtils';

const {
  NumberUtils: { numToHexString, highLowToInt },
  StringUtils: { hexStringToNumber },
} = Utils;

const parseDataOfType = (type, dataArr, mapScale) => {
  const data = [];
  if (type === areaTypeMap.appoint) {
    _.chunk(dataArr, 4).forEach(d => {
      const x = transformXY(mapScale, d[0], d[1]);
      const y = -transformXY(mapScale, d[2], d[3]);
      data.push({ x, y });
    });
  } else if (type === areaTypeMap.virtualWall) {
    _.chunk(dataArr, 8).forEach(d => {
      const itemData = [];
      _.chunk(d, 4).forEach(k => {
        const x = transformXY(mapScale, k[0], k[1]);
        const y = -transformXY(mapScale, k[2], k[3]);
        itemData.push({ x, y });
      });
      data.push(itemData);
    });
  } else {
    _.chunk(dataArr, 16).forEach(d => {
      const itemData = [];
      _.chunk(d, 4).forEach(k => {
        const x = transformXY(mapScale, k[0], k[1]);
        const y = -transformXY(mapScale, k[2], k[3]);
        itemData.push({ x, y });
      });
      data.push(itemData);
    });
  }
  return data;
};

/**
 * 拼接框数据下发
 *
 * @param {*} mapStatus
 * @param {*} data
 * @param {*} origin
 * @param {number} [mapScale=1]
 * @returns
 */
function encodeAreaData(mapStatus, data, origin, mapScale = 1) {
  //eslint-disable-line
  const header = 'aa';
  let setData = '';
  let checkNum = 0;
  const { length } = data;
  switch (mapStatus) {
    case nativeMapStatus.areaSet:
      setData = `${areaTypeMap.sweepRegion}${numToHexString(length)}`;
      checkNum = 16 + length;
      break;
    case nativeMapStatus.virtualWall:
      setData = `${areaTypeMap.virtualWall}${numToHexString(length)}`;
      checkNum = 17 + length;
      break;
    case nativeMapStatus.pressToRun:
      setData = `${areaTypeMap.appoint}${numToHexString(length)}`;
      checkNum = 19 + length;
      break;
    case nativeMapStatus.virtualArea:
      setData = `${areaTypeMap.virtualArea}${numToHexString(length)}`;
      checkNum = 20 + length;
      break;
    default:
      break;
  }
  const [ox, oy] = [origin.x, origin.y].map(d => d * 10 ** mapScale);

  if (mapStatus === nativeMapStatus.pressToRun) {
    data.forEach(d => {
      const hexX = numToHexString((65535 + dealScale(d.x, mapScale) - ox) % 65535, 4); // 处理负数坐标
      const hexY = numToHexString((65535 + oy - dealScale(d.y, mapScale)) % 65535, 4);
      setData = `${setData}${hexX}${hexY}`;
      checkNum = checkNum + addHex(hexX) + addHex(hexY);
    });
  } else {
    data.forEach(d => {
      d.forEach(k => {
        const hexX = numToHexString((65535 + dealScale(k.x, mapScale) - ox) % 65535, 4); // 处理负数坐标
        const hexY = numToHexString((65535 + oy - dealScale(k.y, mapScale)) % 65535, 4);
        setData = `${setData}${hexX}${hexY}`;
        checkNum = checkNum + addHex(hexX) + addHex(hexY);
      });
    });
  }
  const setLength = numToHexString(setData.length / 2);
  checkNum = numToHexString(checkNum % 256);
  // 头部 + 类型和数据的总字节数 + 类型 + 坐标数据个数 + 坐标数据 + 校验值
  const commonData = `${header}${setLength}${setData}${checkNum}`;
  return commonData;
}

function decodeAreaDataOld(value, mapScale = 1) {
  const dataArr = hexStringToNumber(value);
  const appointLen = dataArr[1];
  const hexDataAppoint = dataArr.splice(0, appointLen + 3);
  const sweepRegionLen = dataArr[1];
  const hexDataSweepRegion = dataArr.splice(0, sweepRegionLen + 3);
  const vrAreaLen = dataArr[1];
  const hexDataVrArea = dataArr.splice(0, vrAreaLen + 3);
  const vrWallLen = dataArr[1];
  const hexDataVrWall = dataArr.splice(0, vrWallLen + 3);

  const appointData = parseDataOfType(
    areaTypeMap.appoint,
    hexDataAppoint.splice(4, appointLen - 2),
    mapScale
  );
  const sweepRegionData = parseDataOfType(
    areaTypeMap.sweepRegion,
    hexDataSweepRegion.splice(4, sweepRegionLen - 2),
    mapScale
  );
  const virtualAreaData = parseDataOfType(
    areaTypeMap.virtualArea,
    hexDataVrArea.splice(4, vrAreaLen - 2),
    mapScale
  );
  const virtualWallData = parseDataOfType(
    areaTypeMap.virtualWall,
    hexDataVrWall.splice(4, vrWallLen - 2),
    mapScale
  );
  const data = {
    appointData: appointData || [],
    sweepRegionData: sweepRegionData || [],
    virtualAreaData: virtualAreaData || [],
    virtualWallData: virtualWallData || [],
  };
  return data;
}

function toFixed(d) {
  return parseInt(d, 16);
}

export interface IAreaData {
  appointData?: any[];
  sweepRegionData?: any[];
  virtualAreaData?: any[];
  virtualWallData?: any[];
}

/**
 * 拆解指令码
 * @param {string} str 指令码
 * @returns {object} 具有含义的指令码键值对
 */
function splitCommonData(str: string): IAreaData {
  const commonArr = str.match(/\w{2}/g);
  if (!commonArr) return {};

  const dataSource = commonArr.map(d => parseInt(d, 16));
  const { length: dataLength } = dataSource;
  let header, length, cmd, data, check, one, endIdx, startIdx;
  const datas = {};
  const nameToCmdMap = {
    appointData: toFixed('23'),
    sweepRegionData: toFixed('20'),
    virtualAreaData: toFixed('24'),
    virtualWallData: toFixed('21'),
  };

  const cmdToNameMap: { [x: string]: any } = Object.entries(nameToCmdMap).reduce(
    (pre, [name, cmd]) => Object.assign(pre, { [cmd]: name }),
    {}
  );

  for (let index = 0; index < dataLength; index++) {
    const cur = dataSource[index];
    if (index === 0 && cur !== toFixed('aa')) return {};

    if (cur === toFixed('aa')) {
      header = cur;
      startIdx = index;
      length = dataSource[index + 1];
      cmd = dataSource[index + 2];
      endIdx = startIdx + length + 2;
      index = endIdx;
      const name = cmdToNameMap[cmd];
      if (name) {
        datas[name] = dataSource.slice(startIdx, endIdx + 1);
      }
    }
  }
  return datas;
}

// 地图控制相关数据解析
export function decodeAreaData(str: string, mapScale: number = 1): IAreaData {
  const {
    appointData: hexDataAppoint,
    sweepRegionData: hexDataSweepRegion,
    virtualAreaData: hexDataVrArea,
    virtualWallData: hexDataVrWall,
  } = splitCommonData(str);
  const result = {};
  if (hexDataAppoint) {
    const appointData = parseDataOfType(
      areaTypeMap.appoint,
      hexDataAppoint.splice(4, hexDataAppoint.length - 5),
      mapScale
    );
    Object.assign(result, { appointData });
  }
  if (hexDataSweepRegion) {
    const sweepRegionData = parseDataOfType(
      areaTypeMap.sweepRegion,
      hexDataSweepRegion.splice(4, hexDataSweepRegion.length - 5),
      mapScale
    );
    Object.assign(result, { sweepRegionData });
  }
  if (hexDataVrArea) {
    const virtualAreaData = parseDataOfType(
      areaTypeMap.virtualArea,
      hexDataVrArea.splice(4, hexDataVrArea.length - 5),
      mapScale
    );
    Object.assign(result, { virtualAreaData });
  }
  if (hexDataVrWall) {
    const virtualWallData = parseDataOfType(
      areaTypeMap.virtualWall,
      hexDataVrWall.splice(4, hexDataVrWall.length - 5),
      mapScale
    );
    Object.assign(result, { virtualWallData });
  }
  return result;
}

export { encodeAreaData };

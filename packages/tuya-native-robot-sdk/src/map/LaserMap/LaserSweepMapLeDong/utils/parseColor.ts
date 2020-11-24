import { Utils } from '@tuya-rn/tuya-native-components';
import _findKey from 'lodash/findKey';
import _padStart from 'lodash/padStart';
import _toLower from 'lodash/toLower';


import { mapTypeMap, IMapColor, mapTypeMapHex } from '../../../../protocol/ledong/map';
import {
  convertColorToArgbDEC,
  convertColorToArgbHex,
  convertColorToRgbaHex,
} from '../../../../utils/PressCoordinateUtils';
import { DECToHex } from '../../../../utils/StringsUtils';

const {
  StringUtils: { hexStringToNumber },
  NumberUtils: { highLowToInt },
  ColorUtils: { color: ColorUtils },
} = Utils;

const MAX_ID_NUM = 255;

const colorOriginMap = [
  '#F9424F',
  '#FDD02B',
  '#39D9B2',
  '#208CFF',
  '#FA7A80',
  '#A8E772',
  '#A288FF',
  '#3EE9F3',
];

const colorLightHightMap = [
  '#FBA2A6',
  '#FDE079',
  '#5EF8D3',
  '#7DB9FF',
  '#FCC6A2',
  '#94FCA4',
  '#EEBAFB',
  '#3FBAF3',
];

const grayColorMap = ['#A0A0A0', '#B4B4B4', '#C8C8C8', '#DCDCDC', '#F0F0F0'];

const autoIdColorMap = createHouseColorMap(255, colorOriginMap);
const autoIdGrayColorMap = createHouseColorMap(255, grayColorMap);
const autoIdLightHightMap = createHouseColorMap(255, colorLightHightMap);

function getColor(step: number, color: string) {
  const [h, s, v] = ColorUtils.hex2hsv(color);
  // const hue = index * 10 + step;
  // const s = 80 - step * 2;
  // const v = 90 - step * 2;
  return ColorUtils.hsv2hex(h, s, v - step);
}

function createHouseColorMap(count: number, colorMap: string[]) {
  // 创建随机色
  const map = new Map();
  const existColor: string[] = [];
  let step = 0; // 第几圈
  const counts = colorMap.length; // 一圈有多少数量

  for (let index = 0; index < count; index++) {
    if (_findKey(mapTypeMap, (type: number) => type === index)) continue;
    const key = `${index}`;
    let hex = getColor(step, colorMap[index % counts]);
    // while(existColor.includes(hex)){
    //   // 如果存在，再取一次
    //   hex = getColor(step);
    // }

    map.set(key, hex);
    existColor.push(hex);
    if (index % counts === 0) step += 1;
  }

  return map;
}

const dealPointsColor = function(
  type: number,
  opts: {
    color: IMapColor;
    isOrigin?: boolean;
    isGray?: boolean;
  }
) {
  const { color, isOrigin = false, isGray = false } = opts;
  const mapColor = {
    [mapTypeMap.sweep]: color.sweep,
    [mapTypeMap.barrier]: color.barrier,
    // [mapTypeMap.battery]: color.battery,
    [mapTypeMap.unknown]: color.unknown,
  };

  if (isOrigin) {
    const curColor = mapColor[type] || mapColor[mapTypeMap.sweep];
    return convertColorToArgbDEC(curColor);
  }

  if (isGray) {
    const curColor = mapColor[type] || autoIdGrayColorMap.get(`${type}`);
    return convertColorToArgbDEC(curColor);
  }

  const curColor = mapColor[type] || autoIdColorMap.get(`${type}`);
  return convertColorToArgbDEC(curColor);
};

export function dealPointsColorNormal(opts: {
  color: IMapColor;
  isOrigin?: boolean;
  isGray?: boolean;
}) {
  const { color } = opts;
  const mapColor = {
    [mapTypeMap.sweep]: color.sweep,
    [mapTypeMap.barrier]: color.barrier,
    // [mapTypeMap.battery]: color.battery,
    [mapTypeMap.unknown]: color.unknown,
  };

  return type => {
    const curColor = mapColor[type] || autoIdColorMap.get(`${type}`);

    return convertColorToArgbDEC(curColor);
  };
}

export function dealPointsColorGray(opts: { color: IMapColor }) {
  const { color } = opts;
  const mapColor = {
    [mapTypeMap.sweep]: color.sweep,
    [mapTypeMap.barrier]: color.barrier,
    // [mapTypeMap.battery]: color.battery,
    [mapTypeMap.unknown]: color.unknown,
  };
  return type => {
    const curColor = autoIdGrayColorMap.get(`${type}`) || mapColor[type];
    return convertColorToArgbDEC(curColor);
  };
}

export function dealPointsColorOrigin(opts: {
  color: IMapColor;
  isOrigin?: boolean;
  isGray?: boolean;
}) {
  const { color } = opts;
  const mapColor = {
    [mapTypeMap.sweep]: color.sweep,
    [mapTypeMap.barrier]: color.barrier,
    // [mapTypeMap.battery]: color.battery,
    [mapTypeMap.unknown]: color.unknown,
  };
  return type => {
    const curColor = mapColor[type] || mapColor[mapTypeMap.sweep];
    return convertColorToArgbDEC(curColor);
  };
}

export const parseBitmapTypesColor = async function(
  bitmapTypes: number[] = [],
  opts: {
    colorType?: 'gray' | 'origin' | 'color';
    originMapColor: IMapColor;
  }
) {
  if (!bitmapTypes || !bitmapTypes.length) return [];
  const { colorType = 'color', originMapColor } = opts;
  const colorMap = [];
  let max = 0;
  let timeoutTimes = 0;
  let res: (v) => any;
  switch (colorType) {
    case 'gray':
      res = dealPointsColorGray({ color: originMapColor });
      break;
    case 'origin':
      res = dealPointsColorOrigin({ color: originMapColor });
      break;
    case 'color':
      res = dealPointsColorNormal({ color: originMapColor });
      break;
  }

  CoastTime(() => {
    for (let value of bitmapTypes) {
      let data = res(value);

      colorMap.push(data);
    }
    console.log(
      `coastTime ForEach max: ${max} timeoutTimes: ${timeoutTimes}, bitmapTypesLength: ${bitmapTypes.length}`
    );
  }, `dealPointsColor`)();
  return colorMap;
};

export function getTypesMap(
  ids: Map<string, number>,
  colorType: 'gray' | 'origin' | 'color' = 'color'
  // selectIds: string[] = []
) {
  if (!ids || !ids.size || colorType === 'origin') {
    return {};
  }
  /**
   * "roomInfo" : { 
        "1" : {
            "defaultSelected" : true,
            "normalColor" : "#88001122",
            "highlightColor" : "#FF001122",
            "extend" : ""
        },
      }
   */
  const roomInfo = {};

  ids.forEach((value, id) => {
    let normalColor;
    let highlightColor;

    const grayColor = autoIdGrayColorMap.get(`${id}`);
    const color = autoIdColorMap.get(`${id}`);
    const lightHight = autoIdLightHightMap.get(`${id}`);
    // const isSelect = selectIds.includes(`${id}`);

    if (grayColor && color) {
      switch (colorType) {
        case 'gray':
          normalColor = convertColorToArgbHex(grayColor);
          highlightColor = convertColorToArgbHex(color);
          break;

        case 'color':
          normalColor = convertColorToArgbHex(color);
          highlightColor = convertColorToArgbHex(lightHight);
          break;
        default:
          // 其他模式不走
          break;
      }
      roomInfo[`${id}`] = {
        normalColor,
        highlightColor,
        // defaultSelected: isSelect || false,
        // defaultSelected: Number(id) % 2 === 0,
        defaultSelected: false,
        extend: '{}',
      };
    }
  });
  return roomInfo;
}

export function getRoomIdColorMap(
  ids: Map<string, number>,
  colorType: 'gray' | 'origin' | 'color' = 'color'
) {
  // 老字段
  if (!ids || !ids.size || colorType === 'origin') {
    return {};
  }

  const roomInfo = {};
  ids.forEach((value, id) => {
    let normalColor, highlightColor, grayColor, color, lightHight;

    if (opts.bitmapValueBase === 10) {
      grayColor = autoIdGrayColorMapDEC.get(`${id}`);
      color = autoIdColorMapDEC.get(`${id}`);
    }
    if (opts.bitmapValueBase === 16) {
      grayColor = autoIdGrayColorMapHEX.get(`${id}`);
      color = autoIdColorMapHEX.get(`${id}`);
    }

    if (grayColor && color) {
      switch (colorType) {
        case 'gray':
          normalColor = convertColorToArgbHex(grayColor);
          // highlightColor = convertColorToArgbHex(color);
          break;

        case 'color':
          normalColor = convertColorToArgbHex(color);
        // highlightColor = convertColorToArgbHex(color);
        // break;
        default:
          // 其他模式不走
          break;
      }
      roomInfo[`${id}`] = normalColor;
    }
  });
  return roomInfo;
}

export function getRoomIdColorMapNew(opts: {
  colorType?: 'gray' | 'origin' | 'color';
  originMapColor: IMapColor;
}) {
  const { colorType = 'color', originMapColor } = opts;
  const roomInfo = {};
  const mapColor = {
    [mapTypeMapHex.sweep]: originMapColor.sweep,
    [mapTypeMapHex.barrier]: originMapColor.barrier,
    // [mapTypeMapHex.battery]: originMapColor.battery,
    [mapTypeMapHex.unknown]: originMapColor.unknown,
  };

  for (let id = 0; id <= MAX_ID_NUM; id++) {
    const idHex = DECToHex(id);
    let normalColor;
    let highlightColor;

    const grayColor =
      mapColor[idHex] || autoIdGrayColorMapHEX.get(`${idHex}`) || mapColor[mapTypeMapHex.unknown];
    const color =
      mapColor[idHex] || autoIdColorMapHEX.get(`${idHex}`) || mapColor[mapTypeMapHex.unknown];

    // if (grayColor && color) {
    switch (colorType) {
      case 'gray':
        normalColor = convertColorToArgbHex(grayColor);
        // highlightColor = convertColorToArgbHex(lightHight);
        break;

      case 'color':
        normalColor = convertColorToArgbHex(color);
        // highlightColor = convertColorToArgbHex(lightHight);
        break;
      default:
        // 其他模式不走
        break;
    }
    roomInfo[`${idHex}`] = normalColor;
    // }
  }
  return roomInfo;
}

export function getRoomInfoMapNew(opts: {
  colorType?: 'gray' | 'origin' | 'color';
  originMapColor: IMapColor;
}) {
  const { colorType = 'color', originMapColor } = opts;
  // 老字段
  /**
   * "roomInfo" : { 
        "1" : {
            "defaultSelected" : true,
            "normalColor" : "#88001122",
            "highlightColor" : "#FF001122",
            "extend" : ""
        },
      }
   */
  const roomInfo = {};
  ids.forEach((value, id) => {
    let normalColor;
    let highlightColor;

    const grayColor = autoIdGrayColorMap.get(`${id}`);
    const color = autoIdColorMap.get(`${id}`);

    if (grayColor && color) {
      switch (colorType) {
        case 'gray':
          normalColor = convertColorToArgbHex(grayColor);
          // highlightColor = convertColorToArgbHex(color);
          break;

        case 'color':
          normalColor = convertColorToArgbHex(color);
        // highlightColor = convertColorToArgbHex(color);
        // break;
        default:
          // 其他模式不走
          break;
      }
      roomInfo[`${id}`] = normalColor;
    }
  });
  return roomInfo;
}

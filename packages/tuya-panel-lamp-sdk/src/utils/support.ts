import _get from 'lodash/get';
import { TYSdk } from 'tuya-panel-kit';
import dpCodes from './dpCodes';

const cache: any = {};

const {
  brightCode,
  temperatureCode,
  colourCode,
  workModeCode,
  sceneCode,
  countdownCode,
  musicCode,
  rhythmCode,
} = dpCodes;

const supportDp = (code: string) => {
  try {
    const { schema } = TYSdk.devInfo;
    return !!schema[code];
  } catch (error) {
    return false;
  }
};

const supportWorkMode = (code: string) => {
  try {
    const { schema } = TYSdk.devInfo;
    const workModeRange: string[] = _get(schema[workModeCode], 'range') || [];
    return workModeRange.includes(code);
  } catch (error) {
    return false;
  }
};

const isSupportByDpAndWorkMode = (
  code: string,
  dpCode: string,
  workMode: string,
  isForce: boolean
) => {
  if (!isForce) {
    if (cache[code]) {
      return cache[code];
    }
  }
  // 是否存在相关dp
  const isDpSupport = supportDp(dpCode);
  const isInWorkMode = supportWorkMode(workMode);
  const isSupport = isDpSupport && isInWorkMode;
  cache[code] = isSupport;
  return isSupport;
};

const isSupportByDp = (code: string, dpCode: string, isForce: boolean) => {
  if (!isForce) {
    if (cache[code]) {
      return cache[code];
    }
  }
  // 是否存在相关dp
  const isDpSupport = supportDp(dpCode);
  cache[code] = isDpSupport;
  return isDpSupport;
};

// 群组设备
const isGroupDevice = (): boolean => {
  return !!TYSdk.devInfo.groupId;
};

// 支持白光亮度
const isSupportBright = (isForce = false): boolean => {
  return isSupportByDpAndWorkMode('isSupportBright', brightCode, 'white', isForce);
};

// 支持色温
const isSupportTemp = (isForce = false): boolean => {
  return isSupportByDpAndWorkMode('isSupportTemp', temperatureCode, 'white', isForce);
};

// 支持彩光
const isSupportColour = (isForce = false): boolean => {
  return isSupportByDpAndWorkMode('isSupportColour', colourCode, 'colour', isForce);
};

// 支持场景
const isSupportScene = (isForce = false): boolean => {
  return isSupportByDpAndWorkMode('isSupportScene', sceneCode, 'scene', isForce);
};

// 支持音乐
const isSupportMusic = (isForce = false): boolean => {
  return isSupportByDpAndWorkMode('isSupportMusic', musicCode, 'music', isForce);
};

// 支持倒计时
const isSupportCountdown = (isForce = false): boolean => {
  return isSupportByDp('isSupportCountdown', countdownCode, isForce);
};

// 支持生物节律
const isSupportRhythm = (isForce = false): boolean => {
  return isSupportByDp('isSupportRhythm', rhythmCode, isForce);
};

// 支持白光
const isSupportWhite = (isForce = false): boolean => {
  const code = 'isSupportWhite';
  if (!isForce) {
    if (cache[code]) {
      return cache[code];
    }
  }
  const isSupport = isSupportBright(true) || isSupportTemp(true);
  cache[code] = isSupport;
  return cache[code];
};

const isSupportWorkMode = (code: string): boolean => {
  return supportWorkMode(code);
};

const isSupportDp = (dpCode: string, isForce = false): boolean => {
  return isSupportByDp(`isSupport_${dpCode}`, dpCode, isForce);
};

const hasCapability = (id: number): boolean => {
  // eslint-disable-next-line no-bitwise
  return (TYSdk.devInfo.capability & (1 << id)) > 0;
};

// Zigbee Device
const isZigbeeDevice = (): boolean => {
  return hasCapability(12);
};

// SigMesh Device
const isSigMeshDevice = (): boolean => {
  return hasCapability(15);
};

// WiFi Device
const isWifiDevice = (): boolean => {
  return hasCapability(1);
};

export default {
  isGroupDevice,
  isSupportBright,
  isSupportTemp,
  isSupportColour,
  isSupportScene,
  isSupportMusic,
  isSupportCountdown,
  isSupportRhythm,
  isSupportWhite,
  isSupportWorkMode,
  isSupportDp,
  hasCapability,
  isZigbeeDevice,
  isSigMeshDevice,
  isWifiDevice,
};

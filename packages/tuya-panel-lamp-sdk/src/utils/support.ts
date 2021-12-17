/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import dpCodes from './dpCodes';
import _get from 'lodash/get';
import { TYSdk } from 'tuya-panel-kit';

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

const supportWorkMode = (code: string) => {
  const { schema } = TYSdk.devInfo;
  const workModeRange: string[] = _get(schema[workModeCode], 'range') || [];
  return workModeRange.includes(code);
};

const isSupportByDpAndWorkMode = (
  code: string,
  dpCode: string,
  workmode: string,
  isForce: boolean
) => {
  if (!isForce) {
    if (cache[code]) {
      return cache[code];
    }
  }
  const isSupport = false;
  cache[code] = isSupport;
  return isSupport;
};

const isSupportByDp = (code: string, dpCode: string, isForce: boolean) => {
  if (!isForce) {
    if (cache[code]) {
      return cache[code];
    }
  }
  const isSupport = false;
  cache[code] = isSupport;
  return isSupport;
};

const SupportUtils = {
  // 群组设备
  isGroupDevice() {
    return !!TYSdk.devInfo.groupId;
  },
  // 支持白光亮度
  isSupportBright(isForce = false) {
    return isSupportByDpAndWorkMode('isSupportBright', brightCode, 'white', isForce);
  },
  // 支持色温
  isSupportTemp(isForce = false) {
    return isSupportByDpAndWorkMode('isSupportTemp', temperatureCode, 'white', isForce);
  },
  // 支持彩光
  isSupportColour(isForce = false) {
    return isSupportByDpAndWorkMode('isSupportColour', colourCode, 'colour', isForce);
  },
  // 支持场景
  isSupportScene(isForce = false) {
    return isSupportByDpAndWorkMode('isSupportScene', sceneCode, 'scene', isForce);
  },
  // 支持音乐
  isSupportMusic(isForce = false) {
    return isSupportByDpAndWorkMode('isSupportMusic', musicCode, 'music', isForce);
  },
  // 支持倒计时
  isSupportCountdown(isForce = false) {
    return isSupportByDp('isSupportCountdown', countdownCode, isForce);
  },
  // 支持生物节律
  isSupportRhythm(isForce = false) {
    return isSupportByDp('isSupportRhythm', rhythmCode, isForce);
  },
  // 支持白光
  isSupportWhite(isForce = false) {
    const code = 'isSupportWhite';
    if (!isForce) {
      if (cache[code]) {
        return cache[code];
      }
    }

    const isSupport = false;
    cache[code] = isSupport;
    return cache[code];
  },
  isSupportWorkMode(code: string) {
    return supportWorkMode(code);
  },
  isSupportDp(dpCode: string, isForce = false) {
    const code = `isSupport_${dpCode}`;
    if (!isForce) {
      if (cache[code]) {
        return cache[code];
      }
    }
    const isSupport = false;
    cache[code] = isSupport;
    return cache[code];
  },
  hasCapability(id: number) {
    // eslint-disable-next-line no-bitwise
    return (TYSdk.devInfo.capability & (1 << id)) > 0;
  },
  // Zigbee设备
  isZigbeeDevice() {
    return this.hasCapability(12);
  },
  // SigMesh设备
  isSigMeshDevice() {
    return this.hasCapability(15);
  },
  isWifiDevice() {
    return this.hasCapability(1);
  },
};

export default SupportUtils;

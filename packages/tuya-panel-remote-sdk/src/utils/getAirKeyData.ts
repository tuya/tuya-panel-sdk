import { has, set, get } from 'lodash';

type airKeyData = {
  compressPulse: string;
  key: string;
  keyId: number;
  keyName: string;
  sendNum?: number;
  supportFeature?: boolean;
  weatherStudy?: boolean;
  isStudy?: boolean;
  frequency?: number;
};

const MODES = 'modes';
const TEMPS = 'temps';
const WINDS = 'winds';
const SWINGS = 'swings';
const MINTEMP = 'minTemp';
const MAXTEMP = 'maxTemp';

// mode
const airMode = {
  0: { name: 'airCold' },
  1: { name: 'airHot' },
  2: { name: 'airAuto' },
  3: { name: 'airWind' },
  4: { name: 'airDehumy' },
};
// speed
const airWind = {
  0: { name: 'airSpeedAuto' }, // auto
  1: { name: 'airSpeed1' }, // low
  2: { name: 'airSpeed2' }, // middle
  3: { name: 'airSpeed3' }, // high
};
// swing
const airSwing = {
  0: { name: 'airSwingFix' },
  1: { name: 'airSwingAuto' },
};

const getValue = (type: string, value: number): number | string => {
  if (type === 'M') {
    return has(airMode, value) ? value : null;
  }
  if (type === 'T') {
    return value >= 14 && value <= 32 ? value : '--';
  }
  if (type === 'S') {
    return has(airWind, value) ? value : '--';
  }
  if (type === 'W') {
    return has(airSwing, value) ? value : '--';
  }
  return '--';
};

const setAirStateArray = (modeKeys, getState, stateValue) => {
  if (!has(modeKeys, getState)) {
    set(modeKeys, getState, [stateValue]);
  } else {
    const stateArray = get(modeKeys, getState);
    stateArray.push(stateValue);
    const stateArrayNoRepeat = Array.from(new Set(stateArray));
    set(modeKeys, getState, stateArrayNoRepeat.sort());
  }
};

/**
 * @language zh-CN
 * @description 空调数据转化
 * @param {string} codeList 码库数据列表
 */
/**
 * @language en-US
 * @description Air Conditioning Data Conversion
 * @param {string} codeList Codebase data list
 */
const getAirKeyData = (codeList: Array<airKeyData>): any => {
  if (codeList.length > 0) {
    const modeKeys = {};
    const powerKeys = {};
    const otherKeys = {};
    let isSupportSwing = false; // 是否支持扫风
    codeList.forEach(item => {
      const { key, keyId, compressPulse, isStudy = false } = item;
      const code = { isStudy, compressPulse, key };
      const keyArr = key.split('_');
      if (keyArr[0] === 'power') {
        powerKeys[key] = code;
      } else if (keyArr[0].includes('M')) {
        let mode = null;
        let wind: number | string = '--';
        let temp: number | string = '--';
        let swing: number | string = '--';
        keyArr.forEach(ite => {
          const { length } = ite;
          const type = ite.substr(0, 1);
          const value = parseInt(ite.substr(1, length - 1), 10);
          const typeValue = getValue(type, value);
          if (type === 'M') {
            mode = typeValue;
          } else if (type === 'T') {
            temp = typeValue;
          } else if (type === 'S') {
            wind = typeValue;
          } else if (type === 'W') {
            swing = typeValue;
          }
        });
        const isSupportSwings = keyArr.length > 3;
        isSupportSwing = isSupportSwings;
        // set mode Array
        setAirStateArray(modeKeys, MODES, mode);
        // set temp Array
        setAirStateArray(modeKeys, [mode, TEMPS], temp);
        // set wind Array
        setAirStateArray(modeKeys, [mode, temp, WINDS], wind);
        // set swing Array
        if (isSupportSwing) {
          // 支持扫风
          setAirStateArray(modeKeys, [mode, temp, wind, SWINGS], swing);
        }
        // minTemp,maxTemp
        const min = get(modeKeys, [mode, MINTEMP], 33);
        const max = get(modeKeys, [mode, MAXTEMP], 13);

        if (temp < min) {
          set(modeKeys, [mode, MINTEMP], temp);
        }
        if (temp > max) {
          set(modeKeys, [mode, MAXTEMP], temp);
        }
        if (isSupportSwing) {
          set(modeKeys, [mode, temp, wind, swing], code);
        } else {
          set(modeKeys, [mode, temp, wind], code);
        }
      } else if (compressPulse !== '0') {
        set(otherKeys, keyId, item);
      }
    });
    const keyData = {
      modeKeys,
      powerKeys,
      otherKeys,
      isSupportSwing,
    };
    return keyData;
  }
  return codeList;
};

export default getAirKeyData;

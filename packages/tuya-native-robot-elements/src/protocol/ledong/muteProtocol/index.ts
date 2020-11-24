import { TYSdk, Utils } from '@tuya-rn/tuya-native-components';
import moment from 'moment';
import RobotUtils from '../../../utils';

const { stringToAtHex, atHexToString } = RobotUtils.StringsUtils;

const {
  TimeUtils: { parseSecond, stringToSecond, parseTimer, parseHour12 },
  JsonUtils: { parseJSON },
} = Utils;

export interface IMuteProtocol {
  timeZone: number;
  timeZoneSec: number;
  value: IMuteValue[];
}

export interface IMuteValue {
  startTime: number;
  endTime: number;
  active?: boolean;
  unlock: boolean;
  period: number[];
  startText?: string;
  endText?: string;
}

export interface IMuteData {
  infoType: number;
  data: IMuteProtocol;
  message: string;
}

function createDInfo() {
  return { ts: new Date().valueOf(), userId: '0' };
}

function encode(data) {
  return stringToAtHex(JSON.stringify(data));
}

function decode(value) {
  return parseJSON(atHexToString(value));
}

function DateToSecond(date: Date): number {
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}

function secondToDate(second: number): Date {
  return new Date(0, 0, 0, 0, 0, second);
}

/**
 *
 * @param {boolean} false active 预约计划的类型, 为true表示是预约清扫时间，为false表示是勿扰时间
 * @param {number} startTime 清扫开始时间
 *
 * @param {number} endTime
 *
 * @param {boolean} unlock 是否激活
 *
 * @param {array} period 重复
 *
 */

function parseOneMuteValue(item: IMuteValue, is12Hours = false) {
  const { unlock: status, endTime, startTime, period } = item;

  const startText = is12Hours ? parseHour12(startTime) : parseTimer(startTime);
  let endText = is12Hours ? parseHour12(endTime) : parseTimer(endTime);
  // if (endTime < startTime) endText = `${endText}`;
  return {
    ...item,
    unlock: Boolean(status),
    startText,
    endText,
    // loops: period.join(''),
    // loops: '0000000',
  };
}

function decodeMuteValue(d: string, is12Hours = false): IMuteValue | null | {} {
  const data: IMuteData = decode(d) || {};
  const { infoType, message } = data;

  if (!infoType) return null;
  if (infoType === 21001 && message === 'ok') {
    return null;
  }
  if (![21001, 21002].includes(infoType)) return null;
  const { data: { timeZone = 8, timeZoneSec = 28800, value = [] } = {} } = data;
  // return value;
  // return value.map(item => parseOneMuteValue(item, is12Hours));
  // 勿扰只有一项或者没有
  // if (!value[0]) return {}; // 表示为空
  let context;
  value.forEach(item => {
    if (item.active === false) context = item;
  })
  if (!context) return {};
  return parseOneMuteValue(context, is12Hours);
}

function encodeMuteValue({ startTime, endTime, unlock, extendsData = [] } = {}) {
  const zone = moment().format('Z') || '+08:00'; // +08:00
  const [, symbol, number] = zone.match(/([+-])\d(\d)/) || ['', '+', '8'];

  extendsData.forEach(item => {
    delete item.startText;
    delete item.endText;
  });

  const data = {
    infoType: 21001,
    data: {
      timeZone: Number(`${symbol}${number}`),
      value: [
        ...extendsData,
        {
          startTime,
          endTime,
          active: false,
          unlock,
          // unlock: true, // 默认打开
          period: [0, 1, 2, 3, 4, 5, 6],
        },
      ],
    },
    dInfo: createDInfo(),
  };
  return encode(data);
}

function encodeRequestMute() {
  const requestData = {
    infoType: 21002,
    data: {},
    dInfo: createDInfo(),
  };
  return encode(requestData);
}

function initMute(is12Hours = false): IMuteValue {
  // 默认22：00——08：00
  const initStartTime = new Date(0, 0, 0, 22, 0, 0);
  const initStartSecond = DateToSecond(initStartTime);
  const initStartTimeText = is12Hours ? parseHour12(initStartSecond) : parseTimer(initStartSecond);

  const initEndTime = new Date(0, 0, 0, 8, 0, 0);
  const initEndSecond = DateToSecond(initEndTime);
  const initEndTimeText = is12Hours ? parseHour12(initEndSecond) : parseTimer(initEndSecond);

  return {
    unlock: false,
    startTime: initStartSecond,
    endTime: initEndSecond,
    startText: initStartTimeText,
    endText: initEndTimeText,
    period: [0, 1, 2, 3, 4, 5, 6],
  };
}

export default {
  encode,
  decode,
  decodeMuteValue,
  encodeMuteValue,
  encodeRequestMute,
  initMute,
  DateToSecond,
  secondToDate,
};

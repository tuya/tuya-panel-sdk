import { TYSdk, Utils } from '@tuya-rn/tuya-native-components';
import moment from 'moment';
import _floor from 'lodash/floor';
import RobotUtils from '../../../utils';

const { stringToAtHex, atHexToString } = RobotUtils.StringsUtils;

const {
  TimeUtils: { parseSecond, stringToSecond, parseTimer, parseHour12 },
  JsonUtils: { parseJSON },
} = Utils;

export interface IProtocol {
  timeZone: number;
  timeZoneSec: number;
  value: IValue[];
}

export interface IValue {
  startTime: number;
  endTime?: number;
  active: boolean;
  unlock: boolean;
  period: number[];
  segmentTagIds: string[];

  workNoisy?: 'quiet' | 'auto' | 'strong';
}

export interface IParseValue extends IValue {
  startText: string;
  endText?: string;
}

export interface IData {
  infoType: number;
  data: IProtocol;
  message: string;
}

const getInfoType = 21002;
const setInfoType = 21001;

function isAppointed(active: boolean) {
  return active === true;
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

function minToStartTimeUnix(minutes: number) {
  const now = new Date();
  const nowSecond = DateToSecond(now);
  const setSecond = minutes * 60;
  const setHours = _floor(minutes / 60);
  const setMin = _floor(minutes % 60);

  now.setHours(setHours);
  now.setMinutes(setMin);

  if (setSecond > nowSecond) {
    // 如果设置时间在当前时间之后
    return _floor((now.getTime() || 0) / 1000);
  }
  if (setSecond < nowSecond) {
    // 如果设置时间在当前时间之前，设置第二天的定时
    return _floor((now.getTime() || 0) / 1000) + 86400;
  }
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

function parseOneValue(item: IValue, is12Hours = false) {
  const { unlock: status, endTime, startTime, period, active } = item;
  if (!isAppointed(active)) return;

  /** 周期清扫，时间用秒表示，0表示
  00:00, 3600表示01:00。对于单次清
  扫，时间用unix时间戳表示 */
  if (item.period && item.period.length) {
    const startText = is12Hours ? parseHour12(startTime) : parseTimer(startTime);
    let endText = is12Hours ? parseHour12(endTime) : parseTimer(endTime);
    // if (endTime < startTime) endText = `${endText}`;
    return {
      ...item,
      unlock: Boolean(status),
      startText,
      // endText,
      // loops: period.join(''),
      // loops: '0000000',
    };
  }
  if ((item.period && !item.period.length) || !item.period) {
    const startText = is12Hours
      ? moment.unix(startTime).format('hh:mm A')
      : moment.unix(startTime).format('HH:mm');

    return {
      ...item,
      unlock: Boolean(status),
      startText,
    };
  }
}

function decodeValue(d: string, is12Hours = false): IParseValue[] | null {
  const data: IData = decode(d) || {};
  const { infoType, message } = data;

  if (!infoType) return null;
  if (infoType === setInfoType && message === 'ok') {
    return null;
  }
  if (![setInfoType, getInfoType].includes(infoType)) return null;
  const { data: { timeZone = 8, timeZoneSec = 28800, value = [] } = {} } = data;
  const rez: IParseValue[] = [];
  value.forEach(item => {
    const parse = parseOneValue(item, is12Hours);
    if (parse) rez.push(parse);
  });

  return rez;
}

function encodeValue(
  params: {
    startTime: number;
    unlock: boolean;
    loops: string;
    roomIds: string[];
    suck: string;
    water: string;
    cleanMode: string;
    extendsData: IParseValue[];
  },
  conf: { isAdd?: boolean; isExtend?: boolean } = {}
) {
  // startTime 传进来是一个时间戳
  const zone = moment().format('Z') || '+08:00'; // +08:00
  const [, symbol, number] = zone.match(/([+-])\d(\d)/) || ['', '+', '8'];

  const {
    startTime,
    unlock,
    loops = '0000000',
    roomIds = [],
    suck,
    water,
    cleanMode,
    extendsData = [],
  } = params;
  const { isAdd = true, isExtend = true } = conf;
  const period = [];
  const value = [];
  let curStartTime = startTime;
  for (let i = 0; i < loops.length; i++) {
    if (loops[i] === '1') {
      period.push(i);
    }
  }

  if (period.length) {
    const newStartTime = new Date(Number(`${startTime}000`));
    curStartTime = DateToSecond(newStartTime);
  }
  extendsData.forEach(item => {
    delete item.startText;
    delete item.endText;
  });

  if (isAdd) {
    const data = {
      startTime: curStartTime,
      endTime: 0,
      active: true,
      unlock,
      period,
      // workNoisy: suck,
      segmentTagIds: roomIds,
    };

    suck !== undefined && (data.workNoisy = suck);
    water !== undefined && (data.waterPump = Number(water));
    cleanMode !== undefined && (data.cleanMode = Number(cleanMode));
    value.push(data);
  }

  if (isExtend) {
    value.push(...extendsData);
  }
  const data = {
    infoType: 21001,
    data: {
      timeZone: Number(`${symbol}${number}`),
      value,
    },
    dInfo: createDInfo(),
  };
  console.warn('data', data);

  return encode(data);
}

function encodeRequest() {
  const requestData = {
    infoType: getInfoType,
    data: {},
    dInfo: createDInfo(),
  };
  return encode(requestData);
}

function periodToLoop(period: number[]) {
  const loop = ['0', '0', '0', '0', '0', '0', '0'];
  period.forEach(day => {
    loop[day] = '1';
  });
  return loop.join('');
}

function init(): IValue {
  const initTime = new Date();
  const initSecond = DateToSecond(initTime);
  const initTimeText = parseTimer(initSecond);

  return {
    unlock: false,
    startTime: initSecond,
    endTime: initSecond,
    startText: initTimeText,
    endText: initTimeText,
    period: [0, 1, 2, 3, 4, 5, 6],
  };
}

export default {
  decode: decodeValue,
  encode: encodeValue,
  encodeRequest,
  init,
  DateToSecond,
  secondToDate,
  minToStartTimeUnix,
  periodToLoop,
};

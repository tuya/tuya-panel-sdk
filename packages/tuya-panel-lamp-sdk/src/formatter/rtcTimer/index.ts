/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-case-declarations */
/**
 * Rtc定时分单点定时和时间段定时
 * 单点定时开始执行动作：开灯白光/彩光、关灯
 * 时间段定时开始执行动作：开灯白光/彩光、关灯、太阳能模式白光彩光。结束执行动作:开灯白光/彩光、关灯、太阳能模式白光彩光
 */
import _ from 'lodash';
import { transform, to16 } from '../../utils';
import { IData, Item } from './default';

export default class TimerFormatter {
  uuid: string;
  constructor(uuid = 'rtc_timer') {
    this.uuid = uuid;
  }

  actionDpData = (str: string) => {
    const generator = transform(str);
    generator.next();
    const step2 = () => {
      return generator.next(2).value;
    };
    const step4 = () => {
      return generator.next(4).value;
    };

    // 设备执行动作类型 00关灯，01开灯，02白光，03彩光，07太阳能，08执行定时前状态
    const actionInt = step2();
    let num = 2;
    let startDpData: any = {
      actionType: actionInt,
    };
    switch (actionInt) {
      case 0:
        const startDpDataHex = to16(actionInt, 2);
        const power = startDpDataHex.slice(0, 2) === '01';
        startDpData.power = power;
        break;
      case 2:
        startDpData.brightness = step2() * 10;
        startDpData.temperature = step2() * 10;
        num = 6;
        break;
      case 3:
        startDpData.hue = step4();
        startDpData.saturation = step2() * 10;
        startDpData.value = step2() * 10;
        num = 10;
        break;
      case 7:
        const hue = step4();
        const saturation = step2() * 10;
        const v = step2() * 10;
        const brightness = step2() * 10;
        const temperature = step2() * 10;
        if (brightness || temperature) {
          startDpData.brightness = brightness;
          startDpData.temperature = temperature;
          num = 6;
        } else {
          startDpData.hue = hue;
          startDpData.saturation = saturation;
          startDpData.value = v;
          num = 10;
        }
        break;
      default:
        startDpData = {
          actionType: actionInt,
        };
    }
    return { startDpData, num };
  };

  actionStr = (data: Item) => {
    const { actionType, brightness, temperature, hue, saturation, value, power } = data;
    let str = '';
    switch (actionType) {
      case 0: {
        str = `${power ? '01' : '00'}`;
        break;
      }
      case 2: {
        const brightStr = to16(Math.round(brightness / 10), 2);
        const temperatureStr = to16(Math.round(temperature / 10), 2);
        str = `02${brightStr}${temperatureStr}`;
        break;
      }
      case 3: {
        const hueStr = to16(hue, 4);
        const saturationStr = to16(Math.round(saturation / 10), 2);
        const valueStr = to16(Math.round(value / 10), 2);
        str = `03${hueStr}${saturationStr}${valueStr}`;
        break;
      }
      case 7: {
        if (brightness || temperature) {
          const brightStr = to16(Math.round(brightness / 10), 2);
          const temperatureStr = to16(Math.round(temperature / 10), 2);
          str = `0700000000${brightStr}${temperatureStr}`;
        } else {
          const hueStr = to16(hue, 4);
          const saturationStr = to16(Math.round(saturation / 10), 2);
          const valueStr = to16(Math.round(value / 10), 2);
          str = `07${hueStr}${saturationStr}${valueStr}0000`;
        }
        break;
      }
      default:
        str = '';
    }
    return str;
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  parse(value: any) {
    const { length } = value;
    if (!value) {
      console.warn('The data format is wrong and cannot be parsed');
      return {};
    }

    const generator = transform(value);
    generator.next();
    const step2 = () => {
      return generator.next(2).value;
    };
    const step4 = () => {
      return generator.next(4).value;
    };

    if (length === 4) {
      // 删除定时
      const id = step2();
      const idBinaryStr = _.padStart(id.toString(2), 8, '0');
      const status = idBinaryStr.slice(0, 1) === '1';
      const timerId = parseInt(idBinaryStr.slice(1), 2);
      return {
        timerId,
        status,
        type: step2(),
      };
    }

    const id = step2();
    const idBinaryStr = _.padStart(id.toString(2), 8, '0');
    const status = idBinaryStr.slice(0, 1) === '1';
    const timerId = parseInt(idBinaryStr.slice(1), 2);

    const type = step2();
    const repeatInt = step2();
    const repeat = _.padEnd(repeatInt.toString(2).split('').reverse().join(''), 8, '0');

    const startTimeType = step2();
    const startTime = step4();

    console.log('value,v,length', value, length, value.slice(12));

    const { startDpData, num } = this.actionDpData(value.slice(12));

    // 单点定时
    if (type === 1) {
      return {
        timerId,
        status,
        type,
        repeat,
        startTimeType,
        startTime,
        startDpData,
      };
    }
    const endLength = 12 + num;
    const endStr = value.slice(endLength);
    const endTimeType = parseInt(endStr.slice(0, 2), 16);
    const endTime = parseInt(endStr.slice(2, 6), 16);
    const endDpData = this.actionDpData(value.slice(18 + num)).startDpData;
    return {
      timerId,
      status,
      type,
      repeat,
      startTimeType,
      startTime,
      startDpData,
      endTimeType,
      endTime,
      endDpData,
    };
  }

  format(data: IData): string {
    const {
      timerId,
      status,
      type = 1,
      repeat,
      startTimeType,
      startTime,
      startDpData,
      endTimeType,
      endTime,
      endDpData,
    } = data;
    if (Object.keys(data).length === 0) return '';
    if (repeat) {
      const statusStr = status ? '1' : '0';
      const timerIdStr = _.padStart(timerId.toString(2), 7, '0');
      const idStr = to16(parseInt(`${statusStr}${timerIdStr}`, 2), 2);
      const typeStr = to16(type, 2);
      const repeatStr = to16(parseInt(repeat.split('').reverse().join(''), 2), 2);
      const startTimeTypeStr = to16(startTimeType, 2);
      const startTimeStr = to16(startTime, 4);

      const startDpDataStr = this.actionStr(startDpData);
      // 单个时间点
      if (typeStr === '01') {
        return `${idStr}${typeStr}${repeatStr}${startTimeTypeStr}${startTimeStr}${startDpDataStr}`;
      }
      const endTimeTypeStr = to16(endTimeType, 2);
      const endTimeStr = to16(endTime, 4);
      // 结束动作统一传08:执行定时前状态

      const endDpDataStr = this.actionStr(endDpData);
      return `${idStr}${typeStr}${repeatStr}${startTimeTypeStr}${startTimeStr}${startDpDataStr}${endTimeTypeStr}${endTimeStr}${endDpDataStr}`;
    }
    const statusStr = status ? '1' : '0';
    const timerIdStr = _.padStart(timerId.toString(2), 7, '0');
    const idStr = to16(parseInt(`${statusStr}${timerIdStr}`, 2), 2);
    return `${idStr}00`;
  }
}

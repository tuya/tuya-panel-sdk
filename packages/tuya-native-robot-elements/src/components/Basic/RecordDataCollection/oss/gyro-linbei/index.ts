/** 领贝 陀螺仪 清扫记录走oss */
import moment from 'moment';

import OSSRecordCollection from '../OSSRecordCollection';

interface IRecord {
  // 原始数据
  bucket: string;
  extend: string;
  file: string;
  id: number;
  time: string;
  date?: string;

  startTime?: string; // 开始时间
  endTime?: string;
  cleanArea?: number; // 清扫面积
  cleanTime?: number; // 清扫时间
  mapId?: number; // 地图id
  mapLen?: number; // 地图长度
  pathLen?: number; // 路径长度
  time12: string; // 十二小时制时间
  time12Unit: string; // 十二小时制单位
  time24: string; // 二十四小时制时间
  dateTitle: string; // 二级页面时间标题
  dateTitle24: string; // 二级页面时间标题二十四小时制
  sectionTitle: string; // sectionList标题
}
export default class GyroLinBeiRecord extends OSSRecordCollection {
  parseOneRecord(item: IRecord): IRecord {
    const { bucket, extend, file, id, time } = item;
    const [date, startTime, cleanTime, cleanArea, mapId] = extend
      .replace(/(\w{8})(\w{4})(\w{3})(\w{3})(\w{5})/, '$1_$2_$3_$4_$5')
      .split('_');

    const [time12, time12Unit] = moment(startTime, 'HHmm')
      .format('hh:mm-A')
      .split('-');
    const dateTitle = moment(date + startTime, 'YYYYMMDDHHmm').format('YYYY-MM-DD hh:mm A');
    const sectionTitle = moment(date + startTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD');

    const time24 = moment(startTime, 'HHmmss').format('HH:mm');
    const dateTitle24 = moment(date + startTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm');

    const [cleanAreaInt, cleanTimeInt, mapIdInt] = [
      cleanArea,
      cleanTime,
      mapId
    ].map(d => parseInt(d, 10));

    return {
      bucket,
      extend,
      file,
      id,
      date,
      time,
      startTime,
      cleanArea: cleanAreaInt,
      cleanTime: cleanTimeInt,
      mapId: mapIdInt,
      time12,
      time24,
      time12Unit,
      dateTitle,
      dateTitle24,
      sectionTitle,
    };
  }
}

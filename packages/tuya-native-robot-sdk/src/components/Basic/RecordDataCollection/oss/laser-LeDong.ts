/** 乐动 清扫记录 */
import moment from 'moment';

import OSSRecordCollection from './OSSRecordCollection';

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
export default class LaserLeiDongRecord extends OSSRecordCollection {
  // yxzn126ad8ece14c3fa9_1586439118_1586473072_1586473189_4_0.txt
  // /tmp/RecordFiles/12B1A235C0F8021A_428_1554982036_1554982047_0_0.txt SN-mapId-开始时间-结束时间-面积
  parseOneRecord(item: IRecord): IRecord {
    const { bucket, extend, file, id, time } = item;
    const parseExtendRegexp = /\/\w*\/\w*\/([\w|_|\d]*)\.(\w*)/;
    const [extendData, type] = extend.replace(parseExtendRegexp, '$1').split('.');

    if (type === 'bkmap') return null;

    const [SN, mapId, startTime, endTime, cleanArea] = extendData.split('_');

    const [time12, time12Unit] = moment.unix(startTime).format('hh:mm-A').split('-');
    const time24 = moment.unix(startTime).format('HH:mm')

    const cleanTimeInt = Math.round((Number(endTime) - Number(startTime)) / 60);
    const dateTitle = moment.unix(startTime).format('YYYY-MM-DD hh:mm A');
    const dateTitle24 = moment.unix(startTime).format('YYYY-MM-DD HH:mm');
    const sectionTitle = moment.unix(startTime).format('YYYY-MM-DD');

    const [cleanAreaInt] = [cleanArea].map(d => parseInt(d, 10));

    return {
      bucket,
      extend,
      file,
      id,
      //   date,
      time,
      startTime,
      cleanArea: cleanAreaInt,
      cleanTime: cleanTimeInt,
      time12,
      time24,
      time12Unit,
      dateTitle,
      dateTitle24,
      sectionTitle,
    };
  }
}

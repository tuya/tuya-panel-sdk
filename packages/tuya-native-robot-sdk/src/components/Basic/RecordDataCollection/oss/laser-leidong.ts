/** 雷动 清扫记录 */
import moment from 'moment';

import OSSRecordCollection from './OSSRecordCollection';

export default class LaserLeiDongRecord extends OSSRecordCollection {
  parseOneRecord(item: IRecord): IRecord {
    const { bucket, extend, file, id, time } = item;
    // const [date, startTime, endTime, cleanArea, cleanTime, mapLen, pathLen] = extend.split('_');
    const [recordId, date, startTime, cleanTime, cleanArea] = extend.split('_');

    const [time12, time12Unit] = moment(startTime, 'HHmmss').format('hh:mm-A').split('-');
    const dateTitle = moment(date + startTime, 'YYYYMMDDHHmm').format('YYYY-MM-DD hh:mm A');
    const sectionTitle = moment(date + startTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD');

    const time24 = moment(startTime, 'HHmmss').format('HH:mm');
    const dateTitle24 = moment(date + startTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm');

    const [cleanAreaInt, cleanTimeInt] = [cleanArea, cleanTime].map(d => parseInt(d, 10));

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
      time12,
      time24,
      time12Unit,
      dateTitle,
      dateTitle24,
      sectionTitle,
    };
  }
}

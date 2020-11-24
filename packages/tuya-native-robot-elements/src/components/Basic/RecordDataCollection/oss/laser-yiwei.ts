/** 一微 清扫记录 */
import moment from 'moment';
import Record from '@RecordDataCollection';

import OSSRecordCollection from './OSSRecordCollection';

export default class LaserYiWeiRecord extends OSSRecordCollection {
  parseOneRecord(item: Record.IRecord): Record.IRecord {
    const { bucket, extend, file, id, time } = item;
    const [date, startTime, endTime, cleanArea, cleanTime, mapLen, pathLen] = extend.split('_');

    const [time12, time12Unit] = moment(startTime, 'HHmmss')
      .format('hh:mm-A')
      .split('-');
    const dateTitle = moment(date + startTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD hh:mm A');
    const sectionTitle = moment(date + startTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD');

    const time24 = moment(startTime, 'HHmmss').format('HH:mm');
    const dateTitle24 = moment(date + startTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm');

    const [cleanAreaInt, cleanTimeInt, mapLenInt, pathLenInt] = [cleanArea, cleanTime, mapLen, pathLen].map(d =>
      parseInt(d, 10)
    );
    

    return {
      bucket,
      extend,
      file,
      id,
      date,
      time,
      startTime,
      endTime,
      cleanArea: cleanAreaInt,
      cleanTime: cleanTimeInt,
      mapLen: mapLenInt,
      pathLen: pathLenInt,
      time12,
      time24,
      time12Unit,
      dateTitle,
      dateTitle24,
      sectionTitle,
    };
  }
}
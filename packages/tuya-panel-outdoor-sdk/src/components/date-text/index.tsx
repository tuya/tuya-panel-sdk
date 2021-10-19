/**
 * @title 时间间隔组件，解析一段时间，或者时间段为 xxx天之后，xxx时之前
 */
import React, { FC } from 'react';
import { TYText } from 'tuya-panel-kit';
import { DateTextProps, IDate } from './interface';
import { parseDate, parseSecondToDate, FORMATS, FORMATS_ARRAY } from './util';
import I18N from './i18n';

const DateText: FC<DateTextProps> = ({
  lang = 'en',
  format = 'max2',
  time,
  date,
  from,
  tail = true,
  space = true,
  ...otherProps
}: DateTextProps) => {
  let str = '';
  let _time = time;

  // resolve the date use parameter or time
  if (date !== undefined) {
    const date1: Date = parseDate(date);
    const date2: Date = from !== undefined ? parseDate(from) : new Date();
    const diff = date1.getTime() - date2.getTime();
    _time = Math.floor(diff / 1000);
  }

  const langs = I18N[lang];
  const data: IDate = parseSecondToDate(_time);

  // add the date item and the unit
  const parseText = {
    d() {
      str += `${data.day} ${data.day > 1 ? langs.days : langs.day} `;
    },
    h() {
      str += `${data.hour} ${data.hour > 1 ? langs.hours : langs.hour} `;
    },
    m() {
      str += `${data.minute} ${data.minute > 1 ? langs.minutes : langs.minute} `;
    },
    s() {
      str += `${data.second} ${data.second > 1 ? langs.seconds : langs.second} `;
    },
  };

  // if now just return
  if (data.status === 'now') {
    str = langs.now;
  } else {
    if (format.includes('max')) {
      let i = 0;
      // only return the max bit
      for (; i < FORMATS_ARRAY.length; i++) {
        const type = FORMATS_ARRAY[i];
        if (data[type]) {
          parseText[FORMATS[i]]();
          break;
        }
      }
      if (format !== 'max') {
        parseText[FORMATS[++i]]();
      }
    } else {
      for (let i = 0; i < format.length; i++) {
        parseText[format[i]]();
      }
    }

    // if tail add the before or later
    if (tail) {
      str += langs[data.status];
    } else {
      // remove the last space
      str = str.slice(0, str.length - 1);
    }

    // resolve the space
    if (!space) {
      str = str.replace(/\s/g, '');
    }
  }

  return <TYText {...otherProps}>{str}</TYText>;
};

export default DateText;

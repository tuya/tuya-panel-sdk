import { isArray, isDayjs } from '../../utils/is';
import dayjs, { OpUnitType, UnitType } from 'dayjs';
export function getDayjsValue(time, format: string) {
  if (!time) {
    return undefined;
  }
  const formatValue = value => {
    if (isDayjs(value)) {
      return dayjs(value.valueOf());
    }
    if (typeof value === 'string') {
      const dv = dayjs(value, format);

      return dv.isValid() ? dv : dayjs(value, 'YYYY-MM-DD');
    }
    return dayjs(value);
  };

  if (isArray(time)) {
    return time.map(t => (t ? formatValue(t) : undefined));
  }

  return formatValue(time);
}

export function getNow() {
  return dayjs();
}

export function getNowWeeks() {
  return [dayjs().startOf('week'), dayjs().endOf('week')];
}

// date actions
export const methods = {
  add(time, value: number, unit: OpUnitType) {
    return time.add(value, unit);
  },
  subtract(time, value: number, unit: OpUnitType) {
    return time.subtract(value, unit);
  },
  startOf(time, unit?: OpUnitType) {
    return time.startOf(unit);
  },
  endOf(time, unit?: OpUnitType) {
    return time.endOf(unit);
  },
  set(time, unit: UnitType, value: number) {
    return time.set(unit, value);
  },
};

export function getFormat(format, pickerType) {
  let valueFormat;
  switch (pickerType) {
    case 'date':
      valueFormat = 'YYYY-MM-DD';
      break;
    case 'month':
      valueFormat = 'YYYY-MM';
      break;
    case 'year':
      valueFormat = 'YYYY';
      break;
    case 'week':
      valueFormat = 'YYYY-MM-DD';
      break;
    default:
      valueFormat = 'YYYY-MM-DD';
  }
  if (format) {
    valueFormat = format;
  }
  return valueFormat;
}

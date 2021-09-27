import { getWeekDayString, getWeekDayNumber } from '../index';

describe('touchable view', () => {
  it('weekDay const function', () => {
    expect(getWeekDayString(86)).toBe('0101011');
    expect(getWeekDayNumber('0101011')).toBe(86);
  });
});

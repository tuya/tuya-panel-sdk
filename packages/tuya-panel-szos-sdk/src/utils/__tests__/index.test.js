import { transTime } from '../index';

describe('TurnPlate components', () => {
  it('basic', () => {
    expect(transTime()).toBe('00:00');
    expect(transTime(360)).toBe('06:00');
    expect(transTime(0)).toBe('00:00');
    expect(transTime(3601)).toBe('60:01');
  });
  it('timeBit is minute', () => {
    expect(transTime(360, 'mimute')).toBe('06:00');
  });
  it('timeBit is hour', () => {
    expect(transTime(360, 'hour')).toBe('0:06:00');
    expect(transTime(3601, 'hour')).toBe('1:00:01');
  });
});

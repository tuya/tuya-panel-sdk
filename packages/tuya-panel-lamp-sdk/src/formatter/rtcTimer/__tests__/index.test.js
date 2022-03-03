import RtcTimerFormatter from '../index';
import { singleOffValue, singleOnValue, rangeOffValue, rangeSolarValue } from '../default';

describe('RtcTimerFormatter class', () => {
  const Obj = new RtcTimerFormatter();
  const Obj2 = new RtcTimerFormatter();
  const Obj3 = new RtcTimerFormatter();
  const Obj4 = new RtcTimerFormatter();
  const Obj5 = new RtcTimerFormatter();
  jest.spyOn(Obj, 'parse');
  jest.spyOn(Obj2, 'parse');
  jest.spyOn(Obj3, 'parse');
  jest.spyOn(Obj4, 'parse');
  jest.spyOn(Obj5, 'parse');

  jest.spyOn(Obj, 'format');
  jest.spyOn(Obj2, 'format');
  jest.spyOn(Obj3, 'format');
  jest.spyOn(Obj4, 'format');
  jest.spyOn(Obj5, 'format');

  // 单个时间点
  it('parse', () => {
    expect(Obj.parse('81010000043800')).toEqual(singleOffValue);
    expect(Obj.parse).toHaveBeenCalledTimes(1);
  });
  it('parse', () => {
    expect(Obj2.parse('8101000004380300006464')).toEqual(singleOnValue);
    expect(Obj2.parse).toHaveBeenCalledTimes(1);
  });
  it('format', () => {
    expect(Obj2.format(singleOffValue)).toEqual('81010000043800');
    expect(Obj2.format).toHaveBeenCalledTimes(1);
  });
  it('format', () => {
    expect(Obj.format(singleOnValue)).toEqual('8101000004380300006464');
    expect(Obj.format).toHaveBeenCalledTimes(1);
  });
  // 时间段
  it('parse', () => {
    expect(Obj3.parse('81020000043803000064640004d800')).toEqual(rangeOffValue);
    expect(Obj3.parse).toHaveBeenCalledTimes(1);
  });
  it('parse', () => {
    expect(Obj4.parse('8102000004380264320004d807000000006432')).toEqual(rangeSolarValue);
    expect(Obj4.parse).toHaveBeenCalledTimes(1);
  });
  it('format', () => {
    expect(Obj3.format(rangeOffValue)).toEqual('81020000043803000064640004d800');
    expect(Obj3.format).toHaveBeenCalledTimes(1);
  });
  it('format', () => {
    expect(Obj4.format(rangeSolarValue)).toEqual('8102000004380264320004d807000000006432');
    expect(Obj4.format).toHaveBeenCalledTimes(1);
  });
  // 删除定时
  it('format', () => {
    expect(Obj5.format({ timerId: 1, status: true })).toEqual('8100');
    expect(Obj5.format).toHaveBeenCalledTimes(1);
  });
  it('parse', () => {
    expect(Obj5.parse('8100')).toEqual({ timerId: 1, status: true, type: 0 });
    expect(Obj5.parse).toHaveBeenCalledTimes(1);
  });
});

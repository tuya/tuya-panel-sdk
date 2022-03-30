import SwitchGradientFormatter from '../index';

describe('SwitchGradientFormatter class', () => {
  const Obj = new SwitchGradientFormatter();
  const Obj2 = new SwitchGradientFormatter();

  jest.spyOn(Obj, 'parse');
  jest.spyOn(Obj2, 'parse');
  jest.spyOn(Obj2, 'format');

  // 单个时间点
  it('parse', () => {
    expect(Obj.parse('')).toEqual({ on: 800, off: 800 });
    expect(Obj.parse).toHaveBeenCalledTimes(1);
  });
  it('parse', () => {
    expect(Obj2.parse('00000320000320')).toEqual({ on: 800, off: 800 });
    expect(Obj2.parse).toHaveBeenCalledTimes(1);
  });
  it('format', () => {
    expect(Obj2.format({ on: 800, off: 800 })).toEqual('00000320000320');
    expect(Obj2.format).toHaveBeenCalledTimes(1);
  });
});

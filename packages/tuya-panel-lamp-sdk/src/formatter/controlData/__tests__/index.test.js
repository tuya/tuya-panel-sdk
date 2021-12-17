import ControlDataFormatter from '../index';

describe('ControlDataFormatter class', () => {
  const Obj = new ControlDataFormatter();
  const Obj2 = new ControlDataFormatter();

  jest.spyOn(Obj, 'parse');
  jest.spyOn(Obj2, 'parse');
  jest.spyOn(Obj, 'format');
  const data = {
    mode: 1,
    hue: 0,
    saturation: 0,
    value: 0,
    brightness: 1000,
    temperature: 1000,
  };

  it('parse', () => {
    expect(Obj.parse('100000000000003e803e8')).toEqual(data);
    expect(Obj.parse).toHaveBeenCalledTimes(1);
  });
  it('parse', () => {
    expect(Obj2.parse('')).toEqual(data);
    expect(Obj2.parse).toHaveBeenCalledTimes(1);
  });
  it('format', () => {
    expect(Obj.format(data)).toEqual('100000000000003e803e8');
    expect(Obj.format).toHaveBeenCalledTimes(1);
  });
});

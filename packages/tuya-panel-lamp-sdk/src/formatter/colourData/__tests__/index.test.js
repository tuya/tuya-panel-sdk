import ColourData from '../index';

describe('ColourData class', () => {
  const Obj = new ColourData();
  const Obj2 = new ColourData();

  jest.spyOn(Obj, 'parse');
  jest.spyOn(Obj2, 'parse');
  jest.spyOn(Obj, 'format');

  it('parse', () => {
    expect(Obj.parse('000003e803e8')).toEqual({ hue: 0, saturation: 1000, value: 1000 });
    expect(Obj.parse).toHaveBeenCalledTimes(1);
  });
  it('parse', () => {
    expect(Obj2.parse('')).toEqual({ hue: 0, saturation: 1000, value: 1000 });
    expect(Obj2.parse).toHaveBeenCalledTimes(1);
  });
  it('format', () => {
    expect(Obj.format({ hue: 0, saturation: 1000, value: 1000 })).toEqual('000003e803e8');
    expect(Obj.format).toHaveBeenCalledTimes(1);
  });
});

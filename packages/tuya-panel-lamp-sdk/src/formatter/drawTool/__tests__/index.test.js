import DrawToolFormater from '../index';

describe('ColourData class', () => {
  const Obj = new DrawToolFormater();

  jest.spyOn(Obj, 'parse');
  jest.spyOn(Obj, 'format');

  it('parse', () => {
    expect(Obj.parse('010101000064640000')).toEqual({
      brightness: 0,
      daubType: 'all',
      effect: 1,
      hue: 0,
      isWhite: false,
      saturation: 1000,
      temperature: 0,
      value: 1000,
      version: 1,
    });
    expect(Obj.parse).toHaveBeenCalledTimes(1);
  });
  it('format', () => {
    expect(
      Obj.format({
        brightness: 0,
        daubType: 'all',
        effect: 1,
        hue: 0,
        isWhite: false,
        saturation: 1000,
        temperature: 0,
        value: 1000,
        version: 1,
      })
    ).toEqual('010101000064640000');
    expect(Obj.format).toHaveBeenCalledTimes(1);
  });
});
